package edu;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.NotFoundException;

public class CustomerRepo {
	
	private static CustomerRepo repo;
	private static final Map<String, Customer> CUSTOMER_DATABASE;
	private static Integer INDEX = 0;
	
	static {
		CUSTOMER_DATABASE = new HashMap<String, Customer>();
	}
	
	private CustomerRepo(){}
	
	public static CustomerRepo getInstance(){
		if (repo == null){
			System.out.println("----- INITIALIZING CUSTOMER REPOSITORY ----");
			repo = new CustomerRepo();
		}
		return repo;
	}
	
	public Integer create(Customer customer){
		INDEX ++;
		customer.setId(INDEX.toString());
		CUSTOMER_DATABASE.put(INDEX.toString(), customer);
		return INDEX;		
	}
	
	public void update(String index, Customer customer){
		Customer exist = CUSTOMER_DATABASE.replace(index, customer);
		if (exist == null){
			throw new NotFoundException(); 
		}				
	}
	
	public void delete(String index){
		Customer exist = CUSTOMER_DATABASE.remove(index);
		if (exist == null){
			throw new NotFoundException(); 
		}				
	}
	
	public Customer find(String index){
		Customer exist = CUSTOMER_DATABASE.get(index);
		if (exist == null){
			throw new NotFoundException(); 
			
		}
		return exist;
	}
	
	public SearchResult list(){		 
		return new SearchResult(CUSTOMER_DATABASE.values(), CUSTOMER_DATABASE.size());
	}
	

}
