package com.mi.rest.webservices.restfulwebservices.model.todo;

import java.util.Date;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		String toRepeat = "TodoItem todo1 = new TodoItem();\r\n" + 
				"		todo1.setId(1);\r\n" + 
				"		todo1.setDescription(\"aaa\");\r\n" + 
				"		todo1.setDone(false);\r\n" + 
				"		todo1.setTargetDate(new Date());";
		
		for(int i=2;i<=9;i++)
		{
			String tempRepeat = toRepeat;
			
			tempRepeat = tempRepeat.replaceAll("1", String.valueOf(i));
			System.out.println(tempRepeat+"\n\n");
		}
		
	}

}
