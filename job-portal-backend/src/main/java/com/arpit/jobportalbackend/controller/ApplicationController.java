package com.arpit.jobportalbackend.controller;

import com.arpit.jobportalbackend.dto.ApplicantResponse;
import com.arpit.jobportalbackend.dto.AppliedJobResponse;
import com.arpit.jobportalbackend.dto.CandidateDashboardResponse;
import com.arpit.jobportalbackend.dto.RecruiterDashboardResponse;
import com.arpit.jobportalbackend.model.Application;

import com.arpit.jobportalbackend.model.ApplicationStatus;
import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {
    @Autowired
    private final ApplicationService applicationService;

    @PostMapping("/apply/{jobId}")
    public Application applyJob(@PathVariable Long jobId) {
        return applicationService.applyJob(jobId);
    } // save application in db applied by candidates

    @GetMapping("/applied")
    public List<AppliedJobResponse> getAppliedJobs(@RequestParam(required = false) ApplicationStatus applicationStatus) {

        return applicationService.getAppliedJobs(applicationStatus);
    }
    // candidate can see their all applications


    @GetMapping("/job/{jobId}")
    public List<ApplicantResponse> getApplicantsByjobId(@PathVariable Long jobId) {
        return applicationService.getApplicantsnByjobId(jobId);
    }

    @PutMapping("/select/{applicationId}")
    public ResponseEntity<String> acceptCandidate(@PathVariable Long applicationId) {
        applicationService.acceptCandidate(applicationId);

        return ResponseEntity.ok("Candidate with Aplication Id:"+applicationId+" is Selected");
    }
    @PutMapping("/reject/{applicationId}")
    public ResponseEntity<String> rejectCandidate(@PathVariable Long applicationId){
        applicationService.rejectCandidate(applicationId);

        return ResponseEntity.ok("Candidate with appId:"+applicationId+" is Rejected");
    }

    @PutMapping("/withdraw/{applicationId}")
    public ResponseEntity<String> withDrawApplication(@PathVariable Long applicationId) {
        applicationService.withDrawApplication(applicationId);

        return ResponseEntity.ok("Application withdrawn successfully");
    }
    @GetMapping("/count/{jobId}")
    public ResponseEntity<Long> countApplicantsByJobId(@PathVariable Long jobId) {
        System.out.println("Total no of applicants for jobId:"+jobId+" ="+applicationService.countApplicantsByJobId(jobId));
        return ResponseEntity.ok(applicationService.countApplicantsByJobId(jobId));
    }

    @GetMapping("dashboard/recruiter")
    public ResponseEntity<RecruiterDashboardResponse> getRecruiterDashboard() {
        return ResponseEntity.ok(applicationService.getRecruiterDashboard());
    }

    @GetMapping("dashboard/candidate")
    public ResponseEntity<CandidateDashboardResponse> getCandidateDashboardResponse() {
         return ResponseEntity.ok(applicationService.getCandidateDashboardResponse());
    }

}