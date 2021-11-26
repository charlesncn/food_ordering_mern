"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = exports.parseRouteDefinition = exports.defineRoute = exports.defineRoutes = void 0;
var express_validation_1 = require("express-validation");
var fs = __importStar(require("fs"));
var Joi = __importStar(require("joi"));
var path = __importStar(require("path"));
var fsPromises = fs.promises;
var defineRoutes = function (opts) { return opts; };
exports.defineRoutes = defineRoutes;
var defineRoute = function (opts) { return opts; };
exports.defineRoute = defineRoute;
// Parsing
var parseRouteDefinition = function (app, path, route, type) {
    var handler = route.handler, validate = route.validate, middleware = route.middleware;
    // Error if no handler
    if (!handler)
        throw new Error("No handler found for " + type + " request at " + path);
    // Make an array to hold express handlers, including any middleware
    var handlers = [];
    // Add middleware if any
    if (middleware && middleware.length)
        handlers = middleware;
    // Add validation middleware to the start of the array
    if (validate && typeof validate === 'function') {
        var validationObj = validate(Joi);
        var validationSchema = {
            body: validationObj.body ? Joi.object(validationObj.body) : undefined,
            query: validationObj.query ? Joi.object(validationObj.query) : undefined,
            params: validationObj.params ? Joi.object(validationObj.params) : undefined
        };
        handlers.unshift(express_validation_1.validate(validationSchema, { context: true, keyByField: true }));
    }
    // Add the actual handler to the end of the array
    var handlerProcessor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handler(req, res)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, res.headersSent || res.send(result)];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.headersSent || res.status(500).send('Server Error')];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    handlers.push(handlerProcessor);
    // Add the route to express
    return app[type].apply(app, __spreadArray([path], handlers));
};
exports.parseRouteDefinition = parseRouteDefinition;
var appDir = path.dirname(require.main.filename);
var defaultDir = path.join(appDir, 'routes');
var getFilePaths = function (d) { return __awaiter(void 0, void 0, void 0, function () {
    var list, filesArr;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fsPromises.readdir(d, { withFileTypes: true })];
            case 1:
                list = _b.sent();
                return [4 /*yield*/, Promise.all(list.map(function (x) {
                        var res = path.resolve(d, x.name);
                        return x.isDirectory() ? getFilePaths(res) : [res];
                    }))];
            case 2:
                filesArr = _b.sent();
                return [2 /*return*/, (_a = Array.prototype).concat.apply(_a, filesArr)];
        }
    });
}); };
var validationError = function (err, req, res, next) {
    if (err instanceof express_validation_1.ValidationError) {
        delete err.name;
        var e_2 = { code: 'validationError', message: 'Post body validation failed', details: {} };
        var details = err.details;
        details.forEach(function (deet) {
            for (var key in deet) {
                if (e_2.details[key]) {
                    e_2.details[key] = e_2.details[key] + (" | " + deet[key]);
                }
                else {
                    e_2.details[key] = deet[key];
                }
            }
        });
        return res.status(400).send(e_2);
    }
    return res.status(500).send(err);
};
var setupValidationError = function (app) {
    app.use(validationError);
};
var createRoutes = function (app, dir) { return __awaiter(void 0, void 0, void 0, function () {
    var d, filePaths, sortedFilePaths, postixDir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                d = dir || defaultDir;
                return [4 /*yield*/, getFilePaths(d)
                    // sort the paths so dynamic routes come last
                ];
            case 1:
                filePaths = _a.sent();
                sortedFilePaths = filePaths.sort(function (a, b) {
                    var aIsDynamic = a.includes(':') || a.includes('_');
                    var bIsDynamic = b.includes(':') || b.includes('_');
                    return aIsDynamic && bIsDynamic ? 0 : aIsDynamic ? 1 : -1;
                });
                postixDir = d.split(path.sep).join(path.posix.sep);
                sortedFilePaths.forEach(function (p) {
                    var routePath = p
                        // make sure we're in posix
                        .split(path.sep).join(path.posix.sep)
                        // remove directory path
                        .split(postixDir).join('')
                        // Remove file extension
                        .split('.').slice(0, -1).join('.')
                        // remove index
                        .split('/index').join('')
                        // replace /_ with /: for dynamic routes
                        .split('/_').join('/:');
                    var definition = require(p);
                    var isDefault = Object.prototype.hasOwnProperty.call(definition, 'default');
                    var routes = isDefault ? definition.default : definition;
                    var supportedKeys = ['delete', 'get', 'post', 'put'];
                    supportedKeys.forEach(function (key) {
                        var route = routes[key];
                        if (route)
                            exports.parseRouteDefinition(app, routePath, route, key);
                    });
                });
                setupValidationError(app);
                return [2 /*return*/, app];
        }
    });
}); };
exports.createRoutes = createRoutes;
