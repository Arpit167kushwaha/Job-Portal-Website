import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Loader,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconCheck,
  IconEye,
  IconFileText,
  IconMail,
  IconPlus,
  IconTrash,
  IconUsers,
  IconX,
  IconBan
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function PostedJobsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, jobsRes] = await Promise.allSettled([
        API.get('/applications/dashboard/recruiter'),
        API.get('/jobs/recruiter', { params: { pageSize: 50 } }),
      ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data);
      }
      if (jobsRes.status === 'fulfilled') {
        setJobs(Array.isArray(jobsRes.value.data) ? jobsRes.value.data : jobsRes.value.data?.content || []);
      }
    } catch (err) {
      console.error('Failed to load recruiter data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const openApplicantsDrawer = async (job: any) => {
    setSelectedJob(job);
    setDrawerOpen(true);
    setLoadingApplicants(true);
    try {
      const res = await API.get(`/applications/job/${job.id}`);
      setApplicants(res.data || []);
    } catch (err) {
      console.error('Failed to fetch applicants:', err);
      setApplicants([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const handleSelectCandidate = async (applicationId: number) => {
    setActionLoading(applicationId);
    try {
      await API.put(`/applications/select/${applicationId}`);
      setApplicants((prev) =>
        prev.map((app) => (app.applicationId === applicationId ? { ...app, status: 'SELECTED' } : app))
      );
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to select candidate:', err);
      alert('Failed to update candidate status.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectCandidate = async (applicationId: number) => {
    setActionLoading(applicationId);
    try {
      await API.put(`/applications/reject/${applicationId}`);
      setApplicants((prev) =>
        prev.map((app) => (app.applicationId === applicationId ? { ...app, status: 'REJECTED' } : app))
      );
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to reject candidate:', err);
      alert('Failed to update candidate status.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCloseJob = async (jobId: number) => {
    try {
      await API.put(`/jobs/recruiter/close/${jobId}`);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, jobStatus: 'CLOSED' } : j)));
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to close job:', err);
      alert('Could not close the job.');
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    try {
      await API.delete(`/jobs/recruiter/delete/${jobId}`);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      setDeleteConfirmId(null);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Could not delete the job.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELECTED':
        return <Badge color="green" variant="filled">Selected</Badge>;
      case 'REJECTED':
        return <Badge color="red" variant="filled">Rejected</Badge>;
      case 'WITHDRAWN':
        return <Badge color="gray" variant="light">Withdrawn</Badge>;
      default:
        return <Badge color="yellow" variant="light">Pending Review</Badge>;
    }
  };

  return (
    <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] py-8 px-6 text-white">
      <Container size="xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Title order={2} className="text-mine-shaft-100 flex items-center gap-3">
              <IconBriefcase className="text-bright-sun-400" size={32} />
              Recruiter Job Management
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              Manage your job listings, track applicants, and make hiring decisions.
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={18} />}
            color="brightSun.5"
            onClick={() => navigate('/post-job')}
            className="!shadow-md"
          >
            Post New Job
          </Button>
        </div>

        {/* Metric Cards */}
        {stats && (
          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md" mb="xl">
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Jobs</Text>
              <Text fw={700} size="xl" className="text-bright-sun-400 mt-1">{stats.totalJobs ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Active Jobs</Text>
              <Text fw={700} size="xl" className="text-teal-400 mt-1">{stats.activeJobs ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Applicants</Text>
              <Text fw={700} size="xl" className="text-sky-400 mt-1">{stats.totalApplicants ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>In Review</Text>
              <Text fw={700} size="xl" className="text-yellow-400 mt-1">{stats.pendingCandidates ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Selected</Text>
              <Text fw={700} size="xl" className="text-green-400 mt-1">{stats.selectedCandidates ?? 0}</Text>
            </Paper>
            <Paper p="md" radius="md" bg="mineShaft.9" withBorder className="border-mine-shaft-700">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Rejected</Text>
              <Text fw={700} size="xl" className="text-red-400 mt-1">{stats.rejectedCandidates ?? 0}</Text>
            </Paper>
          </SimpleGrid>
        )}

        {/* Jobs List */}
        <Title order={3} mb="md" className="text-mine-shaft-100">
          Your Posted Jobs ({jobs.length})
        </Title>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader color="brightSun" size="lg" />
          </div>
        ) : jobs.length === 0 ? (
          <Paper p="xl" radius="md" bg="mineShaft.9" withBorder className="text-center py-16">
            <IconBriefcase size={48} className="mx-auto text-mine-shaft-500 mb-3" />
            <Title order={4} className="text-mine-shaft-200">No Jobs Posted Yet</Title>
            <Text c="dimmed" size="sm" mt={2} mb="lg">
              Start hiring talent by creating your first job post.
            </Text>
            <Button color="brightSun.5" onClick={() => navigate('/post-job')}>
              Post a Job Now
            </Button>
          </Paper>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Paper
                key={job.id}
                p="lg"
                radius="md"
                bg="mineShaft.9"
                withBorder
                className="border-mine-shaft-700 hover:border-mine-shaft-500 transition duration-200"
              >
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl hidden sm:block">
                      <img
                        className="h-10 w-10 object-contain"
                        src={`/Icons/${job.companyName || 'Google'}.png`}
                        alt="logo"
                        onError={(e) => (e.currentTarget.src = '/Icons/Google.png')}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Text fw={600} size="lg" className="text-white">
                          {job.title}
                        </Text>
                        <Badge
                          color={job.jobStatus === 'ACTIVE' ? 'teal' : 'gray'}
                          variant="light"
                        >
                          {job.jobStatus || 'ACTIVE'}
                        </Badge>
                        <Badge color="brightSun" variant="outline">
                          {job.jobType || 'FULLTIME'}
                        </Badge>
                      </div>

                      <div className="flex gap-4 mt-2 text-xs text-mine-shaft-300 flex-wrap">
                        <span>🏢 {job.companyName || 'N/A'}</span>
                        <span>📍 {job.location || 'Remote'}</span>
                        <span>💼 {job.experience ?? 0} Yrs Exp</span>
                        <span>💰 ₹{job.salary ? `${job.salary} LPA` : 'N/A'}</span>
                        <span>📅 Expiry: {job.expiryDate || '30 days'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button
                      leftSection={<IconUsers size={16} />}
                      color="sky"
                      variant="light"
                      size="sm"
                      onClick={() => openApplicantsDrawer(job)}
                    >
                      Applicants ({job.applicantsCount ?? 0})
                    </Button>

                    <Button
                      component={Link}
                      to={`/jobs/${job.id}`}
                      leftSection={<IconEye size={16} />}
                      color="gray"
                      variant="subtle"
                      size="sm"
                    >
                      View
                    </Button>

                    {job.jobStatus === 'ACTIVE' && (
                      <Button
                        leftSection={<IconBan size={16} />}
                        color="yellow"
                        variant="subtle"
                        size="sm"
                        onClick={() => handleCloseJob(job.id)}
                      >
                        Close Job
                      </Button>
                    )}

                    <Button
                      leftSection={<IconTrash size={16} />}
                      color="red"
                      variant="subtle"
                      size="sm"
                      onClick={() => setDeleteConfirmId(job.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Paper>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          opened={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Confirm Job Deletion"
          centered
          styles={{
            content: { backgroundColor: 'var(--mantine-color-mineShaft-9)' },
            header: { backgroundColor: 'var(--mantine-color-mineShaft-9)' },
          }}
        >
          <Text size="sm" c="dimmed" mb="lg">
            Are you sure you want to delete this job listing? This will also remove all candidate applications associated with it.
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => deleteConfirmId && handleDeleteJob(deleteConfirmId)}
            >
              Delete Permanently
            </Button>
          </Group>
        </Modal>

        {/* Applicants Drawer */}
        <Drawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={
            <div>
              <Title order={4} className="text-white">
                Applicants for: {selectedJob?.title}
              </Title>
              <Text size="xs" c="dimmed">
                {applicants.length} Total Candidate Applications
              </Text>
            </div>
          }
          position="right"
          size="xl"
          styles={{
            content: { backgroundColor: 'var(--mantine-color-mineShaft-9)', color: '#fff' },
            header: { backgroundColor: 'var(--mantine-color-mineShaft-9)', borderBottom: '1px solid #333' },
          }}
        >
          <Divider my="sm" color="mineShaft.7" />

          {loadingApplicants ? (
            <div className="flex justify-center py-20">
              <Loader color="brightSun" />
            </div>
          ) : applicants.length === 0 ? (
            <div className="text-center py-16">
              <IconUsers size={40} className="mx-auto text-mine-shaft-500 mb-2" />
              <Text c="dimmed">No candidates have applied for this job yet.</Text>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {applicants.map((app) => (
                <Paper
                  key={app.applicationId}
                  p="md"
                  radius="md"
                  bg="mineShaft.8"
                  withBorder
                  className="border-mine-shaft-700"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Text fw={600} size="md" className="text-white">
                          {app.name || 'Anonymous Candidate'}
                        </Text>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-mine-shaft-300 mt-1">
                        <IconMail size={14} />
                        <a href={`mailto:${app.email}`} className="text-sky-400 hover:underline">
                          {app.email}
                        </a>
                      </div>
                      {app.skills && (
                        <Text size="xs" c="dimmed" mt={1}>
                          <span className="font-semibold text-mine-shaft-200">Skills:</span> {app.skills}
                        </Text>
                      )}
                      {app.experience != null && (
                        <Text size="xs" c="dimmed">
                          <span className="font-semibold text-mine-shaft-200">Experience:</span> {app.experience} Years
                        </Text>
                      )}
                    </div>

                    {app.resumeUrl && (
                      <Button
                        component="a"
                        href={app.resumeUrl.startsWith('http') ? app.resumeUrl : `${API.defaults.baseURL}${app.resumeUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        leftSection={<IconFileText size={14} />}
                        size="xs"
                        variant="outline"
                        color="brightSun"
                      >
                        Resume
                      </Button>
                    )}
                  </div>

                  {app.status !== 'WITHDRAWN' && (
                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-mine-shaft-700">
                      <Button
                        leftSection={<IconCheck size={14} />}
                        size="xs"
                        color="green"
                        variant={app.status === 'SELECTED' ? 'filled' : 'light'}
                        loading={actionLoading === app.applicationId}
                        onClick={() => handleSelectCandidate(app.applicationId)}
                        disabled={app.status === 'SELECTED'}
                      >
                        {app.status === 'SELECTED' ? 'Selected' : 'Select Candidate'}
                      </Button>

                      <Button
                        leftSection={<IconX size={14} />}
                        size="xs"
                        color="red"
                        variant={app.status === 'REJECTED' ? 'filled' : 'light'}
                        loading={actionLoading === app.applicationId}
                        onClick={() => handleRejectCandidate(app.applicationId)}
                        disabled={app.status === 'REJECTED'}
                      >
                        {app.status === 'REJECTED' ? 'Rejected' : 'Reject'}
                      </Button>
                    </div>
                  )}
                </Paper>
              ))}
            </div>
          )}
        </Drawer>
      </Container>
    </div>
  );
}
