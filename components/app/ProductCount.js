import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import { getProductCountByUserId } from '../../assets/data/commission';
import LoadingScreen from '../../screens/LoadingScreen';

const ProductCount = () => {

  const [loading, setLoading] = useState(true);
  const [prodCount, setProdCount] = useState(0);

  const getCom = async () => {
    try {
      let res = await getProductCountByUserId();
      if(res){
        setProdCount(res);
      }else{
        setProdCount(0);
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

  let productCountPercentage = prodCount/1000*100;
  let progressBarWidth = 0;
  let borderRightStatus = false;
  if(productCountPercentage >= 100){
    progressBarWidth = 100;
    borderRightStatus = true;
  }else{
    progressBarWidth = productCountPercentage;
  }

  return (
    <View style={styles.container}>
      <View style={styles.productCountWrapper}>
        <Text style={styles.productCountTextStyles}>
          {productCountPercentage >= 100 ? `Your product count is ${prodCount}!` : `You want to purchase ${1000-prodCount} more products to complete 1000.`}
        </Text>
        <View style={[styles.progressBarStyles, { width : `${progressBarWidth}%` }, borderRightStatus ? styles.progressRightRadius : null]}></View>
      </View>
    </View>
  );

}

export default ProductCount

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCountWrapper: {
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
})