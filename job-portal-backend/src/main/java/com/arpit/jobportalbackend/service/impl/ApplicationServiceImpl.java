package com.arpit.jobportalbackend.service.impl;

import com.arpit.jobportalbackend.dto.ApplicantResponse;
import com.arpit.jobportalbackend.dto.AppliedJobResponse;
import com.arpit.jobportalbackend.dto.CandidateDashboardResponse;
import com.arpit.jobportalbackend.dto.RecruiterDashboardResponse;
import com.arpit.jobportalbackend.model.*;
import com.arpit.jobportalbackend.repository.ApplicationRepository;
import com.arpit.jobportalbackend.repository.JobRepository;
import com.arpit.jobportalbackend.repository.UserRepository;
import com.arpit.jobportalbackend.security.SecurityUtils;
import com.arpit.jobportalbackend.service.ApplicationService;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor

public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private final ApplicationRepository applicationRepo;
    @Autowired
    private final UserRepository userRepo;
    @Autowired
    private final JobRepository jobRepo;

    @Override
    public Application applyJob(Long jobId){
        Job jobcheck = jobRepo.findById(jobId).orElseThrow();

        if(jobcheck.getExpiryDate().isBefore(LocalDate.now())) {
            jobcheck.setJobStatus(JobStatus.CLOSED);
            jobRepo.save(jobcheck);

            throw new RuntimeException("Job Expired");
        }

        // logged-in user from JWT
        String email = SecurityUtils.getLoggedInUserEmail();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Long userId = user.getId();




        if(jobcheck.getJobStatus() == JobStatus.CLOSED){
            throw new RuntimeException("Job is closed");
        }

        if(jobcheck.getPostedBy().getId().equals(userId)) {
            throw new RuntimeException("Recruiter cannot apply to own job");
        }

        boolean alreadyApplied =
                applicationRepo.existsByUserIdAndJobId(userId,jobId);

        if(alreadyApplied){
            throw new RuntimeException("Already Applied for this job");
        }

        Application application = new Application();

        application.setUser(user);
        application.setJob(jobcheck);
        application.setStatus(ApplicationStatus.PENDING);

        return applicationRepo.save(application);
    }

    @Override
    public List<AppliedJobResponse> getAppliedJobs(ApplicationStatus applicationStatus) {

               String email = SecurityUtils.getLoggedInUserEmail();

               User user = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));

               List<Application> applications;
               if(applicationStatus == null) {
                     applications = applicationRepo. findByuserId(user.getId());;
               } else {
                     applications = applicationRepo.findByUserIdAndStatus(user.getId(), applicationStatus);
               }

               return applications
                       .stream()
                       .map(this::mapToAppliedJobResponse)
                       .toList();
    }



    @Override
    public List<ApplicantResponse> getApplicantsnByjobId(Long jobId) {
        List<Application> applications =applicationRepo.findByjobId(jobId);

        return applications
                .stream()
                .map(this::mapToApplicantResponse)
                .toList();
    }

    @Override
    public void acceptCandidate(Long applicationId){
        Application application = applicationRepo.findById(applicationId).orElseThrow(()-> new RuntimeException("Aplication not found"));

        application.setStatus(ApplicationStatus.SELECTED);

        applicationRepo.save(application);
    }

    @Override
    public void rejectCandidate(Long applicationId){
        Application application = applicationRepo.findById(applicationId).orElseThrow(()-> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.REJECTED);

        applicationRepo.save(application);
    }

    @Override
    public void withDrawApplication(Long applicationId) {

           String email = SecurityUtils.getLoggedInUserEmail();
           User candidate = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));
           Long userId = candidate.getId();

           Application application = applicationRepo.findById(applicationId).orElseThrow(()->new RuntimeException("Application Not Found"));
           Long appUserId = application.getUser().getId();

           if(!appUserId.equals(userId)) {
               throw new RuntimeException("You can only withdraw your own applications");
           }

           if(application.getStatus() == ApplicationStatus.SELECTED) {
               throw new RuntimeException("You cannot withdraw your selected applications");
           }

           application.setStatus(ApplicationStatus.WITHDRAWN);
           applicationRepo.save(application);
    }

        @Override
    public long countApplicantsByJobId(Long jobId) {
       return applicationRepo.countByJobId(jobId);
    }

    public RecruiterDashboardResponse getRecruiterDashboard(){

        String email = SecurityUtils.getLoggedInUserEmail();

        User recruiter = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not found"));

        Long userId = recruiter.getId();

        long totalJobs = jobRepo.countByPostedById(userId);

        long activeJobs = jobRepo.countByPostedByIdAndJobStatus(userId,JobStatus.ACTIVE);

        long closedJobs = jobRepo.countByPostedByIdAndJobStatus(userId,JobStatus.CLOSED);

        long totalApplicants = applicationRepo.countByJobPostedByIdAndStatusNot(userId, ApplicationStatus.WITHDRAWN);

        long selectedCandidates = applicationRepo.countByJobPostedByIdAndStatus(userId,ApplicationStatus.SELECTED);

        long rejectedCandidates = applicationRepo.countByJobPostedByIdAndStatus(userId,ApplicationStatus.REJECTED);

        long pendingCandidates = applicationRepo.countByJobPostedByIdAndStatus(userId,ApplicationStatus.PENDING);

        return new RecruiterDashboardResponse(totalJobs,activeJobs,closedJobs,totalApplicants,selectedCandidates,rejectedCandidates,pendingCandidates);
    }

    @Override
    public CandidateDashboardResponse getCandidateDashboardResponse() {

        String email = SecurityUtils.getLoggedInUserEmail();
        User candidate = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));

        Long userId = candidate.getId();
        long totalApplied = applicationRepo.countByUserId(userId);

        long selected = applicationRepo.countByUserIdAndStatus(userId,ApplicationStatus.SELECTED);

        long rejected = applicationRepo.countByUserIdAndStatus(userId,ApplicationStatus.REJECTED);

        long pending = applicationRepo.countByUserIdAndStatus(userId,ApplicationStatus.PENDING);

        return new CandidateDashboardResponse(totalApplied,selected,rejected,pending);
    }
    private AppliedJobResponse mapToAppliedJobResponse(Application application) {
        AppliedJobResponse response = new AppliedJobResponse();

        response.setJobId(application.getJob().getId());
        response.setTitle(application.getJob().getTitle());
        response.setCompany(application.getJob().getCompanyName());
        response.setLocation(application.getJob().getLocation());
        response.setSalary(application.getJob().getSalary());
        response.setApplicationStatus(application.getStatus().name());

        return response;
    }

    private ApplicantResponse mapToApplicantResponse(Application application) {
           ApplicantResponse response = new ApplicantResponse();
           response.setApplicationId(application.getId());
           response.setUserId(application.getUser().getId());
           response.setEmail(application.getUser().getEmail());
           response.setName(application.getUser().getName());
           response.setStatus(application.getStatus().name());

        return response;
    }
}
