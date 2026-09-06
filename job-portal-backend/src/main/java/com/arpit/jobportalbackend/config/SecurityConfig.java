package com.arpit.jobportalbackend.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.arpit.jobportalbackend.security.JwtAuthenticationEntryPoint;
import com.arpit.jobportalbackend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/jobs/**").permitAll()
                        
                        // Recruiter-specific rules
                        .requestMatchers("/jobs/recruiter/**").hasRole("RECRUITER")
                        .requestMatchers("/applications/job/**").hasRole("RECRUITER")
                        .requestMatchers("/applications/select/**").hasRole("RECRUITER")
                        .requestMatchers("/applications/reject/**").hasRole("RECRUITER")
                        .requestMatchers("/applications/dashboard/recruiter/**").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/user/talents").hasRole("RECRUITER")
                        .requestMatchers(HttpMethod.GET, "/user/{id}").hasRole("RECRUITER")
                        
                        // Candidate-specific rules
                        .requestMatchers("/applications/apply/**").hasRole("CANDIDATE")
                        .requestMatchers("/applications/applied/**").hasRole("CANDIDATE")
                        .requestMatchers("/applications/withdraw/**").hasRole("CANDIDATE")
                        .requestMatchers("/applications/dashboard/candidate/**").hasRole("CANDIDATE")
                        
                        // Authenticated general rules
                        .requestMatchers("/user/me").authenticated()
                        .requestMatchers("/user/update").authenticated()
                        .requestMatchers("/savedJobs/**").authenticated()
                        .requestMatchers("/applications/**").authenticated()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}