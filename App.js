
 import React from 'react';
 import AppNavigation from './src/navigation/AppNavigation';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
   
  
 
 const App = () => {
   return (
     <SafeAreaProvider>
        <AppNavigation/>
      </SafeAreaProvider>
   );
 };
 
  
 export default App;