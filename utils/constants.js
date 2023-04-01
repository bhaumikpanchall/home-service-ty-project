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

const MAIL_SUBJECT = {
    LOGIN: "Login Successfull",
    REGISTRATION: "Registration Successfull",
    ORDER_UPDATE: "Update on your order",
    PASSWORD_CHANGE: "Password Successfully changed",
    OTP_FORGOT_PASSWORD: "OTP for generate new password",
};

const MAIL_BODY = (text, data = { id: 00, status: "Changed", OTP: "000000" }) => {
    let msg;
    switch (text) {
        case "LOGIN":
            msg = `<h1>Login Successfull</h1> <h3>You just login with new device.</h3>`;
            break;
        case "REGISTRATION":
            msg = `<h1>Registration Successfull</h1> <h3>Welcome to our portal.</h3>`
            break;
        case "PASSWORD_CHANGE":
            msg = `<h1>Your Password has been Successfully changed.</h1>`
            break;
        case "ORDER_UPDATE":
            msg = `<h2>Your order id ${data.id} has been updated.</h2>
                    <h3> Order Status: ${data.status}</h3><br>
                    <p>You can check more details about your orders in My Orders.</p>`
            break;
        case "OTP_FORGOT_PASSWORD":
            msg = `<h2>Your OTP : ${data.OTP}</h2>
                    <h5> Your otp has been sent for generate new password for login.</h5><br><br>
                    <p>Don't share otp with anyone.</p>`
            break;
        default:
            msg = `Update on your order`
            break;
    }
    return msg;
}

module.exports = {
    USER_ROLES,
    BOOKING_CODE,
    BOOKING_STATUS,
    PAYMENT_CODE,
    PAYMENT_STATUS,
    PAYMENT_TYPE,
    PAYMENT_TYPE_CODE,
    MAIL_SUBJECT,
    MAIL_BODY,
}