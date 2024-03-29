'use strict'

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')
const statusCodes = require('../utils/statusCodes')

require('../utils/httpStatusCode')
class ErrorResponse extends Error{
    constructor(message,status){
        super(message)
        this.status=status
    }
}   
class ConflictRequestError extends ErrorResponse{
    
    constructor(message=ReasonPhrases.CONFLICT,statusCode=StatusCodes.FORBIDDEN){
        super(message,statusCode)
    }
}
class BadRequestError extends ErrorResponse{
    constructor(message=ReasonPhrases.CONFLICT,statusCode=StatusCodes.FORBIDDEN){
        super(message,statusCode)
    }
}
class AuthFailureError extends ErrorResponse{
    constructor(message=ReasonPhrases.UNAUTHORIZED,statusCode=StatusCodes.UNAUTHORIZED){
        super(message,statusCode)
    }
}
class NotFoundError extends ErrorResponse{
    constructor(message=ReasonPhrases.NOT_FOUND,statusCode=StatusCodes.NOT_FOUND){
        super(message,statusCode)
    }
}
class ForbiddenError extends ErrorResponse{
    constructor(message=ReasonPhrases.FORBIDDEN,statusCode=statusCodes.FORBIDDEN){
        super(message,statusCode)
    }
}
class InternalServerError extends ErrorResponse{
    constructor(message=ReasonPhrases.INTERNAL_SERVER_ERROR,status=statusCodes.INTERNAL_SERVER_ERROR){
        super(message,status)
    }
}
module.exports={
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
    InternalServerError
}
