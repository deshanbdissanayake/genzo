import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllAsyncData } from '../assets/data/async_storage';
import { colors } from '../assets/colors/colors';
import Header from '../components/general/Header';
import { useNavigation } from '@react-navigation/native';
import Subtitle from '../components/general/Subtitle';
import LoadingScreen from './LoadingScreen';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    try {
      let data = await getAllAsyncData();
      
      // Parse JSON strings
      let parsedUserData = JSON.parse(data.userData);
      let parsedCompanyData = JSON.parse(data.companyData);
      
      setUserData(parsedUserData);
      setCompanyData(parsedCompanyData);
    } catch (error) {
      console.error('error at ProfileScreen.js -> getAsyncData: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack()
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      <Header text={'My Profile'} handleGoBack={handleGoBack} />
      <View style={styles.contentContainer}>
        {userData && (
          <View style={styles.userDataWrapper}>
            <Subtitle text={'My Details'} underline={true} />
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Name</Text>
              <Text style={styles.tableDataTextStyles}>{userData.full_name}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Email</Text>
              <Text style={styles.tableDataTextStyles}>{userData.email}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Telephone</Text>
              <Text style={styles.tableDataTextStyles}>{userData.contact_number}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Address</Text>
              <Text style={styles.tableDataTextStyles}>{userData.address}</Text>
            </View>
          </View>
        )}
        {companyData && (
          <View style={styles.companyDataWrapper}>
            <Subtitle text={'Company Details'} underline={true} />
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Name</Text>
              <Text style={styles.tableDataTextStyles}>{companyData.com_name}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Email</Text>
              <Text style={styles.tableDataTextStyles}>{companyData.email}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Telephone</Text>
              <Text style={styles.tableDataTextStyles}>{companyData.telephone}</Text>
            </View>
            <View style={styles.tableRowWrapper}>
              <Text style={styles.tableHeaderTextStyles}>Address</Text>
              <Text style={styles.tableDataTextStyles}>{companyData.com_address}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.bgColor,
  },
  contentContainer: {
    paddingHorizontal: 5,
  },
  companyDataWrapper: {
    marginTop: 20,
  },
  tableRowWrapper : {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableHeaderTextStyles : {
    flex: 3,
    fontFamily: 'ms-semibold',
    fontSize: 14,
    color: colors.textColorPri,
  },
  tableDataTextStyles : {
    flex: 9,
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textColorPri,
  },
});
