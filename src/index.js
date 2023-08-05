require('dotenv').config();
const { readFileSync } = require("fs");
const login = require("facebook-chat-api");

loginPath = { appState: JSON.parse(readFileSync(__dirname + "/appstate.json", "utf-8")) };

var client = {
    config: process.env,
    commands: new Map(),
    events: new Map(),
    noprefix: new Map(),
    onload: new Array()
};

['handlerCommand', 'handlerEvent'].forEach(handler => {
    require(`${__dirname}/core/${handler}`)(client);
});

login(loginPath, (err, api) => {
    if (err) return console.error(err);

    require(`${__dirname}/core/listen`)(api, client);
})