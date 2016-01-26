/**
 * External dependencies
 */
var React = require( 'react' );

module.exports = React.createClass( {
	displayName: 'WpcomPlanPrice',

	render: function() {
		return (
			<div className={ this.props.hasDiscount ? "plan-price plan-price__discount" : "plan-price" }>
				<span>{ this.props.getPrice() }</span>
				<small className="plan-price__billing-period">
					{ this.props.periodLabel }
				</small>
			</div>
		);
	}
} );
