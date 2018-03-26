import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const iconCart = require('../../../images/icons/cart.png');
const iconMore = require('../../../images/icons/more.png');

export default class NavigationBar extends Component {
    render() {
        const { nav, styleHeader, iconMoreStyle, styleTextHeader, iconCartStyle } = styles;
        return (
            <View style={nav}>
                <View style={styleHeader}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={iconMore} style={iconMoreStyle} />
                        </TouchableOpacity>
                        <Text style={styleTextHeader}>Good for Life</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={iconCart} style={iconCartStyle} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.texInputStyle}
                    inlineImageLeft='search'
                    placeholder=' Bạn muốn mua gì ?'
                    placeholderTextColor='#879596'
                    underlineColorAndroid='transparent'
                />
            </View>
        );
    }
}

const styles = {
    nav: {
        backgroundColor: '#008296',
        height: (0.95 / 6) * screenHeight,
    },
    styleHeader: {
        flexDirection: 'row',
        height: (0.45 / 6) * screenHeight,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    texInputStyle: {
        height: (0.4 / 6) * screenHeight,
        backgroundColor: '#ffffff',
        marginHorizontal: 5
    },
    iconMoreStyle: {
        width: 20,
        height: 26,
        resizeMode: 'stretch',
        marginLeft: 5
    },
    styleTextHeader: {
        fontSize: 20,
        fontFamily: 'Great CIties Personal Use',
        marginLeft: 15,
        color: '#ffffff'
    },
    iconCartStyle: {
        width: 26,
        height: 26,
        resizeMode: 'stretch',
        marginRight: 10
    }
};
