import {  useState } from 'react';
import type {FormEvent} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';
import { useAuth } from '../auth/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@hostelscout.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/admin/dashboard';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your admin email and password.');
      return;
    }
    signIn(email.trim(), password, 'admin');
    navigate(from, { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <Card className="w-full max-w-md shadow-lg" title="Admin sign in" subtitle="Manage HostelScout listings and approvals">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Admin email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <Button type="submit" className="w-full">Sign in to dashboard</Button>
        </form>
        <Link to="/auth" className="mt-5 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700">User sign in</Link>
      </Card>
    </main>
  );
}
