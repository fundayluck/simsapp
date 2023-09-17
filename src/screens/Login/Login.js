import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import { useLoginMutation } from '../../services/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../services/auth/authSlice'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../Theme/Color'
import { WIDTH, HEIGHT } from '../../Theme/Dimension'
import CustomInput from '../../components/common/CustomInput'
import Logo from '../../assets/logo/Logo.png'
import { navigate } from '../../navigation/utils'
import { useLazyRegistrationQuery } from '../../services/modules/registration'
import { useToast } from 'react-native-toast-notifications'

const Login = ({ register }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [show, setShow] = useState(true)
    const [showConfirm, setShowConfirm] = useState(true)
    const [login, { isLoading: loadingLogin }] = useLoginMutation()
    const [registration, { isLoading: loadingRegis }] = useLazyRegistrationQuery()
    const dispatch = useDispatch()
    const toast = useToast()

    const validateSubmit = () => {
        if (confirmPass === '') {
            toast.show('isi konfirmasi password dulu', { type: 'warning' })
        } else
            if (confirmPass === password) {
                handleRegister()
            }
    }

    const handleLogin = async () => {
        const data = {
            email,
            password
        }
        try {
            const response = await login(data).unwrap()
            dispatch(setCredentials({ token: response?.data?.token, email: response }))
            toast.show(response?.message, { type: 'success' })
            navigate('HomeBase')
        } catch (error) {
            toast.show(error?.data?.message, { type: 'warning' })
        }
    }

    const handleRegister = async () => {
        const data = {
            email,
            first_name: fName,
            last_name: lName,
            password
        }
        try {
            const response = await registration(data)
            console.log(response);
            if (response.status === 'rejected') {
                toast.show(response.error.data.message, { type: 'warning' })
            } else
                if (response.status === 'fulfilled') {
                    toast.show(response?.data?.message, { type: 'success' })
                    navigate('Login')
                }
        } catch (error) {
            console.log(error);
            toast.show(error?.data?.message, { type: 'warning' })
        }
    }

    return (
        <>
            <StatusBar />
            <View style={{
                flex: 1,
                backgroundColor: COLOR.white,
                flexDirection: 'column',
                justifyContent: 'center'
            }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: HEIGHT * 0.02,
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={Logo}
                        height={100}
                        style={{
                            alignSelf: 'center',
                            marginHorizontal: 10,
                        }}
                    />
                    <Text style={{
                        textAlign: 'center',
                        color: COLOR.anotherdarkerGray,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                    >
                        SIMS PPOB
                    </Text>
                </View>
                <Text style={{
                    textAlign: 'center',
                    color: COLOR.anotherdarkerGray,
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginHorizontal: WIDTH * 0.10,
                    marginBottom: HEIGHT * 0.02
                }}
                >
                    {register ? 'Lengkapi data untuk membuat akun'
                        : 'Masuk Atau Buat Akun Untuk Memulai'}
                </Text>
                <View style={{ alignItems: 'center', }}>
                    <CustomInput
                        placeholder='Email'
                        value={email}
                        style={{ color: COLOR.tGray, backgroundColor: COLOR.white }}
                        placeholderTextColor={COLOR.tGray}
                        setValue={text => setEmail(text)}
                    />
                    {register
                        ? (
                            <>
                                <CustomInput
                                    placeholder='Nama Depan'
                                    value={fName}
                                    style={{ color: COLOR.tGray, backgroundColor: COLOR.white }}
                                    placeholderTextColor={COLOR.tGray}
                                    setValue={text => setFName(text)}
                                />
                                <CustomInput
                                    placeholder='Nama Belakang'
                                    value={lName}
                                    style={{ color: COLOR.tGray, backgroundColor: COLOR.white }}
                                    placeholderTextColor={COLOR.tGray}
                                    setValue={text => setLName(text)}
                                />
                            </>
                        ) : null}
                    <CustomInput
                        secureTextEntry={show}
                        placeholder='Password'
                        iconPassword
                        icon={
                            show ?
                                <Icon
                                    style={{ marginRight: 10 }}
                                    onPress={() => setShow(false)}
                                    name={'eye'}
                                    size={23}
                                    color={COLOR.tGray}
                                />
                                :
                                <Icon
                                    style={{ marginRight: 10 }}
                                    onPress={() => setShow(true)}
                                    name={'eye-off'}
                                    size={23}
                                    color={COLOR.tGray}
                                />
                        }
                        value={password}
                        placeholderTextColor={COLOR.tGray}
                        setValue={text => setPassword(text)}
                    />
                    {register ?
                        (
                            <CustomInput
                                secureTextEntry={showConfirm}
                                placeholder='Password'
                                iconPassword
                                icon={
                                    showConfirm ?
                                        <Icon
                                            style={{ marginRight: 10 }}
                                            onPress={() => setShowConfirm(false)}
                                            name={'eye'}
                                            size={23}
                                            color={COLOR.tGray}
                                        />
                                        :
                                        <Icon
                                            style={{ marginRight: 10 }}
                                            onPress={() => setShowConfirm(true)}
                                            name={'eye-off'}
                                            size={23}
                                            color={COLOR.tGray}
                                        />
                                }
                                value={confirmPass}
                                placeholderTextColor={COLOR.tGray}
                                setValue={text => setConfirmPass(text)}
                            />
                        ) : null}
                </View>
                <TouchableOpacity style={{
                    backgroundColor: COLOR.primary,
                    alignItems: 'center',
                    marginHorizontal: WIDTH * 0.06,
                    marginVertical: HEIGHT * 0.05,
                    borderRadius: 8
                }}
                    onPress={register ? validateSubmit : handleLogin}
                    disabled={register ? loadingRegis : loadingLogin}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: COLOR.white,
                            fontWeight: 'bold',
                            padding: 10
                        }}
                    >
                        {loadingLogin ? 'loading' : register ? 'Registrasi' : 'Masuk'}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            textAlign: 'center',
                            color: COLOR.tGray,
                        }}
                    >{register ? 'Sudah punya akun? masuk ' : 'Belum Punya Akun? registrasi '}</Text>
                    <TouchableOpacity
                        onPress={
                            () => {
                                register ?
                                    navigate('Login') :
                                    navigate('Register')
                            }
                        }
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: COLOR.primary,
                                fontWeight: 'bold'
                            }}
                        >
                            disini
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Login