import React from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// end Navigation

// Screens
import Home from './screens/home';
import Characters from './screens/characters';
import Details from './screens/details';
// End Screens

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = focused
                            ? 'grid' 
                            : 'grid-outline';
                  break;
                case 'Characters':
                  iconName = focused 
                            ? 'albums' 
                            : 'albums-outline';
                  break;
                case 'Details':
                  iconName = focused 
                            ? 'information-circle' 
                            : 'information-circle-outline';
                  break;
                default:
                  iconName = focused 
                            ? 'bug' 
                            : 'bug-outline';
                  break;
              }


              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          {/* <Tab.Screen name="Details" component={Details} options={{ tabBarVisible: false}} /> */}

          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Details" component={Details} />
          <Tab.Screen name="Characters" component={Characters} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});