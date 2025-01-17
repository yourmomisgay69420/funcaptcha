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
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
function req(url, options, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        let auth = undefined;
        if (proxy) {
            let proxyUrl = new URL(proxy);
            if (proxyUrl.username && proxyUrl.password) {
                auth = Buffer.from(proxyUrl.username + ":" + proxyUrl.password).toString("base64");
            }
        }
        let dispatcher = proxy ? new undici_1.ProxyAgent({
            uri: proxy,
            auth
        }) : undefined;
        let req = yield (0, undici_1.request)(url, Object.assign(Object.assign({}, options), { dispatcher }));
        return {
            headers: req.headers,
            body: Buffer.from(yield req.body.arrayBuffer()),
        };
    });
}
exports.default = req;
