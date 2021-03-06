/**
 * External dependencies
 */
import { fromJS } from 'immutable';
import pluck from 'lodash/collection/pluck';
import unique from 'lodash/array/unique';

/**
 * Internal dependencies
 */
import ActionTypes from '../action-types';
import { PER_PAGE } from './constants';

const defaultQuery = fromJS( {
	search: '',
	perPage: PER_PAGE,
	page: 0
} );

const defaultQueryState = fromJS( {
	isLastPage: false,
	isFetchingNextPage: false
} );

const initialState = query( fromJS( {
	list: [],
	nextId: 0,
	query: {},
	queryState: {},
	active: 0
} ) );

/**
 * Helpers
 */

function add( ids, list ) {
	return unique( list.concat( ids ) );
}

function query( state, params = {} ) {
	const nextId = state.get( 'nextId' );

	return state
		.set( 'list', [] )
		.set( 'query', defaultQuery.merge( params ) )
		.setIn( [ 'query', 'id' ], nextId )
		.set( 'queryState', defaultQueryState )
		.update( 'nextId', id => id + 1 );
}

function isActionForLastPage( list, action ) {
	return ! action.found ||
		list.length === action.found ||
		action.themes.length === 0;
}

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case ActionTypes.QUERY_THEMES:
			return query( state, action.params );

		case ActionTypes.RECEIVE_THEMES:
			if (
				( action.queryParams.id === state.getIn( [ 'query', 'id' ] ) ) ||
				action.wasJetpack
			) {
				const newState = state
						.setIn( [ 'queryState', 'isFetchingNextPage' ], false )
						.update( 'list', add.bind( null, pluck( action.themes, 'id' ) ) );

				return newState.setIn( [ 'queryState', 'isLastPage' ],
						isActionForLastPage( newState.get( 'list' ), action ) );
			}
			return state;

		case ActionTypes.INCREMENT_THEMES_PAGE:
			return state
				.setIn( [ 'queryState', 'isFetchingNextPage' ], true )
				.updateIn( [ 'query', 'page' ], page => page + 1 )

		case ActionTypes.RECEIVE_THEMES_SERVER_ERROR:
			return state
				.setIn( [ 'queryState', 'isFetchingNextPage' ], false )
				.setIn( [ 'queryState', 'lastPage' ], true );

		case ActionTypes.ACTIVATED_THEME:
			// The `active` attribute isn't ever really read, but since
			// `createReducerStore()` only emits a `change` event when the new
			// state is different from the old one, we need something to change
			// here.
			return state.set( 'active', action.theme.id );
	}

	return state;
};
