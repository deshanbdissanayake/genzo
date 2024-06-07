import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import LoadingScreen from '../../screens/LoadingScreen'
import { colors } from '../../assets/colors/colors'
import { getSummary } from '../../assets/data/summary'

const ProvSumCard = ({name, count,  value, bgColor}) => {
    return (
      <View style={[styles.cardWrapper, {backgroundColor: bgColor}]}>
        <Text style={styles.cardNameStyles}>{name}</Text>
        <View style={styles.cardValueWrapper}>
          <Text style={styles.cardCountStyles}>{count} | </Text>
          <Text style={styles.cardValueStyles}>{value}</Text>
        </View>
      </View>
    )
}

const Summary = ({ filter }) => {

  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);

  const getData = async () => {
    try {
      let res = await getSummary();
      if(res){
        setSummaryData(res);
      }
    } catch (error) {
      console.error('error at getting earnings data: ', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(()=>{
      getData()  
    },[])
  )

  if(loading){
    return <LoadingScreen /> 
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowWrapper}>
        <ProvSumCard name={'Total Orders'} count={summaryData[filter].total.count} value={'LKR ' + summaryData[filter].total.value} bgColor={'#344955'} />
        <ProvSumCard name={'Pending Orders'} count={summaryData[filter].pending.count} value={'LKR ' + summaryData[filter].pending.value} bgColor={'#31363F'} />
      </View>
      <View style={styles.rowWrapper}>
        <ProvSumCard name={'Shipped'} count={summaryData[filter].shipped.count} value={'LKR ' + summaryData[filter].shipped.value} bgColor={'#333A73'} />
        <ProvSumCard name={'Returned'} count={summaryData[filter].returned.count} value={'LKR ' + summaryData[filter].returned.value} bgColor={'#9B3922'} />
      </View>
      <View style={styles.rowWrapper}>
        <ProvSumCard name={'Delivered'} count={summaryData[filter].delivered.count} value={'LKR ' + summaryData[filter].delivered.value} bgColor={'#BE7B72'} />
      </View>
    </View>
  )
}

export default Summary

const styles = StyleSheet.create({
  container: {

  },
  rowWrapper: {
    flexDirection: 'row',
  },
  cardWrapper: {
    marginBottom: 10,
    marginHorizontal: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '49%'
  },
  cardNameStyles: {
    color: colors.textColorSec,
    fontSize: 12,
    fontWeight: '300',
    fontFamily: 'ms-regular',
  },
  cardValueWrapper: {
    flexDirection: 'row',
  },
  cardCountStyles: {
    color: colors.textColorSec,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ms-semibold',
  },
  cardValueStyles: {
    color: colors.textColorSec,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ms-semibold',
  },
})