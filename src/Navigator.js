import React, {useEffect, useRef, useState} from 'react';
import {View, Text, AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Test from './Test';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {Platform, PermissionsAndroid} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
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
    alignItems: 'center',
  },
};
const Dot = () => null;
function Auth({navigation: {navigate, addListener}}) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log(nextAppState);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('focus');
      AppState.addEventListener('change', _handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', _handleAppStateChange);
        console.log('blur');
      };
    }, []),
  );
  const isFocused = useIsFocused();
  console.log(isFocused);
  let slidingUpPanel = useRef();
  const onSwipeUp = () => alert('swipe');
  requestPermissions();

  return (
    <View style={{justifyContent: 'flex-end', flex: 1}}>
      <TouchableOpacity onPress={() => navigate('Dashboard')}>
        <Text>To Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => slidingUpPanel.show()}>
        <Text>Show panel</Text>
      </TouchableOpacity>
      <View style={{height: 200, marginTop: 'auto'}}>
        <GestureRecognizer
          onSwipeUp={() => slidingUpPanel.show()}
          config={config}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}></GestureRecognizer>
      </View>
      <SlidingUpPanel
        ref={(c) => (slidingUpPanel = c)}
        draggableRange={{top: 200, bottom: 50}}
        containerStyle={{height: 200}}
        height={200}
        backdropStyle={{backgroundColor: 'transparent'}}>
        <View style={{height: 200, width: '100%', padding: 15}}>
          <View style={{height: 50, alignItems: 'center'}}>
            <Text>To top</Text>
          </View>
          <Swiper
            horizontal={true}
            loop={false}
            index={0}
            dot={<Dot />}
            activeDot={<Dot />}>
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
  );
}
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        paddingVertical: 20,
        width: '100%',
        flex: 1,
      }}>
      <Text style={{color: '#fff', textAlign: 'center'}}>
        Customejjj header
      </Text>
    </View>
  );
};
function MainStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={
          {
            // headerTitle: () => <Header />,
            // headerLeft: null,
            // headerRight: null,
            // headerStyle: {backgroundColor: 'red'},
            // headerTintColor: '#fff',
          }
        }
      />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
}
function ModalScreen() {
  return <Text>Modal</Text>;
}
function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="MyModal" component={SwipeNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const Drawer = createDrawerNavigator();
function Article() {
  return <Text>qwer</Text>;
}
function Feed() {
  return <Text>RRR</Text>;
}
function SwipeNavigator() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <Drawer.Navigator initialRouteName="Feed">
        <Drawer.Screen name="Feed" component={Feed} />
        <Drawer.Screen name="Article" component={Article} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
export default Navigator;
