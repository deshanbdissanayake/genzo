const getSummaryByUserId = async () => {
    //get user id from async storage
    let data = {
        today: {
            total: { count: 20, value: '2000.00' },
            pending: { count: 8, value: '2500.00' },
            shipped: { count: 35, value: '2300.00' },
            returned: { count: 4, value: '1500.00' },
            delivered: { count: 12, value: '1800.00' }
        },
        this_week: {
            total: { count: 50, value: '2000.00' },
            pending: { count: 20, value: '2500.00' },
            shipped: { count: 65, value: '2300.00' },
            returned: { count: 8, value: '1500.00' },
            delivered: { count: 32, value: '1800.00' }
        },
        this_month: {
            total: { count: 100, value: '2000.00' },
            pending: { count: 40, value: '2500.00' },
            shipped: { count: 130, value: '2300.00' },
            returned: { count: 16, value: '1500.00' },
            delivered: { count: 60, value: '1800.00' }
        },
        this_month_first_half: {
            total: { count: 60, value: '2000.00' },
            pending: { count: 25, value: '2500.00' },
            shipped: { count: 80, value: '2300.00' },
            returned: { count: 10, value: '1500.00' },
            delivered: { count: 30, value: '1800.00' }
        },
        this_month_second_half: {
            total: { count: 40, value: '2000.00' },
            pending: { count: 15, value: '2500.00' },
            shipped: { count: 50, value: '2300.00' },
            returned: { count: 6, value: '1500.00' },
            delivered: { count: 30, value: '1800.00' }
        }
    };         

    return data;
}

export { getSummaryByUserId }