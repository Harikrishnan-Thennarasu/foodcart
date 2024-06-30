/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import { notificationHandler } from './src/utilities/functions';

notifee.onBackgroundEvent(notificationHandler);
AppRegistry.registerComponent(appName, () => App);
