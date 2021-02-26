let rw = (success, message = null, data = null) => {
    return {
        success: success,
        message: message,
        data: data
    }
}

let responseCode = {
    MISSING_ARGUMENT: 400,
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    SUCCESS: 200
}


module.exports = {
    rw: rw,
    code: responseCode
}