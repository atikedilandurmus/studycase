import React,{ useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper'; 
import Home from '../screens/HomeScreen';
import CompanyManagementScreen from './MyCompany';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ProviderManagementScreen from './Providers';
import CompanyIntegrationScreen from './CompanyIntegration';
import CompanyTransactionManagementScreen from './CompanyTransaction';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <IconButton
      icon="menu"
      onPress={() => navigation.openDrawer()}
      style={{ marginTop: height * 0.05 }}
    />
  );
};

const CustomDrawerContent = (props) => {
    
    const { logout } = useContext(AuthContext);
    return (
        <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#bcd1e8', height: height * 0.1, justifyContent: 'center', flexDirection:'row', justifyContent:'space-between'  }}>
            <Image source={require('../../assets/user.png')} style={{width: height * 0.07, height: height * 0.07, marginLeft: width * 0.03, marginTop: width * 0.035}}/>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'white',marginTop: width * 0.055, marginBottom: width * 0.08,marginRight: width * 0.05, borderRadius:30, height: height * 0.05, width: width * 0.10}} onPress={() => {logout()}}>
                <MaterialIcons  name="logout" size={24} color="#275169"  />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
            <DrawerItemList {...props} />
        </View>
        {/* <View>
            <DrawerItem
                label="Logout"
                onPress={() => {logout()}}
                labelStyle={{ color: 'white' }} 
                style={{backgroundColor:'#275169', marginTop: height * 0.53}}
                
            />
        </View>
         */}
        </DrawerContentScrollView>
    );
    };

export default function Layout() {

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: ({ navigation }) => <CustomHeader navigation={navigation} />,
                headerShown: true
            }}

        >
        <Drawer.Screen
            name="Company Management"
            component={CompanyManagementScreen}
        />
        <Drawer.Screen
            name="Provider Management"
            component={ProviderManagementScreen}
        />
        <Drawer.Screen
            name="Company Integration Management"
            component={CompanyIntegrationScreen}
        />
        <Drawer.Screen
            name="Company Transaction Management"
            component={CompanyTransactionManagementScreen}
        />
      
        </Drawer.Navigator>
    );
}
