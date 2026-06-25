import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API from '../../api/axiosInstance';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
const response = await API.post('/auth/login', {
  email: email,
  password: password
});

      if (response.data && response.data.jwtToken) { 
  localStorage.setItem('token', response.data.jwtToken); // Yahan bhi 'jwtToken' aayega
  navigate('/find-jobs');
}
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" className="font-semibold text-sky-400">
        Welcome Back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{' '}
        <Link to="/signup" className="text-sky-400 hover:underline">
          Create account
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" bg="mineShaft.9">
        <form onSubmit={handleLogin}>
          <TextInput 
            label="Email" 
            placeholder="you@domain.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required 
            mt="md" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button 
            type="submit" 
            fullWidth 
            mt="xl" 
            color="brightSun" 
            loading={loading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}