package com.arpit.jobportalbackend.dto;

import java.time.LocalDate;

import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.model.JobType;

import lombok.Data;

@Data
public class JobResponse {
    private Long id;

    private String title;

    private String description;

    private Double salary;

    private String location;

    private String companyName;

    private String postedByName;

    private JobStatus jobStatus;

    private Float experience;

    private JobType jobType;

    private LocalDate expiryDate;

    private Long applicantsCount;
    private Long postedDays;
}
