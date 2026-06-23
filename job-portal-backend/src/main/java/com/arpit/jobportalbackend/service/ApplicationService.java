package com.arpit.jobportalbackend.service;

import com.arpit.jobportalbackend.dto.ApplicantResponse;
import com.arpit.jobportalbackend.dto.AppliedJobResponse;
import com.arpit.jobportalbackend.dto.CandidateDashboardResponse;
import com.arpit.jobportalbackend.dto.RecruiterDashboardResponse;
import com.arpit.jobportalbackend.model.Application;
import com.arpit.jobportalbackend.model.ApplicationStatus;
import com.arpit.jobportalbackend.model.JobStatus;

import java.util.List;

public interface ApplicationService {

    Application applyJob(Long jobId); // save application in db applied by candidates
    List<AppliedJobResponse> getAppliedJobs(ApplicationStatus applicationStatus);
    List<ApplicantResponse> getApplicantsnByjobId(Long jobId) ;

    void acceptCandidate(Long applicationId);
    void rejectCandidate(Long applicationId);

    void withDrawApplication(Long applicationId);
    long countApplicantsByJobId(Long jobId);
    RecruiterDashboardResponse getRecruiterDashboard();
    CandidateDashboardResponse getCandidateDashboardResponse();
}
