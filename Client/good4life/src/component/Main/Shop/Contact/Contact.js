import React, { Component } from 'react';
import { Navigator } from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';

import ContactView from './ContactView';
import RegisterSell from './RegisterSell';

class Contact extends Component {
    render() {
        const {types, topProducts} = this.props;
        return (
            <NavigationExperimental.Navigator
                initialRoute={{ name: 'CONTACT_VIEW' }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                        case 'CONTACT_VIEW': return <ContactView navigator={navigator} types ={types} topProducts={topProducts}/>;
                        default: return <RegisterSell navigator={navigator} product={route.product}/>;
                    }
                }}
            />
        );
    }
}

export default Contact;