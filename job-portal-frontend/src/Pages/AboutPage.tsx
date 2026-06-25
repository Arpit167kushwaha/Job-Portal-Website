import { Card, Container, Divider, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconBriefcase2, IconHeartHandshake, IconRocket } from '@tabler/icons-react';

export default function AboutPage() {
  return (
    <Container size="lg" my={40}>
      <Stack gap="lg">
        <Title order={1} c="brightSun.4">About JobHook</Title>
        <Text c="dimmed">
          JobHook helps candidates discover meaningful opportunities and helps recruiters hire faster with clear profiles, simple workflows, and real-time applications.
        </Text>

        <Divider />

        <Group grow align="stretch">
          <Card withBorder radius="md" p="lg" bg="mineShaft.9">
            <ThemeIcon variant="light" color="brightSun.4" size="lg" mb="sm">
              <IconRocket size={20} />
            </ThemeIcon>
            <Title order={4}>Our Mission</Title>
            <Text size="sm" c="dimmed" mt="xs">
              Make hiring transparent and skill-first for everyone, whether you are applying for your first role or building a fast-growing team.
            </Text>
          </Card>

          <Card withBorder radius="md" p="lg" bg="mineShaft.9">
            <ThemeIcon variant="light" color="brightSun.4" size="lg" mb="sm">
              <IconBriefcase2 size={20} />
            </ThemeIcon>
            <Title order={4}>What We Offer</Title>
            <Text size="sm" c="dimmed" mt="xs">
              Smart job discovery, profile management, recruiter posting tools, and a direct application flow designed for speed.
            </Text>
          </Card>

          <Card withBorder radius="md" p="lg" bg="mineShaft.9">
            <ThemeIcon variant="light" color="brightSun.4" size="lg" mb="sm">
              <IconHeartHandshake size={20} />
            </ThemeIcon>
            <Title order={4}>Our Promise</Title>
            <Text size="sm" c="dimmed" mt="xs">
              Build a trustworthy platform that values candidate experience, recruiter productivity, and practical outcomes.
            </Text>
          </Card>
        </Group>
      </Stack>
    </Container>
  );
}
