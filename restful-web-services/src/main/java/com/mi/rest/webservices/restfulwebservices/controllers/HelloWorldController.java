package com.mi.rest.webservices.restfulwebservices.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mi.rest.webservices.restfulwebservices.model.HelloWorldRequest;
import com.mi.rest.webservices.restfulwebservices.model.HelloWorldResponse;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {

	@GetMapping("/helloWorldSimple")
	public HelloWorldResponse helloWorldSimple()
	{
		return new HelloWorldResponse("Hello World! [SIMPLE]");
	}
	
	@PostMapping("/postHellowWorldSimple")
	public HelloWorldResponse postHelloWorldSimple(@RequestBody HelloWorldRequest newMessage) {
		
		System.out.println("helloWorldRequest="+newMessage.getHelloWorldRequest());
		
		return new HelloWorldResponse("post successfull: "+newMessage.getHelloWorldRequest());
	}
	
	@GetMapping("/helloWorldSimplePathVar/{requestId}")
	public HelloWorldResponse helloWorldSimplePathVar(@PathVariable String requestId)
	{
		System.out.println("HelloWorld get request with path variable="+requestId);
		return new HelloWorldResponse("Hello World! [PATH VARIABLE]=["+requestId+"]");
	}
	
	@GetMapping("/returnError")
	public HelloWorldResponse returnError() throws Exception {
		Exception ex = new Exception("An error occured! 123");
		throw ex;
	}
}
