'use strict';
const dynogels = require('dynogels');
const awsSdk = require('aws-sdk');
const Joi = require('joi');
const SNS = new awsSdk.SNS();
module.exports.publisher = async (event) => {

  SNS.publish(
    {
      Message: JSON.stringify({
        name: event.name,
        email: event.email
      }),
      MessageAttributes: {
        someKey: {
          DataType: 'String',
          StringValue: event.someKey
        }
     },
      TopicArn: 'arn:aws:sns:us-east-1:044552001992:test-sns-topic',
      
    }, (err, data) => {
      console.log( err ? `SNS ERROR! ${err}` : `SNS TRIGGERED! ${data}`); 
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Publisher',
          input: event,
          }, null, 2),
          };
          }
  )

 
};

module.exports.createAcc = (event) => {
  const Account = dynogels.define('monday-2', {
    hashKey : 'email',
   
    timestamps: true,
   
    schema : {
      email: Joi.string().email(),
      name: Joi.string(),
    }
  });
  
  const { email, name } = JSON.parse(event.Records[0].Sns.Message);
  console.log(`MAIL = ${email}, NAME = ${name}`);

  Account.create(
    {
      email,
      name
    }, 
    {
      overwrite: false
    }, 
    (err, acc) => {
      console.log( err ? `Account create false. ${err}` : `Account create successful! ${acc}`);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'createAcc',
      input: event,
    }, null, 2),
  };
}


module.exports.addAcc = (event) => {
  const Account = dynogels.define('monday-2', {
    hashKey : 'email',
   
    timestamps: true,
   
    schema : {
      email: Joi.string().email(),
      name: Joi.string(),
    }
  });
  
  const { email, name } = JSON.parse(event.Records[0].Sns.Message);
  console.log(`MAIL = ${email}, NAME = ${name}`);

  Account.create(
    {
      email,
      name
    }, 
    {
      overwrite: false
    }, 
    (err, acc) => {
      console.log( err ? `Account create false. ${err}` : `Account create successful! ${acc}`);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'createAcc',
      input: event,
    }, null, 2),
  };
}
