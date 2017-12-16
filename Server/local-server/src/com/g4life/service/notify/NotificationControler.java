package com.g4life.service.notify;

public class NotificationControler {
	public void sendNotification() {
		NotificationServiceIF notificationServiceIF = new RabbitMQService();
		notificationServiceIF.sendMessage("hello", "test rabbit mq");
	}
}
