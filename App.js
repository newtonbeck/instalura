import Feed from './src/Feed';
import Login from './src/Login';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Feed: {
    screen: Feed
  }
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);