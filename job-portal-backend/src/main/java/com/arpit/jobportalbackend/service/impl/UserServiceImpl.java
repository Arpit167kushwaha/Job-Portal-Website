package com.arpit.jobportalbackend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arpit.jobportalbackend.dto.TalentResponse;
import com.arpit.jobportalbackend.dto.UpdateProfileRequest;
import com.arpit.jobportalbackend.model.Role;
import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.repository.UserRepository;
import com.arpit.jobportalbackend.security.SecurityUtils;
import com.arpit.jobportalbackend.service.UserService;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public User getLoggedInUser() {
        String email = SecurityUtils.getLoggedInUserEmail();
        return userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User Not Found"));
    }

    @Override
    public User updateUser(UpdateProfileRequest request) {

        String email = SecurityUtils.getLoggedInUserEmail();
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("user not found"));

        if(request.getName() !=null) {
            user.setName(request.getName());
        }

        if(request.getResumeUrl() !=null) {
            user.setResumeUrl(request.getResumeUrl());
        }

        if(request.getProfilePictureUrl() != null) {
            user.setProfilePictureUrl(request.getProfilePictureUrl());
        }

        if(request.getCompanyName() != null) {
            user.setCompanyName(request.getCompanyName());
        }
        if(request.getSkills() != null) {
            user.setSkills(request.getSkills());
        }
        if(request.getExperience() != null) {
            user.setExperience(request.getExperience());
        }

        return userRepo.save(user);

    }

    @Override
    public List<TalentResponse> getCandidates() {
        return userRepo.findByRole(Role.CANDIDATE)
            .stream()
            .map(user -> new TalentResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getResumeUrl(),
                user.getProfilePictureUrl(),
                user.getCompanyName(),
                user.getSkills(),
                user.getExperience()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public TalentResponse getCandidateById(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new TalentResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole(),
            user.getResumeUrl(),
            user.getProfilePictureUrl(),
            user.getCompanyName(),
            user.getSkills(),
            user.getExperience()
        );
    }
}
