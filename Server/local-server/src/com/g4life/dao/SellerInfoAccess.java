package com.g4life.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;

import com.g4life.dto.AccountInfo;
import com.g4life.dto.SellerInfo;
import com.g4life.util.HibernateUtil;

public class SellerInfoAccess {
	public List<SellerInfo> getAllAccount() {
		try {
			// Open session
			Session session = HibernateUtil.getSessionFactory().openSession();

			Criteria criteria = session.createCriteria(SellerInfo.class).addOrder(Order.asc("accountID"));

			criteria.setCacheable(true);
			@SuppressWarnings("unchecked")
			List<SellerInfo> accountList = criteria.list();

			// Close session
			session.close();
			return accountList;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public boolean insertOrUpdate(SellerInfo data) {

		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			session.beginTransaction();
			Transaction tx = session.beginTransaction();
			session.saveOrUpdate(data);
			tx.commit();
			session.close();
			return true;
		} catch (HibernateException e) {
			e.printStackTrace();
			return false;
		}
	}
	public List<SellerInfo> getAccountByRating() {
		try {
			// Open session
			Session session = HibernateUtil.getSessionFactory().openSession();

			Criteria criteria = session.createCriteria(SellerInfo.class).addOrder(Order.asc("rating"));

			criteria.setCacheable(true);
			@SuppressWarnings("unchecked")
			List<SellerInfo> accountList = criteria.list();

			// Close session
			session.close();
			return accountList;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
