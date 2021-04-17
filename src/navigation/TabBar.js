import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarComponent from './TabBarComponent'
import ContactDonorComp from '../screen/contactDonor';
import Chat from '../screen/Chat';
import RequestComp from '../screen/requestBlood';
import Profile from '../screen/Profile';
import { Image, Dimensions } from "react-native";



const TabNavigation = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");
const TabBar = (props) => {

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
                                    ? require("../assets/images/clipboards2.png")
                                    : require("../assets/images/clipboards.png")
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
            <TabNavigation.Screen name="Chat" component={Chat}
                options={{
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
                }}
            />
            < TabNavigation.Screen name="Profile" component={Profile}
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

