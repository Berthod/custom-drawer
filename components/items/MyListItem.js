import React, {PureComponent} from 'react';

import {Text, View, StyleSheet, Dimensions} from 'react-native'
import {Card} from 'native-base'

export default class MyListItem extends PureComponent {

    render () {
        return (
        <Card style = {styles.dims}>
          <Text> Text: {this.props.id} </Text>
        </Card>
        );
      }
}

const styles = StyleSheet.create({

  dims: {
        height: 80
  } 
})