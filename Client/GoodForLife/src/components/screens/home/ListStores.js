import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native';

import LoadMore from '../../common/LoadMore';
import dataListStore from '../../../api/dataListStore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const urlIconMap = require('../../../images/icons/map1.png');
const urlIconFollow = require('../../../images/icons/follower.png');
const urlIconStar = require('../../../images/icons/stargray.png');

export default class ListStores extends Component {

    renderItemsStore({ item }) {
        const { imgStore, wrapItems, wrapInfoStore, styleNameStore, styleIconMap, viewAddress,
            textAdressStyle, wrapText, styleTextFollow, styleIconStar } = styles;
        return (
            <TouchableOpacity style={wrapItems}>
                <Image source={{ uri: item.url }} style={imgStore} />
                <View style={wrapInfoStore}>
                    <Text style={styleNameStore} numberOfLine={2}>{item.name}</Text>
                    <View style={viewAddress}>
                        <Image source={urlIconMap} style={styleIconMap} />
                        <View style={wrapText}>
                            <Text style={textAdressStyle} numberOfLine={2}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={viewAddress}>
                        <Image source={urlIconFollow} style={styleIconMap} />
                        <Text style={styleTextFollow}>{item.follow}</Text>
                    </View>
                    <View style={viewAddress}>
                        <Image source={urlIconStar} style={styleIconStar} />
                        <Image source={urlIconStar} style={styleIconStar} />
                        <Image source={urlIconStar} style={styleIconStar} />
                        <Image source={urlIconStar} style={styleIconStar} />
                        <Image source={urlIconStar} style={styleIconStar} />
                        <Text style={styleTextFollow}>({item.rate})</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={{ height: 2, backgroundColor: '#d1d1d1' }} />
                <FlatList
                    data={dataListStore}
                    renderItem={this.renderItemsStore.bind(this)}
                />
                <LoadMore textMore='Xem thêm cửa hàng' />
            </ScrollView>
        );
    }
}

const styles = {
    wrapItems: {
        height: 0.6 * ((1 / 3) * screenHeight),
        flexDirection: 'row',
        marginTop: 10
    },
    imgStore: {
        height: 0.6 * ((1 / 3) * screenHeight),
        resizeMode: 'stretch',
        width: 0.4 * screenWidth,
    },
    wrapInfoStore: {
        paddingLeft: 10,
        width: 0.6 * screenWidth
    },
    styleNameStore: {
        fontSize: 15,
        fontFamily: 'Comfortaa-Regular',
        color: '#111111',
    },
    viewAddress: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    styleIconMap: {
        width: 13,
        height: 13,
        resizeMode: 'stretch',
        marginRight: 5,
        marginTop: 2
    },
    styleIconStar: {
        width: 10,
        height: 10,
        resizeMode: 'stretch',
        marginRight: 5,
        marginTop: 3
    },
    textAdressStyle: {
        fontStyle: 'italic',
        fontSize: 12,
        paddingRight: 5
    },
    wrapText: {
        width: 0.53 * screenWidth
    },
    styleTextFollow: {
        fontSize: 12
    }
};

