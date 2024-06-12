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
const pg_1 = require("pg");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
function cnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgres://postgres:shravan123@localhost/employee",
        });
        try {
            yield client.connect();
            const username = prompt("Enter your Username: ");
            const email = prompt("Enter your Email: ");
            const password = prompt("Enter a Password: ");
            const query = "INSERT INTO users (username,email,password) VALUES($1,$2,$3)";
            const values = [username, email, password];
            const result = yield client.query(query, values);
            console.log(result.command, result);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end(); // Close the connection
            process.exit();
        }
    });
}
cnectDB();
