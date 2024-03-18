import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './src/contexto/auth';
import Routes from './src/rotas';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './src/rotas/auth.rotas';
import TelaLogin from './src/telas/login/telaLogin';

export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NavigationContainer>
  );
}
