package com.g4life.control;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;





import javax.imageio.ImageIO;

import com.g4life.common.Base64Coder;
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
			String productImage) {
		try{
		// update data to database
		ProductInfoAccess productInfoAccess = new ProductInfoAccess();
		productInfoAccess.insertOrUpdate(productInfo);
		// store image to data/image folder
		Base64Coder base64Coder = new Base64Coder();
		BufferedImage bufferedImageBefore = base64Coder.decodeToImage(productImage);
		File file = new File("./data/product_image/"
				+ productInfo.getImageName() + ".jpg");
		ImageIO.write(bufferedImageBefore, "JPEG", file);
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
		int result = productInfoAccess.deleteProduct(productInfo);
		// delete product image in data folder
		File files = new File("./data/product_image/"
				+ productInfo.getImageName() + ".jpg");
		files.deleteOnExit();
		return result;
	}
	public static void main(String[] args) {
		File file = new File("E:/Startup/g4life/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/local-server/data/product_info/"
				+ "nac_than" + ".jpg");
		file.deleteOnExit();
	}
}
