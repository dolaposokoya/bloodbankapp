import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, Dimensions, Image, Alert } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import ChatHeader from '../shared/ChatHeader';
import { chatsRef, apiUrl } from '../config/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window')
export default function Chat(props) {

    const { navigation, route } = props
    const { user } = route.params

    const [messages, setMessages] = useState([]);
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentUser, setcurrentUser] = useState({})

    useEffect(() => {
        getUser()
        return () => getUser()
    }, [])

    const getUser = async () => {
        const value = await AsyncStorage.getItem('@user_info')
        let currentUser = JSON.parse(value)
        currentUser = {
            _id: currentUser._id,
            name: currentUser.first_name,
            avatar: `${apiUrl.baseURL}/${currentUser.profile_image}`
        }
        setcurrentUser(currentUser)
        chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    return { ...message, createdAt: message.createdAt.toDate() }
                }).filter(message => {
                    return (message.sent_from === currentUser._id && message.sent_to === user._id || message.sent_to === currentUser._id && message.sent_from === user._id)
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
    }


    const appendMessages = useCallback(
        (messages) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )


    async function onSend(messages) {
        const value = await AsyncStorage.getItem('@user_info')
        let currentUser = JSON.parse(value)
        currentUser = {
            _id: currentUser._id,
            name: currentUser.first_name,
            avatar: `${apiUrl.baseURL}/${currentUser.profile_image}`
        }
        const writes = messages.map((message) => {
            const newMessage = {
                _id: message._id,
                text: message.text,
                sent_to: user._id,
                createdAt: new Date(),
                sent_from: currentUser._id,
                user: currentUser
            };
            chatsRef.add(newMessage)
        })
        await Promise.all(writes)
    }


    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#fff',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                },
                right: {
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: '#999FA8',
                    // backgroundColor: '#587387'
                },
                
            }}
        />
    )

    const renderSend = (props) => (
        <Send
            {...props}
        >
            <View>
                <Image source={require('../assets/images/send-button.png')} style={{
                    width: 32,
                    height: 32,
                    marginBottom: height * 0.010, marginRight: width * 0.01
                }} />
            </View>
        </Send>
    )

    const scrollBottom = (props) => (
        <Image source={require('../assets/images/scroll.png')} style={{
            width: 32,
            height: 32,
        }} />
    )
    const renderTicks = (message) => (
        <Image source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/read-message-1823399-1545756.png' }} style={{
            width: 7,
            height: 7,
        }} />
        // <Image source={require('../assets/images/double-check.png')} style={{
        //     width: 7,
        //     height: 7,
        // }} />
    )
    return (
        <>
            <ChatHeader
                title={user.name}
                parentProps={props}
                navigation={navigation}
            />
            <GiftedChat
                messages={messages}
                onSend={onSend}
                // onSend={messages => onSend(messages)}
                user={{
                    _id: currentUser._id
                }}
                // renderTicks={renderTicks}
                alwaysShowSend
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottom
                isTyping={true}
                // showUserAvatar
                scrollToBottomComponent={scrollBottom}
            />
        </>
    )
}
