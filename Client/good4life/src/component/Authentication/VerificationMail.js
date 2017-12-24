import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import register from '../../api/register';

import icBack from '../../media/appIcon/back_white.png';
import icLogo from '../../media/appIcon/ic_logo.png';

export default class VerificationMail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code_mail: ''
        };
    }

    onSuccess() {
        Alert.alert(
            'Notice',
            'Đăng ký thành công',
            [
                { text: 'OK', onPress: this.goBackToMain() }
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Mã code sai',
            'Đăng ký thất bại',
            [
                { text: 'OK', onPress: () => this.removeCode.bind(this) }
            ],
            { cancelable: false }
        );
    }

    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }

    subMit(){
        const {code} = this.props;
        const {code_mail} = this.state;
        console.log("code_mail: " + code);
        if(code == code_mail)
            this.onSuccess();
        else
            this.onFail();
    }

    removeCode(){
        this.setState({ code_mail: '' });
    }

    render() {
        const { inputStyle, bigButton, buttonText, container, row1, iconStyle, titleStyle } = styles;
       
        return (
            <View style={container}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={icBack} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Thư xác minh</Text>
                    <Image source={icLogo} style={iconStyle} />
                </View>
                <View>
                <Text>Mã code sẽ được gửi vào địa chỉ mail của bạn. Điền mã code: </Text>
                <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập vào mã code" 
                    value={this.state.code_mail}
                    onChangeText={text => this.setState({ code_mail: text })}
                />
                <TouchableOpacity style={bigButton} onPress={this.subMit.bind(this)}>
                    <Text style={buttonText}>Kiểm tra</Text>
                </TouchableOpacity>
                </View>
                <View/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3EBA77',
        padding: 20,
        justifyContent: 'space-between',
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    iconStyle: { width: 30, height: 30 },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    }
});
