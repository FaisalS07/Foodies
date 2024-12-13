package com.foodapp.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;


@Entity
@Table(name="payment_table")
@SequenceGenerator(name = "generator5", sequenceName = "gen5", initialValue = 100)
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator5")
	@Column(name = "payment_id")
private long paymentId;
	

@Column(name="total_price")
private  double totalPrice;

@Column(name="order_id",unique=true)
private  long orderId;


@Column(name = "paid_date")
private LocalDate PaidDate;

@Column(name = "paid_amount", nullable = false)
private double paidAmount;

//@Column(name="paid_date")
//private Date paidDate;

@ManyToOne( cascade=CascadeType.MERGE)
@JoinColumn(name="customer__id")
@JsonIgnore
private Customer customer;

public Payment()
{
  }

public long getPaymentId() {
	return paymentId;
}

public void setPaymentId(long paymentId) {
	this.paymentId = paymentId;
}



public double getTotalPrice() {
	return totalPrice;
}

public void setTotalPrice(double totalPrice) {
	this.totalPrice = totalPrice;
}

public long getOrderId() {
	return orderId;
}

public void setOrderId(long orderId) {
	this.orderId = orderId;
}

public LocalDate getPaidDate() {
	return PaidDate;
}

public void setPaidDate(LocalDate paidDate) {
	PaidDate = paidDate;
}

public Customer getCustomer() {
	return customer;
}

public void setCustomer(Customer customer) {
	this.customer = customer;
}



public double getPaidAmount() {
	return paidAmount;
}

public void setPaidAmount(double paidAmount) {
	this.paidAmount = paidAmount;
}

@Override
public String toString() {
	return "Payment [paymentId=" + paymentId + ", totalPrice=" + totalPrice + ", orderId=" + orderId +
			 "PaidDate=" + PaidDate + ", paidAmount=" + paidAmount + ", customer=" + customer + "]";
}








}