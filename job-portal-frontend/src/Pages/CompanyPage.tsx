import React, { useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  SegmentedControl,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBuildingSkyscraper,
  IconExternalLink,
  IconMapPin,
  IconSearch,
  IconStarFilled,
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';

const topCompanies = [
  {
    id: 1,
    name: 'Google',
    industry: 'Tech & Cloud',
    location: 'Bangalore / Mountain View',
    rating: 4.8,
    reviews: '12.4k',
    description: 'Pioneering search, artificial intelligence, cloud computing, and consumer tech hardware.',
    openJobs: 8,
    website: 'https://careers.google.com',
  },
  {
    id: 2,
    name: 'Microsoft',
    industry: 'Enterprise Software & Cloud',
    location: 'Hyderabad / Redmond',
    rating: 4.7,
    reviews: '18.1k',
    description: 'Empowering people and businesses through Azure, Microsoft 365, GitHub, and AI copilots.',
    openJobs: 6,
    website: 'https://careers.microsoft.com',
  },
  {
    id: 3,
    name: 'Amazon',
    industry: 'E-Commerce & AWS Cloud',
    location: 'Bangalore / Seattle',
    rating: 4.6,
    reviews: '24.9k',
    description: 'World-leading global marketplace, logistics infrastructure, and AWS cloud ecosystem.',
    openJobs: 11,
    website: 'https://amazon.jobs',
  },
  {
    id: 4,
    name: 'Netflix',
    industry: 'Media & Streaming Tech',
    location: 'Mumbai / Los Gatos',
    rating: 4.9,
    reviews: '5.2k',
    description: 'Global streaming platform delivering award-winning films, series, and high-scale distribution.',
    openJobs: 4,
    website: 'https://jobs.netflix.com',
  },
  {
    id: 5,
    name: 'Meta',
    industry: 'Social Media & VR/AR',
    location: 'Gurgaon / Menlo Park',
    rating: 4.5,
    reviews: '8.7k',
    description: 'Connecting billions of people through Instagram, WhatsApp, Facebook, and the Metaverse.',
    openJobs: 5,
    website: 'https://metacareers.com',
  },
  {
    id: 6,
    name: 'Apple',
    industry: 'Consumer Electronics & Services',
    location: 'Hyderabad / Cupertino',
    rating: 4.8,
    reviews: '15.6k',
    description: 'Designing revolutionary devices like iPhone, Mac, and services like Apple Pay and Cloud.',
    openJobs: 7,
    website: 'https://jobs.apple.com',
  },
  {
    id: 7,
    name: 'Spotify',
    industry: 'Audio Streaming Tech',
    location: 'Remote / Stockholm',
    rating: 4.7,
    reviews: '4.1k',
    description: 'Unlocking the potential of human creativity by connecting audio creators and music listeners worldwide.',
    openJobs: 3,
    website: 'https://spotifyjobs.com',
  },
  {
    id: 8,
    name: 'Oracle',
    industry: 'Cloud Database & ERP',
    location: 'Bangalore / Austin',
    rating: 4.4,
    reviews: '9.8k',
    description: 'Leader in autonomous databases, enterprise cloud infrastructure, and business applications.',
    openJobs: 6,
    website: 'https://oracle.com/careers',
  },
];

export default function CompanyPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');

  const filteredCompanies = topCompanies.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.industry.toLowerCase().includes(search.toLowerCase()) ||
      comp.location.toLowerCase().includes(search.toLowerCase());

    if (category === 'ALL') return matchesSearch;
    if (category === 'CLOUD') return matchesSearch && comp.industry.includes('Cloud');
    if (category === 'STREAMING') return matchesSearch && comp.industry.includes('Streaming');
    if (category === 'ENTERPRISE') return matchesSearch && (comp.industry.includes('Enterprise') || comp.industry.includes('Database'));
    return matchesSearch;
  });

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] py-8 px-6 text-white">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to="/find-jobs">
                <Button size="xs" variant="subtle" color="gray" leftSection={<IconArrowLeft size={16} />}>
                  Back to Jobs
                </Button>
              </Link>
            </div>
            <Title order={1} className="text-white flex items-center gap-3">
              <IconBuildingSkyscraper className="text-bright-sun-400" size={36} />
              Top Hiring Companies
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Explore verified technology companies, work culture, open vacancies, and perks.
            </Text>
          </div>

          <div className="w-full md:w-80">
            <TextInput
              placeholder="Search companies by name or tech..."
              leftSection={<IconSearch size={16} className="text-mine-shaft-400" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              styles={{
                input: { backgroundColor: 'var(--mantine-color-mineShaft-9)', borderColor: 'var(--mantine-color-mineShaft-7)' },
              }}
            />
          </div>
        </div>

        {/* Filter Segment */}
        <div className="mb-8">
          <SegmentedControl
            value={category}
            onChange={setCategory}
            data={[
              { label: `All Companies (${topCompanies.length})`, value: 'ALL' },
              { label: 'Cloud & Infrastructure', value: 'CLOUD' },
              { label: 'Media & Streaming', value: 'STREAMING' },
              { label: 'Enterprise Software', value: 'ENTERPRISE' },
            ]}
            color="brightSun"
            bg="mineShaft.9"
            styles={{
              root: { border: '1px solid var(--mantine-color-mineShaft-7)' },
            }}
          />
        </div>

        {/* Companies Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {filteredCompanies.map((company) => (
            <Paper
              key={company.id}
              p="lg"
              radius="lg"
              bg="mineShaft.9"
              withBorder
              className="border-mine-shaft-700 hover:border-bright-sun-400 transition duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div className="p-3 bg-mine-shaft-800 rounded-xl group-hover:scale-105 transition">
                    <img
                      className="h-10 w-10 object-contain"
                      src={`/Icons/${company.name}.png`}
                      alt={company.name}
                      onError={(e) => (e.currentTarget.src = '/Icons/Google.png')}
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-full text-amber-400 text-xs font-semibold">
                    <IconStarFilled size={12} />
                    <span>{company.rating}</span>
                    <span className="text-mine-shaft-400 font-normal">({company.reviews})</span>
                  </div>
                </div>

                <Text fw={700} size="lg" className="text-white group-hover:text-bright-sun-400 transition">
                  {company.name}
                </Text>
                <Badge color="brightSun" variant="light" size="xs" mt={4} mb="xs">
                  {company.industry}
                </Badge>

                <div className="flex items-center gap-1 text-xs text-mine-shaft-400 mb-3">
                  <IconMapPin size={14} />
                  <span>{company.location}</span>
                </div>

                <Text size="xs" c="dimmed" lineClamp={3} mb="md">
                  {company.description}
                </Text>
              </div>

              <div>
                <div className="flex justify-between items-center pt-3 border-t border-mine-shaft-800 mb-3">
                  <Text size="xs" c="dimmed">
                    Openings:
                  </Text>
                  <Text size="xs" fw={700} className="text-teal-400">
                    {company.openJobs} Active Roles
                  </Text>
                </div>

                <div className="flex gap-2">
                  <Button
                    component="a"
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    variant="subtle"
                    color="gray"
                    size="xs"
                    leftSection={<IconExternalLink size={14} />}
                  >
                    Site
                  </Button>
                  <Button
                    component={Link}
                    to={`/find-jobs?company=${company.name}`}
                    fullWidth
                    color="brightSun.5"
                    size="xs"
                    className="font-medium"
                  >
                    Explore Jobs
                  </Button>
                </div>
              </div>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
