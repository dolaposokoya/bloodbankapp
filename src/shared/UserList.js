import React from 'react'
import { View, Text, Dimensions, FlatList } from 'react-native'
import Header from './header';
import UserData from './UserData';
import { users } from '../config/users'


const { height } = Dimensions.get('window')


export default function UserList(props) {

    const { navigation } = props


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
