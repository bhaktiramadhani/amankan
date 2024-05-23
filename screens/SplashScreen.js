import { View, Text, StyleSheet, Image } from 'react-native'
import Logo from '../assets/images/svg/logo.svg'
import React, { useEffect, useState } from 'react'

const SplashScreen = ({navigation}) => {
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsDone(true)
      navigation.navigate('Login')
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{marginBottom: -50}}>
        <Logo width={320} height={320}/>
      </View>
      <Text style={styles.textWrapper}>AMAN
        <Text style={styles.textChild}>KAN</Text>
      </Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper:{
        fontSize: 50,
        fontWeight: 'bold',
        color: 'red',
    },
    textChild:{
        color: 'black',
    }
});