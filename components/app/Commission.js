import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import { getMonthlyCommissionByUserId } from '../../assets/data/commission';
import LoadingScreen from '../../screens/LoadingScreen';
import NoData from '../general/NoData';

const Commission = () => {

  const [loading, setLoading] = useState(true);
  const [comData, setComData] = useState(null);

  const getCom = async () => {
    try {
      let data = await getMonthlyCommissionByUserId();
      if(data){
        if(data.commissions && data.commissions.length > 0){
          setComData(data.commissions)
        }
      }
    } catch (error) {
      console.error('error at commission component: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCom()
  },[])

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableStyles}>
        {comData && comData.length > 0 ? 
          comData.map((val, index) => (
            <View style={styles.rowStyles} key={index}>
              <Text style={styles.headerTextStyles}>{val.month}</Text>
              <Text style={styles.dataTextStyles}>Rs.{val.value}</Text>
            </View>
          ))
        : <NoData/>}
      </View>
    </View>
  );

}

export default Commission

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productCountWrapper: {
    marginBottom: 20,
    paddingVertical:10,
    backgroundColor: colors.bgColorTer,
    borderRadius: 8,
    width: '100%',
    height: 70,
    justifyContent: 'center',
  },
  progressBarStyles: {
    position: 'absolute',
    backgroundColor: colors.successLight,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 70,
  },
  progressRightRadius: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  productCountTextStyles: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'ms-semibold',
    fontSize: 14,
    color: colors.textColorPri,
    zIndex: 2,
  },
  tableStyles: {
    borderTopWidth: 1,
    borderTopColor: colors.textColorPri,
    width: '100%',
  },
  rowStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.textColorPri,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerTextStyles: {
    fontFamily: 'ms-regular',
    fontSize: 16,
    color: colors.textColorPri,
  },
  dataTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 16,
    color: colors.textColorPri,
  },
})