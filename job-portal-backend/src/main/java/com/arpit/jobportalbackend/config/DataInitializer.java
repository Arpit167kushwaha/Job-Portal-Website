package com.arpit.jobportalbackend.config;

import com.arpit.jobportalbackend.model.*;
import com.arpit.jobportalbackend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ApplicationRepository applicationRepository,
                           SavedJobRepository savedJobRepository,
                           JobRepository jobRepository,
                           CompanyRepository companyRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.applicationRepository = applicationRepository;
        this.savedJobRepository = savedJobRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            logger.info("DATA INITIALIZER: Existing database records found. Skipping seed.");
            return;
        }

        logger.info("DATA INITIALIZER: Seeding initial sample data with secure BCrypt passwords...");

        // Sample Recruiter
        User recruiter = User.builder()
                .name("Arpit Recruiter")
                .email("recruiter@google.com")
                .password(passwordEncoder.encode("password123"))
                .role(Role.RECRUITER)
                .companyName("Google")
                .experience(6.0f)
                .skills("Tech Recruiting, Leadership, Talent Acquisition")
                .build();

        // Sample Candidate
        User candidate = User.builder()
                .name("Arpit Candidate")
                .email("candidate@dev.com")
                .password(passwordEncoder.encode("password123"))
                .role(Role.CANDIDATE)
                .experience(3.0f)
                .skills("Java, Spring Boot, React, TypeScript, MySQL, Docker")
                .companyName("Freelance")
                .build();

        List<User> savedUsers = userRepository.saveAll(List.of(recruiter, candidate));
        User savedRecruiter = savedUsers.get(0);
        User savedCandidate = savedUsers.get(1);

        // Companies
        Company google = Company.builder()
                .name("Google")
                .description("World's leading technology company specializing in search, cloud computing, and AI.")
                .location("Bangalore, India")
                .website("https://careers.google.com")
                .createdBy(savedRecruiter)
                .build();

        Company microsoft = Company.builder()
                .name("Microsoft")
                .description("Empowering every person and organization on the planet to achieve more.")
                .location("Hyderabad, India")
                .website("https://careers.microsoft.com")
                .createdBy(savedRecruiter)
                .build();

        Company amazon = Company.builder()
                .name("Amazon")
                .description("Earth's most customer-centric company and pioneer of AWS cloud infrastructure.")
                .location("Bangalore, India")
                .website("https://amazon.jobs")
                .createdBy(savedRecruiter)
                .build();

        companyRepository.saveAll(List.of(google, microsoft, amazon));

        // Sample Jobs
        Job j1 = Job.builder()
                .title("Senior Full Stack Java Engineer")
                .description("<h4>About the Role</h4><p>We are seeking a talented Senior Full Stack Engineer to architect high-performance distributed microservices using Spring Boot, React.js, and Cloud Native technologies.</p><h4>Requirements</h4><ul><li>5+ years of hands-on Java & Spring Boot experience</li><li>Proficiency with modern React, TypeScript, and REST APIs</li><li>Deep knowledge of MySQL, Redis, and JPA performance tuning</li><li>Experience with Docker and CI/CD pipelines</li></ul>")
                .salary(28.0)
                .location("Bangalore, India")
                .companyName("Google")
                .experience(5.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(60))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j2 = Job.builder()
                .title("Frontend Developer (React & TypeScript)")
                .description("<h4>About the Role</h4><p>Join our core web experience team building responsive, accessible, and fast interfaces for millions of users worldwide.</p><h4>Requirements</h4><ul><li>3+ years with React.js, TypeScript, and modern CSS/Tailwind</li><li>Experience with state management and WebSockets</li><li>Passion for clean UI/UX and micro-interactions</li></ul>")
                .salary(18.0)
                .location("Remote")
                .companyName("Microsoft")
                .experience(3.0f)
                .jobType(JobType.REMOTE)
                .expiryDate(LocalDate.now().plusDays(45))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j3 = Job.builder()
                .title("Cloud DevOps & Infrastructure Engineer")
                .description("<h4>About the Role</h4><p>Automate, scale, and secure our global multi-cloud infrastructure and continuous integration pipelines.</p><h4>Requirements</h4><ul><li>Expertise with Kubernetes, Docker, and Terraform</li><li>Experience monitoring distributed microservices with Prometheus & Grafana</li><li>Strong scripting in Python or Bash</li></ul>")
                .salary(24.0)
                .location("Hyderabad, India")
                .companyName("Amazon")
                .experience(4.0f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(50))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j4 = Job.builder()
                .title("Software Engineering Intern (Summer 2026)")
                .description("<h4>About the Role</h4><p>Exciting 6-month internship opportunity for passionate learners to work directly on customer-facing features alongside senior engineering mentors.</p><h4>Requirements</h4><ul><li>Pursuing B.Tech / M.Tech in Computer Science or related field</li><li>Strong understanding of Data Structures and Algorithms</li><li>Foundational knowledge of Java, Spring Boot, or React</li></ul>")
                .salary(6.0)
                .location("Bangalore, India")
                .companyName("Google")
                .experience(0.0f)
                .jobType(JobType.INTERN)
                .expiryDate(LocalDate.now().plusDays(90))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j5 = Job.builder()
                .title("Backend Engineer - Spring Cloud & Microservices")
                .description("<h4>About the Role</h4><p>Build enterprise cloud services with high throughput, low latency, and robust fault-tolerance.</p><h4>Requirements</h4><ul><li>Strong background in Java 21, Spring Boot 3, and Spring Security</li><li>Experience designing resilient event-driven systems with Kafka</li><li>Understanding of database partitioning and caching</li></ul>")
                .salary(22.0)
                .location("Pune, India")
                .companyName("Netflix")
                .experience(3.5f)
                .jobType(JobType.FULLTIME)
                .expiryDate(LocalDate.now().plusDays(40))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        Job j6 = Job.builder()
                .title("Part-Time Technical Content & API Writer")
                .description("<h4>About the Role</h4><p>Author developer guides, API specifications, and SDK documentation for our developer platform.</p><h4>Requirements</h4><ul><li>2+ years experience in technical documentation or software engineering</li><li>Ability to write clean, concise Markdown and code examples</li></ul>")
                .salary(8.0)
                .location("Remote")
                .companyName("Spotify")
                .experience(2.0f)
                .jobType(JobType.PARTTIME)
                .expiryDate(LocalDate.now().plusDays(30))
                .postedBy(savedRecruiter)
                .jobStatus(JobStatus.ACTIVE)
                .build();

        List<Job> savedJobs = jobRepository.saveAll(List.of(j1, j2, j3, j4, j5, j6));

        // Sample application & bookmark
        Application sampleApp = Application.builder()
                .job(savedJobs.get(0))
                .user(savedCandidate)
                .status(ApplicationStatus.PENDING)
                .build();
        applicationRepository.save(sampleApp);

        SavedJob sampleSaved = new SavedJob();
        sampleSaved.setJob(savedJobs.get(1));
        sampleSaved.setUser(savedCandidate);
        savedJobRepository.save(sampleSaved);

        logger.info("DATA INITIALIZER: Successfully initialized {} users, {} jobs, and sample applications.",
                userRepository.count(), jobRepository.count());
    }
}
