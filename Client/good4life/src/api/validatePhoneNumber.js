const validatePhoneNumber = (number) => {
    if (/^(((\d{10})|(\d{11}))|(\+((\d{11})|(\d{12}))))$/.test(number)) {
        return (true)
    }
    return (false)

};

module.exports = validatePhoneNumber;