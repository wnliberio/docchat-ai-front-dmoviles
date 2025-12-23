// 📁 DIRECTORIO: app/(chat)/chat-list.tsx
// 📄 ARCHIVO: chat-list.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';

export default function ChatListScreen() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        ✅ LOGIN FUNCIONÓ
      </Text>
      <Button title="Logout" onPress={logout} color="#a855f7" />
    </View>
  );
}