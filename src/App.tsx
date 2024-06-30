
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '../navigation/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;