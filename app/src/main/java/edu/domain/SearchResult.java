package edu.domain;

import java.util.Collection;

public class SearchResult {
	
	private Collection<Customer> list;
	private Integer count;
	
	public SearchResult(Collection<Customer> list, Integer count) {
		super();
		this.list = list;
		this.count = count;
	}
	public Collection<Customer> getList() {
		return list;
	}
	public void setList(Collection<Customer> list) {
		this.list = list;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
	

}
