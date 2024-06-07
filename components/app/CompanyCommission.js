import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../assets/colors/colors'
import { getCompanyWiseCommissionByUserId } from '../../assets/data/commission';
import LoadingScreen from '../../screens/LoadingScreen';
import NoData from '../general/NoData';

const CompanyCommissionCard = ({ cardData }) => {

    let bgColor = colors.bgColor;
    if(cardData.level == 1){
        bgColor = '#f5ffd4';
    }else if(cardData.level == 2){
        bgColor = '#f0f0f0';
    }

    return (
        <View style={[styles.cardWrapper, {backgroundColor: bgColor}]}>
            <View style={styles.rowStyles}>
                <View style={styles.cardNameWrapper}>
                    <View style={styles.levelTextWrapper}>
                        <Text style={styles.levelTextStyles}>Level {cardData.level}</Text>
                    </View>
                    <View>
                        <Text style={styles.comNameTextStyles}>{cardData.com_name}</Text>
                        <Text style={styles.totalCommissionTextStyles}>Com: Rs.{cardData.com_commission}</Text>
                    </View>
                </View>
                <Text style={styles.myCommissionTextStyles}>{cardData.my_commission}</Text>
            </View>
        </View>
    )
}

const CompanyCommission = ({ filter }) => {

    const [loading, setLoading] = useState(true);
    const [comData, setComData] = useState(null);

    const getCom = async () => {
        try {
            let data = await getCompanyWiseCommissionByUserId();
            if(data){
                setComData(data)
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

    let total = 0;

    return (
        <View style={styles.container}>
            <View style={styles.tableStyles}>
                {comData && comData.length > 0 && comData.find(data => data.filter === filter) ? 
                    comData.find(data => data.filter === filter).commissions.map((val, i) => {
                        total += parseFloat(val.my_commission);
                        return <CompanyCommissionCard cardData={val} key={i} />;
                    })
                : <NoData />}
            </View>
            <View style={styles.totalTextWrapper}>
                <Text style={styles.totalTextStyles}>My Total Commission</Text>
                <Text style={styles.totalTextStyles}>{total.toFixed(2)}</Text>
            </View>
        </View>
    );


}

export default CompanyCommission

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    cardWrapper: {
        
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
    cardNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    comNameTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textColorPri,
    },
    totalCommissionTextStyles: {
        fontFamily: 'ms-light',
        fontSize: 12,
        color: colors.textColorPri,
    },
    myCommissionTextStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textColorPri,
    },
    levelTextWrapper: {
        marginRight: 15,
        borderWidth: 1,
        borderColor: colors.textColorPri,
        borderRadius: 5,
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textColorPri,
    },
    totalTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: colors.textColorPri,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    totalTextStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textColorPri,
    },
})