import React from 'react';
import { Image } from 'react-native';
import {
    TabNavigator,
    TabBarBottom
} from 'react-navigation';

import Home from '../components/screens/home/Home';
import Message from '../components/screens/cart/Cart';
import Notifications from '../components/screens/notifications/Notifications';
import Store from './Store';
import Profile from '../components/screens/profile/Profile';

const iconHome = require('../images/icons/home.png');
const iconMessage = require('../images/icons/chat.png');
const iconNotification = require('../images/icons/notification.png');
const iconProfile = require('../images/icons/profile.png');
const iconHome1 = require('../images/icons/homegray.png');
const iconMessage1 = require('../images/icons/chatgray.png');
const iconNotification1 = require('../images/icons/notificationgray.png');
const iconProfile1 = require('../images/icons/profilegray.png');
const iconStore = require('../images/icons/store.png');
const iconStore1 = require('../images/icons/storegray.png');

const Root = TabNavigator(
    {
        Home: { screen: Home },
        Stores: { screen: Store },
        Message: { screen: Message },
        Notifications: { screen: Notifications },
        Profile: { screen: Profile },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconTabName;
                if (routeName === 'Home') {
                    iconTabName = focused ? iconHome : iconHome1;
                } else if (routeName === 'Stores') {
                    iconTabName = focused ? iconStore : iconStore1;
                } else if (routeName === 'Message') {
                    iconTabName = focused ? iconMessage : iconMessage1;
                } else if (routeName === 'Notifications') {
                    iconTabName = focused ? iconNotification : iconNotification1;
                } else if (routeName === 'Profile') {
                    iconTabName = focused ? iconProfile : iconProfile1;
                }
                return <Image source={iconTabName} style={styles.icon} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#008296',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#ffffff'
            }
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const styles = {
    icon: {
        width: 20,
        height: 20
    }
};

export default Root;

