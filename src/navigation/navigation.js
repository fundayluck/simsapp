import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navigate, navigationRef } from './utils'
import Login from '../screens/Login/Login'
import Splash from '../screens/Splash/Splash'
import Topup from '../screens/Topup/Topup'
import Home from '../screens/Home/Home'
import Account from '../screens/Account/Account'
import { COLOR } from '../Theme/Color'
import Icon from 'react-native-vector-icons/Ionicons'
import Registration from '../screens/Registration/Registration'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen
                name="Top Up"
                component={Topup}
                options={{
                    tabBarActiveTintColor: COLOR.primary,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Icon name={'cash-outline'} size={25} color={focused ? COLOR.primary : color} />
                    }
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: COLOR.primary,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Icon name={'home'} size={25} color={focused ? COLOR.primary : color} />
                    }
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarActiveTintColor: COLOR.primary,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size, }) => {
                        return <Icon name={'person'} size={size} color={focused ? COLOR.primary : color} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const MainNavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Splash'} >
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Registration} />
                <Stack.Screen
                    name="HomeBase"
                    options={{ headerShown: false }}
                    component={MyTabs}
                />
                {/* add your another screen here using -> Stack.Screen */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation
