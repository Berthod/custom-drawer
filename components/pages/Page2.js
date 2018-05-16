import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base'
import MyListItem from '../items/MyListItem'

const ITEM_HEIGHT = 80
const INITIAL_ITEM_RENDER = 20

class Page2 extends PureComponent {

  _fillList(n) {
    let list = []

  for (i = 0; i < n; i++) { 
    list[i] = i}
    return list
  }

  _renderItem = ({item}) => (
    <MyListItem
      id = {item}
    />
  )

  render () {
    return (
      <FlatList
      data={this._fillList(1000)}
      renderItem={this._renderItem}
      styles={styles.viewFlex}
      initialNumToRender={INITIAL_ITEM_RENDER}
      keyExtractor={(item, index) => index}
      getItemLayout={(data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
      )}
      removeClippedSubviews={true}
    />
    );
  }
}

const styles = StyleSheet.create({
  viewFlex: {
      flex: 1
  }
});

export default Page2;