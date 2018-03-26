import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import dataProductSuggest from '../../../api/dataProductSuggest';
import LoadMore from '../../common/LoadMore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const urlIconProductSuggest = require('../../../images/icons/productSuggest.png');
const urlIconPrice = require('../../../images/icons/pricetag.png');
const urlIconLove = require('../../../images/icons/heart.png');
const urlIconRate = require('../../../images/icons/star.png');

export default class ProductSuggest extends Component {

    renderProductSuggestItems({ item }) {
        const { wrapItems, imgStyle, wrapPrice, textPriceStyle, iconStylePrice,
            nameStyle, wrapRate, wrapLike, wrapStar, iconLikeStyle, iconStarStyle } = styles;
        return (
            <TouchableOpacity style={wrapItems}>
                <Image source={{ uri: item.url }} style={imgStyle}>
                    <View style={wrapPrice}>
                        <Image source={urlIconPrice} style={iconStylePrice} />
                        <Text style={textPriceStyle}>{item.price}</Text>
                    </View>
                </Image>
                <Text style={nameStyle}>{item.name}</Text>
                <Text>-----------------------------------------</Text>
                <Text>{item.store}</Text>
                <View style={wrapRate}>
                    <View style={wrapLike}>
                        <Image source={urlIconLove} style={iconLikeStyle} />
                        <Text>{item.like}</Text>
                    </View>
                    <View style={wrapStar}>
                        <Image source={urlIconRate} style={iconStarStyle} />
                        <Image source={urlIconRate} style={iconStarStyle} />
                        <Image source={urlIconRate} style={iconStarStyle} />
                        <Image source={urlIconRate} style={iconStarStyle} />
                        <Image source={urlIconRate} style={iconStarStyle} />
                        <Text>({item.rate})</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { wrapProductSuggest, wrapTextProductSussgest, iconSuggest, textStyle } = styles;
        return (

            <View style={wrapProductSuggest}>
                <View style={{ height: 5, backgroundColor: '#d1d1d1' }} />
                <View style={wrapTextProductSussgest}>
                    <Image source={urlIconProductSuggest} style={iconSuggest} />
                    <Text style={textStyle}>Gợi ý sản phẩm</Text>
                </View>
                <FlatList
                    data={dataProductSuggest}
                    numColumns={2}
                    renderItem={this.renderProductSuggestItems}
                />
                <LoadMore textMore='Xem thêm thực phẩm khác' />
            </View>
        );
    }
}

const styles = {
    wrapProductSuggest: {
        paddingTop: 10,
        backgroundColor: '#ffffff'
    },
    wrapTextProductSussgest: {
        flexDirection: 'row',
        paddingTop: 5
    },
    iconSuggest: {
        width: 24,
        height: 20,
        resizeMode: 'stretch',
        marginTop: 2,
        marginHorizontal: 5
    },
    textStyle: {
        fontSize: 18,
        color: '#111111'
    },
    wrapItems: {
        height: (1.25 / 3) * screenHeight,
        width: 0.47 * screenWidth,
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
    imgStyle: {
        height: (0.8 / 3) * screenHeight,
        resizeMode: 'stretch',
        justifyContent: 'flex-end'
    },
    wrapPrice: {
        height: (0.16 / 3) * screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textPriceStyle: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '400'
    },
    iconStylePrice: {
        width: 24,
        height: 24,
        resizeMode: 'stretch',
        marginRight: 5
    },
    nameStyle: {
        textAlign: 'center',
        paddingVertical: 1,
        fontSize: 18,
        color: '#111111'
    },
    wrapRate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapLike: {
        flexDirection: 'row',
        marginTop: 5
    },
    wrapStar: {
        flexDirection: 'row',
        marginTop: 5,
        marginRight: 5
    },
    iconLikeStyle: {
        marginLeft: 5,
        marginRight: 3,
        marginTop: 4,
        width: 15,
        height: 15
    },
    iconStarStyle: {
        marginTop: 4,
        width: 12,
        height: 12
    }
};
