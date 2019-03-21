import React, { Component } from 'react'
import {
  StatusBar,
  ActivityIndicator,
  View,
  AsyncStorage
} from 'react-native'
import Login from './src/Login';
import Feed from './src/Feed';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

class Splash extends Component {
  constructor(props) {
    super(props)
  }
  getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    return token
  }
  componentDidMount(){
    this.props.navigation.navigate(this.getToken() ? 'LoggedStack' : 'UnloggedStack')
  }
  render() {
    return (
      <View>
        <ActivityIndicator />
        {<StatusBar />}
      </View>
    )
  }
}

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