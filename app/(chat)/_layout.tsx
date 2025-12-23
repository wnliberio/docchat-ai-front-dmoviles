// 📁 DIRECTORIO: app/(chat)/_layout.tsx
// 📄 ARCHIVO: _layout.tsx

import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat-list" />
    </Stack>
  );
}