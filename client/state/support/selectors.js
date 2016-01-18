/**
 * @param  {Object} state Global state tree
 * @return {string}       The current support user username
 */
export function supportUser( state ) {
	return state.support.supportUser;
}

/**
 * @param  {Object} state Global state tree
 * @return {string}       The current support token
 */
export function supportToken( state ) {
	return state.support.supportToken;
}
