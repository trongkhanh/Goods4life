package com.g4life.control;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;











import javax.imageio.ImageIO;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

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
			System.out.println("mail:"+ mail);
			if (access.getByMail(mail) == null) {
				access.insertOrUpdate(accountInfo);
				// send code to email
				String code = "123456";
				sendConfirmCodeIF = new SendToEmail();
				sendConfirmCodeIF.sendCodeToAddress(mail, code);
				return ResponseCode.SUCCESS_CODE;
			}
		} else if (accountInfo.getPhoneNumber() != null
				&& !accountInfo.getPhoneNumber().isEmpty()) {
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
			AccountInfo account = accountInfoAccess.getByMail(accountInfo
					.getMail());
			result = jsonAccount.createJWT(account,
					ValueConstant.SING_IN_BY_MAIL);
		} else if (accountInfo.getPhoneNumber() != null) {
			AccountInfo account = accountInfoAccess
					.getByPhoneNumber(accountInfo.getPhoneNumber());
			result = jsonAccount.createJWT(account,
					ValueConstant.SING_IN_BY_PHONE);
		}
		return result;
	}

	public AccountInfo getAccountFromJWT(String jwt) {
		JsonWebTokenAccount jsTokenAccount = new JsonWebTokenAccount();
		AccountInfo accountInfo = null;
		accountInfo = jsTokenAccount.getAccountFromJWT(jwt);
		return accountInfo;
	}

	public int registrationSale(SellerInfo sellerInfo, InputStream inputStream) {
		// Insert data in seller_info table
		SellerInfoAccess sellerInfoAccess = new SellerInfoAccess();
		if (sellerInfoAccess.insertOrUpdate(sellerInfo)) {
			return ResponseCode.SUCCESS_CODE;
		} else {
			return ResponseCode.ERROR_SERVER_CODE;
		}
	}

	public String forgetPassword(AccountInfo accountInfo, int type) {
		String result = "";
		String addr = "";
		SendConfirmCodeIF sendConfirmCodeIF = null;
		if (type == ValueConstant.SING_IN_BY_MAIL) {
			// TODO Get confirm code
			// Send confirm code to email and client
			sendConfirmCodeIF = new SendToEmail();
			addr = accountInfo.getMail();

		} else if (type == ValueConstant.SING_IN_BY_PHONE) {
			sendConfirmCodeIF = new SendToPhone();
			addr = accountInfo.getPhoneNumber();
		}
		if (sendConfirmCodeIF != null) {
			String code = "123456";
			sendConfirmCodeIF.sendCodeToAddress(addr, code);
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("code", ResponseCode.SUCCESS_CODE);
			jsonObject.addProperty("ConfirmCode", code);
			result = jsonObject.toString();
		} else {
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("code", ResponseCode.ERROR_SERVER_CODE);
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

	public int updateByBase64(String imageDataAfter, String imageDataBefore, SellerInfo sellerInfo) {
		try {
			BufferedImage bufferedImageBefore = decodeToImage(imageDataBefore);
			File file = new File("./data/id_card"+ sellerInfo.getIdCardImage() + "_before.jpg");
			ImageIO.write(bufferedImageBefore, "JPEG", file);
			
			BufferedImage bufferedImageAfter = decodeToImage(imageDataAfter);
			File fileAfter = new File("./data/id_card"+ sellerInfo.getIdCardImage() + "_after.jpg");
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
	public static String encodeToString(BufferedImage image, String type) {
        String imageString = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
 
        try {
            ImageIO.write(image, type, bos);
            byte[] imageBytes = bos.toByteArray();
 
            BASE64Encoder encoder = new BASE64Encoder();
            imageString = encoder.encode(imageBytes);
 
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageString;
    }
	public static BufferedImage decodeToImage(String imageString) {

        BufferedImage image = null;
        byte[] imageByte;
        try {
            BASE64Decoder decoder = new BASE64Decoder();
            imageByte = decoder.decodeBuffer(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return image;
    }
	
	public static void main(String[] args) {
		AccountController accountController = new AccountController();
		try {
			BufferedImage image = ImageIO.read(new File("E:/data/id_card/seller_01.jpg"));
			String result = accountController.encodeToString(image, "jpg");
			BufferedImage bufferedImage = accountController.decodeToImage(result);
			File file = new File("E:/data/id_card/seller_02.jpg");
			ImageIO.write(bufferedImage, "JPEG", file);
			System.out.println(result);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
