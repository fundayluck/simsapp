import { View, Image, ActivityIndicator } from 'react-native'
import Logo from '../../assets/logo/Logo.png'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useSelector } from 'react-redux'
import { navigate } from '../../navigation/utils'
import Gutters from '../../Theme/Gutters'



const Splash = () => {
    const token = useSelector(selectCurrentToken)
    const [loading, setLoading] = useState(true)

    const init = async () => {
        await new Promise(resolve =>
            setTimeout(() => {
                resolve(true)
                setLoading(false)
            }, 2000),
        )

        if (loading) return
        if (token === null) {
            navigate('Login')

            console.log('login');
        } else {
            navigate('HomeBase')
            console.log('homebase');
        }
    }

    useEffect(() => {
        init()
    })


    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                // backgroundColor: COLOR.primary
            }}
        >
            <Image source={Logo} style={{ alignSelf: 'center', width: 100, height: 100, marginBottom: 10 }} />
            <ActivityIndicator size={'large'} style={[Gutters.largeVmargin]} />
        </View>
    )
}

export default Splash