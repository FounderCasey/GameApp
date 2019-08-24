import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import PopularGames from './components/PopularGames';

class PopularScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#252627'}}>
        <View style={{flex: 1}}>
          <PopularGames navigation={this.props.navigation} />
        </View>
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

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const PopularStack = createStackNavigator({
  Popular: {
    screen: PopularScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Popular',
      headerTitleStyle: {
        color: '#FFF9FB',
      },
      headerStyle: {
        backgroundColor: '#252627',
      },
      headerTintColor: {
        color: '#FFF9FB',
      },
    }),
  },
  Details: {screen: DetailsScreen},
});

const PulseStack = createStackNavigator({
  Pulse: {screen: PulseScreen},
  Details: {screen: DetailsScreen},
});

const SearchStack = createStackNavigator({
  Search: {screen: SearchScreen},
  Details: {screen: DetailsScreen},
  defaultNavigationOptions: () => ({
    title: 'B',
    style: {
      backgroundColor: '#252627',
    },
  }),
});

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
      Popular: {screen: PopularStack},
      Pulse: {screen: PulseStack},
      Search: {screen: SearchStack},
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
