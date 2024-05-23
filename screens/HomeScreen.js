import { View, Text, StyleSheet, TextInput, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import { File, Report, Search  } from '../core/Svg';
import CardLaporanTerakhir from '../components/CardLaporanTerakhir';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Navbar/>
      <Text style={styles.textHeading}>Selamat Pagi, <Text style={styles.textHeadingChild}>Bhakti</Text></Text>
      {/* Search */}
      <View>
          <TextInput style={styles.input} placeholder="Cari fitur"/>
          <View style={styles.search}>
            <Search width={24} height={24}/>
          </View>
      </View>
      {/* Hero */}
      <View style={styles.heroContainer}>
          <Image style={{ borderRadius: 14 }} source={require('../assets/images/hero.png')} width={331} height={160}/>
      </View>
      {/* Fitur */}
      <View style={{ flexDirection: 'row', gap: 77, marginBottom: 20 }}>
        <Pressable style={styles.fiturItemContainer} onPress={() => navigation.navigate('Panduan Pelaporan')}>
          <View style={styles.fiturItem}>
            <File width={24} height={24}/>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>Panduan Pelaporan</Text>
        </Pressable>
        <Pressable style={styles.fiturItemContainer}>
          <View style={styles.fiturItem}>
            <Report width={24} height={24}/>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>Semua Laporan</Text>
        </Pressable>
      </View>
      {/* Laporan terakhir */}
      <View>
        <View style={styles.textLaporanContainer}>
          <Text style={styles.textLaporan}>Laporan Terakhir</Text>
          <Pressable>
            <Text style={{ fontSize: 12, fontFamily: 'Poppins_400Regular', color: '#FF2D2D' }}>Lihat Semua</Text>
          </Pressable>
        </View>
        <ScrollView horizontal style={styles.cardContainer} showsHorizontalScrollIndicator={false}> 
          <CardLaporanTerakhir image={require('../assets/images/laporan1.png')} title="Maling Sepeda Motor" location="Jl. Kaliurang km 5" distance="1.5 KM" time="2 jam yang lalu"/>
          <CardLaporanTerakhir image={require('../assets/images/laporan1.png')} title="Maling Sepeda Motor" location="Jl. Kaliurang km 5" distance="1.5 KM" time="2 jam yang lalu"/>
          <CardLaporanTerakhir image={require('../assets/images/laporan1.png')} title="Maling Sepeda Motor" location="Jl. Kaliurang km 5" distance="1.5 KM" time="2 jam yang lalu"/>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    marginHorizontal: 'auto',
    width: '100%'
  },
  textHeading: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular'
  },
  textHeadingChild: {
    fontFamily: 'Poppins_700Bold'
  },
  input: {
    borderWidth: 2,
    borderColor: '#DCDCDC',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginVertical: 15,
    height: 48
  },
  search: {
    position: 'absolute',
    right: 16,
    top: '36%',
  },
  heroContainer:{
    marginBottom: 20,
    alignItems: 'center'
  },
  fiturItemContainer: {
    width: 65,
    alignItems: 'center',
  },
  fiturItem: {
    width: 50,
    height: 50, 
    borderRadius: 16, 
    padding: 13, 
    backgroundColor: 'white',
    elevation: 4,
    marginBottom: 6,
  },
  textLaporanContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10
  },
  textLaporan: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  cardContainer: {
    flexDirection: 'row', 
    marginBottom: 50
  },  
  
})