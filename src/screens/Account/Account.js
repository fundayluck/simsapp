import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { logOut } from '../../services/auth/authSlice'
import { useDispatch } from 'react-redux'
import { navigate } from '../../navigation/utils'
import { useNavigation } from '@react-navigation/native'

const Account = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogOut = async () => {
        await dispatch(logOut())
        navigation.navigate('Splash')
    }
    return (
        <View>
            <Text>Account</Text>
            <Button onPress={handleLogOut}>Log Out</Button>
        </View>
    )
}

export default Account