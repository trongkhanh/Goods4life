import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import register from '../../api/register';
import validateEmail from '../../api/validateEmail';
import validatePhoneNumber from '../../api/validatePhoneNumber';
import checkPassword from '../../api/checkPassword';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email_phone: '',
            addr: '',
            password: '',
            repassword: ''
        };
    }

    onSuccess(code) {
        const { navigator } = this.props;
        navigator.push({name: 'VERICATION_MAIL', code});
    }

    onFail() {
        Alert.alert(
            'Notice',
            'Kiểm tra lại kết nối mạng',
            [
                 { text: 'OK', onPress: () => this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        );
    }

    removeEmail() {
        this.setState({ email: '' });
    }

    registerUser() {
        const { username, password, email_phone, addr, repassword } = this.state;
        const ws = register();
        if(!validateEmail(email_phone) && !validatePhoneNumber(email_phone)){
            alert('Email/phone không hợp lệ!');
            return;
        }

        if(!checkPassword(password)){
            alert('Mật khẩu phải có từ 7 đến 20 ký tự chỉ chứa chữ cái, số, gạch dưới và ký tự đầu tiên phải là chữ cái');
            return;
        }

        if(password != repassword){
            alert('Mật khẩu không khớp');
            return;
        }
                    
        ws.onopen = () => {
            // connection opened
            if(validateEmail(email_phone))
                ws.send(JSON.stringify({UserName: username, PassWord: password, Email: email_phone, AccountType: 1}));
            else if(validatePhoneNumber(email_phone))
                ws.send(JSON.stringify({UserName: username, PassWord: password, PhoneNumber: email_phone, AccountType: 1}));
        };
          
        ws.onmessage = (e) => {
            // a message was received
            console.log("messsage: " + e.data);
            json = JSON.parse(e.data)
            if(json.code == 200) return this.onSuccess(json.ConfirmCode);
            this.onFail();
        };
        
        ws.onerror = (e) => {
            // an error occurred
            console.log("error: " + e.message);
            this.onFail();
        };
        
        ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
            this.onFail();
        };
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
            <View>
                <TextInput 
                    style={inputStyle} 
                    placeholder="(*) Nhập tên ..." 
                    value={this.state.username}
                    onChangeText={text => this.setState({ username: text })}
                    underlineColorAndroid='transparent'
                    returnKeyType="next"
                    onSubmitEditing={()=> this.phonemailInput.focus()}
                />
                {/* <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập email ..." 
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    returnKeyType="go"
                    ref={(input) => this.emailInput=input}
                    onSubmitEditing={()=> this.phoneInput.focus()}
                /> */}
                <TextInput 
                    style={inputStyle} 
                    placeholder="(*) Nhập email/phone ..." 
                    value={this.state.email_phone}
                    onChangeText={text => this.setState({ email_phone: text })}
                    returnKeyType="go"
                    ref={(input) => this.phonemailInput=input}
                    onSubmitEditing={()=> this.addressInput.focus()}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập địa chỉ ..." 
                    value={this.state.addr}
                    onChangeText={text => this.setState({ addr: text })}
                    returnKeyType="go"
                    ref={(input) => this.addressInput=input}
                    onSubmitEditing={()=> this.passwordInput.focus()}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="(*) Nhập mật khẩu ..." 
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={text => this.setState({ password: text })}
                    returnKeyType="go"
                    ref={(input) => this.passwordInput=input}
                    onSubmitEditing={()=> this.repasswordInput.focus()}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="(*) Nhập lại mật khẩu ..." 
                    value={this.state.rePassword}
                    secureTextEntry
                    onChangeText={text => this.setState({ repassword: text })}
                    returnKeyType="go"
                    ref={(input) => this.repasswordInput=input}
                />
                <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                    <Text style={buttonText}>Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
