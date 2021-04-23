import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import Style from './Style'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Title, Text, Switch, Drawer, Paragraph, Caption } from 'react-native-paper'
import Cookie from 'react-native-cookie';
import { apiUrl } from '../config/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DrawerComponent(props) {

    const [focused, setfocused] = useState('Contact')
    const { user, navigation } = props

    const selectedPage = async (selected) => {
        setfocused(selected)
        navigation.navigate(selected);
    }

    const logOutSession = async () => {
        Cookie.clear('https://api-bloodbank-v1.herokuapp.com/');
        await AsyncStorage.removeItem('@user_info')
        navigation.navigate('Login');
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={Style.drawerContent}>
                    <View style={Style.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                // source={require('../assets/images/user.png')}
                                source={{ uri: user.profile_image && `${apiUrl.baseURL}/${user.profile_image}` }}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={Style.title}>{user && user.first_name}</Title>
                                <Caption style={Style.caption}>@{user && user.last_name}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={Style.drawerSection}>
                        <TouchableOpacity style={{ backgroundColor: focused === 'Profile' ? '#e3e3e3' : 'white' }}>
                            <DrawerItem
                                onPress={() => {
                                    selectedPage('Profile')
                                }}
                                icon={({ color, size }) => (
                                    <Image source={require('../assets/images/user.png')} style={{ width: 35, height: 35 }} />
                                )}
                                labelStyle={{
                                    fontSize: 18,
                                }}
                                label="PROFILE"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: focused === 'Contact' ? '#e3e3e3' : 'white' }}>
                            <DrawerItem
                                onPress={() => {
                                    selectedPage('Contact')
                                }}
                                icon={({ color, size }) => (
                                    <Image source={require('../assets/images/contact-book.png')} style={{ width: 35, height: 35 }} />
                                )}
                                labelStyle={{
                                    fontSize: 18,
                                }}
                                label="CONTACT"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: focused === 'Request' ? '#e3e3e3' : 'white' }}>
                            <DrawerItem
                                onPress={() => {
                                    selectedPage('Request')
                                }}
                                icon={({ color, size }) => (
                                    <Image source={require('../assets/images/request.png')} style={{ width: 35, height: 35 }} />
                                )}
                                labelStyle={{
                                    fontSize: 18,
                                }}
                                label="REQUEST"
                            />
                        </TouchableOpacity>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={Style.bottomDrawerSection}>
                <DrawerItem
                    onPress={() => {
                        logOutSession()
                    }}
                    icon={({ color, size }) => (
                        <Image source={require('../assets/images/logout.png')} style={{ width: 40, height: 40 }} />
                    )}
                    labelStyle={{
                        fontSize: 18,
                    }}
                    label="Sign Out"
                />
            </Drawer.Section>
        </View>
    )
}
