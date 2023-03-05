const USER_ROLES = {
    USER: 1,
    SERVICE_PROVIDER: 2,
    ADMIN: 3,
}

const BOOKING_CODE = {
    Ordered: 1,
    Confirmed: 2,
    InProgress: 3,
    Cancel: 4,
    Completed: 5,
}

const BOOKING_STATUS = {
    [BOOKING_CODE.Ordered]: 'Ordered',
    [BOOKING_CODE.Confirmed]: 'Confirmed',
    [BOOKING_CODE.InProgress]: 'InProgress',
    [BOOKING_CODE.Cancel]: 'Cancel',
    [BOOKING_CODE.Completed]: 'Completed',
};

const PAYMENT_CODE = {
    PENDING: 1,
    PAID: 2,
};

const PAYMENT_STATUS = {
    [PAYMENT_CODE.PENDING]: 'Pending',
    [PAYMENT_CODE.PAID]: 'Paid',
};

const PAYMENT_TYPE_CODE = {
    COD: 1,
    InternetBanking: 2,
};

const PAYMENT_TYPE = {
    [PAYMENT_TYPE_CODE.COD]: 'COD',
    [PAYMENT_TYPE_CODE.InternetBanking]: 'InternetBanking',
};

module.exports = {
    USER_ROLES,
    BOOKING_CODE,
    BOOKING_STATUS,
    PAYMENT_CODE,
    PAYMENT_STATUS,
    PAYMENT_TYPE,
    PAYMENT_TYPE_CODE,
}