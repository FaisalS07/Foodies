package com.foodapp.repository;


import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.model.Category;
import com.foodapp.model.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long>, PagingAndSortingRepository<Food, Long> {
	public List<Food> findByFoodId(long foodId);
	// public Product updateProduct(long ProductId);
	public List<Food> findByCategory(Category category);
	public Page<Food> findByCategory(Category category, Pageable page);
	@Query("select f from Food f where f.mrpPrice = :mrpPrice")
	public List<Food> findByMrpPrice(double mrpPrice);
}