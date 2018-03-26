import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import dataNewProduct from '../../../api/dataNewProduct';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const urlIconNew = require('../../../images/icons/new.png');
const urlIconPrice = require('../../../images/icons/price.png');
const urlIconMap = require('../../../images/icons/map1.png');

export default class NewProduct extends Component {

    renderItemsNewProduct({ item }) {
        const { imgStyle, wrapItems, wrapViewTime, styleTextTime, wrapName, textName,
            viewPrice, textPrice, imgPrice, imgMap, viewMap, textStore } = styles;
        return (
            <TouchableOpacity style={wrapItems}>
                <Image source={{ uri: item.url }} style={imgStyle} >
                    <View style={[wrapViewTime, { opacity: item.time === '0' ? 0 : 1 }]}>
                        <Text style={styleTextTime}>{item.time}</Text>
                    </View>
                </Image>
                <View style={wrapName}>
                    <Text style={textName}>{item.name}</Text>
                </View>
                <View style={viewPrice}>
                    <Image source={urlIconPrice} style={imgPrice} />
                    <Text style={textPrice}>{item.price}</Text>
                </View>
                <View style={viewMap}>
                    <Image source={urlIconMap} style={imgMap} />
                    <Text style={textStore}>{item.store}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { iconNew, wrapTextNewProduct, textNewProduct } = styles;
        return (
            <View>
                <View style={{ height: 5, backgroundColor: '#d1d1d1' }} />
                <View style={{ backgroundColor: '#ffffff' }}>
                    <View style={wrapTextNewProduct}>
                        <Image source={urlIconNew} style={iconNew} />
                        <Text style={textNewProduct}>Sản phẩm mới</Text>
                    </View>
                    <FlatList
                        data={dataNewProduct}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderItemsNewProduct.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    iconNew: {
        width: 24,
        height: 24,
        resizeMode: 'stretch',
        marginLeft: 5
    },
    wrapTextNewProduct: {
        flexDirection: 'row',
        marginTop: 5
    },
    textNewProduct: {
        fontSize: 18,
        marginLeft: 5,
        color: '#111111'
    },
    imgStyle: {
        height: 0.6 * ((1 / 3) * screenHeight),
        resizeMode: 'stretch',
        justifyContent: 'flex-end'
    },
    wrapItems: {
        height: (1 / 3) * screenHeight,
        width: (2 / 5) * screenWidth,
        margin: 5,
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
    wrapViewTime: {
        height: 0.12 * ((1 / 3) * screenHeight),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextTime: {
        color: '#ffffff'
    },
    wrapName: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textName: {
        color: '#111111',
        fontSize: 18,
        padding: 3
    },
    viewPrice: {
        flexDirection: 'row',
        marginTop: 5
    },
    textPrice: {
        color: '#879596'
    },
    imgMap: {
        width: 18,
        height: 18,
        resizeMode: 'stretch',
        marginHorizontal: 5
    },
    imgPrice: {
        width: 18,
        height: 18,
        resizeMode: 'stretch',
        marginHorizontal: 5
    },
    viewMap: {
        flexDirection: 'row',
        marginTop: 3
    },
    textStore: {
        color: '#879596'
    }
};
