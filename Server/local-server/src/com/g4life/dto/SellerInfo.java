package com.g4life.dto;

import java.io.Serializable;
import java.util.Date;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SellerInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@SerializedName("accountID")
	@Expose
	int accountID;
	
	@SerializedName("rating")
	@Expose
	int rating;
	
	@SerializedName("status")
	@Expose
	String status;
	
	@SerializedName("startDate")
	@Expose
	String startDate;
	
	@SerializedName("comment")
	@Expose
	String comment;
	
	@SerializedName("sellerType")
	@Expose
	int sellerType;
	
	@SerializedName("idCardImage")
	@Expose
	String idCardImage;
	public SellerInfo(int accountID, int rating, String status, String startDate,
			String comment, int sellerType, String idCardImage) {
		super();
		this.accountID = accountID;
		this.rating = rating;
		this.status = status;
		this.startDate = startDate;
		this.comment = comment;
		this.sellerType = sellerType;
		this.idCardImage = idCardImage;
	}
	
	public String getIdCardImage() {
		return idCardImage;
	}
	public void setIdCardImage(String idCardImage) {
		this.idCardImage = idCardImage;
	}
	public int getAccountID() {
		return accountID;
	}
	public void setAccountID(int accountID) {
		this.accountID = accountID;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getSellerType() {
		return sellerType;
	}
	public void setSellerType(int sellerType) {
		this.sellerType = sellerType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
