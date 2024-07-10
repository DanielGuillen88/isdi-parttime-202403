import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'

import getAllPosts from './getAllPosts'
import createPost from './createPost'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserUsername,
    logoutUser,

    getAllPosts,
    createPost,
    deletePost,
    toggleLikePost
}

export default logic