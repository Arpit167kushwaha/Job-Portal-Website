package com.arpit.jobportalbackend.repository;

import com.arpit.jobportalbackend.model.Application;
import com.arpit.jobportalbackend.model.ApplicationStatus;
import com.arpit.jobportalbackend.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.arpit.jobportalbackend.model.ApplicationStatus.WITHDRAWN;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByuserId(Long userId);
    List<Application> findByjobId(Long jobId);


    List<Application> findByUserIdAndStatus( Long userId, ApplicationStatus applicationStatus);

    boolean existsByUserIdAndJobId(Long userId,Long jobId);

    long countByJobId(Long jobId);

    long countByJobIdAndStatusNot(
            Long jobId,
            ApplicationStatus status
    );
    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId,ApplicationStatus applicationStatus);
    long countByJobPostedById(Long userId);
    long countByJobPostedByIdAndStatusNot(Long userId, ApplicationStatus applicationStatus);
    long countByJobPostedByIdAndStatus(Long userId, ApplicationStatus status);


}
