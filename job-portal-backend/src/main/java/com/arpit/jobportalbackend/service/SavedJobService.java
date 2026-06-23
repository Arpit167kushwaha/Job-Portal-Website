package com.arpit.jobportalbackend.service;

import com.arpit.jobportalbackend.dto.JobResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SavedJobService {
    void saveJob(Long jobId);
    List<JobResponse> getAllSavedJobs(Pageable page);
    void unsaveJob(Long jobId);
}
