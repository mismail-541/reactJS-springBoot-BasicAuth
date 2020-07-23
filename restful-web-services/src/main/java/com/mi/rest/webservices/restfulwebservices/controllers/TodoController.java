package com.mi.rest.webservices.restfulwebservices.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mi.rest.webservices.restfulwebservices.dao.TodoDao;
import com.mi.rest.webservices.restfulwebservices.model.todo.TodoItem;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

	@Autowired
	TodoDao todoDao;

	/**
	 * Get all to-do items for a specific user.
	 * 
	 * @param userName
	 * @return
	 */
	@GetMapping("/todos/{userName}")
	public List<TodoItem> getAllTodos(@PathVariable String userName) {
		
		System.out.println("########### calling getAllTodos()... - Secure");

		List<TodoItem> todos = new ArrayList<TodoItem>();

		// get test data:
		// todos = generateTestDataTodoItemList();

		todos = todoDao.getTodoItemsByUser(userName);

		return todos;
	}

	/**
	 * Create mock data for the todo items list.
	 * 
	 * @return
	 */
	public List<TodoItem> generateTestDataTodoItemList() {
		List<TodoItem> todos = new ArrayList<TodoItem>();

		TodoItem todo1 = new TodoItem();
		todo1.setId(1);
		todo1.setDescription("Learn React");
		todo1.setDone(false);
		todo1.setTargetDate(new Date());
		todo1.setUser("user");

		TodoItem todo2 = new TodoItem();
		todo2.setId(2);
		todo2.setDescription("Learn Spring Boot with React");
		todo2.setDone(false);
		todo2.setTargetDate(new Date());
		todo2.setUser("user");

		TodoItem todo3 = new TodoItem();
		todo3.setId(3);
		todo3.setDescription("Spring Boot Security Revisited");
		todo3.setDone(false);
		todo3.setTargetDate(new Date());
		todo3.setUser("user");

		TodoItem todo4 = new TodoItem();
		todo4.setId(4);
		todo4.setDescription("stay positive");
		todo4.setDone(false);
		todo4.setTargetDate(new Date());
		todo4.setUser("user1");

		TodoItem todo5 = new TodoItem();
		todo5.setId(5);
		todo5.setDescription("Learn Docker 111 222 333");
		todo5.setDone(false);
		todo5.setTargetDate(new Date());
		todo5.setUser("user1");

		TodoItem todo6 = new TodoItem();
		todo6.setId(6);
		todo6.setDescription("Get Certification");
		todo6.setDone(false);
		todo6.setTargetDate(new Date());
		todo6.setUser("user1");

		TodoItem todo7 = new TodoItem();
		todo7.setId(7);
		todo7.setDescription("Spring Boot Security Revisited");
		todo7.setDone(false);
		todo7.setTargetDate(new Date());
		todo7.setUser("user1");

		TodoItem todo8 = new TodoItem();
		todo8.setId(8);
		todo8.setDescription("Learn Spring Cloud");
		todo8.setDone(false);
		todo8.setTargetDate(new Date());
		todo8.setUser("user1");

		TodoItem todo9 = new TodoItem();
		todo9.setId(9);
		todo9.setDescription("Finish the startup book");
		todo9.setDone(false);
		todo9.setTargetDate(new Date());
		todo9.setUser("user1");

		todos.add(todo1);
		todos.add(todo2);
		todos.add(todo3);
		todos.add(todo4);
		todos.add(todo5);
		todos.add(todo6);
		todos.add(todo7);
		todos.add(todo8);
		todos.add(todo9);

		return todos;
	}

	/**
	 * Add a new to-do item.
	 * 
	 * @param newTodoItem
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/add-todo")
	public String addTodo(@RequestBody TodoItem newTodoItem) throws Exception {
		System.out.println("######## Adding new to-do item:" + newTodoItem);

		
		todoDao.addTodoItem(newTodoItem);
		
		//throw new Exception("Testing error message"); 
		
		return null;
	}

	/**
	 * Get a specific to-do item for a specific user for purposes of editing or
	 * viewing details.
	 * 
	 * @param username
	 * @param todoItemId
	 * @return
	 */
	@GetMapping("/update-todo/{username}/{todoItemId}")
	public TodoItem getTodoItemByUsernameAndTodoId(@PathVariable String username, @PathVariable long todoItemId) {

		TodoItem todoItem = new TodoItem();

		todoItem = todoDao.getTodoItemByUserAndId(username, todoItemId);

		return todoItem;

	}

	/**
	 * Update a specific to-do item.
	 * 
	 * @param todoItem
	 */
	@PostMapping("/update-todo")
	public void updateTodoItemForUser(@RequestBody TodoItem todoItem) {
		
		System.out.println(" updating the item:"+todoItem);
		
		todoDao.updateTodoItem(todoItem);
	}

	/**
	 * Delete a to-do item.
	 * 
	 * @param todoItemId
	 */
	@PostMapping("/delete-todo/{todoItemId}")
	public void deleteTodoItem(@PathVariable long todoItemId) {
		todoDao.deleteTodoItemById(todoItemId);
	}

	@GetMapping("/testJdbc")
	public TodoItem testJdbc() throws Exception {
		TodoItem todoItem = todoDao.getTodoRowTest();
		
		

		return todoItem;
	}
	
	@GetMapping("/userOnly")
	public TodoItem getForUserOnly() {
		TodoItem todo9 = new TodoItem();
		todo9.setId(9);
		todo9.setDescription("USER role item");
		todo9.setDone(false);
		todo9.setTargetDate(new Date());
		todo9.setUser("user");
		
		return todo9;
	}
	
	@GetMapping("/adminOnly")
	public TodoItem getForAdminOnly() {
		TodoItem todo9 = new TodoItem();
		todo9.setId(9);
		todo9.setDescription("ADMIN role item");
		todo9.setDone(false);
		todo9.setTargetDate(new Date());
		todo9.setUser("admin");
		
		return todo9;
	}
}
