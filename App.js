import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import PopularGames from './components/PopularGames';

class PopularScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#252627'}}>
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: 50,
          }}>
          <View style={{flex: 1}}>
            <PopularGames />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

class PulseScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Pulse Tab!</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Search Tab!</Text>
      </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Popular') {
    iconName = 'ios-flame';
  } else if (routeName === 'Pulse') {
    iconName = `ios-flash`;
  } else if (routeName === 'Search') {
    iconName = `ios-search`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#252627',
  },
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Popular: {screen: PopularScreen},
      Pulse: {screen: PulseScreen},
      Search: {screen: SearchScreen},
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: '#BB0A21',
        inactiveTintColor: '#FFF9FB',
        style: {
          backgroundColor: '#252627',
        },
      },
    },
  ),
);
