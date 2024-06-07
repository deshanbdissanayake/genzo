import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../components/general/Button';
import Input from '../components/general/Input';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../context/AppContext';
import LoadingScreen from './LoadingScreen';
import { colors } from '../assets/colors/colors';
import { signIn } from '../assets/data/auth';

const LoginScreen = () => {

    const { setIsLoggedIn } = useAppContext();

    // form states
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [logInButtonLoading, setLogInButtonLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //useeffect function
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // when click on sign in button
    const handleLoginClick = async () => {
        setLogInButtonLoading(true);

        if(userName == "" || password == ""){
            Alert.alert('Error', 'Please enter Email and Password.')
            return;
        }

        try {
            let res = await signIn(userName, password);
            if(res.stt === 'success'){
                setIsLoggedIn(true)
            }else{
                Alert.alert('Error', res.msg)
            }
        } catch (error) {
            console.error('error at LoginScreeen->signin: ', error)
        } finally {
            setLogInButtonLoading(false);
        }

    };



    if(isLoading){
        return <LoadingScreen />
    }
        
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={styles.topWrapper}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.mainTextStyle}>Genzo</Text>
                        <Text style={styles.normalTextStyle}>Login to Continue</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputStyle}>    
                            <Input
                                keyboardType="default"
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                placeholder="Enter Your Username"
                                icon={<FontAwesome5 name="user" size={20} color={colors.textColorPri} />}
                                editable={true}
                                capitalize={'none'}
                            />
                        </View>
                        <View style={styles.inputStyle}>    
                            <Input
                                keyboardType="default"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder="Enter Your Password"
                                icon={<Feather name="lock" size={20} color={colors.textColorPri} />}
                                secureTextEntry={secureTextEntry}
                                editable={true}
                                capitalize={'none'}
                            />
                            <Pressable 
                                style={styles.viewPasswordStyle} 
                                onPress={() => setSecureTextEntry(!secureTextEntry)}
                            >
                                {secureTextEntry ? (<Feather name="eye" size={20} color={colors.textColorPri} />) : (<Feather name="eye-off" size={20} color={colors.textColorPri} />)}
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.btnWrapper}>
                    <Button
                        bgColor = {colors.bgColorSec}
                        content = {<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>Login</Text>}
                        func={handleLoginClick}
                        loading={logInButtonLoading}
                        loaderIconColor={colors.textColorSec}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: colors.bgColor,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTextStyle: {
        fontFamily: 'ms-bold',
        fontSize: 48,
        color: colors.textColorPri,
    },
    normalTextStyle: {
        fontFamily: 'ms-regular',
        color: colors.textColorPri,
    },
    topWrapper: {
        flex: 6,
        alignItems: 'center',
        marginVertical: 20,
    },
    inputWrapper: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20,
    },
    inputStyle: {
        marginBottom: 10,
        width: '100%'
    },
    viewPasswordStyle: {
        position: 'absolute',
        padding: 15,
        right: 0,
        top: 0,
        zIndex: 2,
    },
    btnWrapper: {
        flex: 1,
    },
});