const { readdirSync } = require("fs");
const path = require('path');

module.exports = (client) => {

    const eventPath = path.join(__dirname, '..', 'modules', 'events');
    const eventFile = readdirSync(eventPath).filter(file => file.endsWith('.js'));

    var eventCount = 0;
    for (const file of eventFile) {
        event = require(eventPath + `/${file}`);

        if (!event.config.name) continue;
        if (event.run) {
            eventCount++;
            client.events.set(event.config.name, event);
        }
        if (event.onload) {
            client.onload.push(event)
        }
    }

    console.log(`Đã tải thành công ${eventCount} event!!`);

}