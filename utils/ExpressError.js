class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Pass message to the parent constructor
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}

module.exports = ExpressError;