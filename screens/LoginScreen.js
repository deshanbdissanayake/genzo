import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Image, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../components/general/Button';
import Input from '../components/general/Input';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, forgotPassword, emailVerification, reqNewOtp, changeForgottenPW } from '../assets/data/auth';
import { useAppContext } from '../context/AppContext';
import LoadingScreen from './LoadingScreen';
import moment from 'moment-timezone';
import ChangePassword from './ChangePassword';
import { colors } from '../assets/colors/colors';

const LoginScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useAppContext();

    // form states
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [logInButtonLoading, setLogInButtonLoading] = useState(false);

    //page loading states
    const [isLoading, setIsLoading] = useState(true);

    //for otp verifications
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [otpTimeRemaining, setOtpTimeRemaining] = useState("0:00");
    const [showRequestOtp, setShowRequestOtp] = useState(false);

    // for forget password
    const [isPasswordForget, setIsPasswordForget] = useState(false);

    //useeffect function
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const setToken = async (data) => {
        try{
            await AsyncStorage.setItem("login-token", data.token);
            await AsyncStorage.setItem("account-type", "manager");
            await AsyncStorage.setItem("sessionData", JSON.stringify(data));
            return true;
        }catch(error){
            return false;
        }
    }

    //for otp timer
    const start_timer = async () => {
        const timeString = await AsyncStorage.getItem("otp-timeout");
        if(!timeString){
            return;
        }

        const currentTime = moment().tz('Asia/Colombo');
        const givenTime = moment.tz(timeString, 'YYYY-MM-DD HH:mm:ss', 'Asia/Colombo');
        const difference = givenTime.diff(currentTime);

        const differenceInSeconds = Math.floor(difference / 1000);

        if(differenceInSeconds <= 0){
            setOtpTimeRemaining("0:00");
            setShowRequestOtp(true);
            return;
        }

        const minutes = Math.floor(differenceInSeconds / 60);
        const seconds = differenceInSeconds % 60;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        setOtpTimeRemaining(minutes + `:` + formattedSeconds);

        setTimeout(() => {
            start_timer();
        }, 100);
    }

    // when click on sign in button
    const handleLoginClick = async () => {
        if(userName == "" || password == ""){
            Alert.alert('Error', 'Please enter all required details.')
            return;
        }

        // to enable loading
        setIsLoading(true);

        signIn(userName, password).then(async (data) => {
            if(data.stt == "success"){
                setToken(data["data"]).then((res) => {
                    // to remove loading
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 100);

                    if(res){
                        setLogInButtonLoading(true);
                        setTimeout(function(){
                            setIsLoggedIn(true);
                        }, 1000);
                    }else{
                      Alert.alert('Error', 'Something went wrong!')
                    }
                })
            }else{
                // to remove loading
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);

                if(data.data){
                    if(data.data.email_verification == "no"){
                      setIsVerifyingEmail(true);
                      await AsyncStorage.setItem("otp-timeout", data.data.otp_exp);
                      start_timer();
                      return;
                    }
                    if(data.stt == 'success'){
                      Alert.alert('Successful', data.msg[0])
                    }else{
                      Alert.alert('Error', data.msg[0])
                    }
                }else{
                  Alert.alert('Error', 'Something went wrong!')
                }

            }
        })
    };

    //when password forgot
    const handleForgotPwClick = async () => {
        if(userName == ""){
            Alert.alert('Email is required', 'Please enter your email in the provided text field and then click on the Forgot Password?')
            return;
        }

        // to enable loading
        setIsLoading(true);

        forgotPassword(userName).then(async (res) => {
            if(res.stt == "success"){
                setIsVerifyingEmail(true);
                await AsyncStorage.setItem("otp-timeout", res.data.otp_exp);
                start_timer();
                setIsPasswordForget(true);
            }else{
                Alert.alert('Error', res.msg[0])
            }

            // to remove loading
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        })
    }

    // email verification and when success directly sign in
    const veryfyEmail = async () => {
        setIsLoading(true);
        const em = await AsyncStorage.getItem("emailToVerify");

        emailVerification(otpValue, em).then(async (data) => {
            if(data.stt == "success"){
                // to remove current otp timeout
                await AsyncStorage.removeItem("otp-timeout");

                if(isPasswordForget){
                    setIsVerifyingEmail(false);
                    setOtpValue("");
                    setIsLoading(false);
                    return;
                }

                const un = await AsyncStorage.getItem("emailToVerify");
                const pw = await AsyncStorage.getItem("temporaryPassword");

                signIn(un, pw).then(async (data) => {
                    if(data.stt == "success"){
                        await AsyncStorage.removeItem("emailToVerify");
                        await AsyncStorage.removeItem("temporaryPassword");
                        await AsyncStorage.setItem("sessionData", JSON.stringify(data.data));
                        //console.log(await AsyncStorage.getItem("sessionData"))
                        await AsyncStorage.setItem("app-login-token", data.data.token);
                        setIsLoggedIn(true);
                    }else{
                      Alert.alert('OTP Error', data.msg[0])
                    }
                })
            }else{
              Alert.alert('OTP Error', data.msg[0]);
            }
        })
    }

    // for requesting a new otp code after expire
    const requestNewOtp = async () => {
        setIsLoading(true);
        reqNewOtp().then( async (data) => {
            setIsLoading(false);
            await AsyncStorage.setItem("otp-timeout", data.data.otp_exp);
            start_timer();
            setIsVerifyingEmail(true);
            setShowRequestOtp(false);

            Alert.alert('Check Email', data.msg[0]);
        })
    }

    // to change the password when forgotten
    const changePassword = async (newp, conp) => {
        setIsLoading(true);
        const em = await AsyncStorage.getItem("emailToVerify");
        changeForgottenPW(em, newp, conp).then((data) => {
            if(data.stt == "success"){
                setIsPasswordForget(false);
                setIsLoading(false);

                Alert.alert('Successful', data.msg[0]);
            }else{
                setIsLoading(false);
                Alert.alert('Error', data.msg[0]);
            }
        });
    }

    if(isLoading){
        return (
            <LoadingScreen />
        )
    }else{
        if(isPasswordForget && !isVerifyingEmail){
            return (
                <>
                    <ChangePassword isForgotPassword={true} passwordChangeFunc={(np, cp) => { changePassword(np, cp) }} />
                </>
            )
        }else{
            return (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                        {(!isVerifyingEmail) ? (
                            <>
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
                                              placeholder="Enter Your Email"
                                              icon={<FontAwesome5 name="user" size={20} color={colors.textColorPri} />}
                                              editable={true}
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
                                          />
                                          <Pressable 
                                              style={styles.viewPasswordStyle} 
                                              onPress={() => setSecureTextEntry(!secureTextEntry)}
                                          >
                                              {secureTextEntry ? (<Feather name="eye" size={20} color={colors.textColorPri} />) : (<Feather name="eye-off" size={20} color={colors.textColorPri} />)}
                                          </Pressable>
                                          {/*
                                            <Pressable style={styles.forgotPwStyle} onPress={handleForgotPwClick}>
                                                <Text style={{fontFamily: 'ms-regular'}}>Forgot Password?</Text>
                                            </Pressable>
                                          */}
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
                            </>
                        ) : (
                              <View style={{paddingHorizontal: 20}}>
                                <Text style={[styles.textCenter, styles.emailVerifyHead]}>Verify Your Email</Text>
                                <Text style={[styles.textCenter, styles.subHeading, {marginBottom: 20}]}>Check your email and enter otp code here</Text>
                                <View style={styles.otpInputWrapper}>
                                    <TextInput 
                                    keyboardType="numeric"
                                    placeholder="Enter OTP Here"
                                    editable={true}
                                    style={styles.otpInputTextStyles}
                                    value={otpValue}
                                    onChangeText={(text) => {setOtpValue(text)}}
                                    />
                                </View>
                                <Button
                                    bgColor = {colors.bgColorSec}
                                    content = {<Text style={{color: colors.textColorSec, fontFamily: 'ms-regular'}}>Verify Email</Text>}
                                    func={veryfyEmail}
                                    style={{ marginTop: 10, width: '100%' }}
                                />

                                <View style={{marginTop: 20}}>
                                    {(showRequestOtp) ?
                                    (
                                        <Pressable onPress={requestNewOtp}><Text style={{color: colors.textColorPri, fontSize: 15, textAlign: 'center', fontFamily: 'ms-regular'}}>Request New OTP</Text></Pressable>
                                    ) : (
                                        <Text style={{color: colors.danger, fontSize: 15, textAlign: 'center', fontFamily: 'ms-semibold'}}>{otpTimeRemaining} Time Remaining</Text>
                                    )
                                    }
                                </View>
                              </View>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
    }

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
    forgotPwStyle: {
        alignItems: 'flex-end',
        marginRight: 5,
        marginTop: 5,
    },
    btnWrapper: {
        flex: 1,
    },
    googleLogoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleLogoStyle: {
        width: 30,
        resizeMode: 'contain',
        marginRight: 10
    },
    regTextWrapper: {
        flexDirection:'row', 
        justifyContent: 'center', 
        marginTop: 10
    },
    orStyle: {
        paddingVertical:20, 
        textAlign: 'center', 
        color: colors.textColorPri
    },
    otpInputWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
        justifyContent: 'center',
    },
    otpInputTextStyles: {
        fontSize: 14,
        color: colors.textColorPri,
        width: '100%',
        marginHorizontal: 5,
        textAlign: 'center'
    },
    emailVerifyHead: {
        marginBottom: 5,
        fontSize: 25,
        color: colors.textColorPri,
        fontFamily: 'ms-bold',
        textTransform: 'uppercase'
    },
    textCenter: {
        textAlign: 'center',
        fontFamily: 'ms-regular',
    },
    subHeading: {
        color: colors.textColorPri,
        fontFamily: 'ms-semibold',
    },
});