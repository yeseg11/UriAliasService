const convertToHebrewDate = require("../routes/convertToHebrewDate");
const chai = require('chai');  
const chaiHttp = require('chai-http');  
const { response } = require('../app');
const server = require('../app');
const utf8 = require('utf8');


//Assertion Style
chai.should();
chai.use(chaiHttp);

//Assert 
var assert = chai.assert;

/**
 * post("/gre2hebDate"
 * get("/gre2hebDate/:date"
 * get("/heb2gerDate/:hDate"
 * 
 */

G2HDateTests();
HStr2GDateTests()

describe('Dates convert API',() => {

    /**
     * Test gre2hebDate POST 
     * check a regular date
     */

    describe('POST /gre2hebDate',() => {
        it("Should be get json file with year,month and day,  and retuen string of hebrew date ",(done)=>{
            const date = {
                year:  "2021" ,
                month: "07",
                day: "11"
            };
            chai.request(server)
                .post("/gre2hebDate")
                .send(date)
                .end((err,response) => {
                    response.should.have.status(200);
                    // console.log('response',response.text);
                    assert.equal('‏ב-אב-התשפא‎',response.text);
                    done()
                })
        });

        it("Should NOT get yaer and suposed to retuen error with message 'Error in year' ",(done)=>{
            const date = {
                // year:   ,
                month: "07",
                day: "11"
            };
            chai.request(server)
                .post("/gre2hebDate")
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    assert.equal('Error in year',response.text);
                    done()
                })
        });
        it("Should NOT get month and suposed to retuen error with message 'Error in month' ",(done)=>{
            const date = {
                year:  "2021" ,
                month: "",
                day: "11"
            };
            chai.request(server)
                .post("/gre2hebDate")
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    assert.equal('Error in month',response.text);
                    done()
                })
        });

        it("Should NOT get correct day and suposed to retuen error with message 'Error in day' ",(done)=>{
            const date = {
                year:  "2021" ,
                month: "07",
                day: "111"
            };
            chai.request(server)
                .post("/gre2hebDate")
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    assert.equal('Error in day',response.text);
                    done()
                })
        });

    });


    /**
     * Test gre2hebDate GET 
     */
     describe('GET /gre2hebDate/:date',() => {
        it("Should get date in the param with YYYY-MM-DD format , retuen string of hebrew date ",(done)=>{
            const date = "2021-07-11";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(200);
                    // console.log('response',response.text);
                    assert.equal('‏ב-אב-התשפא‎',response.text);
                    done()
                })
        });

        it("Should NOT get yaer and suposed to retuen error with message 'Error in year' ",(done)=>{
            const date = "21-07-11";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in year',response.text);
                    done()
                })
        });

        it("Should get month with one digit and suposed to retuen correct date ",(done)=>{
            const date = "2021-7-11";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(200);
                    assert.equal('‏ב-אב-התשפא‎',response.text);
                    // console.log('Error response',response.text);
                    // assert.equal('Error in month',response.text);
                    done()
                })
        });

        it("Should NOT get month and suposed to retuen error with message 'Error in month' ",(done)=>{
            const date = "2021-071-11";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in month',response.text);
                    done()
                })
        });

        it("Should get day with one digit and suposed to retuen correct date ",(done)=>{
            const date = "2021-07-1";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(200);
                    assert.equal('‏כא-תמוז-התשפא‎',response.text);
                    done()
                })
        });

        it("Should NOT get correct day and suposed to retuen error with message 'Error in day' ",(done)=>{
            const date = "2021-07-111";
            chai.request(server)
                .get("/gre2hebDate/"+date)
                .send(date)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in day',response.text);
                    done()
                })
        });

    });


    /**
     * Test heb2greDate GET 
     */

    describe('GET /heb2greDate/:hDate',() => {
        it("Should get Hebrew date in the param with YYYY-MM-DD format , retuen string of Gregorian date ",(done)=>{
            const link = "/heb2greDate/ג-אדר-התשפא";
            const encoded = encodeURI(link);
            chai.request(server)
                .get(encoded)
                .end((err,response) => {
                    response.should.have.status(200);
                    // console.log('response',response.text);
                    assert.equal('2021-02-15',response.text);
                    done()
                })
        });

        it("Should NOT get yaer and suposed to retuen error with message 'Error in year' ",(done)=>{
            const link = "/heb2greDate/ט-אב";
            const encoded = encodeURI(link);
            chai.request(server)
                .get(encoded)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in year',response.text);
                    done()
                })
        });

        it("Should NOT get month and suposed to retuen error with message 'Error in month'",(done)=>{
            const link = "/heb2greDate/ט- -התשפא";
            const encoded = encodeURI(link);
            chai.request(server)
                .get(encoded)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in month',response.text);
                    done()
                })
        });

        it("Should NOT get correct day and suposed to retuen error with message 'Error in day' ",(done)=>{
            const link = "/heb2greDate/- שבט- תשפא";
            const encoded = encodeURI(link);
            chai.request(server)
                .get(encoded)
                .end((err,response) => {
                    response.should.have.status(400);
                    // console.log('Error response',response.text);
                    assert.equal('Error in day',response.text);
                    done()
                })
        });

    });



});

/**
     * Test 'gre2hebDate POST - WITHOUT chai ' 
     * check a special dates - WITHOUT chai
 */
function G2HDateTests(){
    var errorsMessages = [];
    var hDate = (convertToHebrewDate.G2H(1899,1,30).includes('‏יט-שבט-התרנט')) ? 'Success' : 'ERROR IN יט-שבט-התרנט';
    errorsMessages.push(hDate);
    var hDate = (convertToHebrewDate.G2H(1910,5,25).includes('טז-אייר-התרע')) ? 'Success' : 'ERROR IN טז-אייר-התרע';
    errorsMessages.push(hDate);
    var hDate = (convertToHebrewDate.G2H(1920,1,6).includes('טו-טבת-התרף')) ? 'Success' : 'ERROR IN טו-טבת-התרף';
    errorsMessages.push(hDate);
    //g2h.G2H(1930,8,10), 'ט"ז אב התר"ץ')
    var hDate = (convertToHebrewDate.G2H(1930,8,10).includes('טז-אב-התרץ')) ? 'Success' : 'ERROR IN טז-אב-התרץ';
    errorsMessages.push(hDate);
    //g2h.G2H(1940,9,19), 'ט"ז אלול הת"ש')
    var hDate = (convertToHebrewDate.G2H(1940,9,19).includes('טז-אלול-התש')) ? 'Success' : 'ERROR IN טז-אלול-התש';
    errorsMessages.push(hDate);
    //g2h.G2H(1960,9,8), 'ט"ז אלול התש"ך')
    var hDate = (convertToHebrewDate.G2H(1960,9,8).includes('טז-אלול-התשך')) ? 'Success' : 'ERROR IN טז-אלול-התשך';
    errorsMessages.push(hDate);
    //g2h.G2H(1970,9,17), 'ט"ז אלול התש"ל')
    var hDate = (convertToHebrewDate.G2H(1970,9,17).includes('טז-אלול-התשל')) ? 'Success' : 'ERROR IN טז-אלול-התשל';
    errorsMessages.push(hDate);
    //g2h.G2H(1980,6,28), 'י"ד תמוז התש"ם')
    var hDate = (convertToHebrewDate.G2H(1980,6,19).includes('‏ה-תמוז-התשם')) ? 'Success' : 'ERROR IN ‏ה-תמוז-התשם';
    errorsMessages.push(hDate);
    //g2h.G2H(1990,6,7), 'י"ד סיון התש"ן')
    var hDate = (convertToHebrewDate.G2H(1990,6,7).includes('יד-סיון-התשן')) ? 'Success' : 'ERROR IN יד-סיון-התשן';
    errorsMessages.push(hDate);
    
    var hDate = (convertToHebrewDate.G2H(2015,11,12).includes('ל-חשון-התשעו')) ? 'Success' : 'ERROR IN ל-חשון-התשעו';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.G2H(2015,12,12).includes('ל-כסליו-התשעו')) ? 'Success' : 'ERROR IN ל-כסליו-התשעו';
    errorsMessages.push(hDate);
    


    console.log('************************************START G2HDateTests*************************************')
    for (i in errorsMessages){
        var m = errorsMessages[i];
        if (m.includes('ERROR IN')){
            console.error(m);
        }
    }
    console.log('************************************END G2HDateTests*************************************')

}


/**
     * Test 'heb2gerDate POST - WITHOUT chai ' 
     * check a special dates - WITHOUT chai
 */
 function HStr2GDateTests(){
    var errorsMessages = [];
    var hDate = (convertToHebrewDate.HStr2G('התרנט','שבט','יט').toString() == "1899-01-30") ? 'Success' : 'ERROR IN 1899-01-30';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.HStr2G('התרע','אייר','טז').toString() == "1910-05-25") ? 'Success' : 'ERROR IN 1910-05-25';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.HStr2G('התרך','ניסן','כ').toString() == "1860-04-12") ? 'Success' : 'ERROR IN 1860-04-12';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.HStr2G('התשץ','אדר_ב','יא').toString() == "2030-03-16") ? 'Success' : 'ERROR IN 2030-03-16';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.HStr2G('התשעו','חשון','ל').toString() == "2015-11-12") ? 'Success' : 'ERROR IN 2015-11-12';
    errorsMessages.push(hDate);

    var hDate = (convertToHebrewDate.HStr2G('התשעו','כסליו','ל').toString() == "2015-12-12") ? 'Success' : 'ERROR IN 2015-12-12';
    errorsMessages.push(hDate);
    


    console.log('************************************START HStr2GDateTests*************************************')
    for (i in errorsMessages){
        var m = errorsMessages[i];
        if (m.includes('ERROR IN')){
            console.error(m);
        }
    }
    console.log('************************************END HStr2GDateTests*************************************')

}