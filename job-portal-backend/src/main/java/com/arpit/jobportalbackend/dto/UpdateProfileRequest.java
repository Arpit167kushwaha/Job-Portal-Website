package com.arpit.jobportalbackend.dto;


import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String resumeUrl;
    private String profilePictureUrl;
    private String companyName;
    private String skills;
    private Float experience;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Float getExperience() {
        return experience;
    }

    public void setExperience(Float experience) {
        this.experience = experience;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }
}
