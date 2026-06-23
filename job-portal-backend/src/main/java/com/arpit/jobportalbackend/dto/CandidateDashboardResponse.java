package com.arpit.jobportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CandidateDashboardResponse {
   private Long totalApplied;
   private Long selected;
   private Long rejected;
   private Long pending;
}
