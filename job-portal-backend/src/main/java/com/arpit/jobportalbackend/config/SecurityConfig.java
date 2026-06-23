package com.arpit.jobportalbackend.config;
/*

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/jobs/**").permitAll()
                        .requestMatchers("/applications/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                .cors(org.springframework.security.config.Customizer.withDefaults())
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers("/home/**").authenticated()
                                        .requestMatchers("/auth/**").permitAll()
                                        .requestMatchers("/jobs/recruiter/**").hasRole("RECRUITER")
                                        .requestMatchers("/applications/dashboard/recruiter/**").hasRole("RECRUITER")
                                        .requestMatchers("/applications/dashboard/candidate/**").hasRole("CANDIDATE")
                                        .requestMatchers("/applications/select/**").hasRole("RECRUITER")
                                        .requestMatchers("/applications/reject/**").hasRole("RECRUITER")
                                        .requestMatchers("/applications/withdraw/**").hasRole("CANDIDATE")
                                        .requestMatchers(HttpMethod.GET, "/jobs/**").permitAll()
                                        // recruiter-only: candidates/talent listing
                                        .requestMatchers(HttpMethod.GET, "/user/talents").hasRole("RECRUITER")
                                        .requestMatchers(HttpMethod.GET, "/user/{id}").hasRole("RECRUITER")
                                        .requestMatchers(HttpMethod.GET, "/user/me").permitAll()
                                        .requestMatchers("/jobs/**").authenticated()
                                        .requestMatchers("/applications/apply/**").hasRole("CANDIDATE")
                                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


}