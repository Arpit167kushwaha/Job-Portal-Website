package com.arpit.jobportalbackend.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.arpit.jobportalbackend.model.Application;
import com.arpit.jobportalbackend.model.ApplicationStatus;
import com.arpit.jobportalbackend.model.Company;
import com.arpit.jobportalbackend.model.Job;
import com.arpit.jobportalbackend.model.JobStatus;
import com.arpit.jobportalbackend.model.JobType;
import com.arpit.jobportalbackend.model.Role;
import com.arpit.jobportalbackend.model.SavedJob;
import com.arpit.jobportalbackend.model.User;
import com.arpit.jobportalbackend.repository.ApplicationRepository;
import com.arpit.jobportalbackend.repository.CompanyRepository;
import com.arpit.jobportalbackend.repository.JobRepository;
import com.arpit.jobportalbackend.repository.SavedJobRepository;
import com.arpit.jobportalbackend.repository.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final SavedJobRepository savedJobRepository;

    public DataSeeder(UserRepository userRepository,
                      CompanyRepository companyRepository,
                      JobRepository jobRepository,
                      ApplicationRepository applicationRepository,
                      SavedJobRepository savedJobRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.savedJobRepository = savedJobRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0 || jobRepository.count() > 0) {
            // Already seeded
            return;
        }

        // Create users
        User recruiter = User.builder()
                .name("Acme Recruiter")
                .email("recruiter@acme.local")
                .password("password")
                .companyName("ACME Corp")
                .role(Role.RECRUITER)
                .experience(5.0f)
                .build();

        User candidate = User.builder()
                .name("Jane Doe")
                .email("jane.doe@example.com")
                .password("password")
                .skills("Java,Spring,SQL")
                .experience(2.5f)
                .role(Role.CANDIDATE)
                .build();

        User admin = User.builder()
                .name("Admin User")
                .email("admin@local")
                .password("password")
                .role(Role.ADMIN)
                .build();

        userRepository.saveAll(List.of(recruiter, candidate, admin));

        // Company
        Company company = Company.builder()
                .name("ACME Corp")
                .description("Leading provider of example products")
                .location("Remote")
                .website("https://acme.example")
                .createdBy(recruiter)
                .build();
        companyRepository.save(company);

        // Jobs
        Job job1 = Job.builder()
                .title("Junior Java Developer")
                .description("Work on backend services using Spring Boot.")
                .salary(45000.0)
                .location("Remote")
                .companyName(company.getName())
                .experience(1.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusMonths(1))
                .postedBy(recruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job job2 = Job.builder()
                .title("Front-end Engineer")
                .description("Build delightful UIs with React and TypeScript.")
                .salary(55000.0)
                .location("Bengaluru")
                .companyName(company.getName())
                .experience(2.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusMonths(2))
                .postedBy(recruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job job3 = Job.builder()
                .title("Remote Intern")
                .description("3-month internship learning web development.")
                .salary(0.0)
                .location("Remote")
                .companyName(company.getName())
                .experience(0.0f)
                .jobType(JobType.INTERN)
                .expiryDate(LocalDate.now().plusMonths(3))
                .postedBy(recruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        jobRepository.saveAll(List.of(job1, job2, job3));

        // Saved job and application
        SavedJob saved = SavedJob.builder().user(candidate).job(job1).build();
        savedJobRepository.save(saved);

        Application application = Application.builder()
                .user(candidate)
                .job(job1)
                .status(ApplicationStatus.PENDING)
                .build();
        applicationRepository.save(application);
    }
}
