package com.foodapp.serviceimplementation;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.model.Customer;
import com.foodapp.repository.CustomerRepository;
import com.foodapp.service.CustomerService;


@Service
public class CustomerServiceImpl implements CustomerService{
	@Autowired
private CustomerRepository customerRepository;
	
	public CustomerServiceImpl(CustomerRepository customerRepository) {
		super();
		this.customerRepository = customerRepository;
	}

	@Override
	public Customer getCustomerById(long customerId) {
		
		return customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Customer","Id",customerId));
	}

	@Override
	public Customer saveCustomer(Customer customer) {
		
		return customerRepository.save(customer);
	}
	@Override
	public Customer loginCustomer(Customer customer) {
		
		return this.customerRepository.findByEmailIDAndPassword(customer.emailID,customer.password).orElseThrow(()->new ResourceNotFoundException("Customer ", "Id",customer.emailID+" and password "+customer.password ));
	}
	public Customer getCustomerByEmail(Customer customer)
	{
		return this.customerRepository.findByEmailID(customer.emailID).orElseThrow(()->new ResourceNotFoundException("Customer ", "Email",customer.emailID ));
	}

	@Override
	public Customer updateCustomer(Customer customer,long customerId) {
	
	Customer existingCustomer=customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Customer","Id",customerId));	
	existingCustomer.setFirstName(customer.getFirstName());
	existingCustomer.setLastName(customer.getLastName());
	existingCustomer.setDateOfBirth(customer.getDateOfBirth());
	existingCustomer.setDistrict(customer.getDistrict());
	existingCustomer.setPhoneNumber(customer.getPhoneNumber());
	existingCustomer.setState(customer.getState());
	existingCustomer.setZipCode(customer.getZipCode());
	existingCustomer.setEmailID(customer.getEmailID());
	existingCustomer.setPassword(customer.getPassword());
	customerRepository.save(existingCustomer);
	return existingCustomer;
	}

	@Override
	public List<Customer> getAllCustomers() {
	
		return customerRepository.findAll();
	}

	@Override
	public void deleteCustomer(long customerId) {
		customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Customer","Id",customerId));
		customerRepository.deleteById(customerId);
		
	}
}