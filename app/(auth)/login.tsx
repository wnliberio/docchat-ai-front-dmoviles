import React from 'react';
import { Login } from '@/src/components/Login';
import { useAuth } from '@/src/contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  return <Login onLogin={login} />;
}