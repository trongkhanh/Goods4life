import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import NavigationBar from './NavBar';
import NewProduct from './NewProduct';
import StoreFollow from './StoreFollow';
import Catalogues from './Catalogues';
import ProductSuggest from './ProductSuggest';

export default class Home extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar />
                <ScrollView>
                    <NewProduct />
                    <StoreFollow />
                    <Catalogues />
                    <ProductSuggest />
                </ScrollView>
            </View>
        );
    }
}
