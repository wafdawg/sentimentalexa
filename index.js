"use strict";

var Alexa = require("alexa-sdk");
var https = require("https");
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

        //Initialize IBM Watson API Call
        var inputText = encodeURI("yes! I made it to my dream college");
        console.log(inputText);
        var pathText = '/tone-analyzer/api/v3/tone?version=2017-09-21&text=' + inputText;
        console.log(pathText);
        var options = {
            host: 'gateway.watsonplatform.net',

            // auth: {
            //             'user': '922e4390-6e26-4b48-90bc-589edced86b5',
            //             'pass': 'Sp38ijlfjbbg'
            //         },
            headers: { 'Authorization': 'Basic OTIyZTQzOTAtNmUyNi00YjQ4LTkwYmMtNTg5ZWRjZWQ4NmI1OlNwMzhpamxmamJiZw==' },
            //headers: {'Authorization': "Basic " + new Buffer('922e4390-6e26-4b48-90bc-589edced86b5:Sp38ijlfjbbg').toString()},
            path: pathText,
            method: 'GET'
        }
        var req = https.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";
            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
                var strOutput = JSON.stringify(returnData);
                var str = strOutput.replace("\\","");
                
                var obj = JSON.parse(returnData);
                
                 console.log(obj.document_tone.tones[0]);
                 var result = "I hope you are always this happy!" + "Tone: " + obj.document_tone.tones[0].tone_name + "Score: " + obj.document_tone.tones[0].score ;
                this.emit(":tellWithCard",result, SKILL_NAME, "result");
            });
        });
        req.end();



    },



    'GetSadSentimentAnalysis': function () {
        /************************************************** */
        var inputText = encodeURI("I broke up with my boyfriend today.");
        console.log(inputText);
        var pathText = '/tone-analyzer/api/v3/tone?version=2017-09-21&text=' + inputText;
        console.log(pathText);
        var options = {
            host: 'gateway.watsonplatform.net',

            // auth: {
            //             'user': '922e4390-6e26-4b48-90bc-589edced86b5',
            //             'pass': 'Sp38ijlfjbbg'
            //         },
            headers: { 'Authorization': 'Basic OTIyZTQzOTAtNmUyNi00YjQ4LTkwYmMtNTg5ZWRjZWQ4NmI1OlNwMzhpamxmamJiZw==' },
            //headers: {'Authorization': "Basic " + new Buffer('922e4390-6e26-4b48-90bc-589edced86b5:Sp38ijlfjbbg').toString()},
            path: pathText,
            method: 'GET'
        }
        var req = https.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";
            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
                var strOutput = JSON.stringify(returnData);
                var str = strOutput.replace("\\","");
                
                
                var obj = JSON.parse(returnData);
                console.log(strOutput);
                var result = "You sound sad, don't worry, let me play a song for you." + "Tone: " + obj.document_tone.tones[0].tone_name + "Score: " + obj.document_tone.tones[0].score ;
               this.emit(":tellWithCard",result, SKILL_NAME, "result");
            });
        });
        req.end();



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



