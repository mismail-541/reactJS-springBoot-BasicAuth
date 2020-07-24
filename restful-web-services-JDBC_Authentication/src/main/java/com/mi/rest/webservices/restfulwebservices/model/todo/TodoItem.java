package com.mi.rest.webservices.restfulwebservices.model.todo;

import java.util.Date;

public class TodoItem {

	private long id;
	private String description;
	private boolean done;
	private Date targetDate;
	private String user;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public TodoItem(long id, String description, boolean done, Date targetDate,String user) {
		super();
		this.id = id;
		this.description = description;
		this.done = done;
		this.targetDate = targetDate;
		this.user = user;
	}

	public TodoItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "TodoItem [id=" + id + ", description=" + description + ", done=" + done + ", targetDate=" + targetDate
				+ ", user=" + user + "]";
	}
}
