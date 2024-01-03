import { NextFunction, Request, Response } from 'express';
import { deleteUser, findUsers, getUser, updateUser } from '../services/user.service';
import { StatusCode } from '../enums/status-code.enum';
import { UpdateUserInput } from '../schemas/user.schema';
import { MongoErrorCodes } from '../constants/error-codes';

export const getMeHandler = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const updateMeHandler = async (
    req: Request<{}, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await updateUser(res.locals.user._id, req.body);

        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
            err.message = 'Username already exists';
        }
        next(err);
    }
};

export const deleteMeHandler = async (
    _req: Request<void>,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteUser(res.locals.user._id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

export const getUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getUser(req.params.id);

        res.status(StatusCode.OK).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const getAllUsersHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await findUsers({});

        res.status(StatusCode.OK).json(users);
    } catch (err: any) {
        next(err);
    }
};

export const deleteUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteUser(req.params.id);

        res.status(StatusCode.NO_CONTENT).json();
    } catch (err: any) {
        next(err);
    }
};

