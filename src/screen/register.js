import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Register() {
    return (
        <View style={Styles.container}>
            <Text>Register User</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})