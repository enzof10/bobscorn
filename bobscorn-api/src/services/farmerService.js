import EndpointError from "../errors/endpoint-error.js";
import PrismaManager from "../utils/prismaManager.js"

class FarmService {
    static LIMIT_RATE_INTERVAL = "60000";
    static LIMIT_RATE_INTERVAL_MEASUREMENT = "milliseconds";
    static LIMIT_RATE_FINAL = FarmService.LIMIT_RATE_INTERVAL + " " + FarmService.LIMIT_RATE_INTERVAL_MEASUREMENT
    static LIMIT_RATE_QUANTITY = 1;
    static CODE_RATE_LIMIT = 1234456;

    constructor() {
        this.prisma = PrismaManager.getPrismaInstance();
    }

    buyCornCase = async (clientId) => {
        try {

            if (!clientId) {
                throw new EndpointError(EndpointError.TYPE.INVALID_PARAMETER, ['clientId is required'])
            }

            const result = await this.prisma.$executeRaw`
                SELECT validate_and_insert_purchase(
                    ${clientId}::text, 
                    ${FarmService.LIMIT_RATE_QUANTITY}::numeric, 
                    ${FarmService.LIMIT_RATE_FINAL}::interval, 
                    ${FarmService.CODE_RATE_LIMIT}::numeric
                )
            `;

            const updatedConrn = await this.prisma.cornPurchases.findUnique({
                where: {
                    client_id: clientId,
                }
            });

            return updatedConrn
        } catch (error) {
            if (error.meta?.message.includes(FarmService.CODE_RATE_LIMIT)) {
                throw new EndpointError(EndpointError.TYPE.RATE_LIMIT, [clientId])
            }

            throw error
        }

    }


    getCornPurchases = async (clientId) => {
        try {

            if (!clientId) {
                throw new EndpointError(EndpointError.TYPE.INVALID_PARAMETER, ['clientId is required'])
            }

            return this.prisma.cornPurchases.findUnique({
                where: {
                    client_id: clientId,
                }
            });
        } catch (error) {
            throw error
        }

    }


    getSalePolicies = () => {
        return {
            limitRateQuantity: FarmService.LIMIT_RATE_QUANTITY,
            limitRateInterval: FarmService.LIMIT_RATE_INTERVAL,
            limitRateIntervalMeasurement: FarmService.LIMIT_RATE_INTERVAL_MEASUREMENT
        };
    };

}

export default new FarmService()
