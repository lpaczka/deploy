const { graphql } = require("graphql");
const { schema } = require("../app");
const actions = require("../actions");
const setupTest = require("./helpers");

const mutationRegister = `
    mutation Register($data:UserCreateInput!){
        signup(data:$data){
            token
            message
        }
    }
`

describe("User signup works correctly",() => {

    beforeEach(async () => await setupTest());
    //afterEach

    it("Should create user correctly", async () => {
        const data = {
            first_name:"Test", 
            last_name:"test",
            email:"test@mail.com",
            password:"1q2w3e4r5t6y",
            profile_image:"http://res.cloudinary.com/ddcfttl14/image/upload/v1551230642/qxhuloek5ngbrg6pseuw.jpg"
        };

        const res = await graphql(schema, mutationRegister, null, {}, {data})

        expect(res.data.signup).toHaveProperty("token")
    })

    it("Should not create user", async () => {
        const data = {
            first_name:"Test", 
            last_name:"test",
            email:"test@mail.com",
            password:"1q2w3e4r5t6y",
            profile_image:"http://res.cloudinary.com/ddcfttl14/image/upload/v1551230642/qxhuloek5ngbrg6pseuw.jpg"
        };

        await actions.createUser(data);

        const res = await graphql(schema, mutationRegister, null, {}, {data})

        expect(res).toHaveProperty("errors")
    })

})

const mutationLogin = `
    mutation LogUser($email:String!, $password:String!){
        login(email:$email, password:$password){
            token
        }
    }
`

describe("User Login should work correctly", () =>  {

    beforeEach(async () => await setupTest());

    it("Should login correctly", async () => {
        const data = {
            first_name:"Test", 
            last_name:"test",
            email:"test@mail.com",
            password:"1q2w3e4r5t6y",
            profile_image:"http://res.cloudinary.com/ddcfttl14/image/upload/v1551230642/qxhuloek5ngbrg6pseuw.jpg"
        };

        await actions.createUser(data);

        const res = await graphql(schema, mutationLogin, null, {}, 
            {
                email:data.email,
                password: data.password
            })

        expect(res.data.login).toHaveProperty("token");
    })

    it("Should not login correctly", async () => {
        const data = {
            first_name:"Test", 
            last_name:"test",
            email:"test@mail.com",
            password:"1q2w3e4r5t6y",
            profile_image:"http://res.cloudinary.com/ddcfttl14/image/upload/v1551230642/qxhuloek5ngbrg6pseuw.jpg"
        };

        await actions.createUser(data);

        const res = await graphql(schema, mutationLogin, null, {}, 
            {
                email:data.email,
                password: "este_no_es_el_password"
            })

        expect(res).toHaveProperty("errors");
    })
})