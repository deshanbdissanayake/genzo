import { getAllAsyncData } from "./async_storage";

const getSummary = async () => {
    try {
        const x = await getAllAsyncData();
        const response = await fetch(`https://go.genzo.lk/Api/get_summary?token=${x.token}`); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();

        // Ensure responseData matches the desired structure
        let data = {
            today: responseData.today,
            this_week: responseData.this_week,
            this_month: responseData.this_month,
            this_month_first_half: responseData.this_month_first_half,
            this_month_second_half: responseData.this_month_second_half
        };

        return data;
    } catch (error) {
        console.error('Error fetching summary by user ID:', error);
        return null;
    }
}

export { getSummary }