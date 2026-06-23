package com.arpit.jobportalbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/home")
public class HomeController {
    @GetMapping
    public String greet() {
        return "Hello welcome to Our Job profile website";
    }

    @GetMapping("/currentUser")
    public String getLoggedInUser(Principal principal) {
        return principal.getName();
    }

}
