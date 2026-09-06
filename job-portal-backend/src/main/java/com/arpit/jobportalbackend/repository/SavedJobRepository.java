package com.arpit.jobportalbackend.repository;

import com.arpit.jobportalbackend.model.SavedJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob,Long> {

    boolean existsByUserIdAndJobId(Long userId, Long jobId);
    void deleteByUserIdAndJobId(Long userId, Long jobId);
    Page<SavedJob> findByUserId(Long userId, Pageable pageable);
    List<SavedJob> findByUserId(Long userId);
}

