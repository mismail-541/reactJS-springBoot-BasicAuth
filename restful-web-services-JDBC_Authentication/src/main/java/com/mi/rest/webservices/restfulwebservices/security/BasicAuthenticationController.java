package com.mi.rest.webservices.restfulwebservices.security;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

	@GetMapping("/basicAuth")
	public AuthenticationBean basicAuthenticationLogger() {
		
		return new AuthenticationBean("User Authenticated");
	}
	
}
