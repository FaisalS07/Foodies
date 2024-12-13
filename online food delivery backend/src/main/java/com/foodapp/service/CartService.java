package com.foodapp.service;

import java.util.List;

import com.foodapp.model.Cart;
import com.foodapp.model.Customer;

public interface CartService {

	Cart addCart(Cart cart,long productId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void placeCart(long cardId);
	void deleteCartByCustomer(Customer c);
	

}