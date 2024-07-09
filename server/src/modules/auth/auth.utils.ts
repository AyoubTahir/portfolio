import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from '../../config';

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);
    return hashedPassword;
};
  

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export function signJwt(payload: string | Buffer | object) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }
  
  export function verifyJwt(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
  
      return decoded;
    } catch (e) {
      return null;
    }
  }