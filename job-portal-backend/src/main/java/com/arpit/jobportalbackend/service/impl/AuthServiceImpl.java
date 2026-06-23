package com.arpit.jobportalbackend.service.impl;

import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.repository.UserRepository;
import com.arpit.jobportalbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Autowired
    private final UserRepository userRepo;
    @Override
    public User register(User user){
        if(userRepo.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already registered");
        }                                                                       // register in db
        return userRepo.save(user);
    }

    @Override
    public User login(String email,String password){   // login in db
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User Not Found"));

        if(!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }
            return user;
     }

}
