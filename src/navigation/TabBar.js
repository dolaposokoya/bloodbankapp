import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarComponent from './TabBarComponent'
import ContactDonorComp from '../screen/contactDonor';
import Chat from '../screen/Chat';
import RequestComp from '../screen/requestBlood';;
import ProfileStack from './ProfileStack'
import { Image, Dimensions } from "react-native";
import ChatStack from './ChatStack'



const TabNavigation = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");
const TabBar = (props) => {

    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        if (routeName === 'Chats') {
            return false
        }
        return true
    }
    return (
        <TabNavigation.Navigator
            initialRouteName="Contact"
            tabBarOptions={{
                activeTintColor: "#8B0000",
                inactiveTintColor: "black",
                style: {
                    backgroundColor: "#fff",
                    paddingTop: height * 0.010,
                    height: height * 0.075,
                },
                labelStyle: {
                    textAlign: "center",
                    fontSize: 16,
                },
            }}
        // tabBar={props => <TabBarComponent {...props} />}
        >
            <TabNavigation.Screen name="Contact" component={ContactDonorComp}
                options={{
                    tabBarLabel: "Contact",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require("../assets/images/contact-book2.png")
                                    : require("../assets/images/contact-book.png")
                            }
                            style={{
                                height: size,
                                width: size,
                            }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <TabNavigation.Screen name="Request" component={RequestComp}
                options={{
                    // tabBarVisible: false,
                    tabBarLabel: "Request",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require("../assets/images/request2.png")
                                    : require("../assets/images/request.png")
                            }
                            style={{
                                height: size,
                                width: size,

                            }}
                            resizeMode="contain"
                        />
                    )
                }}
            />
            <TabNavigation.Screen name="Chat" component={ChatStack}
                options={({ route }) => ({
                    tabBarVisible: route.state && route.state.index === 0,
                    // tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: "Chat",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require("../assets/images/messenger2.png")
                                    : require("../assets/images/messenger.png")
                            }
                            style={{
                                height: size,
                                width: size,

                            }}
                            resizeMode="contain"
                        />
                    )
                })}
            />
            < TabNavigation.Screen name="Profile" component={ProfileStack}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require("../assets/images/user2.png")
                                    : require("../assets/images/user.png")
                            }
                            style={{
                                height: size,
                                width: size,

                            }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </TabNavigation.Navigator>
    )
}

export default TabBar

