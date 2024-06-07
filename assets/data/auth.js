import AsyncStorage from "@react-native-async-storage/async-storage";

const signIn = async (username, password) => {
    try {
        const formData = new FormData();

        formData.append('uname', username);
        formData.append('pass', password);

        const response = await fetch('https://go.genzo.lk/Api/login', {
            'method': 'POST',
            'body': formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.user && responseData.token) {
                // Store user data and token in AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(responseData.user));
                await AsyncStorage.setItem('companyData', JSON.stringify(responseData.company));
                await AsyncStorage.setItem('token', String(responseData.token));
                console.log('Logged in')
                return { stt: 'success', msg: 'Login Successful!', data: ''};
            } else {
                // Invalid response format
                console.error('Invalid response format');
                return { stt: 'error', msg: 'Something went wrong!', data: ''};
            }
        } else {
            // Handle different HTTP status codes
            if (response.status === 401) {
                console.error('Invalid credentials');
                return { stt: 'error', msg: 'Invalid credentials!', data: ''};
            } else {
                console.error('HTTP error at auth->signIn:', response.status);
                return { stt: 'error', msg: 'Something went wrong!', data: ''};
            }
        }
    } catch (error) {
        // Network error or other exceptions
        console.error('Error:', error.message);
        return { stt: 'error', msg: 'Something went wrong!', data: ''};
    }
}

export { signIn };
