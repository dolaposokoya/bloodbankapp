import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screen/Profile';
import UserProfile from '../shared/UserProfile';

const Stack = createStackNavigator();


const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    );
}

export default ProfileStack
