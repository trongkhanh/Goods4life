import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import addProductIcon from '../../../../media/appIcon/add_product.png';
import backIcon from '../../../../media/appIcon/back_right.png';
import pick from '../../../../api/imgpicker';
import icBack from '../../../../media/appIcon/back_white.png';
import icLogo from '../../../../media/appIcon/ic_logo.png';

const { height } = Dimensions.get('window');

export default class RegisterSell extends Component {
    constructor(props){
        super(props);
        this.state ={
          mat1: null,
          mat2: null,
          data1: null,
          data2: null,
          cmnd: null
        }
      }

    show1(){
        pick((source, data1) => this.setState({mat1: source, data1}));
    }

    show2(){
        pick((source, data2) => this.setState({mat2: source, data2}));
    }

    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    subMit(){
        fetch("http://192.168.1.187:8080/local-server/SellerInfo", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sellerInfo : {
                accountID: "1",
                rating:1,
                status: "true",
                startDate: new Date(),
                comment: "test",
                sellerType: 1,
                idCardImage: this.state.cmnd}, 
            idCardBefore: this.state.data1,
            idCardAfter: this.state.data2
        })
          }).then(response => response.json())
            .then(responseJson => {
                if(responseJson.code == 200){
                    alert("Đăng ký thành công");
                    this.goBack();
                }else{
                    alert("Đăng ký thất bại");
                }
            })
            .catch(error => {
                console.error(error);
             });
    }

    render() {
        let img1 = this.state.mat1==null? null:
        <Image 
            source={this.state.mat1}
            style={{width:200, height: 200, margin: 20, alignSelf: 'center'}}
        />

        let img2 = this.state.mat2==null? null:
        <Image 
            source={this.state.mat2}
            style={{width:200, height: 200, margin: 20, alignSelf: 'center'}}
        />
        return (
            <ScrollView style={styles.container}>
                    <View style={styles.row1}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={icBack} style={styles.iconStyle} />
                        </TouchableOpacity>
                        <Text style={styles.titleStyle}>Đăng ký bán hàng</Text>
                        <Text/>
                    </View>
                    <Text style={styles.textInput}>Số CMND</Text>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Nhập số CMND ..." 
                        value={this.state.cmnd}
                        onChangeText={text => this.setState({ cmnd: text })}
                        underlineColorAndroid='transparent'
                        returnKeyType="go"
                    />
                    <View style={styles.row2}>
                    <Text style={styles.textInput}>Ảnh chụp mặt trước CMND</Text>

                    <TouchableOpacity style={styles.wrapper} onPress={this.show1.bind(this)}>
                        <Text style={styles.textInput}>Chọn thư mục</Text>
                    </TouchableOpacity>
                    </View>
                    {img1}

                    <View style={styles.row2}>
                    <Text style={styles.textInput}>Ảnh chụp mặt sau CMND</Text>
                    <TouchableOpacity style={styles.wrapper} onPress={this.show2.bind(this)}>
                        <Text style={styles.textInput}>Chọn thư mục</Text>
                    </TouchableOpacity>
                    </View>
                    {img2}

                    <TouchableOpacity style={styles.wrapper}  onPress={this.subMit.bind(this)}>
                        <Text style={styles.textInput}>Gửi</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F6F6F6',
        flex: 1
    },wrapper: { 
        height: height / 13, 
        backgroundColor: '#2ABB9C', 
        padding: 12, 
        margin: 10,
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    }, textInput: { 
        height: height / 23, 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    iconStyle: { width: 25, height: 25 },

    row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2ABB9C'},
    row2: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'},
    iconStyles: { width: 30, height: 30 },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 20 },
    inputStyle: {
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        paddingLeft: 30
    },
})