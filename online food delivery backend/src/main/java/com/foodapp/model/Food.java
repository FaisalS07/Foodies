package com.foodapp.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;



@Entity
@Table(name="food_table")
@NamedQuery(name = "Food.findByMrpPrice", query = "select f from Food f where f.mrpPrice = :mrpPrice")
@SequenceGenerator(name = "generator2", sequenceName = "gen2", initialValue = 5000)
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator2")
	@Column(name="food_id")
	private long foodId;
	
	@NotEmpty(message = "Food name is required.")
    @Column(name = "foodname", nullable = false, length = 20)
	private String foodname;

	@Column(name="food_image")
	@NotEmpty
	private String image;

	//@NotEmpty(message = "Product description is required.")
	@Column(name = "description", nullable = false)
	private String description;	
	
	@Column(name = "mrp_price", nullable = false, precision = 10)
    private double mrpPrice;
	
//	//@Size(min = 2, max = 10)
//		@Column(name = "price", nullable = false, precision = 10, scale = 2)
//	    private double price;
//	
	@Column(name = "quantity")
	private long quantity;
	
//	@Column(name = "cart_id")
//	private long cartId;
	
	private Category category;
	
//	@Column(name = "brand")
//	private String brand;
	

public Food() {
		
	}

	public long getFoodId() {
		return foodId;
	}

	public void setFoodId(long foodId) {
		this.foodId = foodId;
	}

	public String getFoodname() {
		return foodname;
	}

	public void setFoodname(String foodname) {
		this.foodname = foodname;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getMrpPrice() {
		return mrpPrice;
	}

	public void setMrpPrice(double mrpPrice) {
		this.mrpPrice = mrpPrice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


	@Override
	public String toString() {
		return "Food [foodId=" + foodId + ", foodname=" + foodname + ", description=" + description
				+ ", mrpPrice=" + mrpPrice + ", quantity=" + quantity + "]";
	}

}