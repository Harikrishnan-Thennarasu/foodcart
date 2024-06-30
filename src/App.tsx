
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '../navigation/StackNavigation';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import notifee from '@notifee/react-native';
import { askNotifyPermission, notificationHandler } from './utilities/functions';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    askNotifyPermission();
    return notifee.onForegroundEvent(notificationHandler);
  }, []);

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