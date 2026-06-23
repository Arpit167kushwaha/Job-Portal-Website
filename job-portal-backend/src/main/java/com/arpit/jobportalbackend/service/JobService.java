package com.arpit.jobportalbackend.service;

import com.arpit.jobportalbackend.dto.JobResponse;
import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobType;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    JobResponse createJob(Job job);  //Post a job by recruiter

    List<JobResponse> getAllJobs(Pageable page, String title, String location, String companyName, JobType jobType, Float minExp, Float maxExp,Double minSalary,Double maxSalary);  //Candidate can see all jobs


    List<JobResponse> getJobByRecruiter(Pageable page);

    JobResponse updateJob(Long jobId, Job job);


    JobResponse getJobById(Long id);  //Individual Job detail page

    void deleteJob(Long jobId); //Own Job can be deleted by the recruiter

    void closeJob(Long jobId);
}
