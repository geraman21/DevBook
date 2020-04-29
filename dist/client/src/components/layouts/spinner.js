"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const spinner_svg_1 = __importDefault(require("../../img/spinner.svg"));
const react_2 = __importDefault(require("react"));
const Spinner = () => (<react_1.Fragment>
		<div className="container"><img src={spinner_svg_1.default} style={{ width: '200px', margin: 'auto', display: 'block' }} alt="Loading..."/></div>
	</react_1.Fragment>);
exports.default = Spinner;
