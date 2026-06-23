package com.arpit.jobportalbackend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ApplicantResponse {
    private Long applicationId;
    private Long userId;
    private String name;
    private String email;
    private String status;
}
