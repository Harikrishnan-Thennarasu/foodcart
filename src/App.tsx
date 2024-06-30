
import MyCart from './screens/MyCart';
import RestaurantItems from './screens/RestaurantItems';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <MyCart />
    </SafeAreaProvider>
  );
}

export default App;