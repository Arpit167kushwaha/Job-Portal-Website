package com.arpit.jobportalbackend.controller;

import com.arpit.jobportalbackend.dto.JobResponse;
import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobType;
import com.arpit.jobportalbackend.service.JobService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@AllArgsConstructor
@RequestMapping("/jobs")
public class JobController {

    private static final Logger logger = LoggerFactory.getLogger(JobController.class);

    @Autowired
    private final JobService jobService;

    @PostMapping("recruiter/create")
    public JobResponse createJob(@RequestBody Job job){
        return jobService.createJob(job);
    }

    @GetMapping
    public List<JobResponse> getAllJobs(
            @RequestParam(required = false) Double minSalary,
            @RequestParam(required = false) Double maxSalary,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) Float minExp,
            @RequestParam(required = false) Float maxExp,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false,defaultValue = "ASC") String sortDir,
            @RequestParam(required = false,defaultValue = "1") int pageNo,
            @RequestParam(required = false,defaultValue = "10") int pageSize) {

        logger.debug("getAllJobs called with params: title={}, location={}, company={}", title, location, companyName);
        Sort sort;
        if (sortBy != null && !sortBy.isEmpty()) {
            if (sortDir.equalsIgnoreCase("ASC")) {
                sort = Sort.by(sortBy).ascending();
            } else {
                sort = Sort.by(sortBy).descending();
            }
        } else {
            sort = Sort.by("id").descending();
        }

        return jobService.getAllJobs(PageRequest.of(pageNo-1, pageSize, sort), title, location, companyName, jobType, minExp, maxExp, minSalary, maxSalary);
    }

    @GetMapping("/{jobId}")
    public JobResponse getJobById(@PathVariable Long jobId){
        return jobService.getJobById(jobId);
    }

    @DeleteMapping("/recruiter/delete/{jobId}")
    public void deleteJob(@PathVariable Long jobId){
        jobService.deleteJob(jobId);
    }

    @GetMapping("/recruiter")
    public List<JobResponse> getJobByRecruiter(@RequestParam(required = false,defaultValue = "1") int pageNo,
                                               @RequestParam(required = false,defaultValue = "3") int pageSize) {
        return jobService.getJobByRecruiter(PageRequest.of(pageNo-1, pageSize));
    }

    @PutMapping("/recruiter/{jobId}")
    public JobResponse updateJob(@PathVariable Long jobId, @RequestBody Job updatedJob) {
        return jobService.updateJob(jobId, updatedJob);
    }

    @PutMapping("/recruiter/close/{jobId}")
    public ResponseEntity<String> closeJob(@PathVariable Long jobId) {
        jobService.closeJob(jobId);
        return ResponseEntity.ok("Job closed successfully");
    }
}