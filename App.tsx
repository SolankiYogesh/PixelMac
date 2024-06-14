import React from 'react';

import BottomNavigation from './src/Router/BottomNavigation';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
const App = () => {
  return <BottomNavigation />;
};

export default App;
