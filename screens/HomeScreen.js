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


const HomeScreen = () => {

  const [summaryFilter, setSummaryFilter] = useState('today');
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = (filter) => {
    setSummaryFilter(filter);
    setShowFilter(false);
  }

  return (
    <View style={styles.container}>
        <HomeHeader/>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.cardSecWrapper}>
              <Subtitle text={'Summary'} component={
                <MiniButton
                  content={<Feather name="more-vertical" size={18} color={colors.textColorPri} />}
                  func={() => setShowFilter(true)}
                />
              } />
              <Summary filter={summaryFilter} />
          </View>
          <View style={styles.cardSecWrapper}>
              <Subtitle text={'Total Commissions'} />
              <Commission/>
          </View>
        </ScrollView>
        {showFilter && (
          <View style={styles.alertStyles}>
            <CustomModal
              title={'Select Filter'}
              content={
                  <Select
                    options={[
                      {label: 'Today', value: 'today'},
                      {label: 'This Week', value: 'this_week'},
                      {label: 'This Month', value: 'this_month'},
                      {label: 'This Month First Half', value: 'this_month_first_half'},
                      {label: 'This Month Second Half', value: 'this_month_second_half'},
                    ]}
                    placeholder={'Select Filter'}
                    onSelect={(text)=>handleFilter(text)}
                  />
              }
              okButtonText={'Cancel'}
              pressOk={()=>setShowFilter(false)}
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