import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from '../../config';
import { AccessTokenPayload, IUser, RefreshTokenPayload } from '../../@types/auth';
import { Response } from 'express';

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, config.accessTokenSecret, {expiresIn: config.tokenExpiration.access})
}
  
export function signRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, config.refreshTokenSecret, {expiresIn: config.tokenExpiration.refresh})
}
  
export function verifyToken(token: string, secret: string) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

export function buildTokens(user: IUser) {
  const accessPayload: AccessTokenPayload = {userId: user.id}
  const refreshPayload: RefreshTokenPayload = {userId: user.id, version: user.tokenVersion}

  const accessToken = signAccessToken(accessPayload)
  const refreshToken = refreshPayload && signRefreshToken(refreshPayload)

  return {accessToken, refreshToken}
}

export function setTokensToCookie(res: Response, access: string, refresh?: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: config.isProduction ? 'strict' : 'lax' as any,
    domain: config.baseDomain,
    path: '/',
  }
  res.cookie('access', access, {...cookieOptions, maxAge: config.tokenExpiration.access * 1000})
  if (refresh) res.cookie('refresh', refresh, {...cookieOptions, maxAge: config.tokenExpiration.refresh * 1000})
}