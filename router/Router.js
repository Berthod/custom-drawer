import Page1 from '../components/pages/Page1';
import Page2 from '../components/pages/Page2';
import Page3 from '../components/pages/Page3';
import SideMenu from '../components/SideMenu';
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Page1: {
    screen: Page1
  },
  Page2: {
    screen: Page2
  },
  Page3: {
    screen: Page3
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});