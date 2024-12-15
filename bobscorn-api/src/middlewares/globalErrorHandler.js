import { resultStrings } from "../enums/resultStrings.js";
import EndpointError from "../errors/endpoint-error.js";


export const globalErrorHandler = async (error, req, res, next) => {
    if (error) {
        console.log('error: ', error);
        if (error instanceof EndpointError) {
            const response = {
                internalCode: error.internalCode,
                result: resultStrings.ERROR,
                message: error.description
            }
            res.status(error.statusCode).json(response);
            return;
        }

        let statusCode = EndpointError.TYPE.INTERNAL_ERROR.statusCode;

        const response = {
            internalCode: EndpointError.TYPE.INTERNAL_ERROR.internalCode,
            result: resultStrings.ERROR,
            message: EndpointError.TYPE.INTERNAL_ERROR.description
        }

        res.status(statusCode).json(response)
    } else {
        next()
    }
}
