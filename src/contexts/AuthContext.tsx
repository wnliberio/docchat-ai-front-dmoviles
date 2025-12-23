// 📁 DIRECTORIO: src/contexts/
// 📄 ARCHIVO: AuthContext.tsx

import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthContextType } from '../types';
import { ENV, getAuthUrl } from '../../config/environment';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Restaurar sesión al iniciar
  useEffect(() => {
    const bootstrapAsync = async (): Promise<void> => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        const savedUser = await AsyncStorage.getItem('user');

        if (savedToken && savedUser) {
          const parsedUser = JSON.parse(savedUser) as User;
          setToken(savedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Failed to restore session:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);
  
 const login = useCallback(async (email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    const url = getAuthUrl('/login');
    
    console.log('🔐 Login URL:', url);
    console.log('📝 Credenciales:', { email, password });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();

    console.log('✅ Token recibido:', data.token);
    console.log('👤 Usuario:', data.user);
    
    // Decodificar JWT para ver contenido
    const tokenParts = data.token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    console.log('📋 Payload del JWT:', payload);
    console.log('⏱️  Expira en:', payload.exp - payload.iat, 'segundos');

    await AsyncStorage.setItem('authToken', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);

    if (ENV.IS_DEVELOPMENT) {
      console.log('✅ Login exitoso');
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
}, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      const url = getAuthUrl('/register');
      
      if (ENV.IS_DEVELOPMENT) {
        console.log('📝 Register URL:', url);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();

      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);

      if (ENV.IS_DEVELOPMENT) {
        console.log('✅ Register exitoso:', data.user);
      }
    } catch (error) {
      console.error('❌ Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('chats');

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      if (ENV.IS_DEVELOPMENT) {
        console.log('👋 Logout exitoso');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

