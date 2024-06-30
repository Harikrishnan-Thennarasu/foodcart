
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '../navigation/StackNavigation';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <StackNavigation />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;