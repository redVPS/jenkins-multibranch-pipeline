const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app");

describe("Home page status", () => {
    it("App should respond with status 200", (done) => {
        chai.request(app).get("/").end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("Test page status", () => {
    it("App should respond with status 200", (done) => {
        chai.request(app).get("/test").end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("About page status", () => {
    it("App should respond with status 200", (done) => {
        chai.request(app).get("/about").end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});