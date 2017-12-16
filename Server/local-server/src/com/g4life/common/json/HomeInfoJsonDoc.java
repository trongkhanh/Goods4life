package com.g4life.common.json;

import java.util.List;

import com.g4life.dto.ProductInfo;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class HomeInfoJsonDoc extends JSONDocAbtract{
	@Expose
	@SerializedName("newProduct")
	List<ProductInfo> newProductInfos;
	@Expose
	@SerializedName("sellingProduct")
	List<ProductInfo> sellingProducts;
	@Expose
	@SerializedName("promotionProduct")
	List<ProductInfo> promotionProducts;
	@Expose
	@SerializedName("recommendedProduct")
	List<ProductInfo> recommendedProducts;
	
	public HomeInfoJsonDoc(List<ProductInfo> newProductInfos, List<ProductInfo> sellingProducts,
			List<ProductInfo> promotionProducts, List<ProductInfo> recommendedProducts ) {
		super();
		this.newProductInfos = newProductInfos;
		this.sellingProducts = sellingProducts;
		this.promotionProducts = promotionProducts;
		this.recommendedProducts = recommendedProducts;
		
	}
	@Override
	public String getJSONDoc() {
		return JSON.parser.toJson(this);
	}
}
