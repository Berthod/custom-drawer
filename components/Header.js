import React, {Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import styles from '../styles/SideMenu.style';

class Header extends Component {
  render () {
    return (
      <View style={styles.navHeader}>
        <Image style={styles.navHeaderImage} source={{uri: 'https://previews.123rf.com/images/martialred/martialred1608/martialred160800020/61263273-male-user-account-profile-circle-flat-icon-for-apps-and-websites.jpg'}}/>
        <Text style={styles.navHeaderName}>
          Header
        </Text>
      </View>
    );
  }
}

export default Header;