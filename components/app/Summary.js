import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import LoadingScreen from '../../screens/LoadingScreen'
import { colors } from '../../assets/colors/colors'

const ProvSumCard = ({name, value, bgColor}) => {
    return (
      <View style={[styles.cardWrapper, {backgroundColor: bgColor}]}>
        <Text style={styles.cardNameStyles}>{name}</Text>
        <Text style={styles.cardValueStyles}>{value}</Text>
      </View>
    )
}

const Summary = () => {

  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState({
      withdrawable_amount: 0,
      pending_earnings: 0,
      total_amount: 0,
      this_month_earnings: 0,
      avg_job_price: 0,
      active_jobs: 0,
  });

  const getData = async () => {
    try {
      //let res = await getEarningsByUserId();
      //setEarningsData(res);
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
        <ProvSumCard name={'Withdrawable Amount'} value={'LKR ' + earningsData.withdrawable_amount} bgColor={'#344955'} />
        <ProvSumCard name={'Pending Earnings'} value={'LKR ' + earningsData.pending_earnings} bgColor={'#31363F'} />
      </View>
      <View style={styles.rowWrapper}>
        <ProvSumCard name={'Total Balance'} value={'LKR ' + earningsData.total_amount} bgColor={'#333A73'} />
        <ProvSumCard name={'This Month Earnings'} value={'LKR ' + earningsData.this_month_earnings} bgColor={'#BE7B72'} />
      </View>
      <View style={styles.rowWrapper}>
        <ProvSumCard name={'Avg Job Price'} value={'LKR ' + earningsData.avg_job_price} bgColor={'#9B3922'} />
        <ProvSumCard name={'Active Jobs'} value={earningsData.active_jobs} bgColor={'#704264'} />
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
    flex: 1,
  },
  cardNameStyles: {
    color: colors.textColorSec,
    fontSize: 12,
    fontWeight: '300',
    fontFamily: 'ms-regular',
  },
  cardValueStyles: {
    color: colors.textColorSec,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ms-semibold',
  },
})