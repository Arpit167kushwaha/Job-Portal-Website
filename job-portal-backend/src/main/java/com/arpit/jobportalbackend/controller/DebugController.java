package com.arpit.jobportalbackend.controller;

import com.arpit.jobportalbackend.repository.CompanyRepository;
import com.arpit.jobportalbackend.repository.JobRepository;
import com.arpit.jobportalbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/debug")
@AllArgsConstructor
public class DebugController {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;

    @GetMapping("/counts")
    public Map<String, Long> counts() {
        Map<String, Long> m = new HashMap<>();
        m.put("users", userRepository.count());
        m.put("companies", companyRepository.count());
        m.put("jobs", jobRepository.count());
        return m;
    }
}
