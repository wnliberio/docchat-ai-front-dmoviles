// 📁 DIRECTORIO: app/(auth)/login.tsx
// 📄 ARCHIVO: login.tsx

import React from 'react';
import { View } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { Login } from '@/src/components/Login';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Login onLogin={login} />
    </View>
  );
}