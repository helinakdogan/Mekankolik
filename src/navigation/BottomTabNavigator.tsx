import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sayfalar
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MekanCoinScreen from '../screens/MekanCoinScreen';
import SupportScreen from '../screens/SupportScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false, // label'ı manuel vereceğiz
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({focused, color}) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'MekanCoin':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'Support':
              iconName = focused ? 'headset' : 'headset-outline';
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={20}
                color={focused ? '#FFD700' : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.iconLabel,
                  {color: focused ? '#FFD700' : '#FFFFFF'},
                ]}>
                {getLabel(route.name)}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="MekanCoin" component={MekanCoinScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};

const getLabel = (name: string) => {
  switch (name) {
    case 'Home':
      return 'Anasayfa';
    case 'Favorites':
      return 'Favoriler';
    case 'MekanCoin':
      return 'MekanCoin';
    case 'Support':
      return 'Destek';
    default:
      return name;
  }
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#A93226',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    paddingTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default BottomTabNavigator;
