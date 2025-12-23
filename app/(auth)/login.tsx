// 📁 DIRECTORIO: app/(auth)/login.tsx
// 📄 ARCHIVO: login.tsx
// 🔧 Pantalla de autenticación

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { Login } from '@/src/components/Login';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('/(chat)/chat-list');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <View style={{ flex: 1 }}>
      <Login onLogin={login} />
    </View>
  );
}