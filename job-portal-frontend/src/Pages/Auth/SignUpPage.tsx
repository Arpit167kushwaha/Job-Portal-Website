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
  Progress,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconUser,
  IconBriefcase,
  IconLock,
  IconMail,
  IconSignature
} from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axiosInstance';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'CANDIDATE' | 'RECRUITER'>('CANDIDATE');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');
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
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 40;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    return score;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name.trim().length > 0;

    if (!isNameValid) {
      setError('Please enter your full name.');
      return;
    }

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      await API.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: role,
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err.response?.data);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-mine-shaft-950 font-['poppins']">
      <Container size={480} className="w-full">
        <div className="text-center mb-6">
          <Title order={2} className="font-bold text-white tracking-wide">
            Join <span className="text-bright-sun-400">JobPortal</span>
          </Title>
          <Text c="dimmed" size="sm" mt={6}>
            Already have an account?{' '}
            <Link to="/login" className="text-bright-sun-400 hover:underline font-medium">
              Sign in here
            </Link>
          </Text>
        </div>

        <Paper withBorder shadow="xl" p={32} radius="lg" bg="mineShaft.9" className="border-mine-shaft-700 backdrop-blur-md">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {/* Role Selection Cards */}
            <div>
              <Text size="sm" fw={600} mb={8} className="text-mine-shaft-200">
                I want to register as:
              </Text>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('CANDIDATE')}
                  className={`flex flex-col items-center p-3.5 rounded-xl border transition duration-200 cursor-pointer text-left ${
                    role === 'CANDIDATE'
                      ? 'border-bright-sun-400 bg-bright-sun-400/10 text-white'
                      : 'border-mine-shaft-700 bg-mine-shaft-800 text-mine-shaft-300 hover:border-mine-shaft-500'
                  }`}
                >
                  <IconUser size={22} className={role === 'CANDIDATE' ? 'text-bright-sun-400' : 'text-mine-shaft-400'} />
                  <span className="font-semibold text-sm mt-1.5">Job Seeker</span>
                  <span className="text-[11px] text-mine-shaft-400 text-center mt-0.5">Find & apply for jobs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('RECRUITER')}
                  className={`flex flex-col items-center p-3.5 rounded-xl border transition duration-200 cursor-pointer text-left ${
                    role === 'RECRUITER'
                      ? 'border-bright-sun-400 bg-bright-sun-400/10 text-white'
                      : 'border-mine-shaft-700 bg-mine-shaft-800 text-mine-shaft-300 hover:border-mine-shaft-500'
                  }`}
                >
                  <IconBriefcase size={22} className={role === 'RECRUITER' ? 'text-bright-sun-400' : 'text-mine-shaft-400'} />
                  <span className="font-semibold text-sm mt-1.5">Employer</span>
                  <span className="text-[11px] text-mine-shaft-400 text-center mt-0.5">Post jobs & hire talent</span>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <TextInput
              label="Full Name"
              placeholder="e.g. Arpit Kushwaha"
              leftSection={<IconSignature size={18} className="text-mine-shaft-400" />}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              styles={{
                input: { backgroundColor: 'var(--mantine-color-mineShaft-8)', borderColor: 'var(--mantine-color-mineShaft-7)' },
              }}
            />

            {/* Email Input with Strict Validation */}
            <TextInput
              label="Email Address"
              placeholder="name@company.com"
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

            {/* Password Input */}
            <div>
              <PasswordInput
                label="Create Password"
                placeholder="Minimum 6 characters"
                leftSection={<IconLock size={18} className="text-mine-shaft-400" />}
                required
                value={password}
                error={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                styles={{
                  input: { backgroundColor: 'var(--mantine-color-mineShaft-8)', borderColor: 'var(--mantine-color-mineShaft-7)' },
                }}
              />
              {password && (
                <div className="mt-2">
                  <Progress
                    value={getPasswordStrength()}
                    color={getPasswordStrength() < 50 ? 'red' : getPasswordStrength() < 80 ? 'yellow' : 'green'}
                    size="xs"
                    radius="xl"
                  />
                  <Text size="xs" c="dimmed" mt={1}>
                    Strength: {getPasswordStrength() < 50 ? 'Weak' : getPasswordStrength() < 80 ? 'Medium' : 'Strong'}
                  </Text>
                </div>
              )}
            </div>

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" radius="md">
                {error}
              </Alert>
            )}

            {success && (
              <Alert icon={<IconCheck size={16} />} color="green" variant="light" radius="md">
                {success}
              </Alert>
            )}

            <Button
              fullWidth
              size="md"
              mt="sm"
              color="brightSun.4"
              type="submit"
              loading={loading}
              className="!font-semibold !shadow-lg hover:brightness-105 transition"
            >
              Create {role === 'RECRUITER' ? 'Recruiter' : 'Candidate'} Account
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}