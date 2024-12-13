package com.foodapp.serviceimplementation;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.model.Customer;
import com.foodapp.model.Order;
import com.foodapp.model.Payment;
import com.foodapp.repository.OrderRepository;
import com.foodapp.repository.PaymentRepository;
import com.foodapp.service.CustomerService;
import com.foodapp.service.FoodService;
import com.foodapp.service.OrderService;
import com.foodapp.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private OrderService orderService;

	public PaymentServiceImpl(PaymentRepository paymentRepository, FoodService foodService,
			CustomerService customerService, OrderService orderService) {
		super();
		this.paymentRepository = paymentRepository;

		this.customerService = customerService;
		this.orderService = orderService;

	}

	@Override
	public Payment addPayment(Payment payment, long orderId, long customerId) {

		// TODO Auto-generated method stub
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "orderId", orderId));
		System.out.println("****************" + order.getOrderId());
		payment.setOrderId(orderId);
		payment.setTotalPrice(order.getTotalPrice());
		payment.setPaidDate(LocalDate.now());
		payment.setPaidAmount(order.getTotalPrice());
		if (payment.getTotalPrice() == payment.getPaidAmount()) {
			order.setPaymentStatus("PAID");
			order.setOrderStatus("Delivered");
		} else {

			order.setPaymentStatus("NOT-PAID");
			order.setOrderStatus("payment pending");
		}
		Customer customer = customerService.getCustomerById(customerId);

		payment.setCustomer(customer);

		// return paymentRepository.save(payment);

		return paymentRepository.save(payment);

	}
	// order = orderService.getOrderById(orderId);
	// payment.setOrderId(order.getOrderId());
	// payment.setTotalPrice(payment.getTotalPrice());
	// payment.setPaidDate(payment.getPaidDate());

	@Override
	public List<Payment> getAllPayments() {
		return paymentRepository.findAll();
	}

	@Override
	public List<Payment> getAllPaymentsByCustomerId(long customerId) {
		return paymentRepository.findByOrderId(customerId);
	}

	@Override
	public Payment getPaymentById(long paymentId) {

		return paymentRepository.findById(paymentId)
				.orElseThrow(() -> new ResourceNotFoundException("Payement", "Id", paymentId));
	}

	@Override
	public void deletePayment(long paymentId) {
		paymentRepository.findById(paymentId)
				.orElseThrow(() -> new ResourceNotFoundException("Payement", "Id", paymentId));
		paymentRepository.deleteById(paymentId);

	}

}