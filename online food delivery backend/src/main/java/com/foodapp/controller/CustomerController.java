package com.foodapp.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodapp.model.Customer;
import com.foodapp.repository.CustomerRepository;
import com.foodapp.service.CustomerService;

import jakarta.validation.Valid;


@CrossOrigin(origins = "http://localhost:4200")
@RestController // is controller which provides different end points to access the services
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	
	 public CustomerController(CustomerService customerService) { super();
	  this.customerService = customerService; }
	 

//Register
	//http://localhost:8084/register
	@PostMapping("/register")
	public ResponseEntity<Customer> saveCustomer(@Valid @RequestBody Customer customer) {
		return new ResponseEntity<Customer>(customerService.saveCustomer(customer), HttpStatus.CREATED);
	}

//Login
	@PostMapping("/login")
	public ResponseEntity<Customer> loginCustomer(@RequestBody Customer customer) {
		return new ResponseEntity<Customer>(customerService.loginCustomer(customer), HttpStatus.OK);
	}

//Update Customer	
	@PutMapping("customer/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long customerId, @RequestBody Customer customer) {
		return new ResponseEntity<Customer>(customerService.updateCustomer(customer, customerId), HttpStatus.OK);
	}

//Get All Customer	
	@GetMapping()
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	// get customer by email
	@PostMapping("/forgotpassword")
	public Customer getCustomerByEmail(@RequestBody Customer customer) {
		return customerService.getCustomerByEmail(customer);
	}

	// get customer by id
	@GetMapping("customer/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("id") long customerId) {
		return new ResponseEntity<Customer>(customerService.getCustomerById(customerId), HttpStatus.OK);
	}

//Delete Customer	
	@DeleteMapping("customer/{id}")
	public ResponseEntity<Boolean> deleteCustomer(@PathVariable("id") long customerId) {
		customerService.deleteCustomer(customerId);
		boolean flag = true;
		return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
	}
	
	@PostMapping("/{cid}/{newpassword}")
	public Customer changeCustomerPassword(@PathVariable("cid") long cid,@PathVariable("newpassword") String newpassword) {
		//return customerService.getCustomerByEmail(customer);
		Customer c=customerService.getCustomerById(cid);
		c.setPassword(newpassword);
		customerService.updateCustomer(c, cid);
		return c;
	}
}