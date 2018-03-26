import React from 'react';
import { Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Stores from '../components/screens/stores/Stores';
import StoreFollow from '../components/screens/stores/StoreFollow';
import StoreSuggest from '../components/screens/stores/StoreSuggest';
import TabBarContentStore from '../components/screens/stores/TabBarContentStore';

const { height: screenHeight } = Dimensions.get('window');

const Store = TabNavigator(
    {
        Stores: { screen: Stores },
        StoreFollow: { screen: StoreFollow },
        StoreSuggest: { screen: StoreSuggest }
    },
    {
        tabBarPosition: 'top',
        tabBarComponent: props => (<TabBarContentStore {...props} />),
        tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
                height: (8 * screenHeight) / 100,
            },
            indicatorStyle: {
                backgroundColor: '#008296'
            },
            labelStyle: {
                fontWeight: '400',
                fontSize: 14
            },
            activeTintColor: '#008296',
            inactiveTintColor: '#757575',
            upperCaseLabel: false,
        },
    }
);

export default Store;
