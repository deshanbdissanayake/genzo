const getMonthlyCommissionByUserId = async () => {
    let user_id = 1 //get from async storage
    let data = {
        productCount: 250,
        commissions: [
            { month: 'January', value: '2000.00' },
            { month: 'February', value: '2000.00' },
            { month: 'March', value: '1200.00' },
            { month: 'April', value: '1000.00' },
            { month: 'May', value: '1500.00' },
            { month: 'June', value: '1800.00' },
            { month: 'July', value: '2200.00' },
            { month: 'August', value: '2500.00' },
            { month: 'September', value: '1700.00' },
            { month: 'October', value: '1900.00' },
            { month: 'November', value: '2100.00' },
            { month: 'December', value: '2300.00' }
        ]
    }

    return data;
}


export { getMonthlyCommissionByUserId }