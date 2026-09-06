import {
  Card,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Badge,
  Button,
} from '@mantine/core';
import {
  IconBriefcase2,
  IconHeartHandshake,
  IconRocket,
  IconShieldCheck,
  IconDatabase,
  IconBrandReact,
  IconUsers,
  IconBuildingSkyscraper,
  IconAward,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] py-12 px-6 text-white">
      <Container size="lg">
        <Stack gap="xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <Badge color="brightSun" variant="light" size="lg" mb="sm">
              About JobPortal
            </Badge>
            <Title order={1} className="text-4xl font-extrabold text-white tracking-tight">
              Bridging Ambition With <span className="text-bright-sun-400">Opportunity</span>
            </Title>
            <Text c="dimmed" size="md" mt="md" className="leading-relaxed">
              A modern, enterprise-grade job matching platform engineered with Spring Boot, React, and MySQL. Designed to streamline talent acquisition and elevate candidate career journeys.
            </Text>
          </div>

          {/* Metric Stats */}
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mt="md">
            <Paper p="lg" radius="lg" bg="mineShaft.9" withBorder className="border-mine-shaft-700 text-center">
              <IconBriefcase2 className="mx-auto text-bright-sun-400 mb-2" size={28} />
              <Text fw={800} size="2xl" className="text-white">10,000+</Text>
              <Text size="xs" c="dimmed">Verified Active Jobs</Text>
            </Paper>

            <Paper p="lg" radius="lg" bg="mineShaft.9" withBorder className="border-mine-shaft-700 text-center">
              <IconBuildingSkyscraper className="mx-auto text-teal-400 mb-2" size={28} />
              <Text fw={800} size="2xl" className="text-white">500+</Text>
              <Text size="xs" c="dimmed">Partner Tech Companies</Text>
            </Paper>

            <Paper p="lg" radius="lg" bg="mineShaft.9" withBorder className="border-mine-shaft-700 text-center">
              <IconUsers className="mx-auto text-sky-400 mb-2" size={28} />
              <Text fw={800} size="2xl" className="text-white">50,000+</Text>
              <Text size="xs" c="dimmed">Registered Candidates</Text>
            </Paper>

            <Paper p="lg" radius="lg" bg="mineShaft.9" withBorder className="border-mine-shaft-700 text-center">
              <IconAward className="mx-auto text-purple-400 mb-2" size={28} />
              <Text fw={800} size="2xl" className="text-white">98.5%</Text>
              <Text size="xs" c="dimmed">Hiring Satisfaction</Text>
            </Paper>
          </SimpleGrid>

          <Divider my="md" color="mineShaft.7" />

          {/* Core Values */}
          <div>
            <Title order={2} mb="lg" className="text-center text-white">
              Why Choose JobPortal?
            </Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              <Card withBorder radius="lg" p="xl" bg="mineShaft.9" className="border-mine-shaft-700 hover:border-bright-sun-400 transition duration-300">
                <ThemeIcon variant="light" color="brightSun.4" size={48} radius="md" mb="md">
                  <IconRocket size={26} />
                </ThemeIcon>
                <Title order={3} size="h4" className="text-white">Lightning Fast Hiring</Title>
                <Text size="sm" c="dimmed" mt="xs" className="leading-relaxed">
                  Direct recruiter access, 1-click application submissions, instant email notifications, and real-time candidate review pipeline.
                </Text>
              </Card>

              <Card withBorder radius="lg" p="xl" bg="mineShaft.9" className="border-mine-shaft-700 hover:border-teal-400 transition duration-300">
                <ThemeIcon variant="light" color="teal" size={48} radius="md" mb="md">
                  <IconShieldCheck size={26} />
                </ThemeIcon>
                <Title order={3} size="h4" className="text-white">JWT Secure & Role Protected</Title>
                <Text size="sm" c="dimmed" mt="xs" className="leading-relaxed">
                  Enterprise-grade Spring Security 6 with JSON Web Tokens (JWT), BCrypt password hashing, and role-based access control.
                </Text>
              </Card>

              <Card withBorder radius="lg" p="xl" bg="mineShaft.9" className="border-mine-shaft-700 hover:border-sky-400 transition duration-300">
                <ThemeIcon variant="light" color="sky" size={48} radius="md" mb="md">
                  <IconHeartHandshake size={26} />
                </ThemeIcon>
                <Title order={3} size="h4" className="text-white">Skill-First Matching</Title>
                <Text size="sm" c="dimmed" mt="xs" className="leading-relaxed">
                  Custom search filters for experience, salary bracket, job types, and verified company profiles to match the right talent.
                </Text>
              </Card>
            </SimpleGrid>
          </div>

          <Divider my="md" color="mineShaft.7" />

          {/* Tech Stack Banner */}
          <Paper p="xl" radius="xl" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
            <Title order={3} className="text-center text-white mb-6">
              Full Stack Architecture
            </Title>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge size="lg" variant="light" color="blue">Java 21</Badge>
              <Badge size="lg" variant="light" color="green">Spring Boot 4</Badge>
              <Badge size="lg" variant="light" color="cyan">Spring Security & JWT</Badge>
              <Badge size="lg" variant="light" color="teal">Spring Data JPA</Badge>
              <Badge size="lg" variant="light" color="indigo">MySQL Database</Badge>
              <Badge size="lg" variant="light" color="yellow">React.js & TypeScript</Badge>
              <Badge size="lg" variant="light" color="orange">Mantine UI</Badge>
              <Badge size="lg" variant="light" color="pink">Tailwind CSS</Badge>
            </div>
          </Paper>

          {/* CTA Banner */}
          <div className="text-center py-8">
            <Title order={3} className="text-white mb-2">Ready to take the next step in your career?</Title>
            <Text c="dimmed" size="sm" mb="lg">Browse thousands of open roles or post your job to hire top tier developers.</Text>
            <div className="flex justify-center gap-4">
              <Button component={Link} to="/find-jobs" color="brightSun.5" size="md">
                Find Open Jobs
              </Button>
              <Button component={Link} to="/companies" variant="outline" color="brightSun" size="md">
                Explore Companies
              </Button>
            </div>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
