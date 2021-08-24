let chai = require('chai');  
let chaiHttp = require('chai-http');  
const { response } = require('../app');
let server = require('../app');


//Assertion Style
chai.should();
chai.use(chaiHttp);

//Assert 
var assert = chai.assert;

describe('Uri API',() => {

    /**
     * Test Uri POST 
     */
    describe('POST /createUri',() => {
        it("Should be get json file and retuen array with uri and alias ",(done)=>{
            const data = {
                AKNType:  "act" ,
                Type: "law",
                emissionDate: "2021-07-11",
                DocumentNumber: "123456",
                Language: "heb",
                ExpressionDate: ""
            };
            chai.request(server)
                .post("/createUri")
                .send(data)
                .end((err,response) => {
                    response.should.have.status(200);
                    console.log('response',response.body);
                    response.body.should.be.a('Object');
                    assert.equal(response.body.uri,'/akn/il/act/law/2021-07-11/123456/heb@');
                    assert.equal(response.body.alias,'/akn/il/act/‏חוק‎/‏ב-אב-התשפא‎/123456/heb@');
                    done()
                })
        });

        it("Should be get json file with error in the tpye and retuen Error in Type ",(done)=>{
            const data = {
                AKNType:  "act" ,
                Type: "",
                emissionDate: "2021-07-11",
                DocumentNumber: "123456",
                Language: "heb",
                ExpressionDate: ""
            };
            chai.request(server)
                .post("/createUri")
                .send(data)
                .end((err,response) => {
                    if (err) {
                        return err;
                    }
                    response.should.have.status(400);
                    assert.equal('Error in type',response.text);
                    done()
                })
        });
    });

    it("Should be get json file with error in the date and retuen Error in emissionDate ",(done)=>{
        const data = {
            AKNType:  "act" ,
            Type: "law",
            emissionDate: "",
            DocumentNumber: "123456",
            Language: "heb",
            ExpressionDate: ""
        };
        chai.request(server)
            .post("/createUri")
            .send(data)
            .end((err,response) => {
                if (err) {
                    return err;
                }
                response.should.have.status(400);
                assert.equal('Error in emissionDate',response.text);
                done()
            })
    });

    it("Should be get json file with error in the date and retuen Error in DocumentNumber ",(done)=>{
        const data = {
            AKNType:  "act" ,
            Type: "law",
            emissionDate: "2021-07-06",
            DocumentNumber: "",
            Language: "heb",
            ExpressionDate: ""
        };
        chai.request(server)
            .post("/createUri")
            .send(data)
            .end((err,response) => {
                if (err) {
                    return err;
                }
                response.should.have.status(400);
                assert.equal('Error in DocumentNumber',response.text);
                done()
            })
    });

    it("Should be get json file without Language and retuen uri and alias as WORK (without language) ",(done)=>{
        const data = {
            AKNType:  "act" ,
            Type: "law",
            emissionDate: "2021-07-11",
            DocumentNumber: "123456",
            Language: "",
            ExpressionDate: ""
        };
        chai.request(server)
            .post("/createUri")
            .send(data)
            .end((err,response) => {
                if (err) {
                    return err;
                }
                response.body.should.be.a('Object');
                assert.equal(response.body.uri,'/akn/il/act/law/2021-07-11/123456');
                assert.equal(response.body.alias,'/akn/il/act/‏חוק‎/‏ב-אב-התשפא‎/123456');
                done()
            })
    });


    it("Should be get json file and retuen array with uri and alias with ExpressionDate ",(done)=>{
        const data = {
            AKNType:  "act" ,
            Type: "law",
            emissionDate: "2021-07-20",
            DocumentNumber: "123456",
            Language: "heb",
            ExpressionDate: "2021-07-20"
        };
        chai.request(server)
            .post("/createUri")
            .send(data)
            .end((err,response) => {
                response.should.have.status(200);
                console.log('response2: ',response.body);
                response.body.should.be.a('Object');
                assert.equal(response.body.uri,'/akn/il/act/law/2021-07-20/123456/heb@2021-07-20');
                // assert.equal(response.body.alias,'/akn/il/act/‏חוק‎/‏יא-אב-התשפא‎/123456/heb@‎‏יא-אב-התשפא‎‏‎');
                assert.typeOf(response.body.alias,'String');
                done()
            })
    });

    it("Should be get json file with hebrew ExpressionDate and retuen array with uri and alias with ExpressionDate ",(done)=>{
        const data = {
            AKNType:  "act" ,
            Type: "\u200Fחוק\u200E",
            emissionDate: "יא-אב-התשפא",
            DocumentNumber: "123456",
            Language: "heb",
            ExpressionDate: "יא-אב-התשפא"
        };
        chai.request(server)
            .post("/createUri")
            .send(data)
            .end((err,response) => {
                response.should.have.status(200);
                console.log('response2: ',response.body);
                response.body.should.be.a('Object');
                assert.equal(response.body.uri,'/akn/il/act/law/2021-07-20/123456/heb@2021-07-20');
                // assert.equal(response.body.alias,'/akn/il/act/‏חוק‎/‏יא-אב-התשפא‎/123456/heb@‎‏יא-אב-התשפא‎‏‎');
                assert.typeOf(response.body.alias,'String');
                done()
            })
    });

    

});
