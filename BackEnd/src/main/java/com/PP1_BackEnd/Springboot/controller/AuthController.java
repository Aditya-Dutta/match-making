package com.PP1_BackEnd.Springboot.controller;
import java.util.HashSet;  
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.PP1_BackEnd.Springboot.model.ERole;
import com.PP1_BackEnd.Springboot.model.Role;
import com.PP1_BackEnd.Springboot.model.User;
import com.PP1_BackEnd.Springboot.payload.request.LoginRequest;
import com.PP1_BackEnd.Springboot.payload.request.SignupRequest;
import com.PP1_BackEnd.Springboot.payload.response.JwtResponse;
import com.PP1_BackEnd.Springboot.payload.response.MessageResponse;
import com.PP1_BackEnd.Springboot.repository.RoleRepository;
import com.PP1_BackEnd.Springboot.repository.UserRepository;
import com.PP1_BackEnd.Springboot.security.jwt.JwtUtils;
import com.PP1_BackEnd.Springboot.security.services.UserDetailsImpl;

/*
 * This controller is responsible for logging in and Registering the user or add an employee by Admin user.
 * The credentials are stored in the database with hashed passwords along with other details. 
 * Jwt is used for authentication and authorization of users. 
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  //----------login for all users
  @PostMapping("/signin")
  public ResponseEntity < ?>authenticateUser(@Valid@RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    System.out.println(jwt);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List < String > roles = userDetails.getAuthorities().stream().map(item ->item.getAuthority()).collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
  }
  
  
  //-----------create new user
  @PostMapping("/signup")
  public ResponseEntity < ?>registerUser(@Valid@RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

 
    String user_type=signUpRequest.getUser_type();
    Set < Role > roles = new HashSet < >();
    
    System.out.println("iduuf----------------------------------------"+user_type);
    
    
    if (userRepository.findAll().isEmpty() == true) {
      Role admin = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() ->new RuntimeException("Error: Role is not found."));
      signUpRequest.setUser_type("ADMIN");
      roles.add(admin);
    }
    else if(user_type.equals("EMPLOYER")) {
    	Role employer = roleRepository.findByName(ERole.ROLE_EMPLOYER).orElseThrow(() ->new RuntimeException("Error: Role is not found."));
        roles.add(employer);
    }	
    else {
    	 Role userRole = roleRepository.findByName(ERole.ROLE_JOB_SEEKER).orElseThrow(() ->new RuntimeException("Error: Role is not found."));
    	 signUpRequest.setUser_type("JOB_SEEKER");
         roles.add(userRole);
    }
    
 // Create new user's account
    User user = new User(signUpRequest.getUsername(), signUpRequest.getFirstname(), signUpRequest.getLastname(), 
    		signUpRequest.getEmail(), signUpRequest.getAddress(),
    		signUpRequest.getPhone(), encoder.encode(signUpRequest.getPassword())
    		, signUpRequest.getUser_type());

    


    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  

}