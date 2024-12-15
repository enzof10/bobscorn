/**
 * ORM configuration.
 *
 * All functions related to Prisma ORM.
 *
 * @file Prisma configuration.
 * @since 1.0.0
 * @module Prisma
 */
import { PrismaClient } from '@prisma/client';

export default class PrismaManager {
    /**
     * Singleton instance of PrismaManager
     * @type {PrismaManager | null}
     */
    static instance = null;



    /**
     * Private constructor to prevent direct instantiation
     */
    constructor() {
        if (PrismaManager.instance) {
            throw new Error('Use PrismaManager.getInstance() to get the singleton instance.');
        }

        this.prisma = new PrismaClient();
    }

    /**
     * Initializes the PrismaManager instance
     * @returns {PrismaManager}
     */
    static getInstance() {
        if (!PrismaManager.instance) {
            PrismaManager.instance = new PrismaManager();
        }
        return PrismaManager.instance;
    }

    /**
     * Returns the PrismaClient instance
     * @returns {PrismaClient}
     */
    static getPrismaInstance() {
        return PrismaManager.getInstance().prisma;
    }

    /**
     * Safely disconnects the PrismaClient
     * @returns {Promise<void>}
     */
    static async disconnect() {
        const instance = PrismaManager.getInstance();
        if (instance.prisma) {
            await instance.prisma.$disconnect();
            instance.prisma = null;
        }
    }
}


