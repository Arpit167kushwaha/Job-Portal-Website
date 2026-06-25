import { Alert, Button, Container, Paper, Stack, Switch, Text, TextInput, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('/user/me')
      .then((res) => {
        setName(res?.data?.name || '');
        setResumeUrl(res?.data?.resumeUrl || '');
      })
      .catch(() => {
        setStatus('Unable to load settings right now.');
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus('');

    try {
      const form = new FormData();
      form.append('name', name || '');
      form.append('resumeUrl', resumeUrl || '');
      await API.put('/user/update', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('Settings updated successfully.');
    } catch (error) {
      setStatus('Could not update settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container size="sm" my={40}>
      <Paper withBorder shadow="sm" p="lg" radius="md" bg="mineShaft.9">
        <Stack gap="md">
          <Title order={2}>Account Settings</Title>
          <Text size="sm" c="dimmed">
            Manage your profile details and preferences.
          </Text>

          <TextInput label="Display Name" value={name} onChange={(event) => setName(event.currentTarget.value)} />
          <TextInput
            label="Resume URL"
            placeholder="https://your-resume-link"
            value={resumeUrl}
            onChange={(event) => setResumeUrl(event.currentTarget.value)}
          />
          <Switch
            checked={emailAlerts}
            onChange={(event) => setEmailAlerts(event.currentTarget.checked)}
            label="Email me for new matching jobs"
          />

          {status && (
            <Alert variant="light" color={status.includes('success') ? 'green' : 'yellow'}>
              {status}
            </Alert>
          )}

          <Button leftSection={<IconCheck size={18} />} onClick={handleSave} loading={saving} color="brightSun.4">
            Save Settings
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
