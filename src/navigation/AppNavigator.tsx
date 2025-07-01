import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CompanyProfileScreen from '../screens/CompanyProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Alt sekmeli anasayfa */}
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />

        {/* Mekan detay sayfası */}
        <Stack.Screen
          name="CompanyProfileScreen"
          component={CompanyProfileScreen}
          options={{title: 'Mekan Profili'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
