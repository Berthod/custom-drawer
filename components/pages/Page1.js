import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  ScrollView,
  TextInput  
} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import BaseScrollView from "recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView";
import CollapsibleToolbar from 'react-native-collapsible-toolbar';

let FULL_VIEW = 0
let AHEAD_OFFSET = 1000
let containerCount = 0;
const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 60
let { width } = Dimensions.get("window");

class ExtendedScrollView extends BaseScrollView {
    render() {

      return <Animated.ScrollView {...this.props}  
                                    onScroll={Animated.event([this.props.animatedEvent], {listener: this.props.onScroll})} 
                                    scrollEventThrottle={16} />
    }
  }

class ExpandedToolbar extends PureComponent {
    render() {
      return <Animated.View {...this.props}  
                                    >
                <TextInput placeholder="One" style={{paddingBottom: 10, borderColor: 'gray', borderWidth: 1}}/>
                <TextInput placeholder="Two" style={{paddingBottom: 10, borderColor: 'gray', borderWidth: 1}}/>
                <TextInput placeholder="Three" style={{paddingBottom: 10, borderColor: 'gray', borderWidth: 1}}/>
                <TextInput placeholder="Four" style={{paddingBottom: 10, borderColor: 'gray', borderWidth: 1}}/>
            </Animated.View>
    }
  }

  
class Page1 extends PureComponent {
    
    constructor(args) {
        super(args)

        

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this._layoutProvider = new LayoutProvider(
            index => {
                return FULL_VIEW
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 85;
            }
        )

        this.scroll = new Animated.Value(0);
        this.scroll.addListener((value) => {
                    console.log(value);
                });

        
        this._rowRenderer = this._rowRenderer.bind(this);

        this.state = {
            dataProvider: dataProvider.cloneWithRows(this._fillList(1000)),
        };
    }

    _fillList(n) {
        let list = []
    
      for (i = 0; i < n; i++) { 
        list[i] = i}
        return list
    }


   _rowRenderer(type, data) {
    return (
        <Card>
        <TouchableOpacity onPress={() => console.log(data)}>
            <CardItem style={styles.cardItem}> 
                <Text style={styles.boldText}> Sekundární pobočka - {data} </Text>
            </CardItem>
            <CardItem style={styles.cardItem}> 
                <Text> Místo výjezdu: {data}  </Text>
            </CardItem>
            <CardItem style={styles.cardItem}> 
                <Text> Čas výjezdu: {data}  </Text>
            </CardItem>
        </TouchableOpacity>
        </Card>
       )
   }

   renderContent = () => (
        <View style={styles.minDim}>
            <RecyclerListView style={styles.viewFlex}
                externalScrollView={ExternalScrollView}
                layoutProvider={this._layoutProvider} 
                dataProvider={this.state.dataProvider} 
                animatedEvent={{nativeEvent: {contentOffset: {y: this.scroll}}}}
                rowRenderer={this._rowRenderer} 
                renderAheadOffset={AHEAD_OFFSET}
    
            />
        </View>
   )

   renderContent2 = () => (
    <View>
        {new Array(200).fill().map((_, i) => (
            <View
                // eslint-disable-next-line
                key={i}Input
                style={{
                    backgroundColor: '#F5F5F5',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5E5'
                }}
            >
                <Card>
        <TouchableOpacity>
            <CardItem style={styles.cardItem}> 
                <Text style={styles.boldText}> Sekundární pobočka </Text>
            </CardItem>
            <CardItem style={styles.cardItem}> 
                <Text> Místo výjezdu: </Text>
            </CardItem>
            <CardItem style={styles.cardItem}> 
                <Text> Čas výjezdu:  </Text>
            </CardItem>
        </TouchableOpacity>
        </Card>
            </View>
        ))}
    </View>
);

   renderNavBar = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}
        >
            <Text style={{ textAlign: 'center', color: '#FFF' }}>Title</Text>
        </View>
    );

    renderToolBar = () => (
        <View style={{height: 300, backgroundColor: '#009688'}}>
            <Text> Toolbar </Text>
        </View>
    )


  render () {
    const { navigate } = this.props.navigation;

    const headerHeight = this.scroll.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        extrapolate: 'clamp'
      })

      const rolledToolbarOpacity = this.scroll.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      });

      const expandedToolbarOpacity = this.scroll.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      });

    return (
        <View style={styles.viewFlex}>
        <Animated.View style={{height: headerHeight, backgroundColor: "green", width: width, position: 'absolute', top: 0, left: 0, zIndex: 9999}}>
        <ExpandedToolbar style={{opacity: expandedToolbarOpacity, backgroundColor: "green", width: width, position: 'absolute', top: 0, left: 0, zIndex: 9999}}/>
        <Animated.Text style={{opacity: rolledToolbarOpacity, fontSize: 32, backgroundColor: "green", width: width, position: 'absolute', top: 0, left: 0}}>Header</Animated.Text>
        </Animated.View>
            <RecyclerListView externalScrollView={ExtendedScrollView}
                style={{paddingTop: HEADER_EXPANDED_HEIGHT, flex: 1}}
                layoutProvider={this._layoutProvider} 
                dataProvider={this.state.dataProvider} 
                animatedEvent={{nativeEvent: {contentOffset: {y: this.scroll}}}}
                rowRenderer={this._rowRenderer} 
                renderAheadOffset={AHEAD_OFFSET}
            />
        </View>
        
    );
  }

}

const styles = StyleSheet.create({

    minDim: {
        minHeight: 1,
        minWidth: 1
    },
  viewFlex: {
      flex: 1
  },
  container: {
      paddingRight: 8,
      paddingLeft: 8
  },
  cardItem: {
      paddingBottom: 2,
      paddingTop: 2
  },
  boldText: {
      fontWeight: 'bold',
  },
  htmlView: {
      paddingLeft: 20,
      paddingRight: 20
  },
  button: {
      alignSelf: 'center',
      width: 250,
      justifyContent: 'center',
      alignItems: 'center'
  },
  mapCard: {
      flex: 1,
      height: 300
  },
  mapView: {
      flex: 1,
  }
});

export default Page1;