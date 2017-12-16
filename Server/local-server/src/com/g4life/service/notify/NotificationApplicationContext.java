package com.g4life.service.notify;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class NotificationApplicationContext implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("notification");
		// TODO Auto-generated method stub
		NotificationControler notificationControler = new NotificationControler();
		notificationControler.sendNotification();
	}

}
