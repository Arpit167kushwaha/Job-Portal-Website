package com.arpit.jobportalbackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtRequest {
    @jakarta.validation.constraints.NotBlank(message = "Email is required")
    @jakarta.validation.constraints.Email(message = "Please provide a valid email address")
    private String email;

    @jakarta.validation.constraints.NotBlank(message = "Password is required")
    private String password;
}
