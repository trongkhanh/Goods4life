import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {LoginButton, AccessToken, LoginManager, ShareDialog, GraphRequest,
    GraphRequestManager} from 'react-native-fbsdk';

import signIn from '../../api/signIn';
import global from '../global';
import validateEmail from '../../api/validateEmail';
import validatePhoneNumber from '../../api/validatePhoneNumber';
import checkPassword from '../../api/checkPassword';

import saveToken from '../../api/saveToken';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://www.facebook.com/',
            contentDescription: 'Facebook sharing is easy!'
        };

        this.state = {
            user: '',
            password: '',
            shareLinkContent: shareLinkContent,
        };      
    }

    onSignInFB(){
          LoginManager.logInWithPublishPermissions(['publish_actions'])
          .then((result)=>{
            if(result.isCancelled){
                console.log("cancel login");
            }
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                    let accessToken = data.accessToken
                    console.log(accessToken.toString())
      
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result)
                        global.onSignIn(result.name);
                        this.props.goBackToMain();
                      }
                    }
      
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                          }
                        }
                      },
                      responseInfoCallback
                    );
      
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start()      

                }
              )
          })
          .catch(error=> console.log(error));
      }

    // share link
    shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent)
        .then((canShow) => {
            if (canShow) {
            return ShareDialog.show(tmp.state.shareLinkContent);
            }
        })
        .then(result => {
                if (result.isCancelled) {
                    alert('Share cancelled');
                  } else {
                    alert('Share success with postId: ' + result.postId);
                  }
                },
                function(error) {
                alert('Share fail with error: ' + error);
                },
        );
    }

    onSignIn() {
        const { user, password } = this.state;
        const ws = signIn();
        ws.onopen = () => {
            // connection opened
            if(checkPassword(password)){
                if(validateEmail(user)){
                   ws.send(JSON.stringify({data: {Email: user, PassWord: password}, typeSignIn:7}));
                 }else if(validatePhoneNumber(user)){
                   ws.send(JSON.stringify({data: {PhoneNumber: user, PassWord: password}, typeSignIn:8}));
                 }else{
                     alert('Bạn nhập sai tên đăng nhập!');
                 }
            }else{
                alert('Mật khẩu phải có từ 7 đến 20 ký tự chỉ chứa chữ cái, số, gạch dưới và ký tự đầu tiên phải là chữ cái');
            }
           
         };
          
          ws.onmessage = (e) => {
            // a message was received
            console.log("messsage: " + e.data);
            json = JSON.parse(e.data)
            if(json.code == 200){
                global.onSignIn(user);
                this.props.goBackToMain();
                saveToken(json.jwt);
            }
          };
          
          ws.onerror = (e) => {
            // an error occurred
            console.log("error: " + e.message);
          };
          
          ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
          };
    }

    gotoForgotPW(){
        const { navigator } = this.props;
        navigator.push({name: 'FORGOTPW'});
    }

    render() {
        const { inputStyle, bigButton, buttonText, textContainer, text } = styles;
        const { user, password } = this.state;
        return (
            <View>
                <TextInput
                    style={inputStyle}
                    placeholder="Nhập vào email/phone"
                    value={user}
                    onChangeText={text => this.setState({ user: text })}
                    underlineColorAndroid='transparent'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}

                />
                <TextInput
                    style={inputStyle}
                    placeholder="Nhập vào mật khẩu"
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity style={bigButton} onPress={this.onSignInFB.bind(this)}>
                    <Text style={buttonText}>Đăng nhập bằng facebook</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={bigButton} onPress={this.shareLinkWithShareDialog.bind(this)}>
                    <Text style={buttonText}>SHARE LINK WITH FACEBOOK</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={buttonText}>Đăng nhập ngay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textContainer} onPress={this.gotoForgotPW.bind(this)}>
                                <Text style={styles.text}>Quên mật khẩu?</Text>
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
    },
    textContainer:{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10
    },
    text:{
        color: '#fff',
        fontWeight: '700',
    }
});
