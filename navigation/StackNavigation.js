import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyCart from '../src/screens/MyCart';
import Home from '../src/screens/Home';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HOME" component={Home} />
      <Stack.Screen name="MYCART" component={MyCart} />
    </Stack.Navigator>
  );
}

export default StackNavigation;