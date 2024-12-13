package com.foodapp.model;

import java.util.HashMap;
import java.util.Map;

public enum Category {
	IceCreams(0),
	Starters(1),
    Desserts(2),
    SoftDrinks(3),
    Chinese(4),
    Pizza(5),
    Burgers(6),
    ColdCoffee(7),
    Cakes(8),
	Mocktails(9),
	Juices(10),
	Momos(11),
	Thali(12),
	Frankie(13),
	Shawarma(14);
	
    private int value;
    private static Map map = new HashMap<>();

    private Category(int value) {
        this.value = value;
    }

    static {
        for (Category category : Category.values()) {
            map.put(category.value, category);
        }
    }

    public static Category valueOf(int category) {
        return (Category) map.get(category);
    }

    public int getValue() {
        return value;
    }
}
