import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import Background_Saldo from '../../assets/image/Profile_Photo.png'
import React, { useEffect, useState } from 'react'
import { HEIGHT, WIDTH } from '../../Theme/Dimension'
import { COLOR } from '../../Theme/Color'
import { Avatar, Card, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../services/auth/authSlice'
import { useLazyGetServicesQuery } from '../../services/modules/information'
import { useLazyGetProfileQuery } from '../../services/modules/profile'

const Home = () => {
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState([])
    const [listTransaction, setListTransaction] = useState([])

    const [getProfile, { }] = useLazyGetProfileQuery()
    const [getServices, { }] = useLazyGetServicesQuery()

    useEffect(() => {
        const getUser = async () => {
            const res = await getProfile(token)
            setUser(res?.data?.data);
        }
        const getSrvcs = async () => {
            const res = await getServices(token)
            setListTransaction(res?.data?.data);
        }
        getUser()
        getSrvcs()
    }, [token, getProfile, getServices])

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
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginHorizontal: WIDTH * 0.002
                }}
            >
                {listTransaction.map((item, index) =>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 12,
                            gap: 5
                        }}
                        key={index}
                    >
                        <Avatar.Image size={60} source={{
                            uri: `${item?.service_icon}`,
                        }} />
                        <Text style={{ fontSize: 8 }}>{item?.service_name}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    )
}

export default Home