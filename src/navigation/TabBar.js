import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarComponent from './TabBarComponent'
import ContactDonorComp from '../screen/contactDonor';
import RequestComp from '../screen/requestBlood';
import Profile from '../screen/Profile';


const TabNavigation = createBottomTabNavigator();

const TabBar = (props) => {

    return (
        <TabNavigation.Navigator
            initialRouteName={ContactDonorComp}
            tabBar={props => <TabBarComponent {...props} />}
        >
            <TabNavigation.Screen name="Contact" component={ContactDonorComp} />
            <TabNavigation.Screen name="Request" component={RequestComp} />
            <TabNavigation.Screen name="Profile" component={Profile} />
        </TabNavigation.Navigator>
    )
}

export default TabBar

// export default TabBarNavigation = () => {
//     return (
//         <NavigationContainer>
//             <TabBar />
//         </NavigationContainer>
//     )
// };
