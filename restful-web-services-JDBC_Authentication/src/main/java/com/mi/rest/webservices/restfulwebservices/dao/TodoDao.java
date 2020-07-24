package com.mi.rest.webservices.restfulwebservices.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.mi.rest.webservices.restfulwebservices.model.todo.TodoItem;
import com.mi.rest.webservices.restfulwebservices.model.todo.TodoItemRowMapper;

@Repository
public class TodoDao {

	@Autowired
	JdbcTemplate jdbcTemplate;

	private static String todoRowTest_SQL = "select id,description,done,user_name,target_date from public.todos where user_name=?";

	private static String TODOS_BY_USERNAME_SQL = "select id,description,done,user_name,target_date from public.todos where user_name=?";

	private static String GET_TODO_BY_USERNAME_AND_TODO_ID_SQL = "select id,description,done,user_name,target_date from public.todos where user_name=? and id=?";

	private static String UPDATE_TODO_BY_USERNAME_AND_TODO_ID_SQL = "update public.todos \r\n" + "	   set \r\n"
			+ "	      description = ?,\r\n" + "		  done = ?,\r\n" + "		  target_date = ? \r\n"
			+ "	 where id=? \r\n" + "	   AND user_name=?";

	private static String DELETE_TODO_BY_TODO_ID_SQL = "delete from public.todos where id=?";

	private static String ADD_NEW_TODO_SQL = "INSERT INTO public.todos(\r\n"
			+ "	id, description, done, user_name, target_date)\r\n"
			+ "	VALUES (nextval('TODOS_ID_SEQ'), ?, false, ?, ?)";

	public TodoItem getTodoRowTest() {

		TodoItem todoItem = jdbcTemplate.queryForObject(todoRowTest_SQL, new Object[] { "user" },
				new TodoItemRowMapper());

		System.out.println("######## todoItem = " + todoItem.toString());

		return todoItem;
	}

	public List<TodoItem> getTodoItemsByUser(String userName) {

		List<TodoItem> todosByUser = new ArrayList<TodoItem>();

		todosByUser = jdbcTemplate.query(TODOS_BY_USERNAME_SQL, new Object[] { userName }, new TodoItemRowMapper());

		return todosByUser;
	}

	public TodoItem getTodoItemByUserAndId(String username, long todoItemId) {

		TodoItem todoItem = new TodoItem();

		todoItem = jdbcTemplate.queryForObject(GET_TODO_BY_USERNAME_AND_TODO_ID_SQL,
				new Object[] { username, todoItemId }, new TodoItemRowMapper());

		return todoItem;
	}

	public TodoItem updateTodoItem(TodoItem todoItem) {

		jdbcTemplate.update(UPDATE_TODO_BY_USERNAME_AND_TODO_ID_SQL, new Object[] { todoItem.getDescription(),
				todoItem.isDone(), todoItem.getTargetDate(), todoItem.getId(), todoItem.getUser() });

		return todoItem;
	}

	public void deleteTodoItemById(long todoItemId) {
		// TODO Auto-generated method stub
		jdbcTemplate.update(DELETE_TODO_BY_TODO_ID_SQL, todoItemId);

	}

	public void addTodoItem(TodoItem todoItem) {
		try {
			jdbcTemplate.update(ADD_NEW_TODO_SQL,
					new Object[] { todoItem.getDescription(), todoItem.getUser(), todoItem.getTargetDate() });

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
