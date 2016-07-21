package com.dialog.hsbc.controllers;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dialog.hsbc.dto.DialogDTO;
import com.dialog.hsbc.services.HSBCDialogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class HSBCDialogController {

	@Autowired
	HSBCDialogService hsbcDialogService;
	
	@RequestMapping(value="clientVerify",method=RequestMethod.GET)
	@ResponseBody
	public String helloWorld(HttpServletRequest request, HttpServletResponse response)
	{
		String clientMSG = request.getParameter("clientMSG");
		System.out.println(request.getQueryString()+"............"+request.getContextPath());
		ObjectMapper mapper = new ObjectMapper();
		DialogDTO dialogDTO = new DialogDTO();
		try
		{
			dialogDTO = mapper.readValue(clientMSG, DialogDTO.class);
			System.out.println("Client Request:");
			System.out.println(dialogDTO);
		} 
		catch (IOException e1) {
			e1.printStackTrace();
		}
		System.out.println(clientMSG);
		DialogDTO responseDTO = hsbcDialogService.getNextDialog(dialogDTO);
		String responseMSG="";
		try {
			responseMSG = mapper.writeValueAsString(responseDTO);
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}
		
		
		System.out.println("Response String:" +responseMSG);
		/*String responseMSG="";
		if(dialogDTO.getInput()==null||"".equals(dialogDTO.getInput()))
		{
			responseMSG=jsonInString;
		}
		else
		{
			
			try {
				Thread.sleep(5000);
			}
			catch (InterruptedException e)
			{
				e.printStackTrace();
			}
			
			responseMSG=jsonInString;
		}*/
		return responseMSG;
	}
	@PostConstruct
	protected void iamAlive(){
		System.out.println("inside controller");
	}
}
