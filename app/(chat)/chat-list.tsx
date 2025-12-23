import React from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useChats } from '@/src/hooks/useChats';
import { ChatList } from '@/src/components/ChatList';

export default function ChatListScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const { chats, deletedChats, setSelectedChat } = useChats();

  return (
    <ChatList
      chats={chats}
      deletedChatsCount={deletedChats.length}
      onSelectChat={(chat) => {
        setSelectedChat(chat);
        router.push('/(chat)/chat-view');
      }}
      onDeleteChat={() => {}}
      onShowProfile={() => {
        router.push('/(chat)/profile');
      }}
      onShowTrash={() => {
        router.push('/(chat)/trash');
      }}
      onNewChat={() => {}}
    />
  );
}