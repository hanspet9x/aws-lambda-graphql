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
    dbURL: (0, index_1.default)('DATABASE_LOCAL'),
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
const api_response_1 = __importDefault(__webpack_require__(/*! ../utils/api.response */ "./src/utils/api.response.ts"));
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
const error_response_1 = __importDefault(__webpack_require__(/*! ../utils/error.response */ "./src/utils/error.response.ts"));
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

/***/ "./src/utils/api.response.ts":
/*!***********************************!*\
  !*** ./src/utils/api.response.ts ***!
  \***********************************/
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

/***/ "./src/utils/error.response.ts":
/*!*************************************!*\
  !*** ./src/utils/error.response.ts ***!
  \*************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9DQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVFQTs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFHQTtBQUtBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQW5CQTs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBVkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQXBCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUExQkE7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkE7QUFnQkE7QUFHQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFkQTtBQWdCQTtBQVVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCQTtBQWdDQTtBQVNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxCQTtBQXFCQTtBQU9BOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVFBOztBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFRQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUEvR0E7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFBQTs7QUFDQTtBQUNBO0FBdUJBO0FBbkJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQXpCQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FFdkJBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2NvbmYvYXBwLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2NvbmYvZGIudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvY29uZi9pbmRleC50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9ncmFwaHFsL3Jlc29sdmVyLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL2dyYXBocWwvc2NoZW1hLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL21vbmdvL19ob29rcy9jb3VudGVyLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL21vbmdvL2NvbW1vbi50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9jb3VudGVyL2NvdW50ZXIubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vY291bnRlci9jb3VudGVyLnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9pbnRlcmVzdHMvaW50ZXJlc3QubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vaW50ZXJlc3RzL2ludGVyZXN0LnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9tb25nby9sZWFkL2xlYWQubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvbW9uZ28vbGVhZC9sZWFkLnNjaGVtYS50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9yZXBvc2l0b3J5L2luZGV4LnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3JlcG9zaXRvcnkvaW50ZXJlc3QucmVwby50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9yZXBvc2l0b3J5L2xlYWQucmVwby50cyIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC8uL3NyYy9zZXJ2aWNlcy9pc2QuZHRvLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3NlcnZpY2VzL2lzZC5pbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvc2VydmljZXMvaXNkLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vaGVsbG9fd29ybGQvLi9zcmMvdXRpbHMvYXBpLnJlc3BvbnNlLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkLy4vc3JjL3V0aWxzL2Vycm9yLnJlc3BvbnNlLnRzIiwid2VicGFjazovL2hlbGxvX3dvcmxkL2V4dGVybmFsIGNvbW1vbmpzIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2hlbGxvX3dvcmxkL2V4dGVybmFsIGNvbW1vbmpzIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hlbGxvX3dvcmxkL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9oZWxsb193b3JsZC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcG9sbG9TZXJ2ZXJ9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItbGFtYmRhJztcbmltcG9ydCB7dHlwZURlZnN9IGZyb20gJy4vZ3JhcGhxbC9zY2hlbWEnO1xuaW1wb3J0IHtyZXNvbHZlcnN9IGZyb20gJy4vZ3JhcGhxbC9yZXNvbHZlcic7XG5pbXBvcnQge2luaXREYXRhYmFzZUNvbm5lY3Rpb259IGZyb20gJy4vY29uZi9kYic7XG5pbXBvcnQgSVNEUmVwb3NpdG9yeSBmcm9tICcuL3JlcG9zaXRvcnknO1xuXG5pbml0RGF0YWJhc2VDb25uZWN0aW9uKCk7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICB0eXBlRGVmcyxcbiAgcmVzb2x2ZXJzLFxuICBjb250ZXh0OiB7XG4gICAgcmVwb3M6IG5ldyBJU0RSZXBvc2l0b3J5KCksXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IGdyYXBocWxIYW5kbGVyID0gc2VydmVyLmNyZWF0ZUhhbmRsZXIoKTtcbiIsImltcG9ydCBnZXRFbnYgZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBhcHBDb25maWcgPSB7XG4gIGRiVVJMOiBnZXRFbnYoJ0RBVEFCQVNFX0xPQ0FMJyksXG59O1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7YXBwQ29uZmlnfSBmcm9tICcuL2FwcCc7XG5cbmV4cG9ydCBjb25zdCBpbml0RGF0YWJhc2VDb25uZWN0aW9uID0gKCkgPT4ge1xuICBtb25nb29zZS5jb25uZWN0KGFwcENvbmZpZy5kYlVSTCwgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ0RCIGNvbm5lY3RlZCcpO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IGdldEVudiA9IChlbnZLZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlID0gJycpID0+IHByb2Nlc3MuZW52W2VudktleV0gPz8gZGVmYXVsdFZhbHVlO1xuZXhwb3J0IGRlZmF1bHQgZ2V0RW52O1xuIiwiXHJcbmltcG9ydCB7SVNESW50ZXJlc3RSZXF1ZXN0LCBJU0RSZXF1ZXN0fSBmcm9tICcuLi9zZXJ2aWNlcy9pc2QuaW50ZXJmYWNlJztcclxuaW1wb3J0IElTRHNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvaXNkLnNlcnZpY2UnO1xyXG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi4vdXRpbHMvYXBpLnJlc3BvbnNlJztcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgUXVlcnk6IHtcclxuICAgIGFzeW5jIGdldExlYWRzKCkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJU0RzZXJ2aWNlLmdldExlYWRzKCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldExlYWQoXzogYW55LCBhcmdzOiBhbnkpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgSVNEc2VydmljZS5nZXRMZWFkKGFyZ3MubGVhZElkKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0SW50ZXJlc3RzKCkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJU0RzZXJ2aWNlLmdldEludGVyZXN0cygpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRJbnRlcmVzdChfOmFueSwgYXJnczogYW55ICkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJU0RzZXJ2aWNlLmdldEludGVyZXN0KGFyZ3MubGVhZElkKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgTXV0YXRpb246IHtcclxuICAgIGFzeW5jIGFkZExlYWQoXzphbnksIGFyZ3M6IGFueSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IElTRHNlcnZpY2UuY3JlYXRlKGFyZ3MucmVxdWVzdCBhcyBJU0RSZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gQVBJUmVzcG9uc2Uuc2VuZChyZXN1bHQsICdMZWFkIGFkZGVkLicpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBBUElSZXNwb25zZS5zZW5kRXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGFkZEludGVyZXN0KF86YW55LCBhcmdzOiBhbnkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBJU0RzZXJ2aWNlLmFkZEludGVyZXN0KGFyZ3MucmVxdWVzdCBhcyBJU0RJbnRlcmVzdFJlcXVlc3QpO1xyXG4gICAgICAgIHJldHVybiBBUElSZXNwb25zZS5zZW5kKHJlc3VsdCwgJ0ludGVyZXN0IGFkZGVkLicpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBBUElSZXNwb25zZS5zZW5kRXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7Z3FsfSBmcm9tICdhcG9sbG8tc2VydmVyLWxhbWJkYSc7XHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcblxyXG4gIHR5cGUgTGVhZHtcclxuICAgIGlkOiBJbnRcclxuICAgIGVtYWlsOiBTdHJpbmchXHJcbiAgICBwaG9uZTogU3RyaW5nIVxyXG4gICAgZmlyc3ROYW1lOiBTdHJpbmchXHJcbiAgICBsYXN0TmFtZTogU3RyaW5nIVxyXG4gICAgbWVzc2FnZTogU3RyaW5nIVxyXG4gICAgY3JlYXRlZEF0OiBTdHJpbmchXHJcbiAgICB1cGRhdGVkQXQ6IFN0cmluZyFcclxuICB9XHJcblxyXG4gIHR5cGUgSW50ZXJlc3Qge1xyXG4gICAgaWQ6IEludFxyXG4gICAgbGVhZElkOiBJbnQhXHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBjcmVhdGVkQXQ6IFN0cmluZyFcclxuICAgIHVwZGF0ZWRBdDogU3RyaW5nIVxyXG4gIH1cclxuXHJcbiAgdHlwZSBMZWFkSW50ZXJlc3Qge1xyXG4gICAgaWQ6IEludFxyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIHBob25lOiBTdHJpbmchXHJcbiAgICBmaXJzdE5hbWU6IFN0cmluZyFcclxuICAgIGxhc3ROYW1lOiBTdHJpbmchXHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBpbnRlcmVzdDogSW50ZXJlc3QhXHJcbiAgICBjcmVhdGVkQXQ6IFN0cmluZ1xyXG4gICAgdXBkYXRlZEF0OiBTdHJpbmdcclxuICB9XHJcblxyXG4gIHR5cGUgTGVhZEludGV0ZXN0UmVzcG9uc2V7XHJcbiAgICBkYXRhOiBMZWFkSW50ZXJlc3RcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICAgIGNvZGU6IEludCFcclxuICAgIHN0YXR1czogQm9vbGVhbiFcclxuICB9XHJcblxyXG4gIGVudW0gTGVhZElkIHtcclxuICAgIFBIT05FXHJcbiAgICBFTUFJTFxyXG4gICAgSURcclxuICB9XHJcblxyXG4gIGlucHV0IElTRFJlcXVlc3Qge1xyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIHBob25lOiBTdHJpbmchXHJcbiAgICBmaXJzdE5hbWU6IFN0cmluZyFcclxuICAgIGxhc3ROYW1lOiBTdHJpbmchXHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgfVxyXG5cclxuICBpbnB1dCBJU0RJbnRlcmVzdFJlcXVlc3Qge1xyXG4gICAgcmVnS2V5OiBMZWFkSWQhXHJcbiAgICByZWdWYWx1ZTogU3RyaW5nIVxyXG4gICAgbWVzc2FnZTogU3RyaW5nIVxyXG4gIH1cclxuXHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBnZXRMZWFkczogW0xlYWQhXVxyXG4gICAgZ2V0TGVhZChsZWFkSWQ6IEludCEpOiBMZWFkXHJcbiAgICBnZXRJbnRlcmVzdHM6IFtJbnRlcmVzdCFdXHJcbiAgICBnZXRJbnRlcmVzdChsZWFkSWQ6IEludCEpOiBJbnRlcmVzdFxyXG4gIH1cclxuXHJcbiAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICBhZGRMZWFkKHJlcXVlc3Q6IElTRFJlcXVlc3QpOiBMZWFkSW50ZXRlc3RSZXNwb25zZSFcclxuICAgIGFkZEludGVyZXN0KHJlcXVlc3Q6IElTREludGVyZXN0UmVxdWVzdCk6IExlYWRJbnRldGVzdFJlc3BvbnNlIVxyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7Q291bnRlck1vZGVsfSBmcm9tICcuLi9jb3VudGVyL2NvdW50ZXIubW9kZWwnO1xuaW1wb3J0IHtDb3VudGVyRW50aXR5fSBmcm9tICcuLy4uL2NvdW50ZXIvY291bnRlci5lbnRpdHknO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5jcmVtZW50Q291bnRlcihcbiAgICBuZXh0OiBtb25nb29zZS5DYWxsYmFja1dpdGhvdXRSZXN1bHRBbmRPcHRpb25hbEVycm9yLFxuICAgIGNvdW50ZXJDb2x1bW46IGtleW9mIENvdW50ZXJFbnRpdHksXG4gICAgbW9kZWw6IGFueSxcbikge1xuICBjb25zb2xlLmxvZygnVHJpZ2dlcmVkIGhvb2tzJywgY291bnRlckNvbHVtbik7XG4gIGlmIChtb2RlbC5pc05ldykge1xuICAgIENvdW50ZXJNb2RlbC5maW5kT25lQW5kVXBkYXRlKFxuICAgICAgICB7aWQ6IDF9LFxuICAgICAgICB7JGluYzoge1tjb3VudGVyQ29sdW1uXTogMX19LFxuICAgICAgICB7dXBzZXJ0OiB0cnVlLCBuZXc6IHRydWV9LFxuICAgICAgICAoZXJyb3I6IG1vbmdvb3NlLkNhbGxiYWNrRXJyb3IsIGRvYzogQ291bnRlckVudGl0eSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3V1bnRlciBlbnRpdHknLCBkb2MpO1xuICAgICAgICAgIGlmIChlcnJvcikgcmV0dXJuIG5leHQoZXJyb3IpO1xuICAgICAgICAgIGlmIChkb2MpbW9kZWwuaWQgPSBkb2NbY291bnRlckNvbHVtbl07XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBtb25nb1RpbWVTdGFtcHMgPSB7XG4gIHRpbWVzdGFtcHM6IHtcbiAgICBjcmVhdGVkQXQ6ICdjcmVhdGVkX2F0JyxcbiAgICB1cGRhdGVkQXQ6ICd1cGRhdGVkX2F0JyxcbiAgfSxcbn07XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHtDb3VudGVyRW50aXR5fSBmcm9tICcuL2NvdW50ZXIuZW50aXR5JztcbmltcG9ydCB7Q291bnRlclNjaGVtYX0gZnJvbSAnLi9jb3VudGVyLnNjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBDb3VudGVyTW9kZWwgPSBtb25nb29zZS5tb2RlbDxDb3VudGVyRW50aXR5PignY291bnRlcicsIENvdW50ZXJTY2hlbWEpO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7Q291bnRlckVudGl0eX0gZnJvbSAnLi9jb3VudGVyLmVudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBDb3VudGVyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxDb3VudGVyRW50aXR5Pih7XG4gIGlkOiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiAxLCBpbmRleDogdHJ1ZX0sXG4gIGludGVyZXN0OiB7dHlwZTogTnVtYmVyfSxcbiAgbGVhZDoge3R5cGU6IE51bWJlcn0sXG59KTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge0ludGVyZXN0RW50aXR5fSBmcm9tICcuL2ludGVyZXN0LmVudGl0eSc7XG5pbXBvcnQge0ludGVyZXN0U2NoZW1hfSBmcm9tICcuL2ludGVyZXN0LnNjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBJbnRlcmVzdE1vZGVsID0gbW9uZ29vc2UubW9kZWw8SW50ZXJlc3RFbnRpdHk+KCdpbnRlcmVzdCcsIEludGVyZXN0U2NoZW1hKTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge21vbmdvVGltZVN0YW1wc30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7aW5jcmVtZW50Q291bnRlcn0gZnJvbSAnLi4vX2hvb2tzL2NvdW50ZXInO1xuaW1wb3J0IHtJbnRlcmVzdEVudGl0eX0gZnJvbSAnLi9pbnRlcmVzdC5lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgSW50ZXJlc3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hPEludGVyZXN0RW50aXR5Pih7XG4gIGlkOiB7dHlwZTogTnVtYmVyfSxcbiAgbGVhZF9pZDogTnVtYmVyLFxuICBtZXNzYWdlOiBTdHJpbmcsXG59LCB7Li4ubW9uZ29UaW1lU3RhbXBzfSk7XG5cbkludGVyZXN0U2NoZW1hLnByZSgnc2F2ZScsIGZ1bmN0aW9uKG5leHQpIHtcbiAgaW5jcmVtZW50Q291bnRlcihuZXh0LCAnaW50ZXJlc3QnLCB0aGlzKTtcbn0pO1xuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7TGVhZEVudGl0eX0gZnJvbSAnLi9sZWFkLmVudGl0eSc7XG5pbXBvcnQge0xlYWRTY2hlbWF9IGZyb20gJy4vbGVhZC5zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgTGVhZE1vZGVsID0gbW9uZ29vc2UubW9kZWw8TGVhZEVudGl0eT4oJ2xlYWQnLCBMZWFkU2NoZW1hKTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQge21vbmdvVGltZVN0YW1wc30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7aW5jcmVtZW50Q291bnRlcn0gZnJvbSAnLi4vX2hvb2tzL2NvdW50ZXInO1xuaW1wb3J0IHtMZWFkRW50aXR5fSBmcm9tICcuL2xlYWQuZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IExlYWRTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hPExlYWRFbnRpdHk+KHtcbiAgaWQ6IE51bWJlcixcbiAgZW1haWw6IHt0eXBlOiBTdHJpbmcsIHVuaXF1ZTogdHJ1ZSwgYWxpYXM6ICdlbWFpbHknfSxcbiAgZmlyc3RfbmFtZTogU3RyaW5nLFxuICBsYXN0X25hbWU6IFN0cmluZyxcbiAgcGhvbmU6IHt0eXBlOiBTdHJpbmcsIHVuaXF1ZTogdHJ1ZX0sXG59LCB7Li4ubW9uZ29UaW1lU3RhbXBzfSk7XG5cbkxlYWRTY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24obmV4dCkge1xuICBpbmNyZW1lbnRDb3VudGVyKG5leHQsICdsZWFkJywgdGhpcyk7XG59KTtcbiIsImltcG9ydCBJbnRlcmVzdFJlcG9zaXRvcnkgZnJvbSAnLi9pbnRlcmVzdC5yZXBvJztcclxuaW1wb3J0IExlYWRSZXBvc2l0b3J5IGZyb20gJy4vbGVhZC5yZXBvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElTRFJlcG9zaXRvcnkge1xyXG4gIGxlYWQ6IExlYWRSZXBvc2l0b3J5O1xyXG4gIGludGVyZXN0OiBJbnRlcmVzdFJlcG9zaXRvcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5sZWFkID0gbmV3IExlYWRSZXBvc2l0b3J5KCk7XHJcbiAgICB0aGlzLmludGVyZXN0ID0gbmV3IEludGVyZXN0UmVwb3NpdG9yeSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBjb3VudGVyXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7SW50ZXJlc3RNb2RlbH0gZnJvbSAnLi4vbW9uZ28vaW50ZXJlc3RzL2ludGVyZXN0Lm1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJlc3RSZXBvc2l0b3J5IHtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShsZWFkSWQ6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIEludGVyZXN0TW9kZWwuY3JlYXRlKHtsZWFkX2lkOiBsZWFkSWQsIG1lc3NhZ2V9KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIEludGVyZXN0TW9kZWwuZmluZCgpXG4gICAgICAgIC5zb3J0KHtjcmVhdGVkX2F0OiAnZGVzYyd9KVxuICAgICAgICAuZXhlYygpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldChpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIEludGVyZXN0TW9kZWwuZmluZE9uZSh7aWR9KS5sZWFuKCk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0QnlMZWFkSWQobGVhZElkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gSW50ZXJlc3RNb2RlbC5maW5kT25lKHtsZWFkX2lkOiBsZWFkSWR9KVxuICAgICAgICAuc29ydCh7Y3JlYXRlZF9hdDogJ2Rlc2MnfSlcbiAgICAgICAgLmV4ZWMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtMZWFkRW50aXR5fSBmcm9tICcuLi9tb25nby9sZWFkL2xlYWQuZW50aXR5JztcbmltcG9ydCB7TGVhZE1vZGVsfSBmcm9tICcuLi9tb25nby9sZWFkL2xlYWQubW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFkUmVwb3NpdG9yeSB7XG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoZW50aXR5OiBMZWFkRW50aXR5KSB7XG4gICAgcmV0dXJuIGF3YWl0IExlYWRNb2RlbC5jcmVhdGUoZW50aXR5KTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBleGlzdHMocGhvbmU6IHN0cmluZywgZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiBMZWFkTW9kZWwuZXhpc3RzKHskb3I6IFt7ZW1haWx9LCB7cGhvbmV9XX0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEJ5UGhvbmVBbmRFbWFpbChwaG9uZTogc3RyaW5nLCBlbWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIExlYWRNb2RlbC5maW5kT25lKHskb3I6IFt7ZW1haWx9LCB7cGhvbmV9XX0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGdldEFsbCgpIHtcbiAgICByZXR1cm4gTGVhZE1vZGVsLmZpbmQoKVxuICAgICAgICAuc29ydCh7Y3JlYXRlZF9hdDogJ2Rlc2MnfSlcbiAgICAgICAgLmV4ZWMoKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXQoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBMZWFkTW9kZWwuZmluZE9uZSh7aWR9KS5sZWFuKCk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0T25lQW55KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIExlYWRNb2RlbC5maW5kT25lKHtba2V5XTogdmFsdWV9KS5sZWFuKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7SW50ZXJlc3RFbnRpdHl9IGZyb20gJy4uL21vbmdvL2ludGVyZXN0cy9pbnRlcmVzdC5lbnRpdHknO1xuaW1wb3J0IHtMZWFkRW50aXR5fSBmcm9tICcuLi9tb25nby9sZWFkL2xlYWQuZW50aXR5JztcbmltcG9ydCB7SUludGVyZXN0UmVzcG9uc2UsIElMZWFkUmVzcG9uc2UsIElTRFJlcXVlc3QsIElTRFJlc3BvbnNlfSBmcm9tICcuL2lzZC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgTGVhZEVudGl0eURUTyBpbXBsZW1lbnRzIExlYWRFbnRpdHkge1xuICBlbWFpbDogc3RyaW5nO1xuICBwaG9uZTogc3RyaW5nO1xuICBmaXJzdF9uYW1lOiBzdHJpbmc7XG4gIGxhc3RfbmFtZTogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBJU0RSZXF1ZXN0KSB7XG4gICAgdGhpcy5pZCA9IDA7XG4gICAgdGhpcy5lbWFpbCA9IHJlcXVlc3QuZW1haWw7XG4gICAgdGhpcy5waG9uZSA9IHJlcXVlc3QucGhvbmU7XG4gICAgdGhpcy5maXJzdF9uYW1lID0gcmVxdWVzdC5maXJzdE5hbWU7XG4gICAgdGhpcy5sYXN0X25hbWUgPSByZXF1ZXN0Lmxhc3ROYW1lO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IGludGVyZXN0RW50aXR5VG9SZXNwb25zZSA9IChcbiAgICBlbnRpdGllczogSW50ZXJlc3RFbnRpdHlbXSB8IEludGVyZXN0RW50aXR5LFxuKTpJSW50ZXJlc3RSZXNwb25zZVtdID0+IHtcbiAgY29uc3QgZ2V0RW50aXR5ID0gKGVudGl0eTogSW50ZXJlc3RFbnRpdHkpID0+ICh7XG4gICAgbGVhZElkOiBlbnRpdHkubGVhZF9pZCxcbiAgICBpZDogZW50aXR5LmlkLFxuICAgIG1lc3NhZ2U6IGVudGl0eS5tZXNzYWdlLFxuICAgIGNyZWF0ZWRBdDogZW50aXR5LmNyZWF0ZWRfYXQ/LnRvRGF0ZVN0cmluZygpID8/ICcnLFxuICAgIHVwZGF0ZWRBdDogZW50aXR5LnVwZGF0ZWRfYXQ/LnRvRGF0ZVN0cmluZygpID8/ICcnLFxuICB9KTtcblxuICByZXR1cm4gQXJyYXkuaXNBcnJheShlbnRpdGllcykgP1xuICAgICAgZW50aXRpZXMubWFwKGdldEVudGl0eSkgOlxuICAgICAgW2dldEVudGl0eShlbnRpdGllcyldO1xufTtcblxuZXhwb3J0IGNsYXNzIElTRFJlc3BvbnNlRFRPIGltcGxlbWVudHMgSVNEUmVzcG9uc2Uge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICBwaG9uZTogc3RyaW5nO1xuICBmaXJzdE5hbWU6IHN0cmluZztcbiAgbGFzdE5hbWU6IHN0cmluZztcbiAgaW50ZXJlc3Q6IElJbnRlcmVzdFJlc3BvbnNlO1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgdXBkYXRlZEF0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobGVhZDogTGVhZEVudGl0eSwgaW50ZXJlc3Q6IEludGVyZXN0RW50aXR5KSB7XG4gICAgdGhpcy5pZCA9IGxlYWQuaWQ7XG4gICAgdGhpcy5lbWFpbCA9IGxlYWQuZW1haWw7XG4gICAgdGhpcy5waG9uZSA9IGxlYWQucGhvbmU7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBsZWFkLmZpcnN0X25hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxlYWQubGFzdF9uYW1lO1xuICAgIHRoaXMuaW50ZXJlc3QgPSB0aGlzLnRyYW5zZm9ybUludGVyZXN0KGludGVyZXN0KTtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGxlYWQuY3JlYXRlZF9hdD8udG9Mb2NhbGVTdHJpbmcoKSA/PyAnJztcbiAgICB0aGlzLnVwZGF0ZWRBdCA9IGxlYWQudXBkYXRlZF9hdD8udG9Mb2NhbGVTdHJpbmcoKSA/PyAnJztcbiAgfVxuXG4gIHRyYW5zZm9ybUludGVyZXN0KGVudGl0eTogSW50ZXJlc3RFbnRpdHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGVhZElkOiBlbnRpdHkubGVhZF9pZCxcbiAgICAgIGlkOiBlbnRpdHkuaWQsXG4gICAgICBtZXNzYWdlOiBlbnRpdHkubWVzc2FnZSxcbiAgICAgIGNyZWF0ZWRBdDogZW50aXR5LmNyZWF0ZWRfYXQ/LnRvTG9jYWxlU3RyaW5nKCkgPz8gJycsXG4gICAgICB1cGRhdGVkQXQ6IGVudGl0eS51cGRhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlYWRSZXNwb25zZURUTyBpbXBsZW1lbnRzIElMZWFkUmVzcG9uc2Uge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICBwaG9uZTogc3RyaW5nO1xuICBmaXJzdE5hbWU6IHN0cmluZztcbiAgbGFzdE5hbWU6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWQ6IExlYWRFbnRpdHkpIHtcbiAgICB0aGlzLmlkID0gbGVhZC5pZDtcbiAgICB0aGlzLmVtYWlsID0gbGVhZC5lbWFpbDtcbiAgICB0aGlzLnBob25lID0gbGVhZC5waG9uZTtcbiAgICB0aGlzLmZpcnN0TmFtZSA9IGxlYWQuZmlyc3RfbmFtZTtcbiAgICB0aGlzLmxhc3ROYW1lID0gbGVhZC5sYXN0X25hbWU7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBsZWFkLmNyZWF0ZWRfYXQ/LnRvTG9jYWxlU3RyaW5nKCkgPz8gJyc7XG4gICAgdGhpcy51cGRhdGVkQXQgPSBsZWFkLnVwZGF0ZWRfYXQ/LnRvTG9jYWxlU3RyaW5nKCkgPz8gJyc7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSW50ZXJlc3RSZXNwb25zZURUTyBpbXBsZW1lbnRzIElJbnRlcmVzdFJlc3BvbnNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgbGVhZElkOiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGxlYWQ6IEludGVyZXN0RW50aXR5KSB7XG4gICAgdGhpcy5pZCA9IGxlYWQuaWQ7XG4gICAgdGhpcy5sZWFkSWQgPSBsZWFkLmxlYWRfaWQ7XG4gICAgdGhpcy5tZXNzYWdlID0gbGVhZC5tZXNzYWdlO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbGVhZC5jcmVhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnO1xuICAgIHRoaXMudXBkYXRlZEF0ID0gbGVhZC51cGRhdGVkX2F0Py50b0xvY2FsZVN0cmluZygpID8/ICcnO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtJRW50aXR5UmVzcG9uc2VCYXNlfSBmcm9tICcuLi9tb25nby9lbnRpdHliYXNlJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIElTRFJlcXVlc3R7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwaG9uZTogc3RyaW5nO1xuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIGxhc3ROYW1lOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBMZWFkSWQge1xuICAgIFBIT05FLFxuICAgIEVNQUlMLFxuICAgIElEXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNESW50ZXJlc3RSZXF1ZXN0IHtcbiAgICByZWdLZXk6IExlYWRJZDtcbiAgICByZWdWYWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTGVhZFJlc3BvbnNlIGV4dGVuZHMgSUVudGl0eVJlc3BvbnNlQmFzZXtcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIHBob25lOiBzdHJpbmc7XG4gICAgZmlyc3ROYW1lOiBzdHJpbmc7XG4gICAgbGFzdE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJSW50ZXJlc3RSZXNwb25zZSBleHRlbmRzIElFbnRpdHlSZXNwb25zZUJhc2V7XG4gICAgbGVhZElkOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTRFJlc3BvbnNlIGV4dGVuZHMgSUxlYWRSZXNwb25zZXtcbiAgICBpZDogbnVtYmVyO1xuICAgIGludGVyZXN0OiBJSW50ZXJlc3RSZXNwb25zZTtcbn1cbiIsImltcG9ydCB7TGVhZEVudGl0eX0gZnJvbSAnLi4vbW9uZ28vbGVhZC9sZWFkLmVudGl0eSc7XG5pbXBvcnQgSW50ZXJlc3RSZXBvc2l0b3J5IGZyb20gJy4uL3JlcG9zaXRvcnkvaW50ZXJlc3QucmVwbyc7XG5pbXBvcnQgTGVhZFJlcG9zaXRvcnkgZnJvbSAnLi4vcmVwb3NpdG9yeS9sZWFkLnJlcG8nO1xuaW1wb3J0IFJlc3BvbnNlRXJyb3IgZnJvbSAnLi4vdXRpbHMvZXJyb3IucmVzcG9uc2UnO1xuaW1wb3J0IHtJbnRlcmVzdFJlc3BvbnNlRFRPLCBJU0RSZXNwb25zZURUTywgTGVhZEVudGl0eURUTywgTGVhZFJlc3BvbnNlRFRPfSBmcm9tICcuL2lzZC5kdG8nO1xuaW1wb3J0IHtJU0RJbnRlcmVzdFJlcXVlc3QsIElTRFJlcXVlc3QsIExlYWRJZH0gZnJvbSAnLi9pc2QuaW50ZXJmYWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVNEc2VydmljZSB7XG4gIC8qKlxuICAgKiBJdCBjcmVhdGVzIGxlYWQgYW5kIGludGVyZXN0cy4gSWYgbGVhZCBleGlzdHMgYnkgcGhvbmUgb3IgZW1haWwgaXRcbiAgICogY3JlYXRlcyBqdXN0IHRoZSBpbnRlcmVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtJU0RSZXF1ZXN0fSByZXF1ZXN0IFRoZSBsZWFkIGFuZCBpbnRlcmVzdFxuICAgKiBAcmV0dXJuIHtJU0RSZXNwb25zZX0gVGhlIGxlYWQgYW5kIGludGVyZXN0IGRhdGFcbiAgICovXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUocmVxdWVzdDogSVNEUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAvLyB0cmFuc2Zvcm0gYW5kIGV4dHJhY3QgbGVhZCBlbnRpdHkgZnJvbSByZXF1ZXN0XG4gICAgICBjb25zdCBsZWFkRW50aXR5ID0gbmV3IExlYWRFbnRpdHlEVE8ocmVxdWVzdCk7XG4gICAgICAvLyBmaW5kIGxlYWQgYnkgcGhvbmUgb3IgZW1haWxcbiAgICAgIGxldCBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuZ2V0QnlQaG9uZUFuZEVtYWlsKHJlcXVlc3QucGhvbmUsIHJlcXVlc3QuZW1haWwpO1xuICAgICAgaWYgKCFsZWFkKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBsZWFkIGlmIGRvZXMgbm90IGV4aXN0LlxuICAgICAgICBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuY3JlYXRlKGxlYWRFbnRpdHkpO1xuICAgICAgfVxuICAgICAgLy8gY3JlYXRlIGludGVyZXN0cyBpZiBsZWFkIGFuZCBtZXNzYWdlIGFyZSB0cnV0aHlcbiAgICAgIGlmIChsZWFkKSB7XG4gICAgICAgIGNvbnN0IGludGVyZXN0ID0gYXdhaXQgSW50ZXJlc3RSZXBvc2l0b3J5LmNyZWF0ZShsZWFkLmlkLCByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgICAgICAvLyBtZXJnZSBsZWFkIGFuZCBpbnRlcmVzdHMgdG9nZXRoZXIgaW4gcmVzcG9uc2UuXG4gICAgICAgIHJldHVybiBuZXcgSVNEUmVzcG9uc2VEVE8obGVhZCwgaW50ZXJlc3QpO1xuICAgICAgfVxuICAgICAgLy8gY2FuIG5vdCBjcmVhdGUgbGVhZFxuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdygnVW5hYmxlIHRvIGNyZWF0ZSBsZWFkJywgNTAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXQgcmV0cml2ZXMgYWxsIGxlYWQgY29sbGVjdGlvbiBmcm9tIHRoZSBkYiBhbmQgdHJhbnNmb3JtXG4gICAqIGl0cyBmaWVsZHMgZnJvbSBzbmFrZV9jYXNlIHRvIGNhbWVsQ2FzZS5cbiAgICpcbiAgICogQHJldHVybiB7SUxlYWRSZXNwb25zZVtdfSBUaGUgbGVhZCBkYXRhIGNvbGxlY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0TGVhZHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBsZWFkc1xuICAgICAgY29uc3QgbGVhZHMgPSBhd2FpdCBMZWFkUmVwb3NpdG9yeS5nZXRBbGwoKTtcbiAgICAgIHJldHVybiBsZWFkcy5tYXAoKGxlYWQpID0+IG5ldyBMZWFkUmVzcG9uc2VEVE8obGVhZCkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBnZXRMZWFkKGxlYWRJZDogbnVtYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBsZWFkc1xuICAgICAgY29uc3QgbGVhZCA9IGF3YWl0IExlYWRSZXBvc2l0b3J5LmdldChsZWFkSWQpO1xuICAgICAgaWYgKGxlYWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMZWFkUmVzcG9uc2VEVE8obGVhZCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KCdMZWFkSWQgbm90IGZvdW5kJywgNDAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgYWRkSW50ZXJlc3QocmVxdWVzdDogSVNESW50ZXJlc3RSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGdldCBzZWFyY2ggaWQgYW5kIHNldCBjb3JyZXNwb2RpbmcgdGV4dC5cbiAgICAgIGNvbnN0IGtleSA9IHJlcXVlc3QucmVnS2V5LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIC8vIGZpbmQgbGVhZCB1c2luZyB0aGUgcmVxdWVzdCBrZXkgYW5kIHZhbHVlXG4gICAgICBjb25zdCBsZWFkID0gYXdhaXQgTGVhZFJlcG9zaXRvcnkuZ2V0T25lQW55KGtleSwgcmVxdWVzdC5yZWdWYWx1ZSk7XG5cbiAgICAgIGlmIChsZWFkICYmIGxlYWQuaWQpIHtcbiAgICAgICAgLy8gZ2V0IGxlYWQgaWQgYW5kIHNhdmUgaW50ZXJlc3QuXG4gICAgICAgIGNvbnN0IGludGVyZXN0ID0gYXdhaXQgSW50ZXJlc3RSZXBvc2l0b3J5LmNyZWF0ZShsZWFkLmlkLCByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgICAgICAvLyBtZXJnZSBsZWFkIGFuZCBpbnRlcmVzdHMgdG9nZXRoZXIgaW4gcmVzcG9uc2UuXG4gICAgICAgIHJldHVybiBuZXcgSVNEUmVzcG9uc2VEVE8obGVhZCwgaW50ZXJlc3QpO1xuICAgICAgfVxuICAgICAgLy8gZW1haWwgb3IgcGhvbmUgb3IgaWQgb2YgbGVhZCBkb2Vzbm90IGV4aXN0XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KFxuICAgICAgICAgIGBMZWFkICR7cmVxdWVzdC5yZWdLZXl9IGRvZXMgbm90IGV4aXN0YCxcbiAgICAgICAgICA0MDAsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldExlYWRJZCh0eXBlSWQ6IExlYWRJZCk6IGtleW9mIExlYWRFbnRpdHkge1xuICAgIHN3aXRjaCAodHlwZUlkKSB7XG4gICAgICBjYXNlIExlYWRJZC5FTUFJTDpcbiAgICAgICAgcmV0dXJuICdlbWFpbCc7XG4gICAgICBjYXNlIExlYWRJZC5QSE9ORTpcbiAgICAgICAgcmV0dXJuICdwaG9uZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2lkJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0SW50ZXJlc3RzKCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBnZXQgbGVhZHNcbiAgICAgIGNvbnN0IGludGVyZXN0cyA9IGF3YWl0IEludGVyZXN0UmVwb3NpdG9yeS5nZXRBbGwoKTtcbiAgICAgIHJldHVybiBpbnRlcmVzdHMubWFwKChpbnRlcmVzdCkgPT4gbmV3IEludGVyZXN0UmVzcG9uc2VEVE8oaW50ZXJlc3QpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgUmVzcG9uc2VFcnJvci50aHJvdyhlcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZ2V0SW50ZXJlc3QobGVhZElkOiBudW1iZXIpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IEludGVyZXN0UmVwb3NpdG9yeS5nZXRCeUxlYWRJZChsZWFkSWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBSZXNwb25zZUVycm9yLnRocm93KGVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtJTXV0YXRpb25SZXNwb25zZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9tdXRhdGlvblJlc3BvbnNlLmludGVyZmFjZSc7XHJcbmltcG9ydCBSZXNwb25zZUVycm9yIGZyb20gJy4vZXJyb3IucmVzcG9uc2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJUmVzcG9uc2Uge1xyXG4gIHN0YXRpYyBzZW5kRXJyb3IoZXJyb3I6IFJlc3BvbnNlRXJyb3IgfCBhbnkpOiBJTXV0YXRpb25SZXNwb25zZSB7XHJcbiAgICByZXR1cm4gey4uLmVycm9yLCBzdGF0dXM6IGZhbHNlLCBkYXRhOiBudWxsfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzZW5kPFQ+KGRhdGE6IFQsIG1lc3NhZ2U6IHN0cmluZyk6IElNdXRhdGlvblJlc3BvbnNlPFQ+IHtcclxuICAgIGNvbnN0IGQgPSB7bWVzc2FnZSwgc3RhdHVzOiB0cnVlLCBkYXRhLCBjb2RlOiAyMDB9O1xyXG4gICAgY29uc29sZS5sb2coZCk7XHJcbiAgICByZXR1cm4gZDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgbWVzc2FnZSA9ICcnO1xuICBjb2RlID0gMDtcblxuICBzdGF0aWMgaW5zdGFuY2U6IFJlc3BvbnNlRXJyb3I7XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIC8vIGNyZWF0ZSBhIHNpbmdsZXRvbiBvZiByZXNwb25zZS5cbiAgICBpZiAoIVJlc3BvbnNlRXJyb3IuaW5zdGFuY2UpIHtcbiAgICAgIFJlc3BvbnNlRXJyb3IuaW5zdGFuY2UgPSBuZXcgUmVzcG9uc2VFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzcG9uc2VFcnJvci5pbnN0YW5jZTtcbiAgfVxuICBzdGF0aWMgdGhyb3coZXJyb3I6IHVua25vd24gfCBzdHJpbmcsIGNvZGU6IG51bWJlcik6IFJlc3BvbnNlRXJyb3Ige1xuICAgIGNvbnN0IHJlc3BvbnNlID0gUmVzcG9uc2VFcnJvci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBlcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UubWVzc2FnZSA9ICgoZXJyb3IpYXMgYW55KS5tZXNzYWdlO1xuICAgIH1cblxuICAgIHJlc3BvbnNlLmNvZGUgPSBjb2RlO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=