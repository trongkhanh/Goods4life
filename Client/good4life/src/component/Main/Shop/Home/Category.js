import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');
const url = 'http://192.168.1.10:8080/local-server/data/product_info/';

export default class Category extends Component {

    gotoListProduct(){
        const {navigator} = this.props;
        navigator.push({name : 'LIST_PRODUCT'});
    }

    render() {
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        const {types} = this.props;
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={textStyle} >Danh sách sản phẩm</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 4 }}>
                    <Swiper showsPagination width={imageWidth} height={imageHeight} 
                            autoplay={true} autoplayTimeout={3}>
                    {types.map(e=>(
                        <TouchableOpacity onPress={this.gotoListProduct.bind(this)} key={e.itemNo}>
                        <Image source={{uri: (url+e.imageName+'.jpg')}} style={imageStyle}>
                            <Text style={cateTitle}>{e.itemSubject}</Text>
                        </Image>
                    </TouchableOpacity>
                    ))}
                    </Swiper>
                </View>
            </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight, 
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#9A9A9A'
    }
});