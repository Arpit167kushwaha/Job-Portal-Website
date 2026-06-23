package com.arpit.jobportalbackend.config;

import com.arpit.jobportalbackend.model.*;
import com.arpit.jobportalbackend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final ApplicationRepository applicationRepository;
    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public DataInitializer(ApplicationRepository applicationRepository,
                           SavedJobRepository savedJobRepository,
                           JobRepository jobRepository,
                           CompanyRepository companyRepository,
                           UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.savedJobRepository = savedJobRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        logger.info("DATA INITIALIZER: Clearing existing data and inserting sample data (requested)");

        // delete in dependent-first order
        applicationRepository.deleteAll();
        savedJobRepository.deleteAll();
        jobRepository.deleteAll();
        companyRepository.deleteAll();
        userRepository.deleteAll();

        // create sample users
        User recruiter = User.builder()
                .name("Alice Recruiter")
                .email("alice.recruiter@example.com")
                .password("password")
                .role(Role.RECRUITER)
                .companyName("Acme Corp")
                .experience(5.0f)
                .build();

        User candidate = User.builder()
                .name("Bob Candidate")
                .email("bob.candidate@example.com")
                .password("password")
                .role(Role.CANDIDATE)
                .experience(2.0f)
                .build();

        List<User> savedUsers = userRepository.saveAll(List.of(recruiter, candidate));
        User savedRecruiter = savedUsers.get(0);

        // create companies
        Company acme = Company.builder()
                .name("Acme Corp")
                .description("Industry-leading provider of business solutions.")
                .location("New York, NY")
                .website("https://www.acme.example.com")
                .createdBy(savedRecruiter)
                .build();

        Company globex = Company.builder()
                .name("Globex Technologies")
                .description("Cutting-edge AI and cloud services.")
                .location("San Francisco, CA")
                .website("https://www.globex.example.com")
                .createdBy(savedRecruiter)
                .build();

        List<Company> savedCompanies = companyRepository.saveAll(List.of(acme, globex));
        Company savedAcme = savedCompanies.get(0);
        Company savedGlobex = savedCompanies.get(1);

        // create sample jobs
        Job j1 = Job.builder()
                .title("Senior Java Backend Engineer")
                .description("Design and develop scalable backend services using Spring Boot and microservices architecture.")
                .salary(150000.0)
                .location("New York, NY")
                .companyName(savedAcme.getName())
                .experience(5.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(60))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j2 = Job.builder()
                .title("Frontend Engineer (React)")
                .description("Build responsive UIs with React, TypeScript, and Tailwind.")
                .salary(120000.0)
                .location("Remote")
                .companyName(savedGlobex.getName())
                .experience(3.0f)
                .jobType(JobType.REMOTE)
                .expiryDate(LocalDate.now().plusDays(45))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j3 = Job.builder()
                .title("Data Scientist")
                .description("Work on ML models and data pipelines.")
                .salary(140000.0)
                .location("San Francisco, CA")
                .companyName(savedGlobex.getName())
                .experience(4.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(30))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j4 = Job.builder()
                .title("Intern - Software Engineering")
                .description("Summer internship for software engineering students.")
                .salary(30000.0)
                .location("New York, NY")
                .companyName(savedAcme.getName())
                .experience(0.0f)
                .jobType(JobType.INTERN)
                .expiryDate(LocalDate.now().plusDays(90))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j5 = Job.builder()
                .title("Part-time Technical Writer")
                .description("Create clear, concise technical documentation.")
                .salary(40000.0)
                .location("Austin, TX")
                .companyName(savedAcme.getName())
                .experience(2.0f)
                .jobType(JobType.PARTTIME)
                .expiryDate(LocalDate.now().plusDays(40))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j6 = Job.builder()
                .title("DevOps Engineer")
                .description("Maintain CI/CD and cloud infrastructure.")
                .salary(130000.0)
                .location("Seattle, WA")
                .companyName(savedGlobex.getName())
                .experience(4.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(50))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j7 = Job.builder()
                .title("Mobile Engineer (iOS/Android)")
                .description("Develop native and cross-platform mobile apps.")
                .salary(125000.0)
                .location("Remote")
                .companyName(savedAcme.getName())
                .experience(3.5f)
                .jobType(JobType.REMOTE)
                .expiryDate(LocalDate.now().plusDays(35))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j8 = Job.builder()
                .title("Cloud Architect")
                .description("Architect scalable cloud solutions and guide engineering teams.")
                .salary(180000.0)
                .location("San Jose, CA")
                .companyName(savedGlobex.getName())
                .experience(8.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(75))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        jobRepository.saveAll(List.of(j1, j2, j3, j4, j5, j6, j7, j8));

        logger.info("DATA INITIALIZER: Inserted sample users={}, companies={}, jobs={}",
                userRepository.count(), companyRepository.count(), jobRepository.count());

    }
}
