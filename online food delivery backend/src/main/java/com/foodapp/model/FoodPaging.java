package com.foodapp.model;

import java.util.List;

public class FoodPaging {

	private List<Food> food;
	private long totalFood;
	
	public List<Food> getFood() {
		return food;
	}
	public void setFood(List<Food> food) {
		this.food = food;
	}
	
	public long getTotalFood() {
		return totalFood;
	}
	public void setTotalFood(long totalFood) {
		this.totalFood = totalFood;
	} 
}
