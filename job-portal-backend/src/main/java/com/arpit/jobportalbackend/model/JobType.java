package com.arpit.jobportalbackend.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum JobType {
    FULLTIME,
    PARTTIME,
    INTERN,
    REMOTE;


    @JsonCreator
    public static JobType from(String value) {
        try {
            return JobType.valueOf(value.toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid JobType: "+ value);
        }
    }
}
