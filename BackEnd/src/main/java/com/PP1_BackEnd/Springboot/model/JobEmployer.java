package com.PP1_BackEnd.Springboot.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity@Table(name = "AllJobs")

public class JobEmployer {
	
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
	  private long id;

	  @Column(name = "Job_Title")
	  private String jobTitle;

	  @Column(name = "Location")
	  private String location;

	  @Column(name = "Work_Type")
	  private String workType;

	  @Column(name = "Pay_Type")
	  private String payType;

	  @Column(name = "Minimum_Pay")
	  private String payMinimum;

	  @Column(name = "Maximum_Pay")
	  private String payMaximum;
	  
	  
	  @Column(name = "Pay_Information")
	  private String payInfo;
	  
	  @Column(name = "Category")
	  private String category;
	  
	  @Column(name = "Job_Description")
	  private String jobDescription;
	  
	  @Column(name = "Employer_UserName")
	  private String employerUsername;
	  


	 
	  public String getEmployerUsername() {
		return employerUsername;
	}

	public void setEmployerUsername(String employerUsername) {
		this.employerUsername = employerUsername;
	}

	public JobEmployer(String jobTitle, String location, String workType, String payType, String payMinimum,
			String payMaximum, String payInfo, String category, String jobDescription, String employerUsername) {
		super();
		this.jobTitle = jobTitle;
		this.location = location;
		this.workType = workType;
		this.payType = payType;
		this.payMinimum = payMinimum;
		this.payMaximum = payMaximum;
		this.payInfo = payInfo;
		this.category = category;
		this.jobDescription = jobDescription;
		this.employerUsername = employerUsername;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getWorkType() {
		return workType;
	}

	public void setWorkType(String workType) {
		this.workType = workType;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getPayMinimum() {
		return payMinimum;
	}

	public void setPayMinimum(String payMinimum) {
		this.payMinimum = payMinimum;
	}

	public String getPayMaximum() {
		return payMaximum;
	}

	public void setPayMaximum(String payMaximum) {
		this.payMaximum = payMaximum;
	}

	public String getPayInfo() {
		return payInfo;
	}

	public void setPayInfo(String payInfo) {
		this.payInfo = payInfo;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	
	
	
	

}
