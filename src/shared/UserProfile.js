import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Header from './header';

export default function UserProfile(props) {
    const { navigation, user } = props
    return (
        <View>
            <Text>{user.first_name}</Text>
            <Text>{user.last_name}</Text>
            <Text>{user.username}</Text>
        </View>
    )
}
