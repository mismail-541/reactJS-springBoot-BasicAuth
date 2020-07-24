package com.mi.rest.webservices.restfulwebservices.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	BCryptPasswordEncoder bCryptEncoder;
	
	private static final String GET_USERS_SQL = "SELECT username, password, enabled from users where username = ?";
	
	private static final String GET_USER_AUTHORITIES_SQL = "SELECT u.username, a.authority FROM user_authorities a, users u WHERE u.username = ? AND u.id = a.user_id";
	
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
	
		auth
		.jdbcAuthentication()		
		.usersByUsernameQuery(GET_USERS_SQL)
		.authoritiesByUsernameQuery(GET_USER_AUTHORITIES_SQL)
		.dataSource(dataSource)
		.passwordEncoder(bCryptEncoder).rolePrefix("ROLE_");;
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		//return NoOpPasswordEncoder.getInstance();
		return new BCryptPasswordEncoder();
	}
	
	//Authorization:
	@Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                //HTTP Basic authentication
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/todo-app/userOnly").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/todo-app/todos/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/todo-app/adminOnly").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                //.and()
                //.csrf().disable()
                ;
    }

}
