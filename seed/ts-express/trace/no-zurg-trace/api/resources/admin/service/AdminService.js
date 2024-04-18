"use strict";
/**
 * This file was auto-generated by Fern from our API Definition.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const express_1 = __importDefault(require("express"));
const errors = __importStar(require("../../../../errors/index"));
class AdminService {
    constructor(methods, middleware = []) {
        this.methods = methods;
        this.router = express_1.default.Router({ mergeParams: true }).use(express_1.default.json({
            strict: false,
        }), ...middleware);
    }
    addMiddleware(handler) {
        this.router.use(handler);
        return this;
    }
    toRouter() {
        this.router.post("/store-test-submission-status/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.updateTestSubmissionStatus(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'updateTestSubmissionStatus' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-test-submission-status-v2/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.sendTestSubmissionUpdate(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'sendTestSubmissionUpdate' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-workspace-submission-status/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.updateWorkspaceSubmissionStatus(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'updateWorkspaceSubmissionStatus' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-workspace-submission-status-v2/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.sendWorkspaceSubmissionUpdate(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'sendWorkspaceSubmissionUpdate' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-test-trace/submission/:submissionId/testCase/:testCaseId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.storeTracedTestCase(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'storeTracedTestCase' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-test-trace-v2/submission/:submissionId/testCase/:testCaseId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.storeTracedTestCaseV2(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'storeTracedTestCaseV2' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-workspace-trace/submission/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.storeTracedWorkspace(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'storeTracedWorkspace' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        this.router.post("/store-workspace-trace-v2/submission/:submissionId", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.methods.storeTracedWorkspaceV2(req, {
                    send: () => __awaiter(this, void 0, void 0, function* () {
                        res.sendStatus(204);
                    }),
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            }
            catch (error) {
                console.error(error);
                if (error instanceof errors.SeedTraceError) {
                    console.warn(`Endpoint 'storeTracedWorkspaceV2' unexpectedly threw ${error.constructor.name}.` +
                        ` If this was intentional, please add ${error.constructor.name} to` +
                        " the endpoint's errors list in your Fern Definition.");
                    yield error.send(res);
                }
                else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        }));
        return this.router;
    }
}
exports.AdminService = AdminService;
