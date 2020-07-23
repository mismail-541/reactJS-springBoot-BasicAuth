package com.mi.rest.webservices.restfulwebservices.model;

public class HelloWorldResponse {

	private String helloWorldResponse;

	public String getHelloWorldResponse() {
		return helloWorldResponse;
	}

	public void setHelloWorldResponse(String helloWorldResponse) {
		this.helloWorldResponse = helloWorldResponse;
	}

	public HelloWorldResponse(String helloWorldResponse) {
		super();
		this.helloWorldResponse = helloWorldResponse;
	}

	public HelloWorldResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "HelloWorldResponse [helloWorldResponse=" + helloWorldResponse + "]";
	}

}
