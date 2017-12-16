package com.g4life.control;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;



import com.g4life.common.ResponseCode;
import com.g4life.common.json.HomeInfoJsonDoc;
import com.g4life.dao.ProductInfoAccess;
import com.g4life.dto.ProductInfo;

public class ProductController {

	public String getHomeProductInfo() {
		//Get product from database and create json data
		ProductInfoAccess productInfoAccess = new ProductInfoAccess();
		List<ProductInfo> newProductInfos = new ArrayList<ProductInfo>();
		newProductInfos = productInfoAccess.getAllProduct();
		List<ProductInfo> sellingProducts = new ArrayList<ProductInfo>();
		List<ProductInfo> promotionProducts = new ArrayList<ProductInfo>();
		List<ProductInfo> recommendedProducts = new ArrayList<ProductInfo>();
		sellingProducts = productInfoAccess.getAllProduct();
		promotionProducts = productInfoAccess.getAllProduct();
		recommendedProducts = productInfoAccess.getAllProduct();
		HomeInfoJsonDoc homeInfoJsonDoc = new HomeInfoJsonDoc(newProductInfos,
				sellingProducts, promotionProducts, recommendedProducts);
		String response = homeInfoJsonDoc.getJSONDoc();
		return response;
	}

	public int updateProductInfo(ProductInfo productInfo,
			InputStream productImage) {
		// update data to database
		ProductInfoAccess productInfoAccess = new ProductInfoAccess();
		productInfoAccess.insertOrUpdate(productInfo);
		// store image to data/image folder
		File targetFile = new File("./data/product_image/"
				+ productInfo.getImageName() + ".jpg");
		try {
			OutputStream outStream = new FileOutputStream(targetFile);
			int read = 0;
			byte[] bytes = new byte[1024];
			while ((read = productImage.read(bytes)) != -1) {
				outStream.write(bytes, 0, read);
			}
			outStream.close();
			return ResponseCode.SUCCESS_CODE;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseCode.ERROR_SERVER_CODE;
		}
	}

	public int removeProductInfo(ProductInfo productInfo) {
		// delete product in database
		ProductInfoAccess productInfoAccess = new ProductInfoAccess();
		productInfoAccess.deleteProduct(productInfo);
		// delete product image in data folder
		return ResponseCode.ERROR_SERVER_CODE;
	}
}
