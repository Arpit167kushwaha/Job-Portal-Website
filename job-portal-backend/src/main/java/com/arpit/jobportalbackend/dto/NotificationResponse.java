package com.arpit.jobportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private String message;
    private String type; // e.g. APPLICATION_STATUS
    private String status; // e.g. PENDING/SELECTED/REJECTED
}

