package edu.rest.resources;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import edu.domain.Customer;
import edu.domain.SearchResult;
import edu.repo.CustomerRepo;

@Path("/customer")
public class CustomerRest {
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
    public Integer create(Customer customer) {
    	return CustomerRepo.getInstance().create(customer);    	
    }
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public void create(@PathParam("id") String index, Customer customer) {
    	CustomerRepo.getInstance().update(index, customer);    	
    }
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public void update(@PathParam("id") String index) {
    	CustomerRepo.getInstance().delete(index);    	
    }
	
	@GET
	@Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Customer find(@PathParam("id") String index) {
    	return CustomerRepo.getInstance().find(index);
    	
    }
	
	@GET	
    @Produces(MediaType.APPLICATION_JSON)
    public SearchResult list() {
    	return CustomerRepo.getInstance().list();    	
    }

}
