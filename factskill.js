'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const https = require('https');

var myRequest = 'This is useless just ignore it';

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();

};

function httpsGet(myData, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey

    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'finance.google.com',
        port: 443,
        path: '/finance/info?client=ig&q=NASDAQ%3APEG',
        method: 'GET',

        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed data

            //var price = JSON.parse(returnData);
            //callback(price[0].l);  // this will execute whatever function the caller defined, with one argument
            
            var stringData = JSON.stringify(returnData);
            var parsePrice = stringData.substring(79,84);
            var parseTime = stringData.substring(162,169);
            var retArr = [parsePrice, parseTime];
            //callback(price);
            callback(retArr);
        });

    });
    req.end();

}
const languageStrings = {
    'en': {
        translation: {
            TIPS: [
                'Install a programmable thermostat and raise the setting to the highest comfortable temperature. You can save 3 to 5 percent on your air conditioning costs for each degree you raise the thermostat.',
                'Close doors leading to uncooled parts of your home. If you have central air conditioning, close off vents to unused rooms. Keep filters clean.',
                'Even if you have air conditioning, use ceiling and other fans to provide additional cooling and better circulation.',
                'Seal holes and cracks around doors and windows. Eliminate air leaks around window air conditioners with foam insulation or weather-stripping.',
                'Close blinds, shades and draperies facing the sun to keep out the sun’s heat and help fans and air conditioners cool more efficiently.',
                'Turn off power sources. TVs, computers and other electronic devices draw power when they are in standby mode or turned off but still plugged in. Plug electronics into power strips and turn off the power switch when the items are not in use.',
                'Use timers and motion detectors on indoor and outdoor lighting.',
                'Replace old appliances with new energy efficient Energy Star appliances.',
                'If possible, install whole-house fans that bring in cooler night-time air that can pre-cool a house and reduce energy use in the daytime if heat is kept out by closing windows and shades.',
                'Take advantage of PSE&G’s Home Energy Toolkit which helps you analyze your home energy use to receive customized energy saving tips. ',
            ],
            SKILL_NAME: 'P S E G Safety Tips',
            GET_FACT_MESSAGE: "Here's your safety tip: ",
            HELP_MESSAGE: 'You can say tell me a safety tip, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        }
    }
};

const handlers = {
    
    //ADD CODE HERE
    
    'stockIntent': function() {
        httpsGet(myRequest,  (myResult) => { //ignore myRequest it was part of the cookbook example
                console.log("sent     : " + myRequest); //ignore ^
                console.log("received : " + myResult);
                
                this.emit(':tell', 'The price per share for P S E G is ' + myResult[0] + ' dollars. Last updated at ' + myResult[1]);

            }
        );
        
    },
    'LaunchRequest': function () {
        this.emit(':tell', 'Welcome to the P S E G Company Guide. Ask me about what the company does, when it began, who to call for services, or about anything else you would like to know.');
    },
    
    'CafIntent': function () {
        this.emit(':tell', 'The P S E G Cafeteria is located on the 3rd floor, take the elevator to 2 and use the escalator to go get some food');
    },
    
    'FactsIntent': function() {
        this.emit(':tell', 'P S E G, or Public Service Enterprise group is the main energy distributor for New Jersey and Long Island. The company has been around since 1902 and is one of the 10 largest Utilities companies in the country. Wow, that is impressive!');
    },
    
    'ITInfoIntent': function(){
        this.emit(':tell', 'The I T department at PSEG is made up of a number of different sub teams such as Network Operations, Security, A P O, I P O, CeeSo, Quality Assurance, and others. They are responsible for large scale technology projects which ensure that customers have the best experience when using our applications and services.');
    },
    
    'WheretoEatIntent': function(){
        this.emit(':tell', 'There are a variety of eateries around the P S E G general office. Halal guys and codoba are located on halsey street. If you are a fan of mexican food Darios is also withing walking distance and many more.');
    },
    
    'beforeYouDigIntent': function() {
        this.emit(':tell', 'Call 1 8 0 0 2 7 2 1 0 0 0 before digging if you are unsure about what may be beneath the ground.');
    },
    
    'gasLeakIntent': function(){
        this.emit(':tell', 'Call 1, 8 0 0, 8 8 0, 7 7 3 4 to report a gas leak. Open a window and leave the building');
    },
    
    'downedWireIntent': function(){
        this.emit(':tell', 'Call 1, 8 0 0, 8 8 0, 7 7 3 4 to report a downed wire. Stay away from fallen lines and anything or anyone that may have come in contact with them. ');
    },
    
    'powerOutageIntent': function(){
        this.emit(':tell', 'Call 1, 8 0 0, 8 8 0, 7 7 3 4 to report a power outage');
    },
    
    'locationsIntent': function(){
        this.emit(':tell','The main P S E G headquarters is in Newark New Jersey, however we have offices and power plants in many other locations such as Edison, Salem, and Long Island.');
    }, 
    
    'ceoIntent': function(){
        this.emit(':tell', 'Ralph Izzo is the C E O of P S E G, he has held this position for the last 10 years.');
    },
    
    'cioIntent': function(){
        this.emit(':tell', 'The C I O is currently Joseph Santamaria.');
    },
    
    'historyIntent': function(){
        this.emit(':tell', 'P S E G began in nineteen oh three and currently serves almost 4 million customers in New Jersey with electricity or gas services.');
    },
    
    /* New function I introduced to loop through an array of energy saving tips and read to the user */
    'GetNewSavingTipIntent': function () {
        this.emit('GetTip');
    },
    
    'GetTip': function () {
        // Get a random saving tip from the saving tips array
        // Use this.t() to get corresponding language data
        const factArr = this.t('TIPS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    
};





