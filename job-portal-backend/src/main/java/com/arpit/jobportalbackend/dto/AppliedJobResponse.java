package com.arpit.jobportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AppliedJobResponse {

    private Long jobId;
    private String title;
    private String company;
    private String location;
    private Double salary;
    private String applicationStatus;
}
