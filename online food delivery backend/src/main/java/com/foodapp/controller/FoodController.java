package com.foodapp.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodapp.model.Category;
import com.foodapp.model.Food;
import com.foodapp.model.FoodPaging;
import com.foodapp.service.FoodService;

import jakarta.validation.Valid;





@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/food")
public class FoodController {
	
	@Autowired
	private FoodService foodService;

	
	//to add food to cart
		@PostMapping("/addfood")
		public ResponseEntity<Food> addFood(@Valid @RequestBody Food food) {

			return new ResponseEntity<Food>(foodService.addFood(food), HttpStatus.CREATED);
		}

		// to get all food
		@GetMapping
		public List<Food> getAllFoods() {
			return foodService.getAllFoods();
		}

		// to get food by cart id
		@GetMapping("food/{foodId}")
		public ResponseEntity<Food> getFoodById(@PathVariable("foodId") long foodId) {
			return new ResponseEntity<Food>(foodService.getFoodById(foodId), HttpStatus.OK);
		}

		// to update food
		@PutMapping("{foodId}")
		public ResponseEntity<Food> updateFood(@Valid @PathVariable("foodId") long foodId, @RequestBody Food food) {
			return new ResponseEntity<Food>(foodService.updateFood(food, foodId), HttpStatus.OK);
		}

		@DeleteMapping("{foodId}")
		public ResponseEntity<Boolean> deleteFood(@PathVariable("foodId") long foodId) {
			foodService.deleteFood(foodId);
			boolean flag = true;
			return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
		}
		
		@GetMapping("/{categoryId}")
		public List<Food> getAllFoodsByCategory(@PathVariable("categoryId") int categoryId) {
			Category c = Category.valueOf(categoryId);
			return foodService.findByCategory(c);
		}
		
		@GetMapping("/{categoryId}/{pageNo}/{pageSize}")
		public FoodPaging getAllFoodByCategory(@PathVariable("categoryId") int categoryId, @PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
			Category c = Category.valueOf(categoryId);
			return foodService.findByCategory(c, pageNo, pageSize);
		}
		
		@GetMapping("/{pageNo}/{pageSize}")
		public FoodPaging getAllFoods(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
			return foodService.getAllFoods(pageNo, pageSize);
		}
		
		@GetMapping("/mrp/{mrpPrice}")
		public List<Food> getByMRPPrice(@PathVariable("mrpPrice") double mrpPrice) {
			return foodService.findByMrpPrice(mrpPrice);
		}

}
