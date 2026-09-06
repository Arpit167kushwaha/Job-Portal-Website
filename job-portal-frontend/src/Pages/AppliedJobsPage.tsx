import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconEye,
  IconSend,
  IconX,
  IconMapPin,
  IconCurrencyRupee
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function AppliedJobsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [withdrawId, setWithdrawId] = useState<number | null>(null);
  const [withdrawing, setWithdrawing] = useState(false);

  const fetchApplicationsData = async () => {
    setLoading(true);
    try {
      const [statsRes, appsRes] = await Promise.allSettled([
        API.get('/applications/dashboard/candidate'),
        API.get('/applications/applied'),
      ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data);
      }
      if (appsRes.status === 'fulfilled') {
        setApplications(appsRes.value.data || []);
      }
    } catch (err) {
      console.error('Failed to load application data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationsData();
  }, []);

  const handleWithdraw = async () => {
    if (!withdrawId) return;
    setWithdrawing(true);
    try {
      await API.put(`/applications/withdraw/${withdrawId}`);
      setApplications((prev) =>
        prev.map((app) => (app.applicationId === withdrawId ? { ...app, applicationStatus: 'WITHDRAWN' } : app))
      );
      setWithdrawId(null);
      fetchApplicationsData();
    } catch (err: any) {
      console.error('Failed to withdraw application:', err);
      alert(err.response?.data?.message || 'Could not withdraw application.');
    } finally {
      setWithdrawing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELECTED':
        return <Badge color="green" variant="filled" size="md">Selected 🎉</Badge>;
      case 'REJECTED':
        return <Badge color="red" variant="filled" size="md">Rejected</Badge>;
      case 'WITHDRAWN':
        return <Badge color="gray" variant="light" size="md">Withdrawn</Badge>;
      default:
        return <Badge color="yellow" variant="light" size="md">In Review</Badge>;
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'ALL') return true;
    return app.applicationStatus === filter;
  });

  return (
    <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] py-8 px-6 text-white">
      <Container size="xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Title order={2} className="text-mine-shaft-100 flex items-center gap-3">
              <IconSend className="text-bright-sun-400" size={32} />
              My Job Applications
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Track your submitted applications, interviews, and status updates.
            </Text>
          </div>
          <Button
            leftSection={<IconBriefcase size={18} />}
            color="brightSun.5"
            onClick={() => navigate('/find-jobs')}
          >
            Explore More Jobs
          </Button>
        </div>

        {/* Metric Cards */}
        {stats && (
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="xl">
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Applied</Text>
              <Text fw={700} size="xl" className="text-bright-sun-400 mt-1">{stats.totalApplied ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Pending / In Review</Text>
              <Text fw={700} size="xl" className="text-yellow-400 mt-1">{stats.pending ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Selected</Text>
              <Text fw={700} size="xl" className="text-green-400 mt-1">{stats.selected ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Rejected</Text>
              <Text fw={700} size="xl" className="text-red-400 mt-1">{stats.rejected ?? 0}</Text>
            </Paper>
          </SimpleGrid>
        )}

        {/* Filter Tabs */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            data={[
              { label: `All (${applications.length})`, value: 'ALL' },
              { label: 'In Review', value: 'PENDING' },
              { label: 'Selected', value: 'SELECTED' },
              { label: 'Rejected', value: 'REJECTED' },
              { label: 'Withdrawn', value: 'WITHDRAWN' },
            ]}
            color="brightSun"
            bg="mineShaft.9"
            styles={{
              root: { border: '1px solid var(--mantine-color-mineShaft-7)' },
            }}
          />
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader color="brightSun" size="lg" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <Paper p="xl" radius="md" bg="mineShaft.9" withBorder className="text-center py-16">
            <IconSend size={48} className="mx-auto text-mine-shaft-500 mb-3" />
            <Title order={4} className="text-mine-shaft-200">No Applications Found</Title>
            <Text c="dimmed" size="sm" mt={2} mb="lg">
              {filter === 'ALL'
                ? 'You have not applied for any jobs yet. Start exploring now!'
                : `No applications with status "${filter}".`}
            </Text>
            <Button color="brightSun.5" onClick={() => navigate('/find-jobs')}>
              Find Jobs
            </Button>
          </Paper>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredApplications.map((app) => (
              <Paper
                key={app.applicationId}
                p="lg"
                radius="md"
                bg="mineShaft.9"
                withBorder
                className="border-mine-shaft-700 hover:border-mine-shaft-500 transition duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl hidden sm:block">
                      <img
                        className="h-10 w-10 object-contain"
                        src={`/Icons/${app.company || 'Google'}.png`}
                        alt="logo"
                        onError={(e) => (e.currentTarget.src = '/Icons/Google.png')}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Text fw={600} size="lg" className="text-white">
                          {app.title}
                        </Text>
                        {getStatusBadge(app.applicationStatus)}
                      </div>

                      <div className="flex gap-4 mt-2 text-xs text-mine-shaft-300 flex-wrap">
                        <span>🏢 {app.company || 'N/A'}</span>
                        <span className="flex items-center gap-1">
                          <IconMapPin size={13} />
                          {app.location || 'Remote'}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconCurrencyRupee size={13} />
                          {app.salary ? `${app.salary} LPA` : 'N/A'}
                        </span>
                        {app.experience != null && <span>💼 {app.experience} Yrs Exp</span>}
                        {app.jobType && <Badge color="gray" variant="outline" size="xs">{app.jobType}</Badge>}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      component={Link}
                      to={`/jobs/${app.jobId}`}
                      leftSection={<IconEye size={16} />}
                      color="brightSun.5"
                      variant="light"
                      size="sm"
                    >
                      Job Details
                    </Button>

                    {app.applicationStatus === 'PENDING' && (
                      <Button
                        leftSection={<IconX size={16} />}
                        color="red"
                        variant="subtle"
                        size="sm"
                        onClick={() => setWithdrawId(app.applicationId)}
                      >
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              </Paper>
            ))}
          </div>
        )}

        {/* Withdraw Confirmation Modal */}
        <Modal
          opened={!!withdrawId}
          onClose={() => setWithdrawId(null)}
          title="Withdraw Job Application"
          centered
          styles={{
            content: { backgroundColor: 'var(--mantine-color-mineShaft-9)' },
            header: { backgroundColor: 'var(--mantine-color-mineShaft-9)' },
          }}
        >
          <Text size="sm" c="dimmed" mb="lg">
            Are you sure you want to withdraw your application for this position? You will need to re-apply if you change your mind.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setWithdrawId(null)}>
              Cancel
            </Button>
            <Button color="red" loading={withdrawing} onClick={handleWithdraw}>
              Withdraw Application
            </Button>
          </Group>
        </Modal>
      </Container>
    </div>
  );
}
