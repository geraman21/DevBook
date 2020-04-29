"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_moment_1 = __importDefault(require("react-moment"));
const react_router_dom_1 = require("react-router-dom");
const post_1 = require("../../actions/post");
const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date }, auth, addLike, removeLike, deletePost, }) => {
    var _a;
    return (<div className="post bg-white p-1 my-1">
			<div>
				<react_router_dom_1.Link to={`/profiles/user/${user}`}>
					<img className="round-img" src={avatar} alt=""/>
					<h4>{name}</h4>
				</react_router_dom_1.Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <react_moment_1.default format="YYYY/MM/DD">{date}</react_moment_1.default>
				</p>
				<button type="button" className="btn btn-light" onClick={() => addLike(_id)}>
					<i className="fas fa-thumbs-up"></i>{' '}
					{likes && likes.length > 0 && <span>{likes === null || likes === void 0 ? void 0 : likes.length}</span>}
				</button>
				<button type="button" className="btn btn-light" onClick={() => removeLike(_id)}>
					<i className="fas fa-thumbs-down"></i>
				</button>

				<react_router_dom_1.Link to={`/posts/${_id}`} className="btn btn-primary">
					Discussion{' '}
					{comments && comments.length > 0 && (<span className="comment-count">{comments.length}</span>)}
				</react_router_dom_1.Link>

				{!auth.loading && user === ((_a = auth.user) === null || _a === void 0 ? void 0 : _a._id) && (<button type="button" className="btn btn-danger" onClick={() => deletePost(_id)}>
						<i className="fas fa-times"></i>
					</button>)}
			</div>
		</div>);
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps, { addLike: post_1.addLike, removeLike: post_1.removeLike, deletePost: post_1.deletePost });
exports.default = connector(PostItem);
