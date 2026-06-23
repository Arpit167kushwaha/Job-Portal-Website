package com.arpit.jobportalbackend.service;

import java.util.List;

import com.arpit.jobportalbackend.dto.TalentResponse;
import com.arpit.jobportalbackend.dto.UpdateProfileRequest;
import com.arpit.jobportalbackend.model.User;

public interface UserService {

    User getLoggedInUser();
    User updateUser(UpdateProfileRequest updateProfileRequest);
    List<TalentResponse> getCandidates();
    TalentResponse getCandidateById(Long id);
}
