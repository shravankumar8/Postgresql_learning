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
            connectionString: "postgres://postgres:shravan123@localhost/test1",
        });
        try {
            yield client.connect();
            const email = prompt("Enter Email to get  ");
            const query = "SELECT * FROM users WHERE email=$1 ";
            const values = [email];
            const result = yield client.query(query, values);
            console.log(result.command, result);
            if (result.rows.length > 0) {
                console.log("user found", result.rows[0]);
            }
            else {
                console.log("not found");
            }
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
