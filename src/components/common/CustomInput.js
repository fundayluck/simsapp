import { COLOR } from '../../Theme/Color'
import React from 'react'
import { HEIGHT, WIDTH } from '../../Theme/Dimension'
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({
    value,
    setValue,
    placeholder,
    secureTextEntry,
    placeholderTextColor,
    multiline,
    dataDetectorTypes,
    hg = HEIGHT * 0.06,
    iconPassword,
    icon
}) => {

    return (
        <View style={[styles.container, iconPassword ? { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } : null]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, { height: hg }]}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                dataDetectorTypes={dataDetectorTypes}
                scrollEnabled={true}
                autoCorrect={false}
            />
            {iconPassword ? icon : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        width: WIDTH * 0.9,
        borderRadius: 5,
        borderColor: '#C2A3A1',
        borderWidth: 1,
        paddingHorizontal: WIDTH * 0.01,
        marginVertical: WIDTH * 0.03,
    },
    input: {
        fontSize: WIDTH * 0.04,
        color: COLOR.black,
    },
})

export default CustomInput
