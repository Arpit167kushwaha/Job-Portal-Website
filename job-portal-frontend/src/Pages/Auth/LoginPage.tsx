import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Alert,
  Divider,
  Badge,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconLock,
  IconMail,
  IconSparkles,
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axiosInstance';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (val: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!val) {
      setEmailError('Email address is required.');
      return false;
    }
    if (!emailRegex.test(val)) {
      setEmailError('Please enter a valid email address (e.g. name@domain.com).');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('Password is required.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setEmailError('');
    setPasswordError('');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (response.data && response.data.jwtToken) {
        localStorage.setItem('token', response.data.jwtToken);
        if (response.data.role) localStorage.setItem('role', response.data.role);
        if (response.data.name) localStorage.setItem('name', response.data.name);
        if (response.data.email) localStorage.setItem('email', response.data.email);

        window.dispatchEvent(new Event('authChange'));

        if (response.data.role === 'RECRUITER') {
          navigate('/posted-jobs');
        } else {
          navigate('/find-jobs');
        }
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-mine-shaft-950 font-['poppins']">
      <Container size={440} className="w-full">
        <div className="text-center mb-6">
          <Title order={2} className="font-bold text-white tracking-wide">
            Welcome Back to <span className="text-bright-sun-400">JobPortal</span>
          </Title>
          <Text c="dimmed" size="sm" mt={6}>
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-bright-sun-400 hover:underline font-medium">
              Create an account
            </Link>
          </Text>
        </div>

        <Paper withBorder shadow="xl" p={32} radius="lg" bg="mineShaft.9" className="border-mine-shaft-700 backdrop-blur-md">
          {/* 1-Click Demo Accounts for Interview */}
          <div className="mb-5 p-3 rounded-xl bg-mine-shaft-800 border border-mine-shaft-700">
            <div className="flex items-center gap-1.5 text-xs text-bright-sun-400 font-semibold mb-2">
              <IconSparkles size={14} /> Quick Demo Logins:
            </div>
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="light"
                color="blue"
                fullWidth
                onClick={() => fillDemoAccount('recruiter@google.com', 'password123')}
              >
                Recruiter Demo
              </Button>
              <Button
                size="xs"
                variant="light"
                color="green"
                fullWidth
                onClick={() => fillDemoAccount('candidate@dev.com', 'password123')}
              >
                Candidate Demo
              </Button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextInput
              label="Email Address"
              placeholder="name@domain.com"
              leftSection={<IconMail size={18} className="text-mine-shaft-400" />}
              required
              value={email}
              error={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              styles={{
                input: { backgroundColor: 'var(--mantine-color-mineShaft-8)', borderColor: 'var(--mantine-color-mineShaft-7)' },
              }}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              leftSection={<IconLock size={18} className="text-mine-shaft-400" />}
              required
              value={password}
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) validatePassword(e.target.value);
              }}
              styles={{
                input: { backgroundColor: 'var(--mantine-color-mineShaft-8)', borderColor: 'var(--mantine-color-mineShaft-7)' },
              }}
            />

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" radius="md">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              size="md"
              mt="xs"
              color="brightSun.4"
              loading={loading}
              className="!font-semibold !shadow-lg hover:brightness-105 transition"
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}