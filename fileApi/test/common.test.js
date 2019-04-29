let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Test my api in mocha',() => {
    it('Should return status 200', (done) => {
        chai
            .request('http://localhost:6500')
            .get('/')
            .then((res)=> {
                expect(res).to.have.status(200)
                done();
            })
            .catch((err)=>{
                throw (err)
            })
    })
    it('Should return status 200 for movies', (done) => {
        chai
            .request('http://localhost:6500')
            .get('/movies')
            .then((res)=> {
                expect(res).to.have.status(200)
                done();
            })
            .catch((err)=>{
                throw (err)
            })
    })
    it('Should return status 201 for movie', (done) => {
        chai
            .request('http://localhost:6500')
            .get('/movie')
            .then((res)=> {
                expect(res).to.have.status(404)
                done();
            })
            .catch((err)=>{
                throw (err)
            })
    })
})