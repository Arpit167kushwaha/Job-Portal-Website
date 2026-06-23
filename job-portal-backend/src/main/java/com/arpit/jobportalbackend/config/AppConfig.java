package com.arpit.jobportalbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class AppConfig {

   /* @Bean
    public UserDetailsService userDetailsService() {
        UserDetails userDetails1 = User.builder().username("Arpit").password(passwordEncoder().encode("1234")).roles("ADMIN").build();
        UserDetails userDetails2 = User.builder().username("Aman").password(passwordEncoder().encode("4321")).roles("ADMIN").build();

        return new InMemoryUserDetailsManager(userDetails1,userDetails2);
    }*/

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
