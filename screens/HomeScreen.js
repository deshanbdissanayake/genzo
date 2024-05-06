import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../assets/colors/colors'
import { Entypo, Feather } from '@expo/vector-icons';
import HomeHeader from '../components/app/HomeHeader';
import Summary from '../components/app/Summary';
import Subtitle from '../components/general/Subtitle';
import Commission from '../components/app/Commission';
import MiniButton from '../components/general/MiniButton';
import Select from '../components/general/Select';
import CustomModal from '../components/general/CustomModal';
import CompanyCommission from '../components/app/CompanyCommission';


const HomeScreen = () => {

  const summaryFilterOptions = [
    {label: 'Today', value: 'today'},
    {label: 'This Week', value: 'this_week'},
    {label: 'This Month', value: 'this_month'},
    {label: 'This Month First Half', value: 'this_month_first_half'},
    {label: 'This Month Second Half', value: 'this_month_second_half'},
  ];

  const companyCommissionFilterOptions = [
    {label: 'This Month', value: 'this_month'},
    {label: 'Last Month', value: 'last_month'},
  ];

  const [summaryFilter, setSummaryFilter] = useState('today');
  const [companyCommissionFilter, setCompanyCommissionFilter] = useState('this_month');

  const [showSummaryFilter, setShowSummaryFilter] = useState(false);
  const [showCompanyCommissionFilter, setShowCompanyCommissionFilter] = useState(false);

  const handleSummaryFilter = (filter) => {
    setSummaryFilter(filter);
    setShowSummaryFilter(false);
  }

  const handleCompanyCommissionFilter = (filter) => {
    setCompanyCommissionFilter(filter);
    setShowCompanyCommissionFilter(false);
  }

  return (
    <View style={styles.container}>
        <HomeHeader/>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.cardSecWrapper}>
              <Subtitle 
                text={'Summary'} 
                subText={(summaryFilterOptions.find(option => option.value === summaryFilter)).label}
                component={
                  <MiniButton
                    content={<Feather name="more-vertical" size={18} color={colors.textColorPri} />}
                    func={() => setShowSummaryFilter(true)}
                  />
                } 
              />
              <Summary filter={summaryFilter} />
          </View>
          <View style={styles.cardSecWrapper}>
              <Subtitle 
                text={'Companywise Commissions'} 
                subText={(companyCommissionFilterOptions.find(option => option.value === companyCommissionFilter)).label}
                component={
                  <MiniButton
                    content={<Feather name="more-vertical" size={18} color={colors.textColorPri} />}
                    func={() => setShowCompanyCommissionFilter(true)}
                  />
                } 
              />
              <CompanyCommission filter={companyCommissionFilter}/>
          </View>
        </ScrollView>
        {showSummaryFilter && (
          <View style={styles.alertStyles}>
            <CustomModal
              title={'Select Filter'}
              content={
                  <Select
                    options={summaryFilterOptions}
                    placeholder={'Select Filter'}
                    onSelect={(text)=>handleSummaryFilter(text)}
                  />
              }
              okButtonText={'Cancel'}
              pressOk={()=>setShowSummaryFilter(false)}
            />
          </View>
        )}
        {showCompanyCommissionFilter && (
          <View style={styles.alertStyles}>
            <CustomModal
              title={'Select Filter'}
              content={
                  <Select
                    options={companyCommissionFilterOptions}
                    placeholder={'Select Filter'}
                    onSelect={(text)=>handleCompanyCommissionFilter(text)}
                  />
              }
              okButtonText={'Cancel'}
              pressOk={()=>setShowCompanyCommissionFilter(false)}
            />
          </View>
        )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  alertStyles: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  cardSecWrapper: {
    marginBottom: 15,
  }
})