import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import dataStore from '../../../api/dataStore';

const urlIconStoreFollow = require('../../../images/icons/storeFollow.png');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class StoreFollow extends Component {

    renderItemsProductStore({ item }) {
        const { imgProduct, wrapItems } = styles;
        return (
            <TouchableOpacity style={wrapItems}>
                <Image source={{ uri: item.url }} style={imgProduct} />
            </TouchableOpacity>
        );
    }

    render() {
        const { textStyle, wrapText, wrapStoreFollow, styleIconStore, viewLine } = styles;
        return (
            <View style={wrapStoreFollow}>
                <View style={viewLine} />
                <View style={wrapText}>
                    <Image source={urlIconStoreFollow} style={styleIconStore} />
                    <Text style={textStyle}>Danh sách cửa hàng</Text>
                </View>
                <FlatList
                    data={dataStore}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItemsProductStore.bind(this)}
                />
            </View>
        );
    }
}

const styles = {
    viewLine: {
        height: 5,
        backgroundColor: '#d1d1d1'
    },
    textStyle: {
        fontSize: 18,
        color: '#111111'
    },
    wrapStoreFollow: {
        marginTop: 5,
        backgroundColor: '#ffffff'
    },
    wrapText: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    styleIconStore: {
        width: 26,
        height: 26,
        resizeMode: 'stretch',
        marginHorizontal: 5,
        marginTop: 2
    },
    wrapItems: {
        height: 0.55 * ((1 / 3) * screenHeight),
        width: 0.35 * screenWidth,
        marginLeft: 7,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 5
    },
    imgProduct: {
        height: 0.5 * ((1 / 3) * screenHeight),
        resizeMode: 'stretch',
    },
    wrapName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3
    }
};


// wrapItems: {
//     height: 0.75 * ((1 / 3) * screenHeight),
//     width: 0.47 * screenWidth,
//     marginLeft: 7,
//     backgroundColor: '#f8f8f8',
//     borderWidth: 1,
//     borderRadius: 2,
//     borderColor: '#ddd',
//     borderBottomWidth: 0,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//     marginTop: 5
// },
// imgProduct: {
//     height: 0.6 * ((1 / 3) * screenHeight),
//     resizeMode: 'stretch',

