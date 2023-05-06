"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fawry_1 = __importDefault(require("./Fawry"));
function createOrder(provider, orderPayload) {
    switch (provider) {
        case "fawry":
            return new Fawry_1.default(orderPayload).createOrderLink();
        default:
            break;
    }
}
const paymentServices = {
    createOrder,
};
exports.default = paymentServices;
