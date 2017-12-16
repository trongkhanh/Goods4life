package com.g4life.service.http;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.g4life.control.AccountController;
import com.g4life.dto.SellerInfo;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/SellerInfo")
public class RegistrationSaleServlet extends BaseServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			//Update 20171203
			BufferedReader bufferedReader = req.getReader();
//			System.out.println(bufferedReader.readLine());
			SellerInfo sellerInfo = null;
			
			Gson gson = new Gson();
			String data1 = bufferedReader.readLine();
			
			//
			JSONObject jsonObject = new JSONObject(data1);
			System.out.println("data: "+ data1);
			String info = jsonObject.get("sellerInfo").toString();
			System.out.println("info: "+ info);
			sellerInfo = gson.fromJson(info, SellerInfo.class);
			String imageDataBefore = jsonObject.getString("idCardBefore");
			String imageDataAfter = jsonObject.getString("idCardAfter");

			System.out.println(imageDataBefore);
			AccountController accController = new AccountController();
			int result = accController.updateByBase64(imageDataAfter, imageDataBefore, sellerInfo);
			JsonObject jsonObject1 = new JsonObject();
			jsonObject1.addProperty("code", result);

			if (sellerInfo != null) {
				System.out.println("send seller info success");
				responseRequest(resp, jsonObject1.toString());

			}else {
				returnBadRequest(resp, req);
				System.out.println("error");
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
