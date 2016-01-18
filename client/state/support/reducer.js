/**
 * External dependencies
 */
import { combineReducers } from 'redux';

import {
	SUPPORT_USER_TOKEN_FETCH,
	SUPPORT_USER_TOKEN_SET,
	SUPPORT_USER_RESTORE,
} from 'state/action-types';

function supportUser( state = '', action ) {
	switch ( action.type ) {
		case SUPPORT_USER_TOKEN_SET:
			return action.supportUser;
		case SUPPORT_USER_RESTORE:
			return '';
	}
	return state;
}

function supportToken( state = '', action ) {
	switch ( action.type ) {
		case SUPPORT_USER_TOKEN_SET:
			return action.supportToken;
		case SUPPORT_USER_RESTORE:
			return '';
	}
	return state;
}

function isSupportUser( state = false, action ) {
	switch ( action.type ) {
		case SUPPORT_USER_TOKEN_SET:
			return !!( action.supportUser && action.supportToken );
		case SUPPORT_USER_RESTORE:
			return false;
	}
	return state;
}

function errorMessage( state = null, { type, error } ) {
	switch ( type ) {
		case SUPPORT_USER_TOKEN_SET:
			return null;
		case SUPPORT_USER_RESTORE:
			if ( error ) {
				return error;
			}
			return null;
	}

	return state;
}

/**
 * @return {Boolean} true if currently in transition between normal and support user
 */
function isTransitioning( state = false, { type } ) {
	switch ( type ) {
		case SUPPORT_USER_TOKEN_FETCH:
			return true;
		case SUPPORT_USER_TOKEN_SET:
		case SUPPORT_USER_RESTORE:
			return false;
	}

	return state;
}

export default combineReducers( {
	supportUser,
	supportToken,
	isSupportUser,
	errorMessage,
	isTransitioning
} );
