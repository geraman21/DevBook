"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const post_1 = require("../../actions/post");
const spinner_1 = __importDefault(require("../layouts/spinner"));
const PostItem_1 = __importDefault(require("./PostItem"));
const PostForm_1 = __importDefault(require("./PostForm"));
const Posts = ({ auth, getPosts, post: { posts, loading } }) => {
    react_1.useEffect(() => {
        getPosts();
    }, [getPosts]);
    return loading || auth.user === null ? (<spinner_1.default />) : (<react_1.Fragment>
			<div className="container">
				<h1 className="large primary">Posts</h1>
				<p className="lead">
					<i className="fas fa-user"></i> Welcome to the Community
				</p>
				<PostForm_1.default />
				{posts.map((post) => (<PostItem_1.default key={post._id} post={post}/>))}
			</div>
		</react_1.Fragment>);
};
const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth,
});
const connector = react_redux_1.connect(mapStateToProps, { getPosts: post_1.getPosts });
exports.default = connector(Posts);
