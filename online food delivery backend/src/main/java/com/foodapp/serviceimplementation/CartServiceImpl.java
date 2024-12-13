package com.foodapp.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.model.Cart;
import com.foodapp.model.Customer;
import com.foodapp.model.Food;
import com.foodapp.repository.CartRepository;
import com.foodapp.service.CartService;
import com.foodapp.service.CustomerService;
import com.foodapp.service.FoodService;




@Service
public class CartServiceImpl implements CartService {

	@Autowired
	public CartRepository cartRepository;

//	@Autowired
//	public FoodRepository foodRepository;

	@Autowired
	public FoodService foodService;

	@Autowired
	public CustomerService customerService;

	public CartServiceImpl(CartRepository cartRepository) {
		super();
		this.cartRepository = cartRepository;
	}

	@Override
	public Cart addCart(Cart cart, long foodId, long customerId) {

		Food food = foodService.getFoodById(foodId);
		Customer customer = customerService.getCustomerById(customerId);
		List<Cart> crl = this.getAllCarts();
		int flag = 0;
		Cart existingCart = null;
		if (crl.size() > 0) {
			for (int i = 0; i < crl.size(); i++) {
				Cart c = this.getCartById(crl.get(i).getCartId());
				if (c.getCustomer().getCustomerId() == customerId && c.getFood().getFoodId() == foodId) {
					flag = 1;
					existingCart = c;
				}
			}
		}
		food.setQuantity(food.getQuantity() - cart.getQuantity());
		if (flag == 1 && existingCart != null) {
			existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
			existingCart.setMrpPrice(food.getMrpPrice());
			existingCart.setCustomer(customer);
			System.out.println("111111111111111111111111111111111");
			return this.updateCart(existingCart, existingCart.getCartId());
		} else {
			cart.setFood(food);
			cart.setMrpPrice(food.getMrpPrice());
			cart.setCustomer(customer);
			System.out.println("2222222222222222222222222222222222222222");
			return cartRepository.save(cart);
		}
	}

	@Override
	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}

	@Override
	public Cart getCartById(long cartId) {

		return cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
	}

	@Override
	public Cart updateCart(Cart cart, long cartId) {
		Cart existingCart = cartRepository.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
		existingCart.setQuantity(cart.getQuantity());
		// existingCart.setPrice(cart.getPrice());
		existingCart.setMrpPrice(cart.getMrpPrice());
		// existingCart.setImage(cart.getImage());
		existingCart.setCartId(cart.getCartId());
		existingCart.setFood(cart.getFood());
		// existingCart.setCustomerId(cart.getCustomerId());
		existingCart.setCustomer(cart.getCustomer());
		cartRepository.save(existingCart);

		return existingCart;
	}

	@Override
	public void deleteCart(long cartId) {
		Cart existingCart = cartRepository.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
		Food food = foodService.getFoodById(existingCart.getFood().getFoodId());
		food.setQuantity(food.getQuantity() + existingCart.getQuantity());
		foodService.updateFood(food, food.getFoodId());
		//cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
		cartRepository.deleteById(cartId);

	}
	
	@Override
	public void placeCart(long cartId) {
		Cart existingCart = cartRepository.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
		Food food = foodService.getFoodById(existingCart.getFood().getFoodId());
		//food.setQuantity(food.getQuantity() + existingCart.getQuantity());
		foodService.updateFood(food, food.getFoodId());
		//cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart", "Id", cartId));
		cartRepository.deleteById(cartId);

	}


	@Override
	public void deleteCartByCustomer(Customer c) {
		cartRepository.deleteCartByCustomer(c);

	}

}