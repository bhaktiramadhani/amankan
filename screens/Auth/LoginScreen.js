import { View, Text, StyleSheet, TextInput, Pressable, TouchableHighlight, Image } from 'react-native'
import { Logo, Eye, EyeOff } from '../../core/Svg';
import { useState } from 'react';

const LoginScreen = ({navigation}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


  return (
    <View style={styles.container}>
        <Logo width={100} height={100}/>
        <Text style={styles.textHeading}>Masuk</Text>
        <View style={styles.inputContainer}>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="Username anda..."/>
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={!showPassword} style={styles.input} placeholder="Password anda..."/>
                <View style={styles.showPassword}>
                    <Pressable onPress={handleShowPassword}>
                        {showPassword ? <EyeOff width={24} height={24}/> : <Eye width={24} height={24}/> }
                    </Pressable>
                </View>
            </View>
        </View>
        <View style={styles.forgetPasswordContainer}>
            <Pressable>
                <Text style={styles.textForgetPassword}>Lupa Password?</Text>
            </Pressable>
        </View>
        <View style={styles.button}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Masuk</Text>
            </Pressable>
        </View>
        <View style={styles.textFooter}>
            <Text>Belum Punya Akun? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textChildFooter}>Buat Akun</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 22
    },
    textHeading:{
        fontSize: 18,
        fontFamily: 'Poppins_700Bold'
    },
    inputContainer:{
        width: '100%',
        marginTop: 8,
        gap: 20
    },
    label:{
        fontSize: 14,
        fontFamily: 'Poppins_400Regular'
    },
    input: {
        borderWidth: 2,
        borderColor: '#DCDCDC',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 13,
        marginTop: 6,
        height: 48
    },
    forgetPasswordContainer:{
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24
    },
    textForgetPassword:{
        marginTop: 10,
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    button: {
        width: '100%',
        height: 52,
        backgroundColor: '#FF2D2D',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    textFooter:{
        color: '#808080',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textChildFooter:{
        color: 'black',
        fontFamily: 'Poppins_700Bold',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 3
    },
    showPassword: {
        position: 'absolute',
        right: 16,
        top: '52%',
    }
});