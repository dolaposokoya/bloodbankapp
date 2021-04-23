import React from 'react'
import { View, Text, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { apiUrl } from '../config/apiUrl'


const { height, width } = Dimensions.get('window')
export default function UserData(props) {
    const { navigation, item } = props

    const goToChat = () => {
        navigation.navigate('Chats', {
            user: item
        })
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
                        <Text>{item.name}</Text>
                        <Text>{item.createdAt}</Text>
                    </View>
                    <Text numberOfLines={2}>{item.message}</Text>
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
    }
})