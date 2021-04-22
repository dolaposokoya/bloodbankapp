import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from '../screen/UserList';
import Chat from '../screen/Chat';



const Stack = createStackNavigator();

const ChatStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Chats" component={Chat} />
        </Stack.Navigator>
    );
}

export default ChatStack
