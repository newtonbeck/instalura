import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native'
import Login from './src/Login';
import Feed from './src/Feed';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

class Splash extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount(){
    const token = await AsyncStorage.getItem('token')
    this.props.navigation.navigate(token ? 'LoggedStack' : 'UnloggedStack')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Instalura</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const UnloggedNavigator = createStackNavigator({
  LoginScreen: {
    screen: Login,
  },
}, {
  headerMode: 'none'
});

const LoggedNavigator = createStackNavigator({
  FeedScreen: {
    screen: Feed,
  },
  FriendFeed: {
    screen: Feed,
  },
}, {
  headerMode: 'none'
});

const AppNavigator = createSwitchNavigator({
  UnloggedStack: {
    screen: UnloggedNavigator,
  },
  LoggedStack: {
    screen: LoggedNavigator,
  },
  SplashScreen: {
    screen: Splash
  }
}, {
  headerMode: 'none',
  initialRouteName: 'SplashScreen'
})

export default createAppContainer(AppNavigator);