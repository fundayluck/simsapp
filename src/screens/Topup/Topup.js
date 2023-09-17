import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Background_Saldo from '../../assets/image/Profile_Photo.png'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useSelector } from 'react-redux'
import { HEIGHT, WIDTH } from '../../Theme/Dimension'
import { useLazyGetProfileQuery } from '../../services/modules/profile'
import { Card } from 'react-native-paper'
import { COLOR } from '../../Theme/Color'
import Icon from 'react-native-vector-icons/Ionicons'

const Topup = () => {
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState([])

    const [getProfile, { }] = useLazyGetProfileQuery()

    useEffect(() => {
        const getUser = async () => {
            const res = await getProfile(token)
            setUser(res?.data?.data);
        }
        getUser()
    }, [token, getProfile])

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: WIDTH * 0.02,
                    paddingVertical: HEIGHT * 0.01,
                    justifyContent: 'space-around'
                }}
            >
                <View>
                    <Image

                        source={Background_Saldo}
                    />
                    <Text
                        style={{
                            fontSize: 18
                        }}
                    >Selamat Datang,</Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >{`${user?.first_name} ${user?.last_name}`}</Text>
                </View>
                <View>
                    <Card
                        style={{
                            width: WIDTH * 0.49,
                            height: HEIGHT * 0.14,
                            backgroundColor: COLOR.primary
                        }}
                    >
                        <Card.Content
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ fontSize: 12, color: COLOR.lightGray, marginBottom: HEIGHT * 0.005 }}>Saldo anda</Text>
                            <Text style={{ fontSize: 25, color: COLOR.lightGray }}>Rp.10.000</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ fontSize: 12, color: COLOR.lightGray, marginVertical: HEIGHT * 0.01 }}>Lihat Saldo</Text>
                                <Icon style={{ left: 3, color: COLOR.white }} name='eye-outline' />
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        </>
    )
}

export default Topup