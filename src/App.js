import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './Navigator';

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar backgroundColor="blue" />
      <Navigator />

      {/* </StatusBar> */}
    </SafeAreaProvider>
  );
};

export default App;
