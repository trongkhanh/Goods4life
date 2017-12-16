package com.g4life.service.http;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.g4life.common.ValueConstant;
import com.g4life.control.AccountController;
import com.g4life.control.ProductController;
import com.g4life.dto.AccountInfo;
import com.google.gson.Gson;

@WebServlet("/Account")
public class AccountInfoServlet extends BaseServlet {

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
		String functionName = req.getParameter("functionName");
		AccountController accountController = new AccountController();
		String result = "";
		String data = req.getHeader("data");
		JSONObject jsonObject;
		try {
			jsonObject = new JSONObject(data);
			Gson gson = new Gson();
			String account = jsonObject.get("accountInfo").toString();
			AccountInfo accountInfo = gson.fromJson(account, AccountInfo.class);
			switch (functionName) {
			case ValueConstant.FORGET_PASSWORD:
				int type = jsonObject.getInt("typeSignIn");
				result = accountController.forgetPassword(accountInfo, type);
				responseRequest(resp, result);
				break;
			case ValueConstant.UPDATE_ACCOUNT:
				accountController.updateAccountInfo(accountInfo);
				responseRequest(resp, result);
				break;
			default:
				returnBadRequest(resp, req);
				break;
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
