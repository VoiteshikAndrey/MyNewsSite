const assert = require('chai').assert;

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect

chai.use(chaiHttp);
let should = chai.should();

const server = require('../index.js')


function DeletePost_test(postId) {
    it("It should delete post", (done) => {
        chai.request(server)
            .post("/api/admin/delete")
            .send(postId)
            .end((err,res) => {
                res.should.have.status(201)
                done();
            })
    })
}

function EditPost_test(title, image, text, shortDescription, postId) {
    it("It should edit post", (done) => {
        chai.request(server)
            .post("/api/admin/edit")
            .send({title, image, text, shortDescription, postId})
            .end((err,res) => {
                res.should.have.status(201)
                done();
            })
    })
}
function CreatePost_Test(title, image, text, shortDescription) {
    it("It should create new post", (done) => {
        chai.request(server)
            .post("/api/admin/post")
            .send({title, image, text, shortDescription})
            .end((err,res) => {
                res.should.have.status(201)
                done();
            })
    })
}
function GetAllPosts_Test(){
        it("It should get all posts", (done)=>{
            chai.request(server)
                .get("/api/post")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            })
        })
}
function UpdateUsername_Test(userId, newUsername){
        it("It should update username", (done)=>{
            chai.request(server)
                .post("/api/profile/updateUsername")
                .send({userId, newUsername})
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
            })
        })
}
function UpdatePassword_Test(userId, oldPassword, password, confirmPassword){
        it("It should update password", (done)=>{
            chai.request(server)
            // newPassword = {oldPassword, password, confirmPassword}
                .post("/api/profile/updatePassword")
                .send({userId, oldPassword, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
            })
        })
}
function PostComment_Test(postId, userName, userAvatar, text){
    it("It should post new comment", (done)=>{
        chai.request(server)
            .post("/api/post/comment")
            .send({postId, userName, userAvatar, text})
            .end((err, res) => {
                res.should.have.status(201);
                done();
        })
    })
}
function LoginTest_Success(login, password){
        it("It should get status 200", (done)=>{
            chai.request(server)
                .post("/api/auth/login")
                .send({login, password})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            })
        })
}
function LoginTest_LoginNotExist_Error(login, password){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/login")
                .send({login, password})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function LoginTest_WrongPassword_Error(login, password){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/login")
                .send({login, password})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function RegisterTest_Success(login, password, confirmPassword){
        it("It should get status 202", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(202);
                    done();
            })
        })
}
function RegisterTest_LoginExist_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function RegisterTest_LoginToShort_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function RegisterTest_LoginContaintForbiddenSymbols_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    // res.body.should.have.property({message:"Login can contain only Latin letters and numbers"})
                    done();
            })
        })
}
function RegisterTest_PasswordContaintForbiddenSymbols_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    // res.body.should.have.property({message:"Login can contain only Latin letters and numbers"})
                    done();
            })
        })
}
function RegisterTest_PasswordsDontMatch_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function RegisterTest_PasswordToShort_Error(login, password, confirmPassword){
        it("It should get status 400", (done)=>{
            chai.request(server)
                .post("/api/auth/register")
                .send({login, password, confirmPassword})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            })
        })
}
function AdminRoutes_Test() {
    describe('It should test some functionality of API  service with /admin rote', () => {
        // GetAllPosts_Test();
        CreatePost_Test("TestPostTestPost", "2021-12-18T140637.922Zhyuuga-1601841284267-7364.jpg", "TestPostTestPostTestPost", "TestPostTestPost");
        DeletePost_test("61bdeaee9e1f04699e5e0903");
        EditPost_test("TestPostTestPost", "2021-12-18T140637.922Zhyuuga-1601841284267-7364.jpg", "TestPostTestPost", "TestPostTestPost","61bdeaee9e1f04699e5e0903");
    })
}
function PostRoutes_Test() {
    describe('It should test some functionality of API  service with /post rote', () => {
        GetAllPosts_Test();
        PostComment_Test("61abc3ea739feaf2a8696cfe", "DimaVoiteshik", "uBFE0r1BgyI.jpg","TestComment");
    })
}
function AuthRoutes_Test() {
    describe('It should test authentication functionality of API service with incorrect and correct data', () => {
        LoginTest_Success("AndreasV", "123123123");
        RegisterTest_Success("TestLogin621","123123123","123123123");

        context('With incorrect data', () => {
            LoginTest_LoginNotExist_Error("RandomLogin", "randompassword");
            LoginTest_WrongPassword_Error("DimaVoiteshik", "321321321");
            RegisterTest_LoginExist_Error("AndreasV","123123123","123123123");
            RegisterTest_LoginToShort_Error("Short","123123123","123123123");
            RegisterTest_LoginContaintForbiddenSymbols_Error("!!!@#231", "123123123","123123123");
            RegisterTest_PasswordContaintForbiddenSymbols_Error("TestLogin7", "123!@##2132", "123!@##2132");
            RegisterTest_PasswordsDontMatch_Error("TestLogin7", "123123123", "321321321");
            RegisterTest_PasswordToShort_Error("TestLogin7", "123", "123");
        })
    })
}
function ProfileRoutes_Test() {
    describe('It should test some functionality of API service with /profile rote', () => {
        UpdateUsername_Test("61ba4e04d7e17c8258420768", "DimaVoiteshik");
        UpdatePassword_Test("61ba4dd7d7e17c8258420764", "123123123", "321321321", "321321321");
    })
}

AdminRoutes_Test();
AuthRoutes_Test();
ProfileRoutes_Test();
PostRoutes_Test();


// LoginTest_Success("AndreasV", "123123123");
// LoginTest_LoginNotExist_Error("RandomLogin", "randompassword");
// LoginTest_WrongPassword_Error("AndreasV", "321321321");

// RegisterTest_Success("TestLogin61","123123123","123123123");
// RegisterTest_LoginExist_Error("AndreasV","123123123","123123123");
// RegisterTest_LoginToShort_Error("Short","123123123","123123123");
// RegisterTest_LoginContaintForbiddenSymbols_Error("!!!@#231", "123123123","123123123");
// RegisterTest_PasswordContaintForbiddenSymbols_Error("TestLogin7", "123!@##2132", "123!@##2132");
// RegisterTest_PasswordsDontMatch_Error("TestLogin7", "123123123", "321321321");
// RegisterTest_PasswordToShort_Error("TestLogin7", "123", "123");


// GetAllPosts_Test();

// LoginTest('AndreasV','123123123');
// LoginTest('Hihihihi','123123123');
// LoginTest('TestLogin','testpassword');
// LoginTest('DimaVoiteshik','djqntibr');
// LoginTest('ElijahWood','123123123');

// RegisterTest('TestLogin1','testpassword','testpassword');
// RegisterTest('TestLogin2','testpassword','testpassword');
// RegisterTest('TestLogin3','testpassword','testpassword');
// RegisterTest('TestLogin4','testpassword','testpassword');
// RegisterTest('TestLogin5','testpassword','testpassword');













































































// describe('Password check function', function () {
//     it('Password contain unavailable characters', function () {
//         assert.equal(checkPassword('password!', 'password!'),'Password can contain only Latin letters and numbers')
//     });
//     it('Correct password', function () {
//         assert.equal(checkPassword('correctpassword', 'correctpassword'),'')
//     });
//     it('Password and confirmed password do not match', function () {
//         assert.equal(checkPassword('correctpassword', 'passwordcorrect'),'Password and confirmed password do not match')
//     });
//     it('Short password', function () {
//         assert.equal(checkPassword('short', 'short'),'Password length must be from 8 to 20 characters')
//     });
// });

// describe('CheckValidData function', function () {
//     it('Short login', function () {
//         assert.equal(checkValidData('Andres', '123123123', '123123123'),'Login length must be from 8 to 30 characters')
//     });
//     it('Correct data', function () {
//         assert.equal(checkValidData('AndreasV', '123123123', '123123123'),'')
//     });
//     it('Sh', function () {
//         assert.deepEqual(checkValidData('Andres.', '123', '321'),["Login can contain only Latin letters and numbers","Password and confirmed password do not match"])
//     });
// });











// describe('Register post request', function () {
//     it('Register user with correct data', function () {
//         chai.request(server)
//             .post('/api/auth/register')
//             .send({login:'AndreasV111114', password: '123123123', confirmPassword: '123123123'})
//             .end((err, res) => {
//                 expect(res).to.have.status(201)
//             })  
//     });
//     it('Password and confirmpassword do not match', function () {
//         chai.request(server)
//             .post('/api/auth/register')
//             .send({login:'AndreasV111111', password: '123123123', confirmPassword: 'qweqweqwe'})
//             .end((err, res) => {
//                 expect(res).to.have.status(400)
//             })  
//     });
// });

// describe('Login post request', function () {

//     it('Correct login and password', function () {
//         chai.request(server)
//             .post('/api/auth/login')
//             .send({login:'AndreasV', password: '123123123'})
//             .end((err, res) => {
//                 expect(res).to.have.status(200)
//             })  
//     });
//     it('Correct login and wrong password', function () {
//         chai.request(server)
//             .post('/api/auth/login')
//             .send({login:'AndreasV', password: '123'})
//             .end((err, res) => {
//                 expect(res).to.have.status(400)
//             })  
//     });
//     it('Wrong login', function () {
//         chai.request(server)
//             .post('/api/auth/login')
//             .send({login:'WrongLogin', password: '12312312'})
//             .end((err, res) => {
//                 expect(res).to.have.status(400)
//             })  
//     });
// });
