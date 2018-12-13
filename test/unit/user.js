chai = require('chai');
assert = chai.assert;
expect = chai.expect;
chai.should();
chai.config.includeStack = true;

const addContext = require('mochawesome/addContext');
  

var supertest = require("supertest");
var config = require('../../config/config');
var server = supertest.agent(config.host);

var helper = require('../test-helper');
var ticket="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjMTIzNTIzNzg0MjIxNWE5MWVlY2M0YiIsInJvbGUiOiJhZG1pbiJ9LCJzZXNzaW9uIjp7InVybiI6OTUwMDIwMDgwLCJleHAiOjE1NDcyODkxMjUwMDAwMDAsImlhdCI6MTU0NDY5NzEyNTAwMDAwMH0sImlhdCI6MTU0NDY5NzEyNX0.DSPwsXBVCMt0U6xtqunQeS5f2qjU4LE__2PUC-jlDCo";
var currentUser;


for (g = 0; g < 1; g++) {

  let generateUser = function () {
    return {
     
      fullname:helper.generate('all-alpha',6)+" "+helper.generate('all-alpha',6),
      password:helper.generate('mix',20)
    }
  }

   currentUser={
    fullname:"wafaa gamal",
    password:"pass@2012"}


describe("Testing  User", function () {
 
    this.timeout(10000);

  it("Login user",function(done){
    var context=this
    server  
    .post('/login')
    .send(currentUser)
    .expect("Content-type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (res.body){
        //console.log(res.body);
        
        ticket=res.body.ticket
        res.status.should.equal(200);
      done();

        addContext(context, {
          title: 'sent object',
          value: JSON.stringify(currentUser)
      });

      addContext(context, {
          title: 'response object',
          value: JSON.stringify(res.body)
      });
      }
  });
})


  it("reset Password",function(done){
     var context=this
     //console.log(ticket);
    server
    .post('/reset/password')
    .set('ticket',ticket)
    .send({ 
      password: helper.generate('mix',20)
      })
    .expect("Content-type", /json/)
    .expect(200)
    .end(function (err, res) {
     if (res.body) {
     // console.log(res.body);
        res.status.should.equal(200);
      done();

        addContext(context, {
          title: 'sent object',
          value: JSON.stringify({ 
            password: helper.generate('mix',20)
          })
      });

      addContext(context, {
          title: 'response object',
          value: JSON.stringify(res.body)
      });
      }
    });

  })
  
  it("add new Admin",function(done){
    var context=this
    currentUser=generateUser()
      server
      .post('/add/admin')
      .set("ticket",ticket)
      .send(currentUser)
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
          if(res.body){
              res.status.should.equal(200);
              done()
              addContext(context, {
                title: 'sent object',
                value: JSON.stringify(currentUser)
            });
    
            addContext(context, {
                title: 'response object',
                value: JSON.stringify(res.body)
            });
          }
      })
  })
  it("add new Admin",function(done){
    var context=this
    currentUser=generateUser()
      server
      .post('/add/stackholder')
      .set("ticket",ticket)
      .send(currentUser)
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
          if(res.body){
              res.status.should.equal(200);
              done()

              addContext(context, {
                title: 'sent object',
                value: JSON.stringify(currentUser)
            });
    
            addContext(context, {
                title: 'response object',
                value: JSON.stringify(res.body)
            });
          }
      })
  })

})


describe("Testing for validation Create & Access route",function(){

  this.timeout(10000);
    it("should return invalid fullname Length too short",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.fullname=helper.generate("all-alpha",2)

          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
         if (res.body){  
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });


    it("should return invalid fullname",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.fullname=helper.generate('lalpha',6)
        server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body) {
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
      }
      });
    });


    it("should return invalid fullname format",function(done){

      var context=this
      currentUser=generateUser()
      currentUser.fullname=helper.generate("mix",10)
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body){
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });

    it("should return required fullname",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.fullname=undefined
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body)  {
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });


    it("should return invalid fullname length ",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.fullname=helper.generate('lalpha',6) + " " +helper.generate('lalpha',6)+" "+helper.generate('lalpha',6)+ " " +helper.generate('lalpha',6)+" "+helper.generate('lalpha',6)+ " " +helper.generate('lalpha',6)+" "+helper.generate('lalpha',6)+ " " +helper.generate('lalpha',6)+" "+helper.generate('lalpha',6)
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body) {
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });


    it("should return invalid user password length",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.password=helper.generate('mix',5)
  
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body){
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });


    it("should return error user password required",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.password=undefined
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body) {
          res.status.should.equal(400)
        done();

            addContext(context, {
              title: 'sent object',
              value: JSON.stringify(currentUser)
          });

          addContext(context, {
              title: 'response object',
              value: JSON.stringify(res.body)
          });
        }
      });
    });


    it("should return error invalid user password format",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.password=helper.generate("lalpha",15)
     
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body)  {
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });


    it("should return error invalid user password format(numeric)",function(done){
      var context=this
      currentUser=generateUser()
      currentUser.password=helper.generate("numeric",15)
      
          server
      .post('/login')
      .send(currentUser)
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (res.body){
          res.status.should.equal(400)
        done();

          addContext(context, {
            title: 'sent object',
            value: JSON.stringify(currentUser)
        });

        addContext(context, {
            title: 'response object',
            value: JSON.stringify(res.body)
        });
        }
      });
    });

  

  
  it("should return invalid ticket won't reset Password",function(done){

    var context=this
    server
    .post('/reset/password')
    .set('ticket',ticket+1)
    .send({
        password: helper.generate('mix',20)
    })
    .expect("Content-type", /json/)
    .expect(401)
    .end(function (err, res) {
      
      if (res){
        // console.log(res.body);
        
        res.status.should.equal(401);
      done();

        addContext(context, {
          title: 'sent object',
          value: JSON.stringify({ 
            password: helper.generate('mix',20)
          })
      });

      addContext(context, {
          title: 'response object',
          value: JSON.stringify({})
      });
      }
    });
  });
  
  it("should return invalid ticket won't add new admin",function(done){
 
    var context=this
    currentUser=generateUser()
    server
    .post('/add/admin')
    .set('ticket',ticket+1)
    .send(currentUser)
    .expect("Content-type", /json/)
    .expect(401)
    .end(function (err, res) {
      
      if (res){
        res.status.should.equal(401);
      done();

        addContext(context, {
          title: 'sent object',
          value: JSON.stringify({ 
            password: helper.generate('mix',20)
          })
      });

      addContext(context, {
          title: 'response object',
          value: JSON.stringify({})
      });
      }
    });
  });

  it("should return invalid ticket won't add new stackholder",function(done){
 
    var context=this
    currentUser=generateUser()
   // console.log(currentUser);
    
    server
    .post('/add/stackholder')
    .set('ticket',ticket+1)
    .send({currentUser})
    .expect("Content-type", /json/)
    .expect(401)
    .end(function (err, res) {
      
      if (res){
        res.status.should.equal(401);
      done();

        addContext(context, {
          title: 'sent object',
          value: JSON.stringify({ 
            password: helper.generate('mix',20)
          })
      });

      addContext(context, {
          title: 'response object',
          value: JSON.stringify({})
      });
      }
    });
  });

})


}