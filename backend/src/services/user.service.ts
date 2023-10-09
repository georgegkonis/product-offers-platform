import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../config/redis.config';
import { DocumentType } from '@typegoose/typegoose';
import { SignOptions } from 'jsonwebtoken';

export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludedFields);
};

export const updateUser = async (id: string, input: Partial<User>) => {
    const user = await userModel.findByIdAndUpdate(id, input, { new: true });
    if (!user) throw new Error('User not found');
    return omit(user.toJSON(), excludedFields);
};

export const deleteUser = async (id: string) => {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return omit(user.toJSON(), excludedFields);
};

export const findUserById = async (id: string) => {
    const user = await userModel.findById(id).lean();
    return omit(user, excludedFields);
};

export const findAllUsers = async () => {
    return userModel.find();
};

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return userModel.findOne(query, {}, options).select('+password');
};

export const signToken = async (user: DocumentType<User>) => {
    let payload: Object = { sub: user._id };
    let options: SignOptions = { expiresIn: `${config.get<number>('accessTokenExpiresIn')}m` };

    const accessToken: string = signJwt(payload, options);

    // Convert the ObjectId to a string
    redisClient.set(user._id.toString(), JSON.stringify(user), { EX: 60 * 60 }).then();

    // Return access token
    return { accessToken };
};


