package com.arpit.jobportalbackend.dto;

import com.arpit.jobportalbackend.model.Role;

public record TalentResponse(Long id, String name, String email, Role role, String resumeUrl, String profilePictureUrl, String companyName, String skills, Float experience) {
}