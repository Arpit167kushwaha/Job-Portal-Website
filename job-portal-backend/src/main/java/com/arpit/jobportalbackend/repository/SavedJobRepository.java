package com.arpit.jobportalbackend.repository;

import com.arpit.jobportalbackend.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob,Long> {

    boolean existsByUserIdAndJobId(Long userId, Long jobId);
    void deleteByUserIdAndJobId(Long userId, Long jobId);

}
