/* 
 *//***********************************************************************************
 * <summary>
 * Project name: server-application
 * Class name: MessageHistoryServlet.java
 * </summary>
 * <history>
 * VERSION	DATE	BY		CHANGE/COMMENT
 *--------------------------------------------------------------------------------------------------------------
 * V1.00	24-01-2017	(TSDV) 	Initialize source code
 * -------------------------------------------------------------------------------------------------------------
 * </history>
 * <Copyright>
 * (C) Copyright TOSHIBA Corporation 2016-2017. All rights reserved.                                             
 * </Copyright>                                                                                                                                  
 *******************************************************************************
 */
package com.g4life.service.http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.g4life.common.ValueConstant;
import com.g4life.control.ProductController;
import com.g4life.dto.ProductInfo;
import com.google.gson.Gson;

// TODO: Auto-generated Javadoc
/**
 * The Class MessageHistoryServlet.
 */
@WebServlet("/ProductInfo")
public class ProductInfoServlet extends BaseServlet {

	String charset = "UTF-8";
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String functionName = request.getParameter("functionName");
		System.out.println("functionName: " + functionName);
		ProductController productController = new ProductController();
		String result = "";
		switch (functionName) {
		case ValueConstant.HOME_PRO_INFO:
			System.out.println("get home infos");
			result = productController.getHomeProductInfo();
			responseRequest(response, result);
			break;
		default:
			returnBadRequest(response, request);
			break;
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String functionName = req.getParameter("functionName");
		ProductController productController = new ProductController();
		ProductInfo productInfo = null;
		try {
			// Get data from content of request
			BufferedReader bufferedReader = req.getReader();
			JSONObject jsonObject;
			Gson gson = new Gson();
			//convert content to string
			String data = bufferedReader.readLine();
			//Get product info
			jsonObject = new JSONObject(data);
			String info = jsonObject.get("productInfo").toString();
			// Convert string to product info object
			productInfo = gson.fromJson(info, ProductInfo.class);
			
			if (productInfo != null) {

				if (functionName.equals(ValueConstant.UPDATE_PRODUCT_INFO)) {
					String productImageBase64 = jsonObject.getString("productImage").toString();
					if (!productImageBase64.isEmpty()) {
						int result = productController.updateProductInfo(
								productInfo, productImageBase64);
						responseRequest(resp, String.valueOf(result));
					} else {
						returnBadRequest(resp, req);
					}
				}else if (functionName.equals(ValueConstant.REMOVE_PRODUCT_INFO)) {
					int result = productController.removeProductInfo(productInfo);
					responseRequest(resp, String.valueOf(result));
				}
			} else {
				returnBadRequest(resp, req);
			}

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
