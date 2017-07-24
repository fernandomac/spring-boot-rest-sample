package edu;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Customer {
	
	private String id;
	private String name;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthday;
	private Integer age;
	private BigDecimal salary;
	
	public Customer(){}
	
	public Customer(String name, Date birthday, Integer age, BigDecimal salary) {
		super();
		this.name = name;
		this.birthday = birthday;
		this.age = age;
		this.salary = salary;
	}	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	

	public Date getBirthday() {
		return birthday;
	}
	
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	
	public Integer getAge() {
		return age;
	}
	
	public void setAge(Integer age) {
		this.age = age;
	}
	
	public BigDecimal getSalary() {
		return salary;
	}
	
	public void setSalary(BigDecimal salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "Customer [name=" + name + ", birthday=" + birthday + ", age=" + age + ", salary=" + salary + "]";
	}
	
	

}
