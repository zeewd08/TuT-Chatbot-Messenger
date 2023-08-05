module.exports = (api, client) => {

    for (let i = 0; i < client.onload.length; i++) {
        client.onload[i].onload(api, client);
    };

    api.setOptions({ listenEvents: true });
    api.listenMqtt((err, event) => {
        client.events.forEach((value, key) => {
            client.events.get(key).run(api, event, client)
        });

        check = event.body == undefined;
        if (check) return;

        args = event.body.trim().split(' ');
        listNoprefix = [];
        client.noprefix.forEach((value, key) => {
            listNoprefix.push(key);
        });

        if (listNoprefix.includes(args[0])) {
            client.noprefix.get(args[0]).noprefix(api, event, args, client);
        }

        listCommands = [];
        if(!event.body.startsWith(client.config.PREFIX)) return;
        args = event.body.slice(client.config.PREFIX.length).trim().split(' ');
        client.commands.forEach((value, key) => {
            listCommands.push(key);
        });

        if (!listCommands.includes(args[0])) return api.sendMessage('Lệnh của bạn không tồn tại!!', event.threadID, event.messageID);
        client.commands.get(args[0]).run(api, event, args, client);
    })

}