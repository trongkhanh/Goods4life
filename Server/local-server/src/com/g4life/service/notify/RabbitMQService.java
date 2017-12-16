package com.g4life.service.notify;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

public class RabbitMQService implements NotificationServiceIF{
	private static int SUCCESS_CODE = 1;
	private static int ERROR_CODE = -1;
	private static String IP_ADDRESS = "127.0.0.1";
	private static int PORT = 5672;
	@Override
	public int sendMessage(String queue, String message) {
		ConnectionFactory factory = new ConnectionFactory();
	    factory.setHost(IP_ADDRESS);
	    factory.setPort(PORT);
	    try {
	    	 Connection connection = factory.newConnection();
	 	    Channel channel = connection.createChannel();
	 	    channel.queueDeclare(queue, false, false, false, null);
	 	    channel.basicPublish("", queue, null, message.getBytes("UTF-8"));
	 	    System.out.println(" [x] Sent '" + message + "'");
	 	    channel.close();
	 	    connection.close();	
	 	    return SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR_CODE;
		}
	}

	@Override
	public int receiveMessage(String queue) {
		 ConnectionFactory factory = new ConnectionFactory();
		    factory.setHost(IP_ADDRESS);
		    factory.setPort(PORT);
		    try
		    {
		      Connection connection = factory.newConnection();
		      Channel channel = connection.createChannel();
		      
		      channel.queueDeclare(queue, false, false, false, null);
		      Consumer consumer = new DefaultConsumer(channel)
		      {
		        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
		          throws IOException
		        {
		          String message = new String(body, "UTF-8");
		          System.out.println(" [x] Received '" + message + "'");
		        }
		      };
		      channel.basicConsume(queue, true, consumer);
		      return SUCCESS_CODE;
		    }
		    catch (IOException e)
		    {
		      System.out.println("error receive data");
		      e.printStackTrace();
		      return ERROR_CODE;
		    }
		    catch (TimeoutException e)
		    {
		      System.out.println("error receive data");
		      e.printStackTrace();
		      return ERROR_CODE;
		    }
	}

	public static void main(String[] args) {
		RabbitMQService request = new RabbitMQService();
		request.sendMessage("hello", "send message");
		request.receiveMessage("hello");
	}
}
