package com.arpit.jobportalbackend.config;

import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;
import java.util.List;


@Configuration
@EnableScheduling
public class JobScheduler {

    @Autowired
    private JobRepository jobRepo;
    public void closeExpiredJobs() {
        List<Job> jobs = jobRepo.findByJobStatus(JobStatus.ACTIVE);

        for(Job job:jobs) {

                if(job.getExpiryDate().isBefore(LocalDate.now())) {
                    job.setJobStatus(JobStatus.CLOSED);
                }
        }

        jobRepo.saveAll(jobs);
    }

}
