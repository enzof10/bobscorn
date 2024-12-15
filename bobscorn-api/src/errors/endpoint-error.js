export default class EndpointError extends Error {

    static TYPE = {
        RATE_LIMIT: { statusCode: 429, internalCode: 1001, description: "Too Many Requests" },
        INTERNAL_ERROR: { statusCode: 500, internalCode: 1002, description: "Something went wrong. Please try again later." },
        INVALID_PARAMETER:{ statusCode : 400, internalCode :1003 , description : 'Bad Request {{0}}'},
    }



    constructor(type, args = null) {
        super("Endpoint Error");
        this.statusCode = type.statusCode;
        this.description = type.description;
        if (args != null && args.length > 0) {
            this.target = args;
            for (let i = 0; i < args.length; i++) {
                this.description = this.description.replace("{{" + i + "}}", args[i]);
            }
        }

        this.description = this.description.replace(/{{\d+}}/g, '');

        this.internalCode = type.internalCode;
    }
}