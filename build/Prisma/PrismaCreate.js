"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
function cnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = prompt("Enter your Email: ");
            const password = prompt("Enter your Password: ");
            const firstName = prompt("Enter a FirstName: ");
            const lastName = prompt("Enter a lastName: ");
            insertUser(email, password, firstName, lastName);
        }
        catch (error) {
            console.log(error);
        }
        finally {
        }
    });
}
cnectDB();
function insertUser(email, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName,
            }
        });
        console.log(res);
    });
}
