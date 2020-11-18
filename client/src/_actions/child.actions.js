import { childConstants } from "../_constants/child.constants";
import { childService } from "../_services/child.service";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers/history";

export const childActions = {
    register,
    getAll,
    delete: _delete
};

function register(child) {
    let devisechildObj = {
        "name": child.name,
        "birthdate": child.birthdate
    }
    
    return dispatch => {
        dispatch(request(child));

        childService.register(devisechildObj)
            .then(
                returnedchildObj => { 
                    console.log("Returned child Data from Devise:", returnedchildObj)
                    dispatch(success());
                    history.push("/");
                    dispatch(alertActions.success("Child registration successful"));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(child) { return { type: childConstants.REGISTER_REQUEST, child } }
    function success(child) { return { type: childConstants.REGISTER_SUCCESS, child } }
    function failure(error) { return { type: childConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        childService.getAll()
            .then(
                childs => dispatch(success(childs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: childConstants.GETALL_REQUEST } }
    function success(childs) { return { type: childConstants.GETALL_SUCCESS, childs } }
    function failure(error) { return { type: childConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        childService.delete(id)
            .then(
                child => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: childConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: childConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: childConstants.DELETE_FAILURE, id, error } }
}