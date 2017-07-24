package edu;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/customer", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class CustomerRest {
	
	
	@PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Integer create(@RequestBody Customer customer) {
    	return CustomerRepo.getInstance().create(customer);    	
    }
	
	
	@PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void create(@PathVariable String id, @RequestBody Customer customer) {
    	CustomerRepo.getInstance().update(id, customer);    	
    }
	
	
	@DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void update(@PathVariable  String id) {
    	CustomerRepo.getInstance().delete(id);    	
    }
	
	
	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Customer find(@PathVariable String id) {
    	return CustomerRepo.getInstance().find(id);
    	
    }
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
    public SearchResult list() {
    	return CustomerRepo.getInstance().list();    	
    }

}
