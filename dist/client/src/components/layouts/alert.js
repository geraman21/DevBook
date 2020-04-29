"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_redux_1 = require("react-redux");
const alert = ({ alerts }) => {
    if (alerts === null || alerts.length === 0)
        return null;
    else {
        return (<div className="alertContainer">
				{' '}
				{alerts.map((alert) => (<div key={alert.id} className={`alert alert-${alert.type}`}>
						{alert.message}
					</div>))}{' '}
			</div>);
    }
};
alert.propTypes = {
    alerts: prop_types_1.default.array.isRequired,
};
const mapStateToProps = (state) => ({
    alerts: state.alert,
});
const connector = react_redux_1.connect(mapStateToProps);
exports.default = connector(alert);
