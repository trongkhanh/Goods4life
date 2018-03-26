import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import dataCatalogues from '../../../api/dataCatalogues';

const urlIconCatalogues = require('../../../images/icons/catalogues.png');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class Cataloguses extends Component {

    renderItemsCatalogues({ item }) {
        const { styleImageItem, wrapItems, nameStyle, wrapImage, wrapText } = styles;
        return (
            <TouchableOpacity style={wrapItems}>
                <View style={wrapImage}>
                    <Image source={item.url} style={styleImageItem} />
                </View>
                <View style={wrapText}>
                    <Text style={nameStyle}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { iconCatalogues, wrapCatalogues, wrapTextCatalogues, textStyle } = styles;
        return (
            <View style={wrapCatalogues}>
                <View style={{ height: 5, backgroundColor: '#d1d1d1' }} />
                <View style={wrapTextCatalogues}>
                    <Image source={urlIconCatalogues} style={iconCatalogues} />
                    <Text style={textStyle}>Danh mục</Text>
                </View>
                <FlatList
                    data={dataCatalogues}
                    renderItem={this.renderItemsCatalogues.bind(this)}
                    numColumns={3}
                />
            </View>
        );
    }
}

const styles = {
    iconCatalogues: {
        width: 24,
        height: 20,
        resizeMode: 'stretch',
        marginTop: 2,
        marginHorizontal: 5
    },
    wrapCatalogues: {
        paddingTop: 10,
        backgroundColor: '#ffffff'
    },
    wrapTextCatalogues: {
        flexDirection: 'row',
        paddingTop: 5
    },
    textStyle: {
        fontSize: 18,
        color: '#111111'
    },
    wrapItems: {
        height: 0.5 * ((1 / 3) * screenHeight),
        width: 0.3 * screenWidth,
        marginTop: 10,
        marginLeft: 9,
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
    },
    wrapImage: {
        height: 0.35 * ((1 / 3) * screenHeight),
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleImageItem: {
        height: 0.25 * ((1 / 3) * screenHeight),
        width: 0.2 * screenWidth,
        resizeMode: 'stretch'
    },
    nameStyle: {
        fontSize: 16,
        fontFamily: 'Unicorn Scribbles',
        color: '#111111'
    },
    wrapText: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};

// '#0066c0'
