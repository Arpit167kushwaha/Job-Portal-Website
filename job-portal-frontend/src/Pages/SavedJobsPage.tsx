import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Divider,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBookmark,
  IconBookmarkOff,
  IconBriefcase,
  IconClockHour3,
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function SavedJobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/savedJobs', { params: { pageSize: 50 } });
      setJobs(Array.isArray(res.data) ? res.data : res.data?.content || []);
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleUnsave = async (jobId: number) => {
    setActionId(jobId);
    try {
      await API.delete(`/savedJobs/unsave/${jobId}`);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err) {
      console.error('Failed to unsave job:', err);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] py-8 px-6 text-white">
      <Container size="xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <Title order={2} className="text-mine-shaft-100 flex items-center gap-3">
              <IconBookmark className="text-bright-sun-400" size={32} />
              Saved Jobs ({jobs.length})
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Jobs you bookmarked for later review and application.
            </Text>
          </div>
          <Button
            leftSection={<IconBriefcase size={18} />}
            color="brightSun.5"
            onClick={() => navigate('/find-jobs')}
          >
            Find More Jobs
          </Button>
        </div>

        {/* Saved Jobs Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader color="brightSun" size="lg" />
          </div>
        ) : jobs.length === 0 ? (
          <Paper p="xl" radius="md" bg="mineShaft.9" withBorder className="text-center py-16">
            <IconBookmarkOff size={48} className="mx-auto text-mine-shaft-500 mb-3" />
            <Title order={4} className="text-mine-shaft-200">No Saved Jobs</Title>
            <Text c="dimmed" size="sm" mt={2} mb="lg">
              Bookmark interesting opportunities while browsing jobs to see them here.
            </Text>
            <Button color="brightSun.5" onClick={() => navigate('/find-jobs')}>
              Explore Jobs
            </Button>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {jobs.map((job) => (
              <Paper
                key={job.id}
                p="lg"
                radius="md"
                bg="mineShaft.9"
                withBorder
                className="border-mine-shaft-700 flex flex-col justify-between hover:border-bright-sun-400 transition duration-300"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex gap-3 items-center">
                      <div className="p-2 bg-mine-shaft-800 rounded-lg">
                        <img
                          className="h-8 w-8 object-contain"
                          src={`/Icons/${job.companyName || 'Google'}.png`}
                          alt="logo"
                          onError={(e) => (e.currentTarget.src = '/Icons/Google.png')}
                        />
                      </div>
                      <div>
                        <Text fw={600} size="md" className="text-white line-clamp-1">
                          {job.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {job.companyName}
                        </Text>
                      </div>
                    </div>

                    <Button
                      size="xs"
                      color="red"
                      variant="subtle"
                      loading={actionId === job.id}
                      onClick={() => handleUnsave(job.id)}
                    >
                      <IconBookmarkOff size={16} />
                    </Button>
                  </div>

                  <div className="flex gap-2 mb-3 flex-wrap">
                    {job.experience != null && (
                      <Badge color="brightSun" variant="light" size="sm">
                        {job.experience} Yrs Exp
                      </Badge>
                    )}
                    {job.jobType && (
                      <Badge color="blue" variant="light" size="sm">
                        {job.jobType}
                      </Badge>
                    )}
                    {job.location && (
                      <Badge color="gray" variant="light" size="sm">
                        {job.location}
                      </Badge>
                    )}
                  </div>

                  <Text size="xs" c="dimmed" lineClamp={3} mb="md">
                    {job.description}
                  </Text>
                </div>

                <div>
                  <Divider my="sm" color="mineShaft.7" />
                  <div className="flex justify-between items-center mb-3">
                    <Text fw={600} size="sm" className="text-bright-sun-400">
                      ₹{job.salary ? `${job.salary} LPA` : 'N/A'}
                    </Text>
                    <div className="flex items-center gap-1 text-xs text-mine-shaft-400">
                      <IconClockHour3 size={14} />
                      <span>{job.postedDays != null ? `${job.postedDays}d ago` : 'Recent'}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      component={Link}
                      to={`/jobs/${job.id}`}
                      fullWidth
                      variant="outline"
                      color="brightSun"
                      size="xs"
                    >
                      View
                    </Button>
                    <Button
                      component={Link}
                      to={`/apply-job/${job.id}`}
                      fullWidth
                      color="brightSun.5"
                      size="xs"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Paper>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </div>
  );
}
