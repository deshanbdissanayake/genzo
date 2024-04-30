import AsyncStorage from "@react-native-async-storage/async-storage";
//-------------------------------------------------------------------------------------------------------------
const signUp = async (firstName, lastName, email, password, confPassword) => {
    try {
        // Input validation
        if (!firstName || !email || !password || !confPassword) {
            throw new Error("Please fill in all fields.");
        }

        if (password !== confPassword) {
            throw new Error("Passwords do not match.");
        }

        // Password complexity validation
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }

        if (!/[A-Z]/.test(password)) {
            throw new Error("Password must contain at least one uppercase letter.");
        }

        if (!/[a-z]/.test(password)) {
            throw new Error("Password must contain at least one lowercase letter.");
        }

        if (!/\d/.test(password)) {
            throw new Error("Password must contain at least one digit.");
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            throw new Error("Password must contain at least one special character.");
        }

        // Other form data retrieval
        const currentLocation = JSON.parse(await AsyncStorage.getItem("currentLocation"));

        // Construct form data
        const formData = new FormData();

        const postData = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password,
            "conf_password": confPassword,
            "location": currentLocation,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "registerAppUser");
        formData.append("data", JSON.stringify(postData));

        // Send request to server
        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();

            // Store data in AsyncStorage
            await AsyncStorage.setItem("emailToVerify", email);
            await AsyncStorage.setItem("temporaryPassword", password);
            
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    } catch (error) {
        // Return error message
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const reqNewOtp = async () => {
    const email = await AsyncStorage.getItem("emailToVerify");
    try{
        const formData = new FormData();

        const postData = {
            "email": email,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "reqNewOtpWhenRegister");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const signIn = async (username, password) => {
    // Store data in AsyncStorage
    await AsyncStorage.setItem("emailToVerify", username);
    await AsyncStorage.setItem("temporaryPassword", password);

    try{
        const formData = new FormData();

        const currentLocation = JSON.parse(await AsyncStorage.getItem("currentLocation"));
        const notifyToken = await AsyncStorage.getItem("notifyToken");
        const deviceData = JSON.parse(await AsyncStorage.getItem("deviceData"));

        const postData = {
            "username": username,
            "password": password,
            "location": currentLocation,
            "notify_token": notifyToken,
            "device_data": deviceData,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "signIn");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });
        
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const forgotPassword = async (email) => {
    await AsyncStorage.setItem("emailToVerify", email);

    try{
        const formData = new FormData();

        const postData = {
            "email": email,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "forgetPassword");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const emailVerification = async (otp, email) => {
    try{
        const formData = new FormData();

        const postData = {
            "otp": otp,
            "email": email,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "verifyEmailByOtp");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const logOut = async () => {
    const token = await AsyncStorage.getItem("app-login-token");
    const sessionData = JSON.parse(await AsyncStorage.getItem("sessionData"));

    try{
        const formData = new FormData();

        const postData = {
            "user_id": sessionData.user_id,
            "device_id": sessionData.device_id,
        }

        formData.append("token", token);
        formData.append("endpoint", "loggingOut");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            await AsyncStorage.clear();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------
const changeForgottenPW = async (email, newPassword, confPassword) => {
    try{
        if(newPassword == "" || confPassword == ""){
            throw new Error("Passwords are required.");
        }

        if(newPassword !== confPassword){
            throw new Error("Passwords do not match.");
        }

        // Password complexity validation
        if(newPassword.length < 8){
            throw new Error("Password must be at least 8 characters long.");
        }

        if(!/[A-Z]/.test(newPassword)){
            throw new Error("Password must contain at least one uppercase letter.");
        }

        if(!/[a-z]/.test(newPassword)){
            throw new Error("Password must contain at least one lowercase letter.");
        }

        if(!/\d/.test(newPassword)){
            throw new Error("Password must contain at least one digit.");
        }

        if(!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)){
            throw new Error("Password must contain at least one special character.");
        }

        const formData = new FormData();

        const postData = {
            "email": email,
            "newPassword": newPassword,
            "confPassword": confPassword,
        }

        formData.append("token", "USER-TOKEN-TEMPORARY");
        formData.append("endpoint", "changeForgottenPW");
        formData.append("data", JSON.stringify(postData));

        const response = await fetch('https://shutterbug.introps.com/Api/get', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error("Endpoint error.");
        }
    }catch(error){
        return {
            "stt": "error",
            "msg": [error.message],
            "data": {}
        };
    }
}
//-------------------------------------------------------------------------------------------------------------

export { signUp, signIn, forgotPassword, reqNewOtp, emailVerification, logOut, changeForgottenPW }