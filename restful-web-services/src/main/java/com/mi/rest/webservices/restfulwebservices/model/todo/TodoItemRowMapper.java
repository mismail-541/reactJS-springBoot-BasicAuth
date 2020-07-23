package com.mi.rest.webservices.restfulwebservices.model.todo;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class TodoItemRowMapper implements RowMapper<TodoItem> {

	@Override
	public TodoItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		TodoItem todoItem = new TodoItem();
		
		todoItem.setId(rs.getLong(1));
		todoItem.setDescription(rs.getString(2));
		todoItem.setDone(rs.getBoolean(3));
		todoItem.setUser(rs.getString(4));
		todoItem.setTargetDate(rs.getDate(5));
		
		
		return todoItem;
	}

}
