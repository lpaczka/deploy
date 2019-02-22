const actions = require("../actions")

const prueba = (_, args, context, info) => {
    return "Hello world GraphQL"
}

const Users = (_, args, context, info) => {
    return actions.getAllUsers()
        .then(users => users)
        .catch(e => e)
}

const Posts = async (_, args, context, info) => {
    const posts = args.tag ? await actions.getPostsByTag(args.tag)
                    : args.category ? await actions.getPostsByCategory(args.category)
                        :   await actions.getAllPost();
    return posts
}

module.exports = {
    prueba,
    Users,
    Posts
}