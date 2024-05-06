const getSummaryByUserId = async () => {
    //get user id from async storage
    let data = {
        today: {
            total: { count: 22, value: '2200.00' },
            pending: { count: 9, value: '2700.00' },
            shipped: { count: 37, value: '2400.00' },
            returned: { count: 5, value: '1700.00' },
            delivered: { count: 14, value: '1900.00' }
        },
        this_week: {
            total: { count: 52, value: '2100.00' },
            pending: { count: 22, value: '2600.00' },
            shipped: { count: 68, value: '2500.00' },
            returned: { count: 11, value: '1600.00' },
            delivered: { count: 33, value: '1800.00' }
        },
        this_month: {
            total: { count: 115, value: '2300.00' },
            pending: { count: 48, value: '2800.00' },
            shipped: { count: 145, value: '2600.00' },
            returned: { count: 18, value: '1800.00' },
            delivered: { count: 72, value: '2000.00' }
        },
        this_month_first_half: {
            total: { count: 62, value: '2200.00' },
            pending: { count: 28, value: '2700.00' },
            shipped: { count: 88, value: '2400.00' },
            returned: { count: 13, value: '1700.00' },
            delivered: { count: 37, value: '1900.00' }
        },
        this_month_second_half: {
            total: { count: 48, value: '2150.00' },
            pending: { count: 20, value: '2600.00' },
            shipped: { count: 57, value: '2550.00' },
            returned: { count: 7, value: '1750.00' },
            delivered: { count: 35, value: '1950.00' }
        }
    };    

    return data;
}

export { getSummaryByUserId }