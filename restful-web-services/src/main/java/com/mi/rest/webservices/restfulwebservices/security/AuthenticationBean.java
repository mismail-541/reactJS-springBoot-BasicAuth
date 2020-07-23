package com.mi.rest.webservices.restfulwebservices.security;

public class AuthenticationBean {

	private String authenticationMessage;

	public AuthenticationBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AuthenticationBean(String authenticationMessage) {
		super();
		this.authenticationMessage = authenticationMessage;
	}

	public String getAuthenticationMessage() {
		return authenticationMessage;
	}

	public void setAuthenticationMessage(String authenticationMessage) {
		this.authenticationMessage = authenticationMessage;
	}
}
