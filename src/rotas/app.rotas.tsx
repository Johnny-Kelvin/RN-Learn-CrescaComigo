import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { TelaHome } from '../telas/home/telaHome';


const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator screenOptions={{headerShown:false}}>
    <AppStack.Screen name="SignIn" component={TelaHome} options={{animationTypeForReplace: 'push'}}/>
  </AppStack.Navigator>
);

export default AppRoutes;