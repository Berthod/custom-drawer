import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

class Page1 extends Component {
  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={{padding: 50}}>
        <Button 
          title = "Page1 > Page 2"
          onPress={() => navigate('Page2')
        }/>
      </View>
    );
  }
}

export default Page1;