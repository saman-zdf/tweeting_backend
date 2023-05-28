const errorHandlerMiddleware = (err, req, res, next) => {
    // creating a default error object
    const defaultError = {
        // adding statusCode property and assign it to the status codes package
        statusCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later!",
    };
    // check if the error name is equal to ValidationError
    if (err.name === "ValidationError") {
        // assign a bad request to the default error status code
        defaultError.statusCode = 400;
        // defaultError.msg = err.message;
        // if there is more than one error message we can use Object.values() pass the error object as argument, map through it and get the messages and then join them together
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = 500;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    // res.status(defaultError.statusCode).json({ msg: err });
    // send response
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
export default errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map