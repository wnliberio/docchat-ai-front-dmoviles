// 📁 DIRECTORIO: app/(chat)/index.tsx
// 📄 ARCHIVO: index.tsx
// 🔧 VERSIÓN CORREGIDA: Pantalla principal de lista de chats mejorada

import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { useChats } from '@/src/hooks/useChats';
import { ChatList } from '@/src/components/ChatList';
import { Chat } from '@/src/types';

export default function ChatListScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const {
    chats,
    deletedChats,
    selectedChat,
    deleteChat,
    setSelectedChat,
    addChat,
  } = useChats();

  // Redirigir si no está autenticado
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSelectChat = useCallback(
    (chat: Chat): void => {
      setSelectedChat(chat);
      // TODO: Navegar a la pantalla de chat detallado
      // router.push(`/chat/${chat.id}`);
    },
    [setSelectedChat]
  );

  const handleDeleteChat = useCallback(
    (chatId: string): void => {
      deleteChat(chatId);
    },
    [deleteChat]
  );

  const handleShowProfile = useCallback((): void => {
    router.push('/profile');
  }, [router]);

  const handleShowTrash = useCallback((): void => {
    router.push('/trash');
  }, [router]);

  const handleNewChat = useCallback(
    (fileName: string): void => {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: fileName.replace('.pdf', ''),
        fileName: fileName,
        fileType: 'pdf',
        lastMessage: 'Nuevo documento',
        timestamp: new Date(),
        messages: [],
      };
      addChat(newChat);
    },
    [addChat]
  );

  return (
    <View style={{ flex: 1 }}>
      <ChatList
        chats={chats}
        deletedChatsCount={deletedChats.length}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onShowProfile={handleShowProfile}
        onShowTrash={handleShowTrash}
        onNewChat={handleNewChat}
      />
    </View>
  );
}