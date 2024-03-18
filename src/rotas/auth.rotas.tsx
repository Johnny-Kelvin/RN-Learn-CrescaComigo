import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TelaLogin from '../telas/login/telaLogin';
import { useAuth } from '../contexto/auth';

const AuthStack = createStackNavigator();


const AuthRoutes = () => {const {signed, loading} = useAuth();return(
  
  <AuthStack.Navigator screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="SignIn" component={TelaLogin} options={{animationTypeForReplace: loading? 'push' : 'push'}}/>
  </AuthStack.Navigator>
)};

export default AuthRoutes;