// Regex to validate password pattern
const passwordPattern = /^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}$/;

// Regex to validate alphanumeric string
const alphaNumeric = /^[A-Za-z][A-Za-z ]+/

module.exports = {
    passwordPattern: passwordPattern,
    alphaNumericPatter: alphaNumeric
}
