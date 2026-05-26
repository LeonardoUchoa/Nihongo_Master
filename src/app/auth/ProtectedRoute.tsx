import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center" style={{ backgroundColor: '#F8F9FA', color: '#1A1A2E' }}>
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
