package com.arpit.jobportalbackend.controller;

import com.arpit.jobportalbackend.dto.JobResponse;
import com.arpit.jobportalbackend.service.SavedJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/savedJobs")
public class SavedJobController {


    @Autowired
    private SavedJobService savedJobService;

    @PostMapping("/save/{jobId}")
    public void saveJob(@PathVariable Long jobId) {
           savedJobService.saveJob(jobId);
    }
    @DeleteMapping("/unsave/{jobId}")
    public void unsaveJob(@PathVariable Long jobId) {
        savedJobService.unsaveJob(jobId);
    }

    @GetMapping
    public List<JobResponse> getAllSavedJobs(@RequestParam(required = false, defaultValue = "1") int pageNo,
                                             @RequestParam(required = false, defaultValue = "5") int pageSize) {
        return savedJobService.getAllSavedJobs(PageRequest.of(pageNo,pageSize));
    }

}
