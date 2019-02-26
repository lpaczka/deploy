const Post = require("../models/Posts")

const createPost = (data) => {
    return Post.create(data);
}

const getAllPost = () => {
    return Post.find({is_active:true}).populate("author");
}

const getPostsByTag = () => {
    return Post.find({tags:{$in:tag}, is_active:true}).populate("author");
}

const getPostsByCategory = () => {
    return Post.find({category:category, is_active:true}).populate("author");
}

const updatePostbyId = (id, data) => {
    return Post.findByIdAndUpdate(id,{$set: data}, {new:true})
}

module.exports = {
    createPost,
    getAllPost,
    getPostsByCategory,
    getPostsByTag,
    updatePostbyId
}