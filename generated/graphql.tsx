import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  User?: Maybe<User>;
  errors?: Maybe<Array<Maybe<Error>>>;
  token?: Maybe<Token>;
};

export type Award = {
  __typename?: 'Award';
  amount?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  sale?: Maybe<Sale>;
  saleId?: Maybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail?: Maybe<UserPayload>;
  changePassword?: Maybe<UserPayload>;
  changeSystemRole?: Maybe<UserPayload>;
  crearBoletoMutartion?: Maybe<Scalars['Boolean']>;
  createAWard?: Maybe<SalePayload>;
  createSaleTicket?: Maybe<SalePayload>;
  deleteAccount?: Maybe<UserPayload>;
  deleteAward?: Maybe<Award>;
  deleteSale?: Maybe<Sale>;
  editInformartion?: Maybe<UserPayload>;
  logIn?: Maybe<AuthPayload>;
  logOut?: Maybe<Scalars['Boolean']>;
  refreshAccessToken: RefreshAccessToken;
  signUp?: Maybe<UserPayload>;
  verifyToken?: Maybe<AuthPayload>;
};


export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangeSystemRoleArgs = {
  id: Scalars['String'];
  role: Scalars['String'];
};


export type MutationCreateAWardArgs = {
  data?: InputMaybe<CreateAwardInput>;
};


export type MutationCreateSaleTicketArgs = {
  data?: InputMaybe<CreateTicketInput>;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteAwardArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteSaleArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationEditInformartionArgs = {
  data?: InputMaybe<EditInformartionInput>;
};


export type MutationLogInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

export enum PermissionAcces {
  Denied = 'DENIED',
  Granted = 'GRANTED'
}

export type Query = {
  __typename?: 'Query';
  AllUsers?: Maybe<Array<Maybe<User>>>;
  boletos?: Maybe<Array<Maybe<Ticket>>>;
  bye: Scalars['String'];
  getAwardById?: Maybe<Sale>;
  me: User;
  sale?: Maybe<Sale>;
};


export type QueryBoletosArgs = {
  filter?: InputMaybe<Scalars['String']>;
};


export type QueryGetAwardByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QuerySaleArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Sale = {
  __typename?: 'Sale';
  award?: Maybe<Award>;
  client_DNI?: Maybe<Scalars['String']>;
  client_fullName?: Maybe<Scalars['String']>;
  client_phone_number?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  ticket?: Maybe<Ticket>;
  ticketId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type SalePayload = {
  __typename?: 'SalePayload';
  errors?: Maybe<Array<Maybe<Error>>>;
  sale?: Maybe<Sale>;
};

export type Subscription = {
  __typename?: 'Subscription';
  saleAdded?: Maybe<Sale>;
};

export enum SystemRole {
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type Ticket = {
  __typename?: 'Ticket';
  id?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  sale?: Maybe<Sale>;
  state?: Maybe<TicketState>;
};

export enum TicketState {
  Available = 'AVAILABLE',
  NonAvailable = 'NON_AVAILABLE',
  Winning = 'WINNING'
}

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  permission?: Maybe<PermissionAcces>;
  phone_number?: Maybe<Scalars['String']>;
  role?: Maybe<SystemRole>;
  sales?: Maybe<Array<Maybe<Sale>>>;
  tokenversion?: Maybe<Scalars['Int']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  User?: Maybe<User>;
  errors?: Maybe<Array<Maybe<Error>>>;
};

export type CreateAwardInput = {
  amount?: InputMaybe<Scalars['String']>;
  place?: InputMaybe<Scalars['String']>;
  ticketId?: InputMaybe<Scalars['String']>;
};

export type CreateTicketInput = {
  client_DNI?: InputMaybe<Scalars['String']>;
  client_fullName?: InputMaybe<Scalars['String']>;
  client_phone_number?: InputMaybe<Scalars['String']>;
  ticketId?: InputMaybe<Scalars['String']>;
};

export type EditInformartionInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
};

export type RefreshAccessToken = {
  __typename?: 'refreshAccessToken';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type SignUpMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'UserPayload', User?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, tokenversion?: number | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn?: { __typename?: 'AuthPayload', User?: { __typename?: 'User', id?: string | null, email?: string | null, tokenversion?: number | null } | null, token?: { __typename?: 'Token', accessToken: string } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut?: boolean | null };

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken: { __typename?: 'refreshAccessToken', accessToken?: string | null, refreshToken?: string | null } };

export type DeleteAccountMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: { __typename?: 'UserPayload', User?: { __typename?: 'User', id?: string | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken?: { __typename?: 'AuthPayload', User?: { __typename?: 'User', id?: string | null, tokenversion?: number | null } | null, token?: { __typename?: 'Token', accessToken: string } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type CreateSaleTicketMutationVariables = Exact<{
  data?: InputMaybe<CreateTicketInput>;
}>;


export type CreateSaleTicketMutation = { __typename?: 'Mutation', createSaleTicket?: { __typename?: 'SalePayload', sale?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type DeleteSaleMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', deleteSale?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null } | null };

export type CreateAWardMutationVariables = Exact<{
  data?: InputMaybe<CreateAwardInput>;
}>;


export type CreateAWardMutation = { __typename?: 'Mutation', createAWard?: { __typename?: 'SalePayload', sale?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null, award?: { __typename?: 'Award', id?: string | null, place?: string | null, amount?: string | null, createdAt?: any | null } | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type DeleteAwardMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteAwardMutation = { __typename?: 'Mutation', deleteAward?: { __typename?: 'Award', id?: string | null, place?: string | null, amount?: string | null, sale?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null } | null } | null };

export type EditInformartionMutationVariables = Exact<{
  data?: InputMaybe<EditInformartionInput>;
}>;


export type EditInformartionMutation = { __typename?: 'Mutation', editInformartion?: { __typename?: 'UserPayload', User?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, phone_number?: string | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'UserPayload', User?: { __typename?: 'User', email?: string | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type ChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail?: { __typename?: 'UserPayload', User?: { __typename?: 'User', email?: string | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type ChangeSystemRoleMutationVariables = Exact<{
  id: Scalars['String'];
  role: Scalars['String'];
}>;


export type ChangeSystemRoleMutation = { __typename?: 'Mutation', changeSystemRole?: { __typename?: 'UserPayload', User?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, role?: SystemRole | null } | null, errors?: Array<{ __typename?: 'Error', path: string, message: string } | null> | null } | null };

export type BoletosQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']>;
}>;


export type BoletosQuery = { __typename?: 'Query', boletos?: Array<{ __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null> | null };

export type SaleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type SaleQuery = { __typename?: 'Query', sale?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null } | null };

export type GetAwardByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetAwardByIdQuery = { __typename?: 'Query', getAwardById?: { __typename?: 'Sale', id?: string | null, client_fullName?: string | null, client_phone_number?: string | null, client_DNI?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, createdAt?: any | null } | null, award?: { __typename?: 'Award', id?: string | null, place?: string | null, amount?: string | null, createdAt?: any | null } | null, ticket?: { __typename?: 'Ticket', id?: string | null, number?: string | null, state?: TicketState | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, email?: string | null, password?: string | null, tokenversion?: number | null, role?: SystemRole | null, permission?: PermissionAcces | null, createdAt?: any | null } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', AllUsers?: Array<{ __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, phone_number?: string | null, email?: string | null, password?: string | null, tokenversion?: number | null, role?: SystemRole | null, permission?: PermissionAcces | null, createdAt?: any | null } | null> | null };


export const SignUpDocument = gql`
    mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  signUp(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  ) @connection(key: "signUp", filter: ["email"]) {
    User {
      id
      firstName
      lastName
      email
      tokenversion
    }
    errors {
      path
      message
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>, 'mutation'>;

    export const SignUpComponent = (props: SignUpComponentProps) => (
      <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
    );
    
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logIn(email: $email, password: $password) @connection(key: "logIn", filter: ["email"]) {
    User {
      id
      email
      tokenversion
    }
    token {
      accessToken
    }
    errors {
      path
      message
    }
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;
export type LogInComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogInMutation, LogInMutationVariables>, 'mutation'>;

    export const LogInComponent = (props: LogInComponentProps) => (
      <ApolloReactComponents.Mutation<LogInMutation, LogInMutationVariables> mutation={LogInDocument} {...props} />
    );
    
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation logOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;
export type LogOutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogOutMutation, LogOutMutationVariables>, 'mutation'>;

    export const LogOutComponent = (props: LogOutComponentProps) => (
      <ApolloReactComponents.Mutation<LogOutMutation, LogOutMutationVariables> mutation={LogOutDocument} {...props} />
    );
    
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation refreshAccessToken($refreshToken: String!) {
  refreshAccessToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export type RefreshAccessTokenComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>, 'mutation'>;

    export const RefreshAccessTokenComponent = (props: RefreshAccessTokenComponentProps) => (
      <ApolloReactComponents.Mutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables> mutation={RefreshAccessTokenDocument} {...props} />
    );
    
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount($password: String!) {
  deleteAccount(password: $password) {
    User {
      id
    }
    errors {
      path
      message
    }
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;
export type DeleteAccountComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteAccountMutation, DeleteAccountMutationVariables>, 'mutation'>;

    export const DeleteAccountComponent = (props: DeleteAccountComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteAccountMutation, DeleteAccountMutationVariables> mutation={DeleteAccountDocument} {...props} />
    );
    
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation verifyToken($token: String!) {
  verifyToken(token: $token) {
    User {
      id
      tokenversion
    }
    token {
      accessToken
    }
    errors {
      path
      message
    }
  }
}
    `;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export type VerifyTokenComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VerifyTokenMutation, VerifyTokenMutationVariables>, 'mutation'>;

    export const VerifyTokenComponent = (props: VerifyTokenComponentProps) => (
      <ApolloReactComponents.Mutation<VerifyTokenMutation, VerifyTokenMutationVariables> mutation={VerifyTokenDocument} {...props} />
    );
    
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const CreateSaleTicketDocument = gql`
    mutation createSaleTicket($data: createTicketInput) {
  createSaleTicket(data: $data) {
    sale {
      id
      client_fullName
      client_phone_number
      client_DNI
      user {
        id
        firstName
        lastName
        phone_number
        createdAt
      }
      ticket {
        id
        number
        state
      }
      createdAt
    }
    errors {
      path
      message
    }
  }
}
    `;
export type CreateSaleTicketMutationFn = Apollo.MutationFunction<CreateSaleTicketMutation, CreateSaleTicketMutationVariables>;
export type CreateSaleTicketComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateSaleTicketMutation, CreateSaleTicketMutationVariables>, 'mutation'>;

    export const CreateSaleTicketComponent = (props: CreateSaleTicketComponentProps) => (
      <ApolloReactComponents.Mutation<CreateSaleTicketMutation, CreateSaleTicketMutationVariables> mutation={CreateSaleTicketDocument} {...props} />
    );
    
export type CreateSaleTicketMutationResult = Apollo.MutationResult<CreateSaleTicketMutation>;
export type CreateSaleTicketMutationOptions = Apollo.BaseMutationOptions<CreateSaleTicketMutation, CreateSaleTicketMutationVariables>;
export const DeleteSaleDocument = gql`
    mutation deleteSale($id: String) {
  deleteSale(id: $id) {
    id
    client_fullName
    client_phone_number
    client_DNI
    user {
      id
      firstName
      lastName
      phone_number
      createdAt
    }
    ticket {
      id
      number
      state
    }
    createdAt
  }
}
    `;
export type DeleteSaleMutationFn = Apollo.MutationFunction<DeleteSaleMutation, DeleteSaleMutationVariables>;
export type DeleteSaleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteSaleMutation, DeleteSaleMutationVariables>, 'mutation'>;

    export const DeleteSaleComponent = (props: DeleteSaleComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteSaleMutation, DeleteSaleMutationVariables> mutation={DeleteSaleDocument} {...props} />
    );
    
export type DeleteSaleMutationResult = Apollo.MutationResult<DeleteSaleMutation>;
export type DeleteSaleMutationOptions = Apollo.BaseMutationOptions<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const CreateAWardDocument = gql`
    mutation createAWard($data: createAwardInput) {
  createAWard(data: $data) {
    sale {
      id
      client_fullName
      client_phone_number
      client_DNI
      user {
        id
        firstName
        lastName
        phone_number
        createdAt
      }
      ticket {
        id
        number
        state
      }
      award {
        id
        place
        amount
        createdAt
      }
      createdAt
    }
    errors {
      path
      message
    }
  }
}
    `;
export type CreateAWardMutationFn = Apollo.MutationFunction<CreateAWardMutation, CreateAWardMutationVariables>;
export type CreateAWardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateAWardMutation, CreateAWardMutationVariables>, 'mutation'>;

    export const CreateAWardComponent = (props: CreateAWardComponentProps) => (
      <ApolloReactComponents.Mutation<CreateAWardMutation, CreateAWardMutationVariables> mutation={CreateAWardDocument} {...props} />
    );
    
export type CreateAWardMutationResult = Apollo.MutationResult<CreateAWardMutation>;
export type CreateAWardMutationOptions = Apollo.BaseMutationOptions<CreateAWardMutation, CreateAWardMutationVariables>;
export const DeleteAwardDocument = gql`
    mutation deleteAward($id: String) {
  deleteAward(id: $id) {
    id
    place
    amount
    sale {
      id
      client_fullName
      client_phone_number
      client_DNI
      user {
        id
        firstName
        lastName
        phone_number
        createdAt
      }
      ticket {
        id
        number
        state
      }
      createdAt
    }
  }
}
    `;
export type DeleteAwardMutationFn = Apollo.MutationFunction<DeleteAwardMutation, DeleteAwardMutationVariables>;
export type DeleteAwardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteAwardMutation, DeleteAwardMutationVariables>, 'mutation'>;

    export const DeleteAwardComponent = (props: DeleteAwardComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteAwardMutation, DeleteAwardMutationVariables> mutation={DeleteAwardDocument} {...props} />
    );
    
export type DeleteAwardMutationResult = Apollo.MutationResult<DeleteAwardMutation>;
export type DeleteAwardMutationOptions = Apollo.BaseMutationOptions<DeleteAwardMutation, DeleteAwardMutationVariables>;
export const EditInformartionDocument = gql`
    mutation editInformartion($data: editInformartionInput) {
  editInformartion(data: $data) {
    User {
      firstName
      lastName
      phone_number
    }
    errors {
      path
      message
    }
  }
}
    `;
export type EditInformartionMutationFn = Apollo.MutationFunction<EditInformartionMutation, EditInformartionMutationVariables>;
export type EditInformartionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditInformartionMutation, EditInformartionMutationVariables>, 'mutation'>;

    export const EditInformartionComponent = (props: EditInformartionComponentProps) => (
      <ApolloReactComponents.Mutation<EditInformartionMutation, EditInformartionMutationVariables> mutation={EditInformartionDocument} {...props} />
    );
    
export type EditInformartionMutationResult = Apollo.MutationResult<EditInformartionMutation>;
export type EditInformartionMutationOptions = Apollo.BaseMutationOptions<EditInformartionMutation, EditInformartionMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($newPassword: String!, $oldPassword: String!) {
  changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
    User {
      email
    }
    errors {
      path
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export type ChangePasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangePasswordMutation, ChangePasswordMutationVariables>, 'mutation'>;

    export const ChangePasswordComponent = (props: ChangePasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> mutation={ChangePasswordDocument} {...props} />
    );
    
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation changeEmail($newEmail: String!, $password: String!) {
  changeEmail(newEmail: $newEmail, password: $password) {
    User {
      email
    }
    errors {
      path
      message
    }
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;
export type ChangeEmailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangeEmailMutation, ChangeEmailMutationVariables>, 'mutation'>;

    export const ChangeEmailComponent = (props: ChangeEmailComponentProps) => (
      <ApolloReactComponents.Mutation<ChangeEmailMutation, ChangeEmailMutationVariables> mutation={ChangeEmailDocument} {...props} />
    );
    
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeSystemRoleDocument = gql`
    mutation changeSystemRole($id: String!, $role: String!) {
  changeSystemRole(id: $id, role: $role) {
    User {
      firstName
      lastName
      role
    }
    errors {
      path
      message
    }
  }
}
    `;
export type ChangeSystemRoleMutationFn = Apollo.MutationFunction<ChangeSystemRoleMutation, ChangeSystemRoleMutationVariables>;
export type ChangeSystemRoleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangeSystemRoleMutation, ChangeSystemRoleMutationVariables>, 'mutation'>;

    export const ChangeSystemRoleComponent = (props: ChangeSystemRoleComponentProps) => (
      <ApolloReactComponents.Mutation<ChangeSystemRoleMutation, ChangeSystemRoleMutationVariables> mutation={ChangeSystemRoleDocument} {...props} />
    );
    
export type ChangeSystemRoleMutationResult = Apollo.MutationResult<ChangeSystemRoleMutation>;
export type ChangeSystemRoleMutationOptions = Apollo.BaseMutationOptions<ChangeSystemRoleMutation, ChangeSystemRoleMutationVariables>;
export const BoletosDocument = gql`
    query boletos($filter: String) {
  boletos(filter: $filter) {
    id
    number
    state
  }
}
    `;
export type BoletosComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<BoletosQuery, BoletosQueryVariables>, 'query'>;

    export const BoletosComponent = (props: BoletosComponentProps) => (
      <ApolloReactComponents.Query<BoletosQuery, BoletosQueryVariables> query={BoletosDocument} {...props} />
    );
    
export type BoletosQueryResult = Apollo.QueryResult<BoletosQuery, BoletosQueryVariables>;
export const SaleDocument = gql`
    query sale($id: String) {
  sale(id: $id) {
    id
    client_fullName
    client_phone_number
    client_DNI
    user {
      id
      firstName
      lastName
      phone_number
      createdAt
    }
    ticket {
      id
      number
      state
    }
    createdAt
  }
}
    `;
export type SaleComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SaleQuery, SaleQueryVariables>, 'query'>;

    export const SaleComponent = (props: SaleComponentProps) => (
      <ApolloReactComponents.Query<SaleQuery, SaleQueryVariables> query={SaleDocument} {...props} />
    );
    
export type SaleQueryResult = Apollo.QueryResult<SaleQuery, SaleQueryVariables>;
export const GetAwardByIdDocument = gql`
    query getAwardById($id: String) {
  getAwardById(id: $id) {
    id
    client_fullName
    client_phone_number
    client_DNI
    user {
      id
      firstName
      lastName
      phone_number
      createdAt
    }
    award {
      id
      place
      amount
      createdAt
    }
    ticket {
      id
      number
      state
    }
    createdAt
  }
}
    `;
export type GetAwardByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAwardByIdQuery, GetAwardByIdQueryVariables>, 'query'>;

    export const GetAwardByIdComponent = (props: GetAwardByIdComponentProps) => (
      <ApolloReactComponents.Query<GetAwardByIdQuery, GetAwardByIdQueryVariables> query={GetAwardByIdDocument} {...props} />
    );
    
export type GetAwardByIdQueryResult = Apollo.QueryResult<GetAwardByIdQuery, GetAwardByIdQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    firstName
    lastName
    phone_number
    email
    password
    tokenversion
    role
    permission
    createdAt
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  AllUsers {
    id
    firstName
    lastName
    phone_number
    email
    password
    tokenversion
    role
    permission
    createdAt
  }
}
    `;
export type AllUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllUsersQuery, AllUsersQueryVariables>, 'query'>;

    export const AllUsersComponent = (props: AllUsersComponentProps) => (
      <ApolloReactComponents.Query<AllUsersQuery, AllUsersQueryVariables> query={AllUsersDocument} {...props} />
    );
    
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;