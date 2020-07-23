package com.mi.rest.webservices.restfulwebservices.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	/**
	 * Specify authentication scheme:
	 * 
	 * 1. In memory
	 * 2. JDBC
	 * 3. LDAP
	 * 
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		 auth.inMemoryAuthentication()
         .withUser("user").password("123").roles("USER")
         .and()
         .withUser("admin").password("password").roles("ADMIN");
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
	//Authorization:
	@Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                //HTTP Basic authentication
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers(HttpMethod.GET, "/todo-app/userOnly").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/todo-app/todos/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/todo-app/adminOnly").hasRole("ADMIN")
                .and()
                .csrf().disable();
    }

}
