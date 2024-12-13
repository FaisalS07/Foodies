package com.foodapp.service;

import java.util.List;

import com.foodapp.model.Category;
import com.foodapp.model.Food;
import com.foodapp.model.FoodPaging;


public interface FoodService {
		Food addFood(Food food);
	    List<Food> getAllFoods();
		Food getFoodById(long foodId);
		Food updateFood(Food food, long foodId);
		void deleteFood(long foodId);
		List<Food> findByCategory(Category category);
		FoodPaging findByCategory(Category category, Integer pageNo, Integer pageSize);
		FoodPaging getAllFoods(Integer pageNo, Integer pageSize);
		List<Food> findByMrpPrice(double mrpPrice);
	}

