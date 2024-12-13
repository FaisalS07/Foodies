package com.foodapp.serviceimplementation;

import java.util.ArrayList;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.model.Category;
import com.foodapp.model.Food;
import com.foodapp.model.FoodPaging;
import com.foodapp.repository.FoodRepository;
import com.foodapp.service.FoodService;


@Service
public class FoodServiceImpl  implements FoodService{
	@Autowired
	private FoodRepository foodRepository;
		
	@Override
	public Food addFood(Food food) {
		System.out.println("Food added Succesfully "+food);
		food.setFoodname(food.getFoodname());
		food.setQuantity(food.getQuantity());
		food.setMrpPrice(food.getMrpPrice());
		food.setDescription(food.getDescription());
		return foodRepository.save(food);
	}
	
	@Override
	public Food updateFood(Food food,long foodId) {
		Food existingFood = foodRepository.findById(foodId).orElseThrow(()->new ResourceNotFoundException("food","foodId",foodId));
		existingFood.setFoodname(food.getFoodname());
		//existingFood.setPrice(food.getPrice());
		existingFood.setMrpPrice(food.getMrpPrice());
		existingFood.setImage(food.getImage());
		existingFood.setDescription(food.getDescription());
		existingFood.setQuantity(food.getQuantity());
		//existingFood.setCartId(food.getCartId());
		foodRepository.save(existingFood);
		return existingFood;	
	}

	@Override
	public void deleteFood(long foodId) {
		foodRepository.findById(foodId).orElseThrow(()->new ResourceNotFoundException("food","Id",foodId));
		foodRepository.deleteById(foodId);	
	}

	@Override
	public List<Food> getAllFoods() {
		// TODO Auto-generated method stub
		return foodRepository.findAll();
	}

	@Override
	public Food getFoodById(long foodId) {
		// TODO Auto-generated method stub
		return foodRepository.findById(foodId).orElseThrow(()->new ResourceNotFoundException("Food","Id",foodId));
	}

	@Override
	public List<Food> findByCategory(Category category) {
		// TODO Auto-generated method stub
		return foodRepository.findByCategory(category);
		//return foodRepository.findById(foodId).orElseThrow(()->new ResourceNotFoundException("Food","Id",foodId));
	}
	
	@Override
	public FoodPaging findByCategory(Category catgory, Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<Food> pageResult = foodRepository.findByCategory(catgory, paging);
		FoodPaging pr = new FoodPaging();
		pr.setTotalFood(pageResult.getTotalElements());
		if(pageResult.hasContent()) {
            pr.setFood(pageResult.getContent());
        } else {
        	 pr.setFood(new ArrayList<Food>());
        }
		return pr;
	}
	
	@Override
	public FoodPaging getAllFoods(Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<Food> pageResult = foodRepository.findAll(paging);
		FoodPaging pr = new FoodPaging();
		pr.setTotalFood(pageResult.getTotalElements());
		System.out.println(">>>>>"+ pageResult.getTotalPages());
		if(pageResult.hasContent()) {
            pr.setFood(pageResult.getContent());
        } else {
        	 pr.setFood(new ArrayList<Food>());
        }
		return pr;
	}
	
	@Override
	public List<Food> findByMrpPrice(double mrpPrice) {
		// TODO Auto-generated method stub
		return foodRepository.findByMrpPrice(mrpPrice);
	}
}