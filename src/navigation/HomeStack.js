import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screen/Register';
import Login from '../screen/login';
import TabBar from './TabBar'
import { NavigationContainer } from '@react-navigation/native';
import Cookie from 'react-native-cookie';
import Loader from '../shared/loader';

const Stack = createStackNavigator();


const HomeStack = () => {

    const [loggedIn, setloggedIn] = useState(false)
    const [loading, setloading] = useState(true)
    const checkSession = async () => {
        Cookie.get('https://api-bloodbank-v1.herokuapp.com/').then(cookie => {
            if (cookie && cookie._SESSION_ID_) {
                setloggedIn(true)
                setTimeout(() => {
                    setloading(false)
                }, 2000);
            }
            else {
                setloggedIn(false)
                setTimeout(() => {
                    setloading(false)
                }, 2000);
            }
        })
    }

    useEffect(() => {
        checkSession()
        // return () => {
        //     cleanup
        // }
    }, [])

    if (loading) {
        checkSession()
        return <Loader />;
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            {loggedIn === false ? (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="TabBar" component={TabBar} />
                </>
            ) :
                (
                    <>
                        <Stack.Screen name="TabBar" component={TabBar} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                    </>
                )
            }
        </Stack.Navigator>
    );
}

export default HomeNavigation = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
};
// export default HomeStack