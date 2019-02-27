const actions = require("../actions");
const { getUserId } = require("../utils");
const { storeUpload } = require("../utils");

const signup = async (_, args, context, info) => {
    const { createReadStream } = await args.data.profile_image;
    const stream = createReadStream();
    const { url } = await storeUpload(stream);
    args.data.profile_image = url;

    return actions.signup(args.data).then(
        token => { return {"message":"User created successfully", token: token}; }
    ).catch(e => e);
};

const login = (_, args, context, info) => {
    return actions.login(args).then(
        token => { return {"message":"User logged successfully", token: token}; }

    ).catch(e => e);
}

const createPost = async (_,args,context,info) => {
    const user = await getUserId(context);
    args.data.author = user._id;
    if(!user) throw new Error("User does not exist");
    return actions.createPost(args.data).then((post)=>{
        return actions.addPostToUser(user._id, post._id).then((user)=>{
            return post
        }).catch(e => e);
    }).catch(e => e);
}

const deleteUser = (_, args, context, info) => {
    return actions.deleteUserById(args.id).then((user)=>{
        if(!user) throw new Error("User does not exist");
        return user
    }).catch(e => e)
}

const updateUser = (_, args, context, info) => {
    return actions.updateUserById(args.id, args.data).then((user)=>{
        if(!user) throw new Error("User does not exist");
        return user
    }).catch( e => e);
}

//const updatePost = ()

module.exports = {
    signup,
    login,
    createPost, 
    deleteUser,
    updateUser
}