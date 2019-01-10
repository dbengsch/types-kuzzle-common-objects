// Type definitions for kuzzle-common-anys v2.2.0
// Project: https://github.com/kuzzleio/kuzzle-common-objects
// Definitions by: David <https://github.com/dbengsch>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface KuzzleUser {
    _id: string
    profileIds: string[]
}

interface KuzzleSerializedRequest {
    data: {
        timestamp: number
        requestId: string
        jwt: string
        metadata: any
        body: any
        controller: string
        action: string
        index: string
        collection: string
        _id: string
    }

    options: {
        connectionId: string
        protocol: string
        result: any
        error: KuzzleError
        status: number
    }
}

interface KuzzleResponse {
    status: number
    error: KuzzleError
    requestId: string
    controller: string
    action: string
    collection: string
    index: string
    metadata: any
    headers: any
    result: any

    getHeader(name: string): string
    removeHeader(name: string): void
    setHeader(name:string, value: string): void
    setheaders(headers: any): void
}

interface KuzzleToken {
    _id: string
    expiresAt: number
    ttl: number
    userId: string
    connectionId: string
}

export interface KuzzleError {
    name: string
    message: string
    stack: string
    status: number

    toJSON(): {
        message:string
        status: number
    }
}

export interface PartialError extends KuzzleError {
    errors: any[]
    count: number

    toJSON(): {
        message:string
        status: number
        errors: any[]
        count: number
    }
}

export interface BadRequestError extends KuzzleError {}
export interface ExternalServiceError extends KuzzleError {}
export interface ForbiddenError extends KuzzleError {}
export interface GatewayTimeoutError extends KuzzleError {}
export interface InternalError extends KuzzleError {}
export interface NotFoundError extends KuzzleError {}
export interface ParseError extends KuzzleError {}
export interface PluginImplementationError extends KuzzleError {}
export interface ServiceUnavailableError extends KuzzleError {}
export interface SizeLimitError extends KuzzleError {}
export interface UnauthorizedError extends KuzzleError {}
export interface PreconditionError extends KuzzleError {}

export interface KuzzleErrors {
    BadRequestError: {
        new (message: any|string, status?: number): BadRequestError
    }
    ExternalServiceError: {
        new (message: any|string, status?: number): ExternalServiceError
    }
    ForbiddenError: {
        new (message: any|string, status?: number): ForbiddenError
    }
    GatewayTimeoutError: {
        new (message: any|string, status?: number): GatewayTimeoutError
    }
    InternalError: {
        new (message: any|string, status?: number): InternalError
    }
    KuzzleError: {
        new (message: any|string, status?: number): KuzzleError
    }
    NotFoundError: {
        new (message: any|string, status?: number): NotFoundError
    }
    ParseError: {
        new (message: any|string, status?: number): ParseError
    }
    PartialError: {
        new (message: any|string, status?: number): PartialError
    }
    PluginImplementationError: {
        new (message: any|string, status?: number): PluginImplementationError
    }
    ServiceUnavailableError: {
        new (message: any|string, status?: number): ServiceUnavailableError
    }
    SizeLimitError: {
        new (message: any|string, status?: number): SizeLimitError
    }
    UnauthorizedError: {
        new (message: any|string, status?: number): UnauthorizedError
    }
    PreconditionError: {
        new (message: any|string, status?: number): PreconditionError
    }
}

interface KuzzleInputResource {
    _id: string,
    index: string,
    collection: string
}

export interface KuzzleRequestContext {
    connectionId: string
    protocol: string
    token: KuzzleToken
    user: KuzzleUser

    toJSON(): {
        connectionId: string
        protocol: string
        token: KuzzleToken
        user: KuzzleUser
    }
}

export interface KuzzleRequestInput {
    action: string
    body: any
    controller: string
    jwt: string
    metadata: any
    args: any
    headers: any
    resource: KuzzleInputResource
}

interface KuzzleModels {
    RequestInput: {
        new(data: any): KuzzleRequestInput
    }
    RequestContext: {
        new(_options?: any): KuzzleRequestContext
    }
}

export interface KuzzleRequest {
    id: string
    timestamp: number
    status: number
    origin: KuzzleRequest
    previous: KuzzleRequest
    input: KuzzleRequestInput
    context: KuzzleRequestContext
    error: KuzzleError
    result: any|null
    response: KuzzleResponse

    hasTriggered(event: string): boolean
    triggers(event: string): void
    setError(error: KuzzleError): void
    setResult(result: any, options?: any): void
    serialize(): KuzzleSerializedRequest
}

export interface KuzzleCommonObjects {
    Request: {
        new(data: any, options?: any): KuzzleRequest
    }
    models: KuzzleModels
    errors: KuzzleErrors
}
