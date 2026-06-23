package com.arpit.jobportalbackend.service;

import com.arpit.jobportalbackend.model.User;

public interface AuthService {

    User register(User user); // register in db

    User login(String email,String password);  // login in db
}
