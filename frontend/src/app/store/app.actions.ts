import { createAction, props } from '@ngrx/store';
import { LoginRequest, RegisterRequest } from '../models/requests.model';
import { Message } from 'primeng/api';

export namespace AuthActions {

    const namespace: string = '[Authentication]';

    //#region Login

    export const login = createAction(
        `${namespace} Login`,
        props<LoginRequest>()
    );

    export const loginSuccess = createAction(
        `${namespace} Login Success`
    );

    export const loginFailure = createAction(
        `${namespace} Login Failure`
    );

    //#endregion

    //#region Register

    export const register = createAction(
        `${namespace} Register`,
        props<RegisterRequest>()
    );

    export const registerSuccess = createAction(
        `${namespace} Register Success`
    );

    export const registerFailure = createAction(
        `${namespace} Register Failure`
    );

    //#endregion

    //#region Logout

    export const logout = createAction(
        `${namespace} Logout`
    );

    export const logoutSuccess = createAction(
        `${namespace} Logout Success`
    );

    export const logoutFailure = createAction(
        `${namespace} Logout Failure`
    );

    //#endregion
}

export namespace MessageActions {

    const namespace: string = '[Message]';

    export const set = createAction(
        `${namespace} Set Message`,
        props<Message>()
    );

    export const clear = createAction(
        `${namespace} Clear Message`
    );
}

export const resetState = createAction(
    '[App] Reset State'
);