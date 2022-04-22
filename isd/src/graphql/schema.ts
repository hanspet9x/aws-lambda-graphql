import {gql} from 'apollo-server-lambda';

export const typeDefs = gql`

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
