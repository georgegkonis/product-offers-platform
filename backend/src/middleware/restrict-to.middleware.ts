import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/app-error';
import { StatusCode } from '../enums/status-code.enum';
import { Role } from '../enums/role.enum';

export const restrictTo = (...allowedRoles: Role[]) => (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
        return next(
            new AppError('You are not allowed to perform this action', StatusCode.FORBIDDEN)
        );
    }

    next();
};

