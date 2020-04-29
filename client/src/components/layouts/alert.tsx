import React from 'react';
import PropTypes from 'prop-types';
import { RootState } from '../../reducers/index';
import { connect, ConnectedProps } from 'react-redux';

type AlertProps = ConnectedProps<typeof connector>;

const alert: React.SFC<AlertProps> = ({ alerts }) => {
	if (alerts === null || alerts.length === 0) return null;
	else {
		return (
			<div className="alertContainer">
				{' '}
				{alerts.map((alert) => (
					<div key={alert.id} className={`alert alert-${alert.type}`}>
						{alert.message}
					</div>
				))}{' '}
			</div>
		) as any;
	}
};

alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: RootState) => ({
	alerts: state.alert,
});

const connector = connect(mapStateToProps);

export default connector(alert);
