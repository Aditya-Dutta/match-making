package com.PP1_BackEnd.Springboot.repository;

import java.util.List; 

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.PP1_BackEnd.Springboot.model.JobEmployer;

@Repository
public interface JobSeekerRepo extends JpaRepository < JobEmployer, Long > {

	@Query(value = "SELECT * FROM JobEmployer", nativeQuery = true)
	List<JobEmployer> getAllJobs();
	
//	@Query(value = "SELECT * FROM Bookings WHERE  Name = :name AND status='confirmed'", nativeQuery = true)
//	  List < Booking > confirmedWork(@Param("name") String name);
//
//	  @Transactional
//	  @Modifying
//	  @Query(value = "UPDATE Bookings SET status = 'confirmed' WHERE id= :id", nativeQuery = true)
//	  void approveBooking(@Param("id") long id);

	  
	  
}
