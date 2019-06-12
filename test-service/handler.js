'use strict';
const dynogels = require('dynogels');
const awsSdk = require('aws-sdk');
const Joi = require('joi');
const SNS = new awsSdk.SNS();
module.exports.publisher = async (event) => {

  SNS.publish(
    {
      Message: 'Triggeerrrr!',
      TopicArn: 'arn:aws:sns:us-east-1:044552001992:test-sns-topic',
      name: event.name,
      email: event.email,
      MessageAttributes: {
        Test: {
          Type: 'String',
          Value: 'TestString'
        },
        TestBinary: {
          Type: "Binary",
          Value: "TestBinary"
        }
      }
    }, (err, data) => {
      console.log('SNS ERROR!', err);
      console.log('SNS TRIGGERED', data);
    }
  )

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
};

module.exports.createAcc = (event) => {
  const Account = dynogels.define('monday-2', {
    hashKey : 'email',
   
    timestamps : true,
   
    schema : {
      email   : Joi.string().email(),
      name    : Joi.string(),
    }
  });
  
  Account.create(
    {email: event.Records[0].Sns.email, name: event.Records[0].Sns.name}, 
    {overwrite : false}, 
    (err, acc) => {
      console.log("&&&&&&&&&&&", err);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!", acc);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Event!',
      input: event,
    }, null, 2),
  };
}
