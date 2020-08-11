import React, {useEffect, useRef} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './Dashboard'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'
import SlidingUpPanel from 'rn-sliding-up-panel';
import Test from './Test'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { Platform, PermissionsAndroid } from 'react-native';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
  //   Geolocation.requestAuthorization();
  //   Geolocation.setRNConfiguration({
  //     skipPermissionRequests: false,
  //    authorizationLevel: 'whenInUse',
  //  });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      
    );
  }
}

// 


const style = {
  item: {
    flex: 1,
    borderWidth: 1, 
    borderColor: 'blue', 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center' 
  }
}
const Dot = () => null
function Auth({navigation: {navigate, addListener}}){
  // useEffect(() => {
  //   addListener('blur', () => console.log('blur auth'))
  //   addListener('focus', () => console.log('focus auth'))
  // },[])
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('focus')
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('blur')
      };
    }, [])
  );
  // useFocusEffect(() => {React.useCallback(() => {
  //   console.log('focus')
  //   return () => console.log('blur')
  // })}, [])
  const isFocused = useIsFocused()
  console.log(isFocused)
  let slidingUpPanel = useRef()
  // useEffect(() => requestPermissions(), [])
  // Geolocation.getCurrentPosition(info => console.log( "qwe", info ))
  const onSwipeUp = () => alert('swipe')
    return(
      <View style={{justifyContent: "flex-end", flex: 1}}>
        <TouchableOpacity onPress={() => navigate('Dashboard')} >
              <Text>To Dashboard</Text></TouchableOpacity>
        
          <TouchableOpacity onPress={() => slidingUpPanel.show()}><Text>Show panel</Text></TouchableOpacity>
          <View style={{height: 200, marginTop: "auto"}}>
            <GestureRecognizer
                onSwipeUp={() => slidingUpPanel.show()}
                config={config}
                style={{
                flex: 1,
                backgroundColor: 'transparent'
                }}
                >
            </GestureRecognizer>
        </View>
          <SlidingUpPanel ref={c => slidingUpPanel = c} draggableRange={{top: 200, bottom: 50}} containerStyle={{height: 200}} height={200} backdropStyle={{backgroundColor: 'transparent'}}>
          <View style={{height: 200, width: '100%', padding: 15}}>
            <View style={{height: 50, alignItems: 'center'}}>
              <Text>To top</Text>
            </View>
            <Swiper horizontal={true} loop={false} index={0} dot={<Dot />} activeDot={<Dot />}>
              <View style={style.item}>
                <Text>Розділ 1</Text>
              </View>
              <View style={style.item}>
                <Text>Розділ 2</Text>
              </View>
              <View style={style.item}>
                <Text>Розділ 3</Text>
              </View>
              <View style={style.item}>
                <Text>Розділ 4</Text>
              </View>
            </Swiper>
            </View>
          </SlidingUpPanel>
          
        
      </View>
      
    
      
        
    )
}
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
  );
}
function ModalScreen() {
  return(
    <Text>Modal</Text>
  )
}
function Navigator() {
  return(
    <NavigationContainer>
      <RootStack.Navigator mode="modal" initialRouteName="Main">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MyModal" component={SwipeNavigator} />
    </RootStack.Navigator>
    </NavigationContainer>
    
  )
}
const Drawer = createDrawerNavigator ( ) ; 
function Article() {
  return(
    <Text>qwer</Text>
  )
}
function Feed() {
  return(
    <Text>RRR</Text>
  )
}
function SwipeNavigator() {
  return(
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  )
}
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};
export default Navigator;