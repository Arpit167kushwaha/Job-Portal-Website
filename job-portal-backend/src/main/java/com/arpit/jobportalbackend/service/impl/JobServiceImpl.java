package com.arpit.jobportalbackend.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.arpit.jobportalbackend.dto.JobResponse;
import com.arpit.jobportalbackend.model.ApplicationStatus;
import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.model.JobType;
import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.repository.ApplicationRepository;
import com.arpit.jobportalbackend.repository.JobRepository;
import com.arpit.jobportalbackend.repository.UserRepository;
import com.arpit.jobportalbackend.security.SecurityUtils;
import com.arpit.jobportalbackend.service.JobService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
   @Autowired
    private final JobRepository jobRepo;
   @Autowired
    private final UserRepository userRepo;
   @Autowired
   private final ApplicationRepository appRepo;
   @Override
    public JobResponse createJob(Job job){       //Post a job by recruiter
        String email = SecurityUtils.getLoggedInUserEmail();

        User user = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));

        job.setPostedBy(user);

        if(job.getJobStatus()==null) {
            job.setJobStatus(JobStatus.ACTIVE);
        }

        if(job.getExpiryDate().isBefore(LocalDate.now())) {
             throw new RuntimeException("Expiry Date Must be future date");
        }

        Job saved =jobRepo.save(job);
        return mapToResponse(saved);
    }

    @Override
    public  List<JobResponse> getAllJobs(Pageable page, String title, String location, String companyName, JobType jobType, Float minExp, Float maxExp,Double minSalary,Double maxSalary){
        return jobRepo.searchJobs(  title, location, companyName, jobType, minExp, maxExp,minSalary,maxSalary, page).getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }  //Candidate can see all jobs

    @Override
    public List<JobResponse> getJobByRecruiter(Pageable page) {
           String email = SecurityUtils.getLoggedInUserEmail();
           User recruiter = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User Not Found"));
           return jobRepo.findByPostedById(page, recruiter.getId()).getContent()
                   .stream()
                   .map(this::mapToResponse)
                   .toList();
    }

    @Override
    public JobResponse updateJob(Long jobId,Job updatedJob) {
       String email = SecurityUtils.getLoggedInUserEmail();
       User recruiter = userRepo.findByEmail(email).orElseThrow();


       Job job = jobRepo.findById(jobId).orElseThrow(() ->new RuntimeException("Job not found"));

       if(!job.getPostedBy().getId().equals(recruiter.getId())) {
           throw new RuntimeException("You can update only your own job");
       }
       job.setTitle(updatedJob.getTitle());
       job.setDescription(updatedJob.getDescription());
       job.setSalary(updatedJob.getSalary());
       job.setLocation(updatedJob.getLocation());
       job.setCompanyName(updatedJob.getCompanyName());
       job.setPostedBy(updatedJob.getPostedBy());
       Job saved = jobRepo.save(job);

       return mapToResponse(saved);

    }

    @Override
    public JobResponse getJobById(Long id){

        Job job= jobRepo.findById(id).orElseThrow(() -> new RuntimeException("Job Not Found"));
        return mapToResponse(job);
    }  //Individual Job detail page

    @Override
    public void deleteJob(Long jobId){

       String email = SecurityUtils.getLoggedInUserEmail();

       User recruiter = userRepo.findByEmail(email).orElseThrow();
       Job job = jobRepo.findById(jobId).orElseThrow(()-> new RuntimeException("job not found"));
       if(!job.getPostedBy().getId().equals(recruiter.getId())) {
           throw new RuntimeException("You can only delete your own job");
       }
        jobRepo.deleteById(jobId);
    } //Job can be deleted by the recruiter


    @Override
    public void closeJob(Long jobId){
       String email = SecurityUtils.getLoggedInUserEmail();
       User recruiter = userRepo.findByEmail(email).orElseThrow();
       Job job = jobRepo.findById(jobId).orElseThrow(()->new RuntimeException("Job not found"));

       if(!job.getPostedBy().getId().equals(recruiter.getId())) {
           throw new RuntimeException("You can close only your own job");
       }
        job.setJobStatus(JobStatus.CLOSED);

       jobRepo.save(job);
    }


    private JobResponse mapToResponse(Job job) {
       JobResponse response = new JobResponse();

        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setSalary(job.getSalary());
        response.setCompanyName(job.getCompanyName());
        response.setLocation(job.getLocation());
        response.setJobStatus(job.getJobStatus());
        response.setExpiryDate(job.getExpiryDate());
        response.setExperience(job.getExperience());
        response.setJobType(job.getJobType());
        response.setApplicantsCount(appRepo.countByJobIdAndStatusNot(job.getId(), ApplicationStatus.WITHDRAWN));

        if(job.getPostedBy()!=null) {
            response.setPostedByName(job.getPostedBy().getName());
        }

        if(job.getCreatedAt()!=null) {
            long days = java.time.temporal.ChronoUnit.DAYS.between(job.getCreatedAt().toLocalDate(), java.time.LocalDate.now());
            response.setPostedDays(days);
        }

        return response;
    }

}
