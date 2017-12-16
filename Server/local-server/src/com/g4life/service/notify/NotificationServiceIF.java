package com.g4life.service.notify;

public interface NotificationServiceIF {
	
	public abstract int sendMessage(String queue, String message);
	public abstract int receiveMessage(String queue);
	
}
