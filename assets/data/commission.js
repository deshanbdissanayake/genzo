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

const getProductCountByUserId = async () => {
    let user_id = 1;
    let data = 789;
    return data;
}

const getCompanyWiseCommissionByUserId = async () => {
    let user_id = 1;
    let data = [
        {
            filter: 'this_month',
            commissions: [
                {
                    com_id: 1,
                    level: 1,
                    com_name: 'Labay',
                    com_commission: '120000.00',
                    my_commission: '24880.00',
                },
                {
                    com_id: 2,
                    level: 1,
                    com_name: 'xyz',
                    com_commission: '180000.00',
                    my_commission: '45680.00',
                },
                {
                    com_id: 3,
                    level: 2,
                    com_name: 'abc',
                    com_commission: '20000.00',
                    my_commission: '2000.00',
                },
                {
                    com_id: 4,
                    level: 3,
                    com_name: 'pqr',
                    com_commission: '145600.00',
                    my_commission: '24550.00',
                },
                {
                    com_id: 5,
                    level: 4,
                    com_name: 'abc',
                    com_commission: '234000.00',
                    my_commission: '23420.00',
                },
                {
                    com_id: 6,
                    level: 4,
                    com_name: 'pqr',
                    com_commission: '546400.00',
                    my_commission: '43350.00',
                },
            ]
        },
        {
            filter: 'last_month',
            commissions: [
                {
                    com_id: 1,
                    level: 1,
                    com_name: 'Labay',
                    com_commission: '125000.00',
                    my_commission: '29880.00',
                },
                {
                    com_id: 2,
                    level: 1,
                    com_name: 'xyz',
                    com_commission: '185000.00',
                    my_commission: '50680.00',
                },
                {
                    com_id: 3,
                    level: 2,
                    com_name: 'abc',
                    com_commission: '25000.00',
                    my_commission: '7000.00',
                },
                {
                    com_id: 4,
                    level: 3,
                    com_name: 'pqr',
                    com_commission: '150600.00',
                    my_commission: '29550.00',
                },
                {
                    com_id: 5,
                    level: 4,
                    com_name: 'abc',
                    com_commission: '234000.00',
                    my_commission: '23420.00',
                },
                {
                    com_id: 6,
                    level: 4,
                    com_name: 'pqr',
                    com_commission: '546400.00',
                    my_commission: '43350.00',
                },
            ]
        }
    ];
    
    return data;
}

export { getMonthlyCommissionByUserId, getProductCountByUserId, getCompanyWiseCommissionByUserId }