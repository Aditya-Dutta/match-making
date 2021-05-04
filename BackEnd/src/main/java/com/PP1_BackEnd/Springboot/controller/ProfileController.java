package com.PP1_BackEnd.Springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PP1_BackEnd.Springboot.model.Profile;
import com.PP1_BackEnd.Springboot.service.ProfileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/seeker/profile")
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	
	@PostMapping("/details")
	 public void getByCategory(@RequestBody Profile info){
		  profileService.saveProfile(info);
	 }

}

