/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const schema_1 = __webpack_require__(/*! ./graphql/schema */ "./src/graphql/schema.ts");
const resolver_1 = __webpack_require__(/*! ./graphql/resolver */ "./src/graphql/resolver.ts");
const db_1 = __webpack_require__(/*! ./conf/db */ "./src/conf/db.ts");
const repository_1 = __importDefault(__webpack_require__(/*! ./repository */ "./src/repository/index.ts"));
(0, db_1.initDatabaseConnection)();
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolver_1.resolvers,
    context: {
        repos: new repository_1.default(),
    },
});
exports.graphqlHandler = server.createHandler();


/***/ }),

/***/ "./src/conf/app.ts":
/*!*************************!*\
  !*** ./src/conf/app.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appConfig = void 0;
const index_1 = __importDefault(__webpack_require__(/*! ./index */ "./src/conf/index.ts"));
exports.appConfig = {
    dbURL: (0, index_1.default)('DATABASE_LOCAL', 'mongodb://localhost:27017/lead'),
};


/***/ }),

/***/ "./src/conf/db.ts":
/*!************************!*\
  !*** ./src/conf/db.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initDatabaseConnection = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const app_1 = __webpack_require__(/*! ./app */ "./src/conf/app.ts");
const initDatabaseConnection = () => {
    mongoose_1.default.connect(app_1.appConfig.dbURL, (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('DB connected');
    });
};
exports.initDatabaseConnection = initDatabaseConnection;


/***/ }),

/***/ "./src/conf/index.ts":
/*!***************************!*\
  !*** ./src/conf/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();
const getEnv = (envKey, defaultValue = '') => { var _a; return (_a = process.env[envKey]) !== null && _a !== void 0 ? _a : defaultValue; };
exports["default"] = getEnv;


/***/ }),

/***/ "./src/graphql/resolver.ts":
/*!*********************************!*\
  !*** ./src/graphql/resolver.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const isd_service_1 = __importDefault(__webpack_require__(/*! ../services/isd.service */ "./src/services/isd.service.ts"));
const api_response_1 = __importDefault(__webpack_require__(/*! ../services/response/api.response */ "./src/services/response/api.response.ts"));
exports.resolvers = {
    Query: {
        getLeads() {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield isd_service_1.default.getLeads();
                return result;
            });
        },
        getLead(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield isd_service_1.default.getLead(args.leadId);
                return result;
            });
        },
        getInterests() {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield isd_service_1.default.getInterests();
                return result;
            });
        },
        getInterest(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield isd_service_1.default.getInterest(args.leadId);
                return result;
            });
        },
    },
    Mutation: {
        addLead(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield isd_service_1.default.create(args.request);
                    return api_response_1.default.send(result, 'Lead added.');
                }
                catch (error) {
                    return api_response_1.default.sendError(error);
                }
            });
        },
        addInterest(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield isd_service_1.default.addInterest(args.request);
                    return api_response_1.default.send(result, 'Interest added.');
                }
                catch (error) {
                    return api_response_1.default.sendError(error);
                }
            });
        },
    },
};


/***/ }),

/***/ "./src/graphql/schema.ts":
/*!*******************************!*\
  !*** ./src/graphql/schema.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.typeDefs = (0, apollo_server_lambda_1.gql) `

  type Lead{
    id: Int
    email: String!
    phone: String!
    firstName: String!
    lastName: String!
    message: String!
    createdAt: String!
    updatedAt: String!
  }

  type Interest {
    id: Int
    leadId: Int!
    message: String!
    createdAt: String!
    updatedAt: String!
  }

  type LeadInterest {
    id: Int
    email: String!
    phone: String!
    firstName: String!
    lastName: String!
    message: String!
    interest: Interest!
    createdAt: String
    updatedAt: String
  }

  type LeadIntetestResponse{
    data: LeadInterest
    message: String!
    code: Int!
    status: Boolean!
  }

  enum LeadId {
    PHONE
    EMAIL
    ID
  }

  input ISDRequest {
    email: String!
    phone: String!
    firstName: String!
    lastName: String!
    message: String!
  }

  input ISDInterestRequest {
    regKey: LeadId!
    regValue: String!
    message: String!
  }

  type Query {
    getLeads: [Lead!]
    getLead(leadId: Int!): Lead
    getInterests: [Interest!]
    getInterest(leadId: Int!): Interest
  }

  type Mutation {
    addLead(request: ISDRequest): LeadIntetestResponse!
    addInterest(request: ISDInterestRequest): LeadIntetestResponse!
  }
`;


/***/ }),

/***/ "./src/mongo/_hooks/counter.ts":
/*!*************************************!*\
  !*** ./src/mongo/_hooks/counter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.incrementCounter = void 0;
const counter_model_1 = __webpack_require__(/*! ../counter/counter.model */ "./src/mongo/counter/counter.model.ts");
function incrementCounter(next, counterColumn, model) {
    console.log('Triggered hooks', counterColumn);
    if (model.isNew) {
        counter_model_1.CounterModel.findOneAndUpdate({ id: 1 }, { $inc: { [counterColumn]: 1 } }, { upsert: true, new: true }, (error, doc) => {
            console.log('couunter entity', doc);
            if (error)
                return next(error);
            if (doc)
                model.id = doc[counterColumn];
            next();
        });
    }
}
exports.incrementCounter = incrementCounter;


/***/ }),

/***/ "./src/mongo/common.ts":
/*!*****************************!*\
  !*** ./src/mongo/common.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mongoTimeStamps = void 0;
exports.mongoTimeStamps = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
};


/***/ }),

/***/ "./src/mongo/counter/counter.model.ts":
/*!********************************************!*\
  !*** ./src/mongo/counter/counter.model.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CounterModel = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const counter_schema_1 = __webpack_require__(/*! ./counter.schema */ "./src/mongo/counter/counter.schema.ts");
exports.CounterModel = mongoose_1.default.model('counter', counter_schema_1.CounterSchema);


/***/ }),

/***/ "./src/mongo/counter/counter.schema.ts":
/*!*********************************************!*\
  !*** ./src/mongo/counter/counter.schema.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CounterSchema = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
exports.CounterSchema = new mongoose_1.default.Schema({
    id: { type: Number, default: 1, index: true },
    interest: { type: Number },
    lead: { type: Number },
});


/***/ }),

/***/ "./src/mongo/interests/interest.model.ts":
/*!***********************************************!*\
  !*** ./src/mongo/interests/interest.model.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterestModel = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const interest_schema_1 = __webpack_require__(/*! ./interest.schema */ "./src/mongo/interests/interest.schema.ts");
exports.InterestModel = mongoose_1.default.model('interest', interest_schema_1.InterestSchema);


/***/ }),

/***/ "./src/mongo/interests/interest.schema.ts":
/*!************************************************!*\
  !*** ./src/mongo/interests/interest.schema.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterestSchema = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const common_1 = __webpack_require__(/*! ../common */ "./src/mongo/common.ts");
const counter_1 = __webpack_require__(/*! ../_hooks/counter */ "./src/mongo/_hooks/counter.ts");
exports.InterestSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    lead_id: Number,
    message: String,
}, Object.assign({}, common_1.mongoTimeStamps));
exports.InterestSchema.pre('save', function (next) {
    (0, counter_1.incrementCounter)(next, 'interest', this);
});


/***/ }),

/***/ "./src/mongo/lead/lead.model.ts":
/*!**************************************!*\
  !*** ./src/mongo/lead/lead.model.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadModel = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const lead_schema_1 = __webpack_require__(/*! ./lead.schema */ "./src/mongo/lead/lead.schema.ts");
exports.LeadModel = mongoose_1.default.model('lead', lead_schema_1.LeadSchema);


/***/ }),

/***/ "./src/mongo/lead/lead.schema.ts":
/*!***************************************!*\
  !*** ./src/mongo/lead/lead.schema.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadSchema = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const common_1 = __webpack_require__(/*! ../common */ "./src/mongo/common.ts");
const counter_1 = __webpack_require__(/*! ../_hooks/counter */ "./src/mongo/_hooks/counter.ts");
exports.LeadSchema = new mongoose_1.default.Schema({
    id: Number,
    email: { type: String, unique: true, alias: 'emaily' },
    first_name: String,
    last_name: String,
    phone: { type: String, unique: true },
}, Object.assign({}, common_1.mongoTimeStamps));
exports.LeadSchema.pre('save', function (next) {
    (0, counter_1.incrementCounter)(next, 'lead', this);
});


/***/ }),

/***/ "./src/repository/index.ts":
/*!*********************************!*\
  !*** ./src/repository/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const interest_repo_1 = __importDefault(__webpack_require__(/*! ./interest.repo */ "./src/repository/interest.repo.ts"));
const lead_repo_1 = __importDefault(__webpack_require__(/*! ./lead.repo */ "./src/repository/lead.repo.ts"));
class ISDRepository {
    constructor() {
        this.lead = new lead_repo_1.default();
        this.interest = new interest_repo_1.default();
    }
}
exports["default"] = ISDRepository;


/***/ }),

/***/ "./src/repository/interest.repo.ts":
/*!*****************************************!*\
  !*** ./src/repository/interest.repo.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const interest_model_1 = __webpack_require__(/*! ../mongo/interests/interest.model */ "./src/mongo/interests/interest.model.ts");
class InterestRepository {
    static create(leadId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return interest_model_1.InterestModel.create({ lead_id: leadId, message });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return interest_model_1.InterestModel.find()
                .sort({ created_at: 'desc' })
                .exec();
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return interest_model_1.InterestModel.findOne({ id }).lean();
        });
    }
    static getByLeadId(leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return interest_model_1.InterestModel.findOne({ lead_id: leadId })
                .sort({ created_at: 'desc' })
                .exec();
        });
    }
}
exports["default"] = InterestRepository;


/***/ }),

/***/ "./src/repository/lead.repo.ts":
/*!*************************************!*\
  !*** ./src/repository/lead.repo.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const lead_model_1 = __webpack_require__(/*! ../mongo/lead/lead.model */ "./src/mongo/lead/lead.model.ts");
class LeadRepository {
    static create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield lead_model_1.LeadModel.create(entity);
        });
    }
    static exists(phone, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.LeadModel.exists({ $or: [{ email }, { phone }] });
        });
    }
    static getByPhoneAndEmail(phone, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.LeadModel.findOne({ $or: [{ email }, { phone }] });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.LeadModel.find()
                .sort({ created_at: 'desc' })
                .exec();
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.LeadModel.findOne({ id }).lean();
        });
    }
    static getOneAny(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.LeadModel.findOne({ [key]: value }).lean();
        });
    }
}
exports["default"] = LeadRepository;


/***/ }),

/***/ "./src/services/isd.dto.ts":
/*!*********************************!*\
  !*** ./src/services/isd.dto.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterestResponseDTO = exports.LeadResponseDTO = exports.ISDResponseDTO = exports.interestEntityToResponse = exports.LeadEntityDTO = void 0;
class LeadEntityDTO {
    constructor(request) {
        this.id = 0;
        this.email = request.email;
        this.phone = request.phone;
        this.first_name = request.firstName;
        this.last_name = request.lastName;
    }
}
exports.LeadEntityDTO = LeadEntityDTO;
const interestEntityToResponse = (entities) => {
    const getEntity = (entity) => {
        var _a, _b, _c, _d;
        return ({
            leadId: entity.lead_id,
            id: entity.id,
            message: entity.message,
            createdAt: (_b = (_a = entity.created_at) === null || _a === void 0 ? void 0 : _a.toDateString()) !== null && _b !== void 0 ? _b : '',
            updatedAt: (_d = (_c = entity.updated_at) === null || _c === void 0 ? void 0 : _c.toDateString()) !== null && _d !== void 0 ? _d : '',
        });
    };
    return Array.isArray(entities) ?
        entities.map(getEntity) :
        [getEntity(entities)];
};
exports.interestEntityToResponse = interestEntityToResponse;
class ISDResponseDTO {
    constructor(lead, interest) {
        var _a, _b, _c, _d;
        this.id = lead.id;
        this.email = lead.email;
        this.phone = lead.phone;
        this.firstName = lead.first_name;
        this.lastName = lead.last_name;
        this.interest = this.transformInterest(interest);
        this.createdAt = (_b = (_a = lead.created_at) === null || _a === void 0 ? void 0 : _a.toLocaleString()) !== null && _b !== void 0 ? _b : '';
        this.updatedAt = (_d = (_c = lead.updated_at) === null || _c === void 0 ? void 0 : _c.toLocaleString()) !== null && _d !== void 0 ? _d : '';
    }
    transformInterest(entity) {
        var _a, _b, _c, _d;
        return {
            leadId: entity.lead_id,
            id: entity.id,
            message: entity.message,
            createdAt: (_b = (_a = entity.created_at) === null || _a === void 0 ? void 0 : _a.toLocaleString()) !== null && _b !== void 0 ? _b : '',
            updatedAt: (_d = (_c = entity.updated_at) === null || _c === void 0 ? void 0 : _c.toLocaleString()) !== null && _d !== void 0 ? _d : '',
        };
    }
}
exports.ISDResponseDTO = ISDResponseDTO;
class LeadResponseDTO {
    constructor(lead) {
        var _a, _b, _c, _d;
        this.id = lead.id;
        this.email = lead.email;
        this.phone = lead.phone;
        this.firstName = lead.first_name;
        this.lastName = lead.last_name;
        this.createdAt = (_b = (_a = lead.created_at) === null || _a === void 0 ? void 0 : _a.toLocaleString()) !== null && _b !== void 0 ? _b : '';
        this.updatedAt = (_d = (_c = lead.updated_at) === null || _c === void 0 ? void 0 : _c.toLocaleString()) !== null && _d !== void 0 ? _d : '';
    }
}
exports.LeadResponseDTO = LeadResponseDTO;
class InterestResponseDTO {
    constructor(lead) {
        var _a, _b, _c, _d;
        this.id = lead.id;
        this.leadId = lead.lead_id;
        this.message = lead.message;
        this.createdAt = (_b = (_a = lead.created_at) === null || _a === void 0 ? void 0 : _a.toLocaleString()) !== null && _b !== void 0 ? _b : '';
        this.updatedAt = (_d = (_c = lead.updated_at) === null || _c === void 0 ? void 0 : _c.toLocaleString()) !== null && _d !== void 0 ? _d : '';
    }
}
exports.InterestResponseDTO = InterestResponseDTO;


/***/ }),

/***/ "./src/services/isd.interface.ts":
/*!***************************************!*\
  !*** ./src/services/isd.interface.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadId = void 0;
var LeadId;
(function (LeadId) {
    LeadId[LeadId["PHONE"] = 0] = "PHONE";
    LeadId[LeadId["EMAIL"] = 1] = "EMAIL";
    LeadId[LeadId["ID"] = 2] = "ID";
})(LeadId = exports.LeadId || (exports.LeadId = {}));


/***/ }),

/***/ "./src/services/isd.service.ts":
/*!*************************************!*\
  !*** ./src/services/isd.service.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const interest_repo_1 = __importDefault(__webpack_require__(/*! ../repository/interest.repo */ "./src/repository/interest.repo.ts"));
const lead_repo_1 = __importDefault(__webpack_require__(/*! ../repository/lead.repo */ "./src/repository/lead.repo.ts"));
const error_response_1 = __importDefault(__webpack_require__(/*! ./response/error.response */ "./src/services/response/error.response.ts"));
const isd_dto_1 = __webpack_require__(/*! ./isd.dto */ "./src/services/isd.dto.ts");
const isd_interface_1 = __webpack_require__(/*! ./isd.interface */ "./src/services/isd.interface.ts");
class ISDservice {
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leadEntity = new isd_dto_1.LeadEntityDTO(request);
                let lead = yield lead_repo_1.default.getByPhoneAndEmail(request.phone, request.email);
                if (!lead) {
                    lead = yield lead_repo_1.default.create(leadEntity);
                }
                if (lead) {
                    const interest = yield interest_repo_1.default.create(lead.id, request.message);
                    return new isd_dto_1.ISDResponseDTO(lead, interest);
                }
                throw error_response_1.default.throw('Unable to create lead', 500);
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
    static getLeads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leads = yield lead_repo_1.default.getAll();
                return leads.map((lead) => new isd_dto_1.LeadResponseDTO(lead));
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
    static getLead(leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield lead_repo_1.default.get(leadId);
                if (lead) {
                    return new isd_dto_1.LeadResponseDTO(lead);
                }
                throw error_response_1.default.throw('LeadId not found', 400);
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
    static addInterest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = request.regKey.toString().toLowerCase();
                const lead = yield lead_repo_1.default.getOneAny(key, request.regValue);
                if (lead && lead.id) {
                    const interest = yield interest_repo_1.default.create(lead.id, request.message);
                    return new isd_dto_1.ISDResponseDTO(lead, interest);
                }
                throw error_response_1.default.throw(`Lead ${request.regKey} does not exist`, 400);
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
    static getLeadId(typeId) {
        switch (typeId) {
            case isd_interface_1.LeadId.EMAIL:
                return 'email';
            case isd_interface_1.LeadId.PHONE:
                return 'phone';
            default:
                return 'id';
        }
    }
    static getInterests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const interests = yield interest_repo_1.default.getAll();
                return interests.map((interest) => new isd_dto_1.InterestResponseDTO(interest));
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
    static getInterest(leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield interest_repo_1.default.getByLeadId(leadId);
            }
            catch (error) {
                throw error_response_1.default.throw(error, 500);
            }
        });
    }
}
exports["default"] = ISDservice;


/***/ }),

/***/ "./src/services/response/api.response.ts":
/*!***********************************************!*\
  !*** ./src/services/response/api.response.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class APIResponse {
    static sendError(error) {
        return Object.assign(Object.assign({}, error), { status: false, data: null });
    }
    static send(data, message) {
        const d = { message, status: true, data, code: 200 };
        console.log(d);
        return d;
    }
}
exports["default"] = APIResponse;


/***/ }),

/***/ "./src/services/response/error.response.ts":
/*!*************************************************!*\
  !*** ./src/services/response/error.response.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ResponseError extends Error {
    constructor() {
        super(...arguments);
        this.message = '';
        this.code = 0;
    }
    static getInstance() {
        if (!ResponseError.instance) {
            ResponseError.instance = new ResponseError();
        }
        return ResponseError.instance;
    }
    static throw(error, code) {
        const response = ResponseError.getInstance();
        if (typeof error === 'string') {
            response.message = error;
        }
        else {
            response.message = (error).message;
        }
        response.code = code;
        return response;
    }
}
exports["default"] = ResponseError;


/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9DQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVFQTs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFHQTtBQUtBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQW5CQTs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBVkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQXBCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUExQkE7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkE7QUFnQkE7QUFHQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQVVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCQTtBQWdDQTtBQVNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxCQTtBQXFCQTtBQU9BOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVFBOztBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFRQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUEvR0E7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBOzs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTs7QUFDQTtBQUNBO0FBdUJBO0FBbkJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQXpCQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FFdkJBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2NvbmYvYXBwLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2NvbmYvZGIudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvY29uZi9pbmRleC50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9ncmFwaHFsL3Jlc29sdmVyLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2dyYXBocWwvc2NoZW1hLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL21vbmdvL19ob29rcy9jb3VudGVyLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL21vbmdvL2NvbW1vbi50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9jb3VudGVyL2NvdW50ZXIubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vY291bnRlci9jb3VudGVyLnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9pbnRlcmVzdHMvaW50ZXJlc3QubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vaW50ZXJlc3RzL2ludGVyZXN0LnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9sZWFkL2xlYWQubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vbGVhZC9sZWFkLnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9yZXBvc2l0b3J5L2luZGV4LnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3JlcG9zaXRvcnkvaW50ZXJlc3QucmVwby50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9yZXBvc2l0b3J5L2xlYWQucmVwby50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9zZXJ2aWNlcy9pc2QuZHRvLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3NlcnZpY2VzL2lzZC5pbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvc2VydmljZXMvaXNkLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvc2VydmljZXMvcmVzcG9uc2UvYXBpLnJlc3BvbnNlLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3NlcnZpY2VzL3Jlc3BvbnNlL2Vycm9yLnJlc3BvbnNlLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkL2V4dGVybmFsIGNvbW1vbmpzIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2hlbGxvX3dvcmxkL2V4dGVybmFsIGNvbW1vbmpzIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hlbGxvX3dvcmxkL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcG9sbG9TZXJ2ZXJ9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItbGFtYmRhJztcbmltcG9ydCB7dHlwZURlZnN9IGZyb20gJy4vZ3JhcGhxbC9zY2hlbWEnO1xuaW1wb3J0IHtyZXNvbHZlcnN9IGZyb20gJy4vZ3JhcGhxbC9yZXNvbHZlcic7XG5pbXBvcnQge2luaXREYXRhYmFzZUNvbm5lY3Rpb259IGZyb20gJy4vY29uZi9kYic7XG5pbXBvcnQgSVNEUmVwb3NpdG9yeSBmcm9tICcuL3JlcG9zaXRvcnknO1xuXG5pbml0RGF0YWJhc2VDb25uZWN0aW9uKCk7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICB0eXBlRGVmcyxcbiAgcmVzb2x2ZXJzLFxuICBjb250ZXh0OiB7XG4gICAgcmVwb3M6IG5ldyBJU0RSZXBvc2l0b3J5KCksXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IGdyYXBocWxIYW5kbGVyID0gc2VydmVyLmNyZWF0ZUhhbmRsZXIoKTtcbiIsImltcG9ydCBnZXRFbnYgZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBhcHBDb25maWcgPSB7XG4gIGRiVVJMOiBnZXRFbnYoJ0RBVEFCQVNFX0xPQ0FMJywgJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvbGVhZCcpLFxufTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge2FwcENvbmZpZ30gZnJvbSAnLi9hcHAnO1xuXG5leHBvcnQgY29uc3QgaW5pdERhdGFiYXNlQ29ubmVjdGlvbiA9ICgpID0+IHtcbiAgbW9uZ29vc2UuY29ubmVjdChhcHBDb25maWcuZGJVUkwsIChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdEQiBjb25uZWN0ZWQnKTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBnZXRFbnYgPSAoZW52S2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSA9ICcnKSA9PiBwcm9jZXNzLmVudltlbnZLZXldID8/IGRlZmF1bHRWYWx1ZTtcbmV4cG9ydCBkZWZhdWx0IGdldEVudjtcbiIsIlxyXG5pbXBvcnQge0lTREludGVyZXN0UmVxdWVzdCwgSVNEUmVxdWVzdH0gZnJvbSAnLi4vc2VydmljZXMvaXNkLmludGVyZmFjZSc7XHJcbmltcG9ydCBJU0RzZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL2lzZC5zZXJ2aWNlJztcclxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4uL3NlcnZpY2VzL3Jlc3BvbnNlL2FwaS5yZXNwb25zZSc7XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gIFF1ZXJ5OiB7XHJcbiAgICBhc3luYyBnZXRMZWFkcygpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSVNEc2VydmljZS5nZXRMZWFkcygpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRMZWFkKF86IGFueSwgYXJnczogYW55KSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElTRHNlcnZpY2UuZ2V0TGVhZChhcmdzLmxlYWRJZCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldEludGVyZXN0cygpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSVNEc2VydmljZS5nZXRJbnRlcmVzdHMoKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0SW50ZXJlc3QoXzphbnksIGFyZ3M6IGFueSApIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSVNEc2VydmljZS5nZXRJbnRlcmVzdChhcmdzLmxlYWRJZCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIE11dGF0aW9uOiB7XHJcbiAgICBhc3luYyBhZGRMZWFkKF86YW55LCBhcmdzOiBhbnkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJU0RzZXJ2aWNlLmNyZWF0ZShhcmdzLnJlcXVlc3QgYXMgSVNEUmVxdWVzdCk7XHJcbiAgICAgICAgcmV0dXJuIEFQSVJlc3BvbnNlLnNlbmQocmVzdWx0LCAnTGVhZCBhZGRlZC4nKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gQVBJUmVzcG9uc2Uuc2VuZEVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBhZGRJbnRlcmVzdChfOmFueSwgYXJnczogYW55KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSVNEc2VydmljZS5hZGRJbnRlcmVzdChhcmdzLnJlcXVlc3QgYXMgSVNESW50ZXJlc3RSZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gQVBJUmVzcG9uc2Uuc2VuZChyZXN1bHQsICdJbnRlcmVzdCBhZGRlZC4nKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gQVBJUmVzcG9uc2Uuc2VuZEVycm9yKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCJpbXBvcnQge2dxbH0gZnJvbSAnYXBvbGxvLXNlcnZlci1sYW1iZGEnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxyXG5cclxuICB0eXBlIExlYWR7XHJcbiAgICBpZDogSW50XHJcbiAgICBlbWFpbDogU3RyaW5nIVxyXG4gICAgcGhvbmU6IFN0cmluZyFcclxuICAgIGZpcnN0TmFtZTogU3RyaW5nIVxyXG4gICAgbGFzdE5hbWU6IFN0cmluZyFcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICAgIGNyZWF0ZWRBdDogU3RyaW5nIVxyXG4gICAgdXBkYXRlZEF0OiBTdHJpbmchXHJcbiAgfVxyXG5cclxuICB0eXBlIEludGVyZXN0IHtcclxuICAgIGlkOiBJbnRcclxuICAgIGxlYWRJZDogSW50IVxyXG4gICAgbWVzc2FnZTogU3RyaW5nIVxyXG4gICAgY3JlYXRlZEF0OiBTdHJpbmchXHJcbiAgICB1cGRhdGVkQXQ6IFN0cmluZyFcclxuICB9XHJcblxyXG4gIHR5cGUgTGVhZEludGVyZXN0IHtcclxuICAgIGlkOiBJbnRcclxuICAgIGVtYWlsOiBTdHJpbmchXHJcbiAgICBwaG9uZTogU3RyaW5nIVxyXG4gICAgZmlyc3ROYW1lOiBTdHJpbmchXHJcbiAgICBsYXN0TmFtZTogU3RyaW5nIVxyXG4gICAgbWVzc2FnZTogU3RyaW5nIVxyXG4gICAgaW50ZXJlc3Q6IEludGVyZXN0IVxyXG4gICAgY3JlYXRlZEF0OiBTdHJpbmdcclxuICAgIHVwZGF0ZWRBdDogU3RyaW5nXHJcbiAgfVxyXG5cclxuICB0eXBlIExlYWRJbnRldGVzdFJlc3BvbnNle1xyXG4gICAgZGF0YTogTGVhZEludGVyZXN0XHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBjb2RlOiBJbnQhXHJcbiAgICBzdGF0dXM6IEJvb2xlYW4hXHJcbiAgfVxyXG5cclxuICBlbnVtIExlYWRJZCB7XHJcbiAgICBQSE9ORVxyXG4gICAgRU1BSUxcclxuICAgIElEXHJcbiAgfVxyXG5cclxuICBpbnB1dCBJU0RSZXF1ZXN0IHtcclxuICAgIGVtYWlsOiBTdHJpbmchXHJcbiAgICBwaG9uZTogU3RyaW5nIVxyXG4gICAgZmlyc3ROYW1lOiBTdHJpbmchXHJcbiAgICBsYXN0TmFtZTogU3RyaW5nIVxyXG4gICAgbWVzc2FnZTogU3RyaW5nIVxyXG4gIH1cclxuXHJcbiAgaW5wdXQgSVNESW50ZXJlc3RSZXF1ZXN0IHtcclxuICAgIHJlZ0tleTogTGVhZElkIVxyXG4gICAgcmVnVmFsdWU6IFN0cmluZyFcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICB9XHJcblxyXG4gIHR5cGUgUXVlcnkge1xyXG4gICAgZ2V0TGVhZHM6IFtMZWFkIV1cclxuICAgIGdldExlYWQobGVhZElkOiBJbnQhKTogTGVhZFxyXG4gICAgZ2V0SW50ZXJlc3RzOiBbSW50ZXJlc3QhXVxyXG4gICAgZ2V0SW50ZXJlc3QobGVhZElkOiBJbnQhKTogSW50ZXJlc3RcclxuICB9XHJcblxyXG4gIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgYWRkTGVhZChyZXF1ZXN0OiBJU0RSZXF1ZXN0KTogTGVhZEludGV0ZXN0UmVzcG9uc2UhXHJcbiAgICBhZGRJbnRlcmVzdChyZXF1ZXN0OiBJU0RJbnRlcmVzdFJlcXVlc3QpOiBMZWFkSW50ZXRlc3RSZXNwb25zZSFcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge0NvdW50ZXJNb2RlbH0gZnJvbSAnLi4vY291bnRlci9jb3VudGVyLm1vZGVsJztcbmltcG9ydCB7Q291bnRlckVudGl0eX0gZnJvbSAnLi8uLi9jb3VudGVyL2NvdW50ZXIuZW50aXR5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoXG4gICAgbmV4dDogbW9uZ29vc2UuQ2FsbGJhY2tXaXRob3V0UmVzdWx0QW5kT3B0aW9uYWxFcnJvcixcbiAgICBjb3VudGVyQ29sdW1uOiBrZXlvZiBDb3VudGVyRW50aXR5LFxuICAgIG1vZGVsOiBhbnksXG4pIHtcbiAgY29uc29sZS5sb2coJ1RyaWdnZXJlZCBob29rcycsIGNvdW50ZXJDb2x1bW4pO1xuICBpZiAobW9kZWwuaXNOZXcpIHtcbiAgICBDb3VudGVyTW9kZWwuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgICAge2lkOiAxfSxcbiAgICAgICAgeyRpbmM6IHtbY291bnRlckNvbHVtbl06IDF9fSxcbiAgICAgICAge3Vwc2VydDogdHJ1ZSwgbmV3OiB0cnVlfSxcbiAgICAgICAgKGVycm9yOiBtb25nb29zZS5DYWxsYmFja0Vycm9yLCBkb2M6IENvdW50ZXJFbnRpdHkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY291dW50ZXIgZW50aXR5JywgZG9jKTtcbiAgICAgICAgICBpZiAoZXJyb3IpIHJldHVybiBuZXh0KGVycm9yKTtcbiAgICAgICAgICBpZiAoZG9jKW1vZGVsLmlkID0gZG9jW2NvdW50ZXJDb2x1bW5dO1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgbW9uZ29UaW1lU3RhbXBzID0ge1xuICB0aW1lc3RhbXBzOiB7XG4gICAgY3JlYXRlZEF0OiAnY3JlYXRlZF9hdCcsXG4gICAgdXBkYXRlZEF0OiAndXBkYXRlZF9hdCcsXG4gIH0sXG59O1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7Q291bnRlckVudGl0eX0gZnJvbSAnLi9jb3VudGVyLmVudGl0eSc7XG5pbXBvcnQge0NvdW50ZXJTY2hlbWF9IGZyb20gJy4vY291bnRlci5zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgQ291bnRlck1vZGVsID0gbW9uZ29vc2UubW9kZWw8Q291bnRlckVudGl0eT4oJ2NvdW50ZXInLCBDb3VudGVyU2NoZW1hKTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge0NvdW50ZXJFbnRpdHl9IGZyb20gJy4vY291bnRlci5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgQ291bnRlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWE8Q291bnRlckVudGl0eT4oe1xuICBpZDoge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMSwgaW5kZXg6IHRydWV9LFxuICBpbnRlcmVzdDoge3R5cGU6IE51bWJlcn0sXG4gIGxlYWQ6IHt0eXBlOiBOdW1iZXJ9LFxufSk7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHtJbnRlcmVzdEVudGl0eX0gZnJvbSAnLi9pbnRlcmVzdC5lbnRpdHknO1xuaW1wb3J0IHtJbnRlcmVzdFNjaGVtYX0gZnJvbSAnLi9pbnRlcmVzdC5zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgSW50ZXJlc3RNb2RlbCA9IG1vbmdvb3NlLm1vZGVsPEludGVyZXN0RW50aXR5PignaW50ZXJlc3QnLCBJbnRlcmVzdFNjaGVtYSk7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHttb25nb1RpbWVTdGFtcHN9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge2luY3JlbWVudENvdW50ZXJ9IGZyb20gJy4uL19ob29rcy9jb3VudGVyJztcbmltcG9ydCB7SW50ZXJlc3RFbnRpdHl9IGZyb20gJy4vaW50ZXJlc3QuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IEludGVyZXN0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxJbnRlcmVzdEVudGl0eT4oe1xuICBpZDoge3R5cGU6IE51bWJlcn0sXG4gIGxlYWRfaWQ6IE51bWJlcixcbiAgbWVzc2FnZTogU3RyaW5nLFxufSwgey4uLm1vbmdvVGltZVN0YW1wc30pO1xuXG5JbnRlcmVzdFNjaGVtYS5wcmUoJ3NhdmUnLCBmdW5jdGlvbihuZXh0KSB7XG4gIGluY3JlbWVudENvdW50ZXIobmV4dCwgJ2ludGVyZXN0JywgdGhpcyk7XG59KTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge0xlYWRFbnRpdHl9IGZyb20gJy4vbGVhZC5lbnRpdHknO1xuaW1wb3J0IHtMZWFkU2NoZW1hfSBmcm9tICcuL2xlYWQuc2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IExlYWRNb2RlbCA9IG1vbmdvb3NlLm1vZGVsPExlYWRFbnRpdHk+KCdsZWFkJywgTGVhZFNjaGVtYSk7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHttb25nb1RpbWVTdGFtcHN9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge2luY3JlbWVudENvdW50ZXJ9IGZyb20gJy4uL19ob29rcy9jb3VudGVyJztcbmltcG9ydCB7TGVhZEVudGl0eX0gZnJvbSAnLi9sZWFkLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBMZWFkU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxMZWFkRW50aXR5Pih7XG4gIGlkOiBOdW1iZXIsXG4gIGVtYWlsOiB7dHlwZTogU3RyaW5nLCB1bmlxdWU6IHRydWUsIGFsaWFzOiAnZW1haWx5J30sXG4gIGZpcnN0X25hbWU6IFN0cmluZyxcbiAgbGFzdF9uYW1lOiBTdHJpbmcsXG4gIHBob25lOiB7dHlwZTogU3RyaW5nLCB1bmlxdWU6IHRydWV9LFxufSwgey4uLm1vbmdvVGltZVN0YW1wc30pO1xuXG5MZWFkU2NoZW1hLnByZSgnc2F2ZScsIGZ1bmN0aW9uKG5leHQpIHtcbiAgaW5jcmVtZW50Q291bnRlcihuZXh0LCAnbGVhZCcsIHRoaXMpO1xufSk7XG4iLCJpbXBvcnQgSW50ZXJlc3RSZXBvc2l0b3J5IGZyb20gJy4vaW50ZXJlc3QucmVwbyc7XHJcbmltcG9ydCBMZWFkUmVwb3NpdG9yeSBmcm9tICcuL2xlYWQucmVwbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJU0RSZXBvc2l0b3J5IHtcclxuICBsZWFkOiBMZWFkUmVwb3NpdG9yeTtcclxuICBpbnRlcmVzdDogSW50ZXJlc3RSZXBvc2l0b3J5O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubGVhZCA9IG5ldyBMZWFkUmVwb3NpdG9yeSgpO1xyXG4gICAgdGhpcy5pbnRlcmVzdCA9IG5ldyBJbnRlcmVzdFJlcG9zaXRvcnkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgY291bnRlclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge0ludGVyZXN0TW9kZWx9IGZyb20gJy4uL21vbmdvL2ludGVyZXN0cy9pbnRlcmVzdC5tb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyZXN0UmVwb3NpdG9yeSB7XG4gIHN0YXRpYyBhc3luYyBjcmVhdGUobGVhZElkOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBJbnRlcmVzdE1vZGVsLmNyZWF0ZSh7bGVhZF9pZDogbGVhZElkLCBtZXNzYWdlfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0QWxsKCkge1xuICAgIHJldHVybiBJbnRlcmVzdE1vZGVsLmZpbmQoKVxuICAgICAgICAuc29ydCh7Y3JlYXRlZF9hdDogJ2Rlc2MnfSlcbiAgICAgICAgLmV4ZWMoKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXQoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBJbnRlcmVzdE1vZGVsLmZpbmRPbmUoe2lkfSkubGVhbigpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEJ5TGVhZElkKGxlYWRJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIEludGVyZXN0TW9kZWwuZmluZE9uZSh7bGVhZF9pZDogbGVhZElkfSlcbiAgICAgICAgLnNvcnQoe2NyZWF0ZWRfYXQ6ICdkZXNjJ30pXG4gICAgICAgIC5leGVjKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TGVhZEVudGl0eX0gZnJvbSAnLi4vbW9uZ28vbGVhZC9sZWFkLmVudGl0eSc7XG5pbXBvcnQge0xlYWRNb2RlbH0gZnJvbSAnLi4vbW9uZ28vbGVhZC9sZWFkLm1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVhZFJlcG9zaXRvcnkge1xuICBzdGF0aWMgYXN5bmMgY3JlYXRlKGVudGl0eTogTGVhZEVudGl0eSkge1xuICAgIHJldHVybiBhd2FpdCBMZWFkTW9kZWwuY3JlYXRlKGVudGl0eSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZXhpc3RzKHBob25lOiBzdHJpbmcsIGVtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gTGVhZE1vZGVsLmV4aXN0cyh7JG9yOiBbe2VtYWlsfSwge3Bob25lfV19KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRCeVBob25lQW5kRW1haWwocGhvbmU6IHN0cmluZywgZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiBMZWFkTW9kZWwuZmluZE9uZSh7JG9yOiBbe2VtYWlsfSwge3Bob25lfV19KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIExlYWRNb2RlbC5maW5kKClcbiAgICAgICAgLnNvcnQoe2NyZWF0ZWRfYXQ6ICdkZXNjJ30pXG4gICAgICAgIC5leGVjKCk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0KGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gTGVhZE1vZGVsLmZpbmRPbmUoe2lkfSkubGVhbigpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldE9uZUFueShrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHJldHVybiBMZWFkTW9kZWwuZmluZE9uZSh7W2tleV06IHZhbHVlfSkubGVhbigpO1xuICB9XG59XG4iLCJpbXBvcnQge0ludGVyZXN0RW50aXR5fSBmcm9tICcuLi9tb25nby9pbnRlcmVzdHMvaW50ZXJlc3QuZW50aXR5JztcbmltcG9ydCB7TGVhZEVudGl0eX0gZnJvbSAnLi4vbW9uZ28vbGVhZC9sZWFkLmVudGl0eSc7XG5pbXBvcnQge0lJbnRlcmVzdFJlc3BvbnNlLCBJTGVhZFJlc3BvbnNlLCBJU0RSZXF1ZXN0LCBJU0RSZXNwb25zZX0gZnJvbSAnLi9pc2QuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIExlYWRFbnRpdHlEVE8gaW1wbGVtZW50cyBMZWFkRW50aXR5IHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgZmlyc3RfbmFtZTogc3RyaW5nO1xuICBsYXN0X25hbWU6IHN0cmluZztcbiAgaWQ6IG51bWJlcjtcbiAgY29uc3RydWN0b3IocmVxdWVzdDogSVNEUmVxdWVzdCkge1xuICAgIHRoaXMuaWQgPSAwO1xuICAgIHRoaXMuZW1haWwgPSByZXF1ZXN0LmVtYWlsO1xuICAgIHRoaXMucGhvbmUgPSByZXF1ZXN0LnBob25lO1xuICAgIHRoaXMuZmlyc3RfbmFtZSA9IHJlcXVlc3QuZmlyc3ROYW1lO1xuICAgIHRoaXMubGFzdF9uYW1lID0gcmVxdWVzdC5sYXN0TmFtZTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBpbnRlcmVzdEVudGl0eVRvUmVzcG9uc2UgPSAoXG4gICAgZW50aXRpZXM6IEludGVyZXN0RW50aXR5W10gfCBJbnRlcmVzdEVudGl0eSxcbik6SUludGVyZXN0UmVzcG9uc2VbXSA9PiB7XG4gIGNvbnN0IGdldEVudGl0eSA9IChlbnRpdHk6IEludGVyZXN0RW50aXR5KSA9PiAoe1xuICAgIGxlYWRJZDogZW50aXR5LmxlYWRfaWQsXG4gICAgaWQ6IGVudGl0eS5pZCxcbiAgICBtZXNzYWdlOiBlbnRpdHkubWVzc2FnZSxcbiAgICBjcmVhdGVkQXQ6IGVudGl0eS5jcmVhdGVkX2F0Py50b0RhdGVTdHJpbmcoKSA/PyAnJyxcbiAgICB1cGRhdGVkQXQ6IGVudGl0eS51cGRhdGVkX2F0Py50b0RhdGVTdHJpbmcoKSA/PyAnJyxcbiAgfSk7XG5cbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpID9cbiAgICAgIGVudGl0aWVzLm1hcChnZXRFbnRpdHkpIDpcbiAgICAgIFtnZXRFbnRpdHkoZW50aXRpZXMpXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBJU0RSZXNwb25zZURUTyBpbXBsZW1lbnRzIElTRFJlc3BvbnNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGludGVyZXN0OiBJSW50ZXJlc3RSZXNwb25zZTtcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWQ6IExlYWRFbnRpdHksIGludGVyZXN0OiBJbnRlcmVzdEVudGl0eSkge1xuICAgIHRoaXMuaWQgPSBsZWFkLmlkO1xuICAgIHRoaXMuZW1haWwgPSBsZWFkLmVtYWlsO1xuICAgIHRoaXMucGhvbmUgPSBsZWFkLnBob25lO1xuICAgIHRoaXMuZmlyc3ROYW1lID0gbGVhZC5maXJzdF9uYW1lO1xuICAgIHRoaXMubGFzdE5hbWUgPSBsZWFkLmxhc3RfbmFtZTtcbiAgICB0aGlzLmludGVyZXN0ID0gdGhpcy50cmFuc2Zvcm1JbnRlcmVzdChpbnRlcmVzdCk7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBsZWFkLmNyZWF0ZWRfYXQ/LnRvTG9jYWxlU3RyaW5nKCkgPz8gJyc7XG4gICAgdGhpcy51cGRhdGVkQXQgPSBsZWFkLnVwZGF0ZWRfYXQ/LnRvTG9jYWxlU3RyaW5nKCkgPz8gJyc7XG4gIH1cblxuICB0cmFuc2Zvcm1JbnRlcmVzdChlbnRpdHk6IEludGVyZXN0RW50aXR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlYWRJZDogZW50aXR5LmxlYWRfaWQsXG4gICAgICBpZDogZW50aXR5LmlkLFxuICAgICAgbWVzc2FnZTogZW50aXR5Lm1lc3NhZ2UsXG4gICAgICBjcmVhdGVkQXQ6IGVudGl0eS5jcmVhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnLFxuICAgICAgdXBkYXRlZEF0OiBlbnRpdHkudXBkYXRlZF9hdD8udG9Mb2NhbGVTdHJpbmcoKSA/PyAnJyxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZWFkUmVzcG9uc2VEVE8gaW1wbGVtZW50cyBJTGVhZFJlc3BvbnNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICB1cGRhdGVkQXQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihsZWFkOiBMZWFkRW50aXR5KSB7XG4gICAgdGhpcy5pZCA9IGxlYWQuaWQ7XG4gICAgdGhpcy5lbWFpbCA9IGxlYWQuZW1haWw7XG4gICAgdGhpcy5waG9uZSA9IGxlYWQucGhvbmU7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBsZWFkLmZpcnN0X25hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxlYWQubGFzdF9uYW1lO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbGVhZC5jcmVhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnO1xuICAgIHRoaXMudXBkYXRlZEF0ID0gbGVhZC51cGRhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEludGVyZXN0UmVzcG9uc2VEVE8gaW1wbGVtZW50cyBJSW50ZXJlc3RSZXNwb25zZSB7XG4gIGlkOiBudW1iZXI7XG4gIGxlYWRJZDogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xuICB1cGRhdGVkQXQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihsZWFkOiBJbnRlcmVzdEVudGl0eSkge1xuICAgIHRoaXMuaWQgPSBsZWFkLmlkO1xuICAgIHRoaXMubGVhZElkID0gbGVhZC5sZWFkX2lkO1xuICAgIHRoaXMubWVzc2FnZSA9IGxlYWQubWVzc2FnZTtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGxlYWQuY3JlYXRlZF9hdD8udG9Mb2NhbGVTdHJpbmcoKSA/PyAnJztcbiAgICB0aGlzLnVwZGF0ZWRBdCA9IGxlYWQudXBkYXRlZF9hdD8udG9Mb2NhbGVTdHJpbmcoKSA/PyAnJztcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7SUVudGl0eVJlc3BvbnNlQmFzZX0gZnJvbSAnLi4vbW9uZ28vZW50aXR5YmFzZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJU0RSZXF1ZXN0e1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGhvbmU6IHN0cmluZztcbiAgICBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBsYXN0TmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gTGVhZElkIHtcbiAgICBQSE9ORSxcbiAgICBFTUFJTCxcbiAgICBJRFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTREludGVyZXN0UmVxdWVzdCB7XG4gICAgcmVnS2V5OiBMZWFkSWQ7XG4gICAgcmVnVmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxlYWRSZXNwb25zZSBleHRlbmRzIElFbnRpdHlSZXNwb25zZUJhc2V7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwaG9uZTogc3RyaW5nO1xuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIGxhc3ROYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUludGVyZXN0UmVzcG9uc2UgZXh0ZW5kcyBJRW50aXR5UmVzcG9uc2VCYXNle1xuICAgIGxlYWRJZDogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU0RSZXNwb25zZSBleHRlbmRzIElMZWFkUmVzcG9uc2V7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBpbnRlcmVzdDogSUludGVyZXN0UmVzcG9uc2U7XG59XG4iLCJpbXBvcnQge0xlYWRFbnRpdHl9IGZyb20gJy4uL21vbmdvL2xlYWQvbGVhZC5lbnRpdHknO1xuaW1wb3J0IEludGVyZXN0UmVwb3NpdG9yeSBmcm9tICcuLi9yZXBvc2l0b3J5L2ludGVyZXN0LnJlcG8nO1xuaW1wb3J0IExlYWRSZXBvc2l0b3J5IGZyb20gJy4uL3JlcG9zaXRvcnkvbGVhZC5yZXBvJztcbmltcG9ydCBSZXNwb25zZUVycm9yIGZyb20gJy4vcmVzcG9uc2UvZXJyb3IucmVzcG9uc2UnO1xuaW1wb3J0IHtJbnRlcmVzdFJlc3BvbnNlRFRPLCBJU0RSZXNwb25zZURUTywgTGVhZEVudGl0eURUTywgTGVhZFJlc3BvbnNlRFRPfSBmcm9tICcuL2lzZC5kdG8nO1xuaW1wb3J0IHtJU0RJbnRlcmVzdFJlcXVlc3QsIElTRFJlcXVlc3QsIExlYWRJZH0gZnJvbSAnLi9pc2QuaW50ZXJmYWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVNEc2VydmljZSB7XG4gIC8qKlxuICAgKiBJdCBjcmVhdGVzIGxlYWQgYW5kIGludGVyZXN0cy4gSWYgbGVhZCBleGlzdHMgYnkgcGhvbmUgb3IgZW1haWwgaXRcbiAgICogY3JlYXRlcyBqdXN0IHRoZSBpbnRlcmVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtJU0RSZXF1ZXN0fSByZXF1ZXN0IFRoZSBsZWFkIGFuZCBpbnRlcmVzdFxuICAgKiBAcmV0dXJuIHtJU0RSZXNwb25zZX0gVGhlIGxlYWQgYW5kIGludGVyZXN0IGRhdGFcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxdWVzdDogSVNEUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAvLyB0cmFuc2Zvcm0gYW5kIGV4dHJhY3QgbGVhZCBlbnRpdHkgZnJvbSByZXF1ZXN0XG4gICAgICBjb25zdCBsZWFkRW50aXR5ID0gbmV3IExlYWRFbnRpdHlEVE8ocmVxdWVzdCk7XG4gICAgICAvLyBmaW5kIGxlYWQgYnkgcGhvbmUgb3IgZW1haWxcbiAgICAgIGxldCBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuZ2V0QnlQaG9uZUFuZEVtYWlsKHJlcXVlc3QucGhvbmUsIHJlcXVlc3QuZW1haWwpO1xuICAgICAgaWYgKCFsZWFkKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBsZWFkIGlmIGRvZXMgbm90IGV4aXN0LlxuICAgICAgICBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuY3JlYXRlKGxlYWRFbnRpdHkpO1xuICAgICAgfVxuICAgICAgLy8gY3JlYXRlIGludGVyZXN0cyBpZiBsZWFkIGFuZCBtZXNzYWdlIGFyZSB0cnV0aHlcbiAgICAgIGlmIChsZWFkKSB7XG4gICAgICAgIGNvbnN0IGludGVyZXN0ID0gYXdhaXQgSW50ZXJlc3RSZXBvc2l0b3J5LmNyZWF0ZShsZWFkLmlkLCByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgICAgICAvLyBtZXJnZSBsZWFkIGFuZCBpbnRlcmVzdHMgdG9nZXRoZXIgaW4gcmVzcG9uc2UuXG4gICAgICAgIHJldHVybiBuZXcgSVNEUmVzcG9uc2VEVE8obGVhZCwgaW50ZXJlc3QpO1xuICAgICAgfVxuICAgICAgLy8gY2FuIG5vdCBjcmVhdGUgbGVhZFxuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdygnVW5hYmxlIHRvIGNyZWF0ZSBsZWFkJywgNTAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXQgcmV0cml2ZXMgYWxsIGxlYWQgY29sbGVjdGlvbiBmcm9tIHRoZSBkYiBhbmQgdHJhbnNmb3JtXG4gICAqIGl0cyBmaWVsZHMgZnJvbSBzbmFrZV9jYXNlIHRvIGNhbWVsQ2FzZS5cbiAgICpcbiAgICogQHJldHVybiB7SUxlYWRSZXNwb25zZVtdfSBUaGUgbGVhZCBkYXRhIGNvbGxlY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0TGVhZHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBsZWFkc1xuICAgICAgY29uc3QgbGVhZHMgPSBhd2FpdCBMZWFkUmVwb3NpdG9yeS5nZXRBbGwoKTtcbiAgICAgIHJldHVybiBsZWFkcy5tYXAoKGxlYWQpID0+IG5ldyBMZWFkUmVzcG9uc2VEVE8obGVhZCkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRMZWFkKGxlYWRJZDogbnVtYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBsZWFkc1xuICAgICAgY29uc3QgbGVhZCA9IGF3YWl0IExlYWRSZXBvc2l0b3J5LmdldChsZWFkSWQpO1xuICAgICAgaWYgKGxlYWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMZWFkUmVzcG9uc2VEVE8obGVhZCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KCdMZWFkSWQgbm90IGZvdW5kJywgNDAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgYWRkSW50ZXJlc3QocmVxdWVzdDogSVNESW50ZXJlc3RSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBzZWFyY2ggaWQgYW5kIHNldCBjb3JyZXNwb2RpbmcgdGV4dC5cbiAgICAgIGNvbnN0IGtleSA9IHJlcXVlc3QucmVnS2V5LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIC8vIGZpbmQgbGVhZCB1c2luZyB0aGUgcmVxdWVzdCBrZXkgYW5kIHZhbHVlXG4gICAgICBjb25zdCBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuZ2V0T25lQW55KGtleSwgcmVxdWVzdC5yZWdWYWx1ZSk7XG5cbiAgICAgIGlmIChsZWFkICYmIGxlYWQuaWQpIHtcbiAgICAgICAgLy8gZ2V0IGxlYWQgaWQgYW5kIHNhdmUgaW50ZXJlc3QuXG4gICAgICAgIGNvbnN0IGludGVyZXN0ID0gYXdhaXQgSW50ZXJlc3RSZXBvc2l0b3J5LmNyZWF0ZShsZWFkLmlkLCByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgICAgICAvLyBtZXJnZSBsZWFkIGFuZCBpbnRlcmVzdHMgdG9nZXRoZXIgaW4gcmVzcG9uc2UuXG4gICAgICAgIHJldHVybiBuZXcgSVNEUmVzcG9uc2VEVE8obGVhZCwgaW50ZXJlc3QpO1xuICAgICAgfVxuICAgICAgLy8gZW1haWwgb3IgcGhvbmUgb3IgaWQgb2YgbGVhZCBkb2Vzbm90IGV4aXN0XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KFxuICAgICAgICAgIGBMZWFkICR7cmVxdWVzdC5yZWdLZXl9IGRvZXMgbm90IGV4aXN0YCxcbiAgICAgICAgICA0MDAsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldExlYWRJZCh0eXBlSWQ6IExlYWRJZCk6IGtleW9mIExlYWRFbnRpdHkge1xuICAgIHN3aXRjaCAodHlwZUlkKSB7XG4gICAgICBjYXNlIExlYWRJZC5FTUFJTDpcbiAgICAgICAgcmV0dXJuICdlbWFpbCc7XG4gICAgICBjYXNlIExlYWRJZC5QSE9ORTpcbiAgICAgICAgcmV0dXJuICdwaG9uZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2lkJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0SW50ZXJlc3RzKCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBnZXQgbGVhZHNcbiAgICAgIGNvbnN0IGludGVyZXN0cyA9IGF3YWl0IEludGVyZXN0UmVwb3NpdG9yeS5nZXRBbGwoKTtcbiAgICAgIHJldHVybiBpbnRlcmVzdHMubWFwKChpbnRlcmVzdCkgPT4gbmV3IEludGVyZXN0UmVzcG9uc2VEVE8oaW50ZXJlc3QpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0SW50ZXJlc3QobGVhZElkOiBudW1iZXIpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IEludGVyZXN0UmVwb3NpdG9yeS5nZXRCeUxlYWRJZChsZWFkSWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxufVxuIiwiXHJcbmltcG9ydCB7SU11dGF0aW9uUmVzcG9uc2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbXV0YXRpb25SZXNwb25zZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgUmVzcG9uc2VFcnJvciBmcm9tICcuL2Vycm9yLnJlc3BvbnNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSVJlc3BvbnNlIHtcclxuICBzdGF0aWMgc2VuZEVycm9yKGVycm9yOiBSZXNwb25zZUVycm9yIHwgYW55KTogSU11dGF0aW9uUmVzcG9uc2Uge1xyXG4gICAgcmV0dXJuIHsuLi5lcnJvciwgc3RhdHVzOiBmYWxzZSwgZGF0YTogbnVsbH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2VuZDxUPihkYXRhOiBULCBtZXNzYWdlOiBzdHJpbmcpOiBJTXV0YXRpb25SZXNwb25zZTxUPiB7XHJcbiAgICBjb25zdCBkID0ge21lc3NhZ2UsIHN0YXR1czogdHJ1ZSwgZGF0YSwgY29kZTogMjAwfTtcclxuICAgIGNvbnNvbGUubG9nKGQpO1xyXG4gICAgcmV0dXJuIGQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIG1lc3NhZ2UgPSAnJztcbiAgY29kZSA9IDA7XG5cbiAgc3RhdGljIGluc3RhbmNlOiBSZXNwb25zZUVycm9yO1xuXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAvLyBjcmVhdGUgYSBzaW5nbGV0b24gb2YgcmVzcG9uc2UuXG4gICAgaWYgKCFSZXNwb25zZUVycm9yLmluc3RhbmNlKSB7XG4gICAgICBSZXNwb25zZUVycm9yLmluc3RhbmNlID0gbmV3IFJlc3BvbnNlRXJyb3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3BvbnNlRXJyb3IuaW5zdGFuY2U7XG4gIH1cbiAgc3RhdGljIHRocm93KGVycm9yOiB1bmtub3duIHwgc3RyaW5nLCBjb2RlOiBudW1iZXIpOiBSZXNwb25zZUVycm9yIHtcbiAgICBjb25zdCByZXNwb25zZSA9IFJlc3BvbnNlRXJyb3IuZ2V0SW5zdGFuY2UoKTtcblxuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXNwb25zZS5tZXNzYWdlID0gZXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSAoKGVycm9yKWFzIGFueSkubWVzc2FnZTtcbiAgICB9XG5cbiAgICByZXNwb25zZS5jb2RlID0gY29kZTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9