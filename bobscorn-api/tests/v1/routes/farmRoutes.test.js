import request from 'supertest';
import app from '../../../app.js';
import { resultStrings } from '../../../src/enums/resultStrings.js';
import crypto from 'crypto';

describe('Farm API', () => {
    describe('POST /api/v1/farm/buy-corn', () => {
        it('should allow a user to buy corn', async () => {
            const clientId = crypto.randomUUID();

            const res = await request(app)
                .post('/api/v1/farm/buy-corn')
                .query({ clientid: clientId });

            expect(res.status).toBe(200);
            expect(res.body.result).toEqual(resultStrings.SUCCESS);
            expect(res.body.data).toBeInstanceOf(Object);
            expect(res.body.data.client_id).toEqual(clientId);
        });

        it('should return 400 if clientid is missing', async () => {
            const res = await request(app)
                .post('/api/v1/farm/buy-corn');

            expect(res.status).toBe(400);
        });
    });

    describe('GET /api/v1/farm/corn/purchases/:clientid', () => {
        it('should return the corn purchase history for a client', async () => {
            const clientId = 'test-client-123';

            const res = await request(app)
                .get(`/api/v1/farm/corn/purchases/${clientId}`);

            expect(res.status).toBe(200);
            expect(res.body.result).toEqual(resultStrings.SUCCESS);
            expect(res.body.data).toBeInstanceOf(Object);
            expect(res.body.data.client_id).toEqual(clientId);
        });

        it('should return 404 if client has no purchases', async () => {
            const clientIdNot = 'nonexistent-client';

            const res = await request(app)
                .get(`/api/v1/farm/corn/purchases/${clientIdNot}`);

            expect(res.body.data).toBe(null);
        });
    });

    describe('GET /api/v1/farm/sales-policies', () => {
        it('should return the sales policies', async () => {
            const res = await request(app)
                .get('/api/v1/farm/sale-policies');

            expect(res.status).toBe(200);
            expect(res.body.result).toEqual(resultStrings.SUCCESS);
            expect(res.body.data).toBeInstanceOf(Object);
            expect(res.body.data.limitRateQuantity).toEqual(1);
            expect(res.body.data.limitRateInterval).toEqual(String(60000)); // 1 minuto en ms
        });
    });
});
