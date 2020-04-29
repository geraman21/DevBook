"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const post_1 = require("../../actions/post");
const react_redux_1 = require("react-redux");
const PostForm = ({ addPost }) => {
    const [text, setText] = react_1.useState('');
    return (<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form className="form my-1" onSubmit={(e) => {
        e.preventDefault();
        addPost({ text });
        setText('');
    }}>
				<textarea name="text" cols={30} rows={5} placeholder="Create a post" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit"/>
			</form>
		</div>);
};
const connector = react_redux_1.connect(null, { addPost: post_1.addPost });
exports.default = connector(PostForm);
