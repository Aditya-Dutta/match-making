package com.PP1_BackEnd.Springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PP1_BackEnd.Springboot.model.Profile;

public interface ProfileRepo extends JpaRepository < Profile, Long > {

}
