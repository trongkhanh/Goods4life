package com.g4life.control;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Random;

import javax.imageio.ImageIO;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import com.g4life.common.Base64Coder;
import com.g4life.common.ResponseCode;
import com.g4life.common.ValueConstant;
import com.g4life.common.json.JsonWebTokenAccount;
import com.g4life.dao.AccountInfoAccess;
import com.g4life.dao.SellerInfoAccess;
import com.g4life.dto.AccountInfo;
import com.g4life.dto.SellerInfo;
import com.g4life.service.confirmaccount.SendConfirmCodeIF;
import com.g4life.service.confirmaccount.SendToEmail;
import com.g4life.service.confirmaccount.SendToPhone;
import com.google.gson.JsonObject;

public class AccountController {

	public int createAccount(AccountInfo accountInfo) {
		AccountInfoAccess access = new AccountInfoAccess();
		accountInfo.setAccountID((int) System.currentTimeMillis());
		SendConfirmCodeIF sendConfirmCodeIF;
		if (accountInfo.getMail() != null && !accountInfo.getMail().isEmpty()) {
			// sign up by mail
			// check mail exist or not
			String mail = accountInfo.getMail();
			System.out.println("mail:" + mail);
			if (access.getByMail(mail) == null) {
				access.insertOrUpdate(accountInfo);
				// send code to email
				String code = String.valueOf(randomCode());
				sendConfirmCodeIF = new SendToEmail();
				sendConfirmCodeIF.sendCodeToAddress(mail, code);
				return ResponseCode.SUCCESS_CODE;
			}
		} else if (accountInfo.getPhoneNumber() != null && !accountInfo.getPhoneNumber().isEmpty()) {
			// sign up by phone number
			// check phone exist or not
			String phone = accountInfo.getPhoneNumber();
			if (access.getByPhoneNumber(phone) == null) {
				access.insertOrUpdate(accountInfo);
				// TODO send code to phone number
				return ResponseCode.SUCCESS_CODE;
			}

		}
		return ResponseCode.ERROR_SERVER_CODE;
	}

	public int signInAccount(AccountInfo accountInfo, int typeSignIn) {
		AccountInfoAccess access = new AccountInfoAccess();
		if (typeSignIn == ValueConstant.SIGN_IN_BY_FACEBOOK) {
			// check user exist or not
			if (accountInfo.getUserName() != null) {
				String userName = accountInfo.getUserName();
				if (access.getByUserName(userName) == null) {
					accountInfo.setAccountID((int) System.currentTimeMillis());
					// update account to database
					access.insertOrUpdate(accountInfo);
				}
			}
		} else if (typeSignIn == ValueConstant.SIGN_IN_BY_TOKEN) {
			return ResponseCode.SUCCESS_CODE;
		} else if (typeSignIn == ValueConstant.SING_IN_BY_MAIL) {
			String mail = accountInfo.getMail();
			if (access.getByMail(mail) != null) {
				AccountInfo account = access.getByMail(mail);
				// check password
				if (account.getPassWord().equals(accountInfo.getPassWord())) {
					return ResponseCode.SUCCESS_CODE;
				}
			}
		} else {
			String phone = accountInfo.getPhoneNumber();
			if (access.getByPhoneNumber(phone) != null) {
				AccountInfo account = access.getByPhoneNumber(phone);
				// check password
				if (account.getPassWord().equals(accountInfo.getPassWord())) {
					return ResponseCode.SUCCESS_CODE;
				}
			}
		}
		return ResponseCode.ERROR_SIGN_IN;
	}

	public String getJWTOfAccount(AccountInfo accountInfo) {
		JsonWebTokenAccount jsonAccount = new JsonWebTokenAccount();
		AccountInfoAccess accountInfoAccess = new AccountInfoAccess();
		String result = "";
		if (accountInfo.getMail() != null) {
			AccountInfo account = accountInfoAccess.getByMail(accountInfo.getMail());
			result = jsonAccount.createJWT(account, ValueConstant.SING_IN_BY_MAIL);
		} else if (accountInfo.getPhoneNumber() != null) {
			AccountInfo account = accountInfoAccess.getByPhoneNumber(accountInfo.getPhoneNumber());
			result = jsonAccount.createJWT(account, ValueConstant.SING_IN_BY_PHONE);
		}
		return result;
	}

	public AccountInfo getAccountFromJWT(String jwt) {
		JsonWebTokenAccount jsTokenAccount = new JsonWebTokenAccount();
		AccountInfo accountInfo = null;
		accountInfo = jsTokenAccount.getAccountFromJWT(jwt);
		return accountInfo;
	}

//	public int registrationSale(SellerInfo sellerInfo, InputStream inputStream) {
//		// Insert data in seller_info table
//		SellerInfoAccess sellerInfoAccess = new SellerInfoAccess();
//		if (sellerInfoAccess.insertOrUpdate(sellerInfo)) {
//			return ResponseCode.SUCCESS_CODE;
//		} else {
//			return ResponseCode.ERROR_SERVER_CODE;
//		}
//	}

	public String forgetPassword(AccountInfo accountInfo, int type) {
		String result = "";
		String addr = "";
		SendConfirmCodeIF sendConfirmCodeIF = null;
		AccountInfo account = null;
		AccountInfoAccess accountInfoAccess = new AccountInfoAccess();
		if (type == ValueConstant.SING_IN_BY_MAIL) {
			// Send confirm code to email and client
			sendConfirmCodeIF = new SendToEmail();
			addr = accountInfo.getMail();
			account = accountInfoAccess.getByMail(addr);
		} else if (type == ValueConstant.SING_IN_BY_PHONE) {
			sendConfirmCodeIF = new SendToPhone();
			addr = accountInfo.getPhoneNumber();
			account = accountInfoAccess.getByPhoneNumber(addr);
		}
		//Check account info exist in database		
		if (sendConfirmCodeIF != null && account != null) {
			String code = String.valueOf(randomCode());
			sendConfirmCodeIF.sendCodeToAddress(addr, code);
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("code", ResponseCode.SUCCESS_CODE);
			jsonObject.addProperty("ConfirmCode", code);
			result = jsonObject.toString();
		} else {
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("code", ResponseCode.ERROR_SERVER_CODE);
			result = jsonObject.toString();
		}
		return result;
	}

	public String updateAccountInfo(AccountInfo accountInfo) {
		String result = "";
		AccountInfoAccess access = new AccountInfoAccess();
		access.insertOrUpdate(accountInfo);
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("code", ResponseCode.SUCCESS_CODE);
		AccountInfo account = access.getById(accountInfo.getAccountID());
		String jwt = getJWTOfAccount(account);
		jsonObject.addProperty("jwt", jwt);
		result = jsonObject.toString();
		return result;
	}

	public int registrationSale(String imageDataAfter, String imageDataBefore, SellerInfo sellerInfo) {
		try {
			Base64Coder base64Coder = new Base64Coder();
			BufferedImage bufferedImageBefore = base64Coder.decodeToImage(imageDataBefore);
			File file = new File(getParentPath()+ "/data/id_card" + sellerInfo.getIdCardImage() + "_before.jpg");
			ImageIO.write(bufferedImageBefore, "JPEG", file);

			BufferedImage bufferedImageAfter = base64Coder.decodeToImage(imageDataAfter);
			File fileAfter = new File(getParentPath()+"/data/id_card" + sellerInfo.getIdCardImage() + "_after.jpg");
			ImageIO.write(bufferedImageAfter, "JPEG", fileAfter);
			// Insert data in seller_info table
			SellerInfoAccess sellerInfoAccess = new SellerInfoAccess();
			if (sellerInfoAccess.insertOrUpdate(sellerInfo)) {
				return ResponseCode.SUCCESS_CODE;
			} else {
				return ResponseCode.ERROR_SERVER_CODE;
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseCode.ERROR_SERVER_CODE;
		}
	}

	private int randomCode(){
		int defaultValue = 123456;
		Random randomGenerator = new Random();
		for (int idx = 1; idx <= 100; ++idx){
			int randomInt = randomGenerator.nextInt(1000000);
			if (randomInt >100000) {
				return randomInt;
			}
		}
		return 	defaultValue;
	}
	private static String getParentPath() {
		String path = AccountController.class.getProtectionDomain().getCodeSource().getLocation().getPath();
		File file = new File(path).getParentFile().getParentFile();
		return file.getAbsolutePath();

	}
	public static void main(String[] args) {
//		AccountController accountController = new AccountController();
//		accountController.getParentPath();
		//		try {
//			BufferedImage image = ImageIO.read(new File("D:/data/id_card/seller_01.jpg"));
//			Base64Coder base64Coder = new Base64Coder();
//			String result = base64Coder.encodeToString(image, "jpg");
//			BufferedImage bufferedImage = base64Coder.decodeToImage(result);
//			File file = new File("D:/data/id_card/seller_test.jpg");
//			ImageIO.write(bufferedImage, "JPEG", file);
//			System.out.println(result);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		 
	}
}
