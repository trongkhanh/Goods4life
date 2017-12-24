const checkPassword = (input) => {
    var passw = /^[A-Za-z]\w{6,20}$/;
    if (passw.test(input)) {
        return true;
    } else {
        return false;
    }
};

module.exports = checkPassword;