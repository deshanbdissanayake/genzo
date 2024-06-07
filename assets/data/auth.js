import AsyncStorage from "@react-native-async-storage/async-storage";

const signIn = async (username, password) => {

    try{
        const formData = new FormData();

        const postData = {
            "username": username,
            "password": password
        }
        
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

export { signIn }