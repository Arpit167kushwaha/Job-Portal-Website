package com.arpit.jobportalbackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.arpit.jobportalbackend.dto.JobResponse;
import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.SavedJob;
import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.repository.JobRepository;
import com.arpit.jobportalbackend.repository.SavedJobRepository;
import com.arpit.jobportalbackend.repository.UserRepository;
import com.arpit.jobportalbackend.security.SecurityUtils;
import com.arpit.jobportalbackend.service.SavedJobService;

import jakarta.transaction.Transactional;

@Service
public class SavedJobServiceImpl implements SavedJobService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private SavedJobRepository savedJobRepo;
    @Autowired
    private JobRepository jobRepo;

    @Override
    public void saveJob(Long jobId) {
        String email = SecurityUtils.getLoggedInUserEmail();
        User user = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
        Long userId = user.getId();

        boolean alreadySaved = savedJobRepo.existsByUserIdAndJobId(userId,jobId);

        if(alreadySaved) { throw new RuntimeException("Job Already Saved");}

        Job job = jobRepo.findById(jobId).orElseThrow(()->new RuntimeException("Job Not Found"));

        SavedJob savedJob = new SavedJob();
        savedJob.setJob(job);
        savedJob.setUser(user);

        savedJobRepo.save(savedJob);
    }

    @Override
    public List<JobResponse> getAllSavedJobs(Pageable pageable){
        return savedJobRepo.findAll(pageable)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public void unsaveJob(Long jobId) {
        String email = SecurityUtils.getLoggedInUserEmail();
        User user = userRepo.findByEmail(email).orElseThrow();
        Long userId = user.getId();

        boolean exists =
                savedJobRepo.existsByUserIdAndJobId(userId, jobId);

        if(!exists){
            throw new RuntimeException("Saved job not found");
        }

       savedJobRepo.deleteByUserIdAndJobId(userId,jobId);
    }

    private JobResponse mapToResponse(SavedJob job) {
        JobResponse response = new JobResponse();

        response.setId(job.getJob().getId());
        response.setTitle(job.getJob().getTitle());
        response.setDescription(job.getJob().getDescription());
        response.setSalary(job.getJob().getSalary());
        response.setCompanyName(job.getJob().getCompanyName());
        response.setLocation(job.getJob().getLocation());
        response.setJobStatus(job.getJob().getJobStatus());

        if(job.getJob().getPostedBy()!=null) {
            response.setPostedByName(job.getJob().getPostedBy().getName());
        }

        if(job.getJob().getCreatedAt()!=null) {
            long days = java.time.temporal.ChronoUnit.DAYS.between(job.getJob().getCreatedAt().toLocalDate(), java.time.LocalDate.now());
            response.setPostedDays(days);
        }

        return response;
    }

}
