"use strict";

var Alexa = require("alexa-sdk");
var http = require("http");
var APP_ID = "";
var SKILL_NAME = "Get Sentiment Analysis"
//Setup
// Use our Watson library.
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Require our config variables.
//var config = require('./config');




/****************************************************/
// The text that we want to analyze the tone of.
var text = "I am feeling happy today";
// Turn our text into valid json.
var input = { "text": text };
// The format that the tone analyzer needs. 
var params =
    {
        'tone_input': input,
        'content_type': 'application/json'
    };
// Initialize the Tone Analyzer by giving it our credentials.
var tone_analyzer = new ToneAnalyzerV3(
    {
        username: "922e4390-6e26-4b48-90bc-589edced86b5",
        password: "Sp38ijlfjbbg",
        version_date: '2017-09-21'
    });

var testtone = "init";


/***************************************************/
/*
function testing()
{
    console.log('inside function');
    console.log(testtone);

}

testing();
*/

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();


}

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetSentimentAnalysis');
    },
    'happy': function () {
        this.emit('GetSentimentAnalysis');
    },
    'sad': function () {
        this.emit('GetSadSentimentAnalysis');
    },
    'GetSentimentAnalysis': function () {
        /************************************************** */
        var options = {
            host: 'api.open-notify.org',
            port: 80,
            method: 'GET',
            path: '/astros.json'
        }
        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";
            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end',() => {
                var result = "Great you are happy!" + JSON.stringify(returnData);
               console.log(result);
               this.emit(":tellWithCard", result, SKILL_NAME, "result");        
            });
        });
        req.end();
        /***************************************************/
        
        var sentimentAnalysis = "Hello from Alexa";

        //Output
        var speechOutput = sentimentAnalysis;




    },
    'GetSadSentimentAnalysis': function () {
        /************************************************** */
        var options = {
            host: 'api.open-notify.org',
            port: 80,
            method: 'GET',
            path: '/astros.json'
        }
        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";
            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end',() => {
                var result = "Sorry, you are sad!" + JSON.stringify(returnData);
               console.log(result);
               this.emit(":tellWithCard", result, SKILL_NAME, "result");        
            });
        });
        req.end();
        /***************************************************/
        
        var sentimentAnalysis = "Hello from Alexa";

        //Output
        var speechOutput = sentimentAnalysis;




    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Help";

        this.emit(":tellWithCard", speechOutput, SKILL_NAME, speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = "Stop";

        this.emit(":tellWithCard", speechOutput, SKILL_NAME, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = "Stop";

        this.emit(":tellWithCard", speechOutput, SKILL_NAME, speechOutput);
    },

}
