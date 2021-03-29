import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'

export default function Spinner() {
    return (
        <View style={style.container}>
             <Image style={style.image} source={require('../assets/images/spinner.gif')} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    image: {
        resizeMode: 'center',
        width: 50,
        height: 50,
    }
})