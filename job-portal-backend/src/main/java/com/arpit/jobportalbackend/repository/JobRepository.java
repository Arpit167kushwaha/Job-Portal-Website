package com.arpit.jobportalbackend.repository;

import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.model.JobType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

    @Query("""
            SELECT j FROM Job j
            WHERE (:title IS NULL OR j.title LIKE %:title%)
            AND (:location IS NULL OR j.location LIKE %:location%)
            AND (:companyName IS NULL OR j.companyName LIKE %:companyName%)
            AND (:jobType IS NULL OR j.jobType = :jobType)
            AND (:minExp IS NULL OR j.experience >= :minExp)
            AND (:maxExp IS NULL OR j.experience <= :maxExp)
            AND (:minSalary IS NULL OR j.salary >= :minSalary)
            AND (:maxSalary IS NULL OR j.salary <= :maxSalary)
            """)
    Page<Job> searchJobs(String title, String location, String companyName, JobType jobType,Float minExp, Float maxExp,Double minSalary,Double maxSalary, Pageable page);

    Page<Job> findByPostedById(Pageable page,Long id);

    long countByPostedById(Long userId);
    long countByPostedByIdAndJobStatus(Long userId, JobStatus status);

    List<Job> findByJobStatus(JobStatus jobStatus);
}
