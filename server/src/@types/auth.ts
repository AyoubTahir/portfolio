import type { User as PUser } from '@prisma/client'

export type IUser =  {
    id: string|number
    tokenVersion: bigint|null
}

export enum Cookies {
    AccessToken = 'access',
    RefreshToken = 'refresh',
}


export interface AccessTokenPayload {
    userId: string|number
}

export interface AccessToken extends AccessTokenPayload {
    exp: number
}

export interface RefreshTokenPayload {
    userId: string|number
    version: bigint|null
}

export interface RefreshToken extends RefreshTokenPayload {
    exp: number
}