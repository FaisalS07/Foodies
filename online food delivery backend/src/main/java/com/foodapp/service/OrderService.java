package com.foodapp.service;

import java.util.List;
import com.foodapp.model.Order;
import com.foodapp.model.TransactionDetails;


public interface OrderService {
	Order addOrder(Order order, long customerId, long cartId);

	Order getOrderById(long orderId);

	Order updateOrder(Order order, long orderId);

	List<Order> getOrderByCustomerId(long customerId);

	List<Order> getAllOrders();
	
	Order addOrderItem(Order order,long customerId);
	
	void deleteOrder(long orderId);
	
	TransactionDetails createTransaction(Double amount);
}