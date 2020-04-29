import { Fragment } from 'react';
import spinner from '../../img/spinner.svg';
import React from 'react';

const Spinner: React.FC = () => (
	<Fragment>
		<div className="container"><img
			src={spinner}
			style={{ width: '200px', margin: 'auto', display: 'block' }}
			alt="Loading..."
		/></div>
	</Fragment>
);

export default Spinner;
