import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { TabBarTop } from 'react-navigation';
import NavBar from '../home/NavBar';

export default class TabBarContent extends Component {
    render() {
        return (
            <View>
                <NavBar />
                <TabBarTop {...this.props} />
            </View>
        );
    }
}
