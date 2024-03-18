import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';
import { Alert } from 'react-native';

interface User {
  email_user: string;
  id_user: number
  nome_user: string;
  senha_user: string
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(email:string, senha:string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@CrescaComigo:user');
      const storagedToken = await AsyncStorage.getItem('@CrescaComigo:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }
    console.log('aaba')
    loadStorageData();
  },[]);

  async function signIn(email:string, senha:string) {
    //const response = await auth.signIn();

    try{
        const response = await api.post('/auth/login',{
            email:email,
            senha:senha
            
        })
        console.log(response.data.user)
        setUser(response.data.user);
        api.defaults.headers.Authorization = `Baerer ${response.data.token}`;

        await AsyncStorage.setItem('@CrescaComigo:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@CrescaComigo:token', response.data.token);
    }
    catch
    {
        throw new Error('aaa')
    }
   
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export {AuthProvider, useAuth};