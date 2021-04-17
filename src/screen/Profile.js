import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native'
import Header from '../shared/header';
import { apiUrl } from '../config/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../shared/loader';
import UserProfile from '../shared/UserProfile';
import { Avatar, Title, Text, Switch, Drawer, Paragraph, Caption } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Cookie from 'react-native-cookie';



const { height, width } = Dimensions.get('window')
export default function Profile(props) {

    const { navigation } = props
    const [user, setuser] = useState({})
    const [loading, setloading] = useState(false)
    const [focused, setfocused] = useState('Contact')
    const [myProfile, setmyProfile] = useState(false)

    const getUser = async () => {
        // setloading(true)
        try {
            const userId = await AsyncStorage.getItem('@user_info')
            const id = JSON.parse(userId)
            const response = await axios({
                method: 'GET',
                url: `${apiUrl.getOneUser}?id=${id._id}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${apiUrl.basicAuth}`,
                },
            })
            const { data, success, message } = response.data
            if (success === true) {
                setuser(data)
                setloading(false)
            }
            else {
                // console.warn('Errpor', message)
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            Alert.alert(error.message)
        }
    }

    useEffect(() => {
        getUser()
        const unsubscribe = navigation.addListener('focus', () => {
            getUser
        })
        return () => unsubscribe
    }, [navigation])

    const logOutSession = async () => {
        Cookie.clear('https://api-bloodbank-v1.herokuapp.com/');
        await AsyncStorage.removeItem('@user_info')
        navigation.navigate('Login');
    }
    return (
        <View>
            <Header
                title="My Profile"
                parentProps={props}
                navigation={props.navigation}
            />
            {!loading ?
                <SafeAreaView style={Style.container}>
                    {!myProfile ? <View style={Style.drawerContent}>
                        <View style={Style.userInfoSection}>
                            <View style={{ flexDirection: 'column', marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar.Image
                                    source={{ uri: user.profile_image && `${apiUrl.baseURL}/${user.profile_image}` }}
                                    size={120}
                                />
                                <View style={Style.titleCont}>
                                    <Title style={Style.title}>{user && `${user.first_name} ${user.last_name}`}</Title>
                                </View>
                            </View>
                        </View>
                        <Drawer.Section style={Style.drawerSection}>
                            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                                <DrawerItem
                                    onPress={() => {
                                        setmyProfile(true)
                                    }}
                                    icon={({ color, size }) => (
                                        <Image source={require('../assets/images/user.png')} style={{ width: 35, height: 35 }} />
                                    )}
                                    labelStyle={{
                                        fontSize: 18,
                                    }}
                                    label="Profile"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                                <DrawerItem
                                    // onPress={() => {
                                    //     selectedPage('Contact')
                                    // }}
                                    icon={({ color, size }) => (
                                        <Image source={require('../assets/images/key.png')} style={{ width: 35, height: 35 }} />
                                    )}
                                    labelStyle={{
                                        fontSize: 18,
                                    }}
                                    label="Reset Password"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'white' }}>
                                <DrawerItem
                                    // onPress={() => {
                                    //     selectedPage('Request')
                                    // }}
                                    icon={({ color, size }) => (
                                        <Image source={require('../assets/images/clipboards.png')} style={{ width: 35, height: 35 }} />
                                    )}
                                    labelStyle={{
                                        fontSize: 18,
                                    }}
                                    label="My Request"
                                />
                            </TouchableOpacity>
                        </Drawer.Section>
                    </View> : <View style={Style.userProfile}>
                        <UserProfile user={user} navigation={navigation} />
                        <View style={Style.userProfile}>
                            <TouchableOpacity onPress={() => setmyProfile(false)} style={Style.done}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    {/* <View> */}
                    <TouchableOpacity style={Style.bottomDrawerSection} onPress={() => logOutSession()}>
                        <Image source={require('../assets/images/logout.png')} style={{ width: 40, height: 40, marginRight: 20 }} />
                        <Text style={{ fontSize: 18, alignSelf: 'center' }}>Log Out</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </SafeAreaView> :
                <Loader />}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * (1 - 0.24),
        marginBottom: height * 0.24,
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingTop: 20,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: height * 0.05,
        width,
        borderBottomColor: 'black',
        borderBottomWidth: 0.6
    },
    bottomDrawerSection: {
        // bottom: 20,
        // marginBottom: 15,
        // borderTopColor: 'black',
        width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    userProfile: {
        backgroundColor: 'yellow',
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        // marginLeft: width
    },
    done: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignContent: 'center',
        width: width * 0.5

    }
})