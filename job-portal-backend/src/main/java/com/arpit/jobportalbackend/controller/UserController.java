package com.arpit.jobportalbackend.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.arpit.jobportalbackend.dto.TalentResponse;
import com.arpit.jobportalbackend.dto.UpdateProfileRequest;
import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.service.UserService;

@RestController
@RequestMapping("user")

public class UserController {

    @Autowired
    private  UserService userService;
    @GetMapping("me")
    public ResponseEntity<User> getLoggedInUser() {
        return ResponseEntity.ok(userService.getLoggedInUser());
    }

    @GetMapping("talents")
    public ResponseEntity<java.util.List<TalentResponse>> getCandidates() {
        return ResponseEntity.ok(userService.getCandidates());
    }

    @GetMapping("{id}")
    public ResponseEntity<TalentResponse> getCandidateById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getCandidateById(id));
    }

    @PutMapping(value = "update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> updateUser(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String resumeUrl,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) Float experience,
            @RequestParam(required = false) MultipartFile resume,
            @RequestParam(required = false) MultipartFile profilePicture
    ) throws IOException {

        UpdateProfileRequest req = new UpdateProfileRequest();
        req.setName(name);
        if (resumeUrl != null && !resumeUrl.isBlank()) req.setResumeUrl(resumeUrl);
        req.setCompanyName(companyName);
        req.setSkills(skills);
        req.setExperience(experience);

        // Save files to uploads directory and set URLs
        Path uploadsRoot = Paths.get("uploads");
        if (!Files.exists(uploadsRoot)) {
            Files.createDirectories(uploadsRoot);
        }

        if (resume != null && !resume.isEmpty()) {
            Path resumesDir = uploadsRoot.resolve("resumes");
            if (!Files.exists(resumesDir)) Files.createDirectories(resumesDir);
            String resumeFilename = Instant.now().toEpochMilli() + "-" + resume.getOriginalFilename();
            Path target = resumesDir.resolve(resumeFilename);
            resume.transferTo(target.toFile());
            req.setResumeUrl("/uploads/resumes/" + resumeFilename);
        }

        if (profilePicture != null && !profilePicture.isEmpty()) {
            Path picsDir = uploadsRoot.resolve("profile-pictures");
            if (!Files.exists(picsDir)) Files.createDirectories(picsDir);
            String picFilename = Instant.now().toEpochMilli() + "-" + profilePicture.getOriginalFilename();
            Path target = picsDir.resolve(picFilename);
            profilePicture.transferTo(target.toFile());
            req.setProfilePictureUrl("/uploads/profile-pictures/" + picFilename);
        }

        return ResponseEntity.ok(userService.updateUser(req));
    }

}
