import { resultStrings } from "../enums/resultStrings.js";
import farmerService from "../services/farmerService.js";

class FarmController {

    constructor() {
        this.farmerService = farmerService;
    }

    buyCorn = async (req, res, next) => {
        try {
            const { clientid } = req.query;
            const result = await this.farmerService.buyCornCase(clientid)
            console.log('result: ', result);
            res.status(200).json({ result: resultStrings.SUCCESS, data: result });
        } catch (error) {
            next(error)
        }
    };

    getCornPurchases = async (req, res, next) => {
        try {
            const clientid = req.params.clientid;
            const result = await this.farmerService.getCornPurchases(clientid)
            res.status(200).json({ result: resultStrings.SUCCESS, data: result });
        } catch (error) {
            next(error)
        }
    };


    getSalePolicies = async (req, res, next) => {
        try {
            const policies = this.farmerService.getSalePolicies();
            res.status(200).json({ result: resultStrings.SUCCESS, data: policies });
        } catch (error) {
            next(error);
        }
    };


}

export default new FarmController()

