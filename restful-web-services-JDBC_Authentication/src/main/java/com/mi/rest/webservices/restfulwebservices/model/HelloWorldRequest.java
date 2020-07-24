package com.mi.rest.webservices.restfulwebservices.model;

public class HelloWorldRequest {
	private String helloWorldRequest;

	public String getHelloWorldRequest() {
		return helloWorldRequest;
	}

	public void setHelloWorldRequest(String helloWorldRequest) {
		this.helloWorldRequest = helloWorldRequest;
	}

	public HelloWorldRequest(String helloWorldRequest) {
		super();
		this.helloWorldRequest = helloWorldRequest;
	}

	public HelloWorldRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "HelloWorldRequest [helloWorldRequest=" + helloWorldRequest + "]";
	}

}
