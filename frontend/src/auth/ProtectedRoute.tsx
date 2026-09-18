import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ role }: { role?: 'user' | 'admin' }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/auth'} state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/'} replace />;
  }

  return <Outlet />;
}
