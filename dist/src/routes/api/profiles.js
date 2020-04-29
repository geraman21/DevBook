"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Profile_1 = __importDefault(require("../../models/Profile"));
const request_1 = __importDefault(require("request"));
const config_1 = __importDefault(require("config"));
const User_1 = __importDefault(require("../../models/User"));
const express_validator_1 = require("express-validator");
exports.profiles_router = express_1.Router();
// @route   GET api/profiles/me
// @desc    Get current user profile
// @access  Private
exports.profiles_router.get('/me', auth_1.default, async (req, res) => {
    try {
        const profile = await Profile_1.default.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar',
        ]);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(300).send('server error');
    }
});
// @route   POST api/profiles
// @desc    Create or update user profile
// @access  Private
exports.profiles_router.post('/', auth_1.default, [
    express_validator_1.check('status', 'Status is required').not().isEmpty(),
    express_validator_1.check('skills', 'Skills is required').not().isEmpty(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, } = req.body;
    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company)
        profileFields.company = company;
    if (website)
        profileFields.website = website;
    if (location)
        profileFields.location = location;
    if (bio)
        profileFields.bio = bio;
    if (status)
        profileFields.status = status;
    if (githubusername)
        profileFields.githubusername = githubusername;
    if (website)
        profileFields.website = website;
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    profileFields.social = {};
    if (youtube)
        profileFields.social.youtube = youtube;
    if (twitter)
        profileFields.social.twitter = twitter;
    if (facebook)
        profileFields.social.facebook = facebook;
    if (linkedin)
        profileFields.social.linkedin = linkedin;
    if (instagram)
        profileFields.social.instagram = instagram;
    try {
        //Update profile if found
        let profile = await Profile_1.default.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        //Create new Profile if not found
        profile = new Profile_1.default(profileFields);
        await profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// @route   GET api/profiles
// @desc    Get all user profiles
// @access  Public
exports.profiles_router.get('/', async (req, res) => {
    try {
        const profiles = await Profile_1.default.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// @route   GET api/profiles/user/:user_id
// @desc    Get profile with a user id
// @access  Public
exports.profiles_router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile_1.default.findOne({ user: req.params.user_id }).populate('user', [
            'name',
            'avatar',
        ]);
        if (!profile)
            return res.status(400).json({ mesg: 'there is not profile for this user' });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        if (error.name == 'CastError') {
            return res.status(400).json({ msg: 'there is not profile for this user' });
        }
        res.status(500).send('Server error');
    }
});
// @route   DELETE api/profiles
// @desc    Get all user profiles
// @access  Public
exports.profiles_router.delete('/', auth_1.default, async (req, res) => {
    try {
        // @todo - remove user posts
        // Remove profile
        await Profile_1.default.findOneAndRemove({ user: req.user.id });
        //Remove the user
        await User_1.default.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'user removed' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// @route   PUT api/profiles/experience
// @desc    Add profile experience
// @access  Private
exports.profiles_router.put('/experience', auth_1.default, [
    express_validator_1.check('title', 'Title is required').not().isEmpty(),
    express_validator_1.check('company', 'Company is required').not().isEmpty(),
    express_validator_1.check('from', 'From date is required').not().isEmpty(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };
    try {
        const profile = await Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $addToSet: { experience: newExp } }, { new: true });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   DELETE api/profiles/experience/:exp_id
// @desc    Delete Experience
// @access  Private
exports.profiles_router.delete('/experience/:exp_id', auth_1.default, async (req, res) => {
    const exp_id = req.params.exp_id;
    try {
        const profile = await Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $pull: { experience: { _id: exp_id } } }, { new: true });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Errpr');
    }
});
// @route   PUT api/profiles/education
// @desc    Add profile education
// @access  Private
exports.profiles_router.put('/education', auth_1.default, [
    express_validator_1.check('school', 'School is required').not().isEmpty(),
    express_validator_1.check('degree', 'Degree is required').not().isEmpty(),
    express_validator_1.check('fieldofstudy', 'Field Of Study is required').not().isEmpty(),
    express_validator_1.check('from', 'From date is required').not().isEmpty(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };
    try {
        const profile = await Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $addToSet: { education: newEdu } }, { new: true });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   DELETE api/profiles/education/:edu_id
// @desc    Delete Education
// @access  Private
exports.profiles_router.delete('/education/:edu_id', auth_1.default, async (req, res) => {
    const edu_id = req.params.edu_id;
    try {
        const profile = await Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $pull: { education: { _id: edu_id } } }, { new: true });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Errpr');
    }
});
// @route   GET api/profiles/github/:username
// @desc    Get user repos from github
// @access  Public
exports.profiles_router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config_1.default.get('githubClientId')}&client_secret=${config_1.default.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };
        request_1.default(options, (error, response, body) => {
            if (error)
                console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'no GitHub Profile found' });
            }
            res.json(JSON.parse(body));
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
