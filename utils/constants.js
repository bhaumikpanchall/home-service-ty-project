const USER_ROLES = {
    USER: 1,
    SERVICE_PROVIDER: 2,
    ADMIN: 3,
}

const TRACKING_STATUS = {
    Ordered: 'Ordered',
    Confirmed: 'Confirmed',
    InProgress: 'InProgress',
    Cancel: 'Cancel',
};

const PAYMENT_STATUS = {
    PENDING: 'Pending',
    PAID: 'Paid',
};

const PAYMENT_TYPE = {
    COD: 'COD',
    InternetBanking: 'InternetBanking',
};

module.exports = {
    USER_ROLES,
    TRACKING_STATUS,
    PAYMENT_STATUS,
    PAYMENT_TYPE,
}