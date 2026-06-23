package com.arpit.jobportalbackend.controller;


import com.arpit.jobportalbackend.model.JwtRequest;
import com.arpit.jobportalbackend.model.JwtResponse;
import com.arpit.jobportalbackend.model.Role;
import com.arpit.jobportalbackend.model.User;

import com.arpit.jobportalbackend.security.JwtHelper;
import com.arpit.jobportalbackend.service.AuthService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/auth")
public class AuthController {

   /* @Autowired
    private final AuthService authService;


    @PostMapping("/register")
    public User register(@RequestBody User user){                   // register in db
        return authService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestParam String email,
                      @RequestParam String password){   // login in db
        return authService.login(email,password);
    }*/

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;


    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private  AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user){

        user.setPassword(encoder.encode(user.getPassword()));
        if(user.getRole() == null) {
            user.setRole(Role.CANDIDATE);
        }

        return authService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .userName(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> exceptionHandler() {
        return new ResponseEntity<>("Invalid email or password. Please try again.", HttpStatus.UNAUTHORIZED);
    }
}

