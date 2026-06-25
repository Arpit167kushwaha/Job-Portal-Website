import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Radio, Group } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axiosInstance';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CANDIDATE'); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await API.post('/auth/register', {
        name: name,
        email: email,
        password: password,
        role: role
      });

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);

    } catch (err: any) {
      console.error("Real error", err.response?.data);
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" className="font-semibold text-bright-sun-400">
        Create an Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login here
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" bg="mineShaft.9">
        <form onSubmit={handleSignUp}>
          <TextInput 
            label="Full Name" 
            placeholder="Enter your name" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput 
            label="Email" 
            placeholder="you@domain.com" 
            required 
            mt="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput 
            label="Password" 
            placeholder="Create a strong password" 
            required 
            mt="md" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Radio.Group
            value={role}
            onChange={setRole}
            name="userRole"
            label="I am a"
            withAsterisk
            mt="md"
          >
            <Group mt="xs">
              <Radio value="CANDIDATE" label="Candidate" color="brightSun.4" />
              <Radio value="RECRUITER" label="Recruiter" color="brightSun.4" />
            </Group>
          </Radio.Group>
          
          {error && <Text c="red" size="sm" mt="sm">{error}</Text>}
          {success && <Text c="green" size="sm" mt="sm">{success}</Text>}

          <Button fullWidth mt="xl" color="brightSun.4" type="submit" loading={loading}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}