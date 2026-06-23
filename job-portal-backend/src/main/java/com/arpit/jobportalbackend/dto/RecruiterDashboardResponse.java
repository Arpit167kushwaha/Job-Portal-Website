package com.arpit.jobportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class RecruiterDashboardResponse {
    private Long totalJobs;
    private Long activeJobs;
    private Long closedJobs;
    private Long totalApplicants;
    private Long selectedCandidates;
    private Long rejectedCandidates;
    private Long pendingCandidates;
}
