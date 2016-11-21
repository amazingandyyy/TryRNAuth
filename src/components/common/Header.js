import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowOpacity: 1,
        elevation: 2,
        position: 'relative'
    },
    header: {
        fontSize: 20
    }
});

export { Header } ;
