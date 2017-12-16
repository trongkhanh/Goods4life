package com.g4life.service.confirmaccount;

public interface SendConfirmCodeIF {
	public void sendCodeToAddress(String addr, String code);
}
