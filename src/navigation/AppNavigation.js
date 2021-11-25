import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import PostsList from '../screens/PostsList';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import {navigationRef} from './RootNavigation';
import Header from './Header';
import googleLogIn from '../screens/googleLogIn';

import {Provider} from 'react-redux';
import store from '../redux/store';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          // screenOptions={{animationEnabled: false, headerLeft: '',}}
          initialRouteName="Home">
          <Stack.Screen
            options={{headerTitle: props => <Header {...props} />}}
            name={'Home'}
            component={Home}
          />
          <Stack.Screen
            options={{headerTitle: props => <Header {...props} />}}
            name={'PostsList'}
            component={PostsList}
          />
          <Stack.Screen
            options={{headerTitle: props => <Header {...props} />}}
            name={'PostDetails'}
            component={PostDetailsScreen}
          />
          
          <Stack.Screen
            options={{headerTitle: props => <Header {...props} />}}
            name={'SIGNIN'}
            component={googleLogIn}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
