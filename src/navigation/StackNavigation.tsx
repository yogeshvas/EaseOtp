import {createStackNavigator} from '@react-navigation/stack';
import OnBording from '../screens/OnBording';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import LoginChecker from '../screens/LoginChecker';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="logic" component={LoginChecker} />
      <Stack.Screen name="onBoard" component={OnBording} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}
