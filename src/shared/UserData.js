import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { apiUrl, chatsRef, THEME_COLOR } from '../config/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { height, width } = Dimensions.get('window')
export default function UserData(props) {
    const { navigation, item } = props
    const [messages, setmessages] = useState({})
    const [createdAt, setcreatedAt] = useState('')
    const [textColor, settextColor] = useState('#3C3F42')
    const [dateColor, setdateColor] = useState('#A89877')
    useEffect(() => {
        getUserChat()
        return () => getUserChat()
    }, [])

    const goToChat = () => {
        // settextColor('#a9a9a9')
        // setdateColor('#000')
        navigation.navigate('Chats', {
            user: item
        })
    }

    const getUserChat = async () => {
        const value = await AsyncStorage.getItem('@user_info')
        let currentUser = JSON.parse(value)
        const _id = currentUser._id
        chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                }).filter(message => {
                    return (message.sent_from === _id && message.sent_to === item._id || message.sent_to === _id && message.sent_from === item._id)
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            if (messagesFirestore.length > 0) {
                setmessages(messagesFirestore[0])
                const newDate = getTime(new Date(messagesFirestore[0].createdAt))
                setcreatedAt(newDate)
                // settextColor('#000')
                // setdateColor(THEME_COLOR)
            }
            else {
                null
            }
        })
    }

    function getTime(myDate) {
        let hours = myDate.getHours();
        let minutes = myDate.getMinutes()
        hours = hours < 10 ? `0${hours}` : hours
        minutes = minutes < 10 ? `0${minutes}` : minutes
        let time = `${hours}:${minutes}`
        if (hours === 12) {
            time = `${time} PM`
            return time

        }
        else if (hours > 12) {
            hours = hours % 12
            hours = hours < 10 ? `0${hours}` : hours
            time = `${hours}:${minutes} PM`
            return time
        }
        else if (hours === '00') {
            hours = hours === '00' ? 12 : hours
            time = `${hours}:${minutes} AM`
            return time
        }
        else {
            time = `${time} AM`
            return time
        }
    }


    return (
        <ScrollView style={{
            marginTop: 12,
        }}>
            <View style={Styles.container}>
                <View style={{
                    width: width * 0.18,
                }}>
                    <Image source={{ uri: `${apiUrl.baseURL}/${item.avatar}` }} style={Styles.imageView} />
                </View>
                <TouchableOpacity style={Styles.msgContainer} onPress={() => goToChat()}>
                    <View style={Styles.msgView}>
                        <Text style={Styles.userName}>{item.name}</Text>
                        <Text style={[Styles.userTime, { color: dateColor }]}>{createdAt}</Text>
                    </View>
                    <Text numberOfLines={2} style={[Styles.userMessage, { color: textColor }]}>{messages.text}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const Styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageView: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    msgContainer: {
        marginLeft: - (width * 0.03),
        width: width * 0.80,
        paddingBottom: 12,
        borderBottomWidth: 1
    },
    msgView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    userTime: {
        fontWeight: '600',
        fontSize: 16
    },
    userMessage: {
        fontWeight: '600',
        fontSize: 16
    },
})