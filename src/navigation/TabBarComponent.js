import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import TabStyle from './TabStyle'
import { Avatar, Title, Text, Switch, Drawer, Paragraph, Caption } from 'react-native-paper'



export default function TabBarComponent(props) {

    const { state, descriptors, navigation } = props
    const { routes } = state
    const [focused, setfocused] = useState('Contact')
    const focusedOptions = descriptors[routes[state.index].key].options;
    // console.warn('routes', routes)
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const handlePress = (name) => {
        setfocused(name)
        navigation.navigate(name)
    }
    return (
        <View style={TabStyle.wrapper}>
            <View style={TabStyle.container}>
                <TouchableOpacity style={TabStyle.container2} onPress={() => handlePress('Contact')}>
                    <Image source={focused !== 'Contact' ? require('../assets/images/contact-book.png') : require('../assets/images/contact-book2.png')} style={{ width: 20, height: 20 }} />
                    <Title style={{ color: focused === 'Contact' ? '#8B0000' : 'black', fontSize: 16 }}>Contact</Title>
                </TouchableOpacity>
                <TouchableOpacity style={TabStyle.container2} onPress={(Contact) => handlePress('Request')}>
                    <Image source={focused !== 'Request' ? require('../assets/images/clipboards.png') : require('../assets/images/clipboards2.png')} style={{ width: 20, height: 20 }} />
                    <Title style={{ color: focused === 'Request' ? '#8B0000' : 'black', fontSize: 16 }}>Request</Title>
                </TouchableOpacity>
                <TouchableOpacity style={TabStyle.container2} onPress={() => handlePress('Profile')}>
                    <Image source={focused !== 'Profile' ? require('../assets/images/user.png') : require('../assets/images/user2.png')} style={{ width: 20, height: 20 }} />
                    <Title style={{ color: focused === 'Profile' ? '#8B0000' : 'black', fontSize: 16 }}>Profile</Title>
                </TouchableOpacity>
            </View>
        </View>
    )
}
