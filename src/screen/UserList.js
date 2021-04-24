import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, FlatList, Alert } from 'react-native'
import Header from '../shared/header';
import UserData from '../shared/UserData';
import Loader from '../shared/loader';
import { usersRef } from '../config/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height } = Dimensions.get('window')
export default function UserList(props) {

    const { navigation } = props
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getUser()
        return () => getUser()
    }, [])

    const getUser = async () => {
        const value = await AsyncStorage.getItem('@user_info')
        const currentUser = JSON.parse(value)
        setloading(true)
        const response = []
        usersRef.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                const newUSer = documentSnapshot.data()
                if (newUSer._id !== currentUser._id)
                    response.push(newUSer)
                setusers(response)
                setloading(false)
            });
        }).catch(error => {
            Alert.alert(error.message)
            setloading(false)
        })
    }
    const renderUserList = ({ item }) => (
        <UserData navigation={navigation} item={item} />
    )
    return (
        <>
            <Header
                title="Messages"
                parentProps={props}
                navigation={navigation}
            />
            {loading && <Loader />}
            <View style={{
                height: height,
                flex: 1,
                marginBottom: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FlatList
                    data={users}
                    keyExtractor={item => item._id}
                    renderItem={renderUserList}
                />
            </View>
        </>
    )
}
