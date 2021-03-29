import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import Style from '../assets/style/style';
import StyleView from '../assets/style/sidebarstyle';

export default function Item(props) {
    const { item } = props
    const { first_name, gender, blood_group, city, id, email, state } = item
    const [modalView, setmodalView] = useState(false)
    const [modelViewData, setmodelViewData] = useState({})

    const contactDonor = item => {
        setmodalView(true)
        setmodelViewData(item)
    };
    return (
        <View style={Style.item}>
            <View>
                <Modal
                    animationType="slide"
                    visible={modalView}
                    transparent={true}>
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                        <View style={StyleView.modalView}>
                            <Text style={StyleView.modalContent}>
                                <Image
                                    style={Style.iconImage}
                                    resizeMode="contain"
                                    source={require('../assets/images/login.png')}
                                />{' '}{' '}
                                {modelViewData.first_name || 'N/A'}
                                {'\n'}
                                <Image
                                    style={Style.iconImage}
                                    resizeMode="contain"
                                    source={require('../assets/images/mail.png')}
                                />{' '}{' '}
                                {modelViewData.email || 'N/A'}
                            </Text>
                            <TouchableOpacity
                                style={StyleView.touchClose}
                                onPress={() => {
                                    setmodalView(false)
                                    setmodelViewData({})
                                }}>
                                <Text style={StyleView.modalClose}>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={StyleView.contact}>
                <View style={Style.userContent}>
                    <Text style={StyleView.textContent}>
                        <Image
                            style={Style.iconImage}
                            source={require('../assets/images/login.png')}
                            resizeMode="contain"
                        />{' '}{' '}
                        {first_name || 'N/A'}
                    </Text>
                </View>
                <Text style={{
                    width: '100%',
                    marginTop: 10.5,
                    height: 1.5,
                    backgroundColor: 'black'
                }} />
                <View style={Style.userContent}>
                    <Text style={StyleView.textContent}>
                        <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/blood.png')}
                        />{' '}{' '}
                        {blood_group || 'N/A'}
                    </Text>
                </View>
                <Text style={{
                    width: '100%',
                    marginTop: 10,
                    height: 1.5,
                    backgroundColor: 'black'
                }} />
                <View style={Style.userContent}>
                    <Text style={StyleView.textContent}>
                        <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/pin.png')}
                        />{' '}{' '}
                        {city || 'N/A'} {', '}
                        {state || 'N/A'}
                    </Text>
                </View>
                <Text style={{
                    width: '100%',
                    marginTop: 10,
                    height: 1.5,
                    backgroundColor: 'black'
                }} />
                <View style={Style.userContent}>
                    <Text style={StyleView.textContent}>
                        <Image
                            style={Style.iconImage}
                            resizeMode="contain"
                            source={require('../assets/images/gender.png')}
                        />{' '}{' '}
                        {gender || 'N/A'}
                    </Text>
                </View>
                <Text style={{
                    width: '100%',
                    marginTop: 10,
                    height: 1.5,
                    backgroundColor: 'black'
                }} />
                <TouchableOpacity
                    style={[StyleView.profileId, {
                        marginBottom: 20, borderWidth: 2,
                        borderColor: 'black',
                        backgroundColor: 'white'
                    }]}
                    onPress={() => {
                        contactDonor(item);
                    }}
                >
                    <Text style={StyleView.textContainer}>
                        View Email
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}
