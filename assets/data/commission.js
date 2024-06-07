import { getAllAsyncData } from "./async_storage";

const getMonthlyCommissionByUserId = async () => {
    try {
        // Fetch data from API
        const x = await getAllAsyncData();
        const response = await fetch(`https://go.genzo.lk/Api/get_a?token=${x.token}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // Ensure responseData matches the desired structure
        let data = {
            productCount: responseData.productCount,
            commissions: responseData.commissions.map(commission => ({
                month: commission.month,
                value: commission.value
            }))
        };

        return data;
    } catch (error) {
        console.error('Error fetching monthly commission by user ID:', error);
        return null;
    }
};

const getProductCountByUserId = async () => {
    try {
        // Fetch data from API
        const x = await getAllAsyncData();
        const response = await fetch(`https://go.genzo.lk/Api/get_b?token=${x.token}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching product count by user ID:', error);
        return 0;
    }
}

const getCompanyWiseCommissionByUserId = async () => {
    try {
        // Fetch data from API
        const x = await getAllAsyncData();
        const response = await fetch(`https://go.genzo.lk/Api/get_d?token=${x.token}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // Ensure responseData matches the desired structure
        let data = responseData.map(item => ({
            filter: item.filter,
            commissions: item.commissions.map(commission => ({
                com_id: commission.com_id,
                level: commission.level,
                com_name: commission.com_name,
                com_commission: commission.com_commission,
                my_commission: commission.my_commission,
            }))
        }));

        return data;
    } catch (error) {
        console.error('Error fetching company-wise commission by user ID:', error);
        return null;
    }
};

export { getMonthlyCommissionByUserId, getProductCountByUserId, getCompanyWiseCommissionByUserId }