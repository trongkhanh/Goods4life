import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class LoadMore extends Component {
    render() {
        const { styleLine, moreStyle, textMoreStyle } = styles;
        return (
            <View>
                <View style={styleLine} />
                <TouchableOpacity style={moreStyle}>
                    <Text style={textMoreStyle}>{this.props.textMore}</Text>
                    <Text style={textMoreStyle}>>></Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    styleLine: {
        marginTop: 10,
        height: 1,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 8
    },
    moreStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8'
    },
    textMoreStyle: {
        fontFamily: 'Comfortaa-Regular',
        color: '#008296'
    }
};
