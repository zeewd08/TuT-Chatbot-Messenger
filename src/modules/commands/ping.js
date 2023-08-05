module.exports.config = {
    name: 'ping',
    version: '1.0.0',
    credit: 'DungDz',
    description: 'Pong!',
    usage: ''
}

module.exports.run = function (api, event, args, client) {
    // Hàm được thực thi khi người dùng gửi tin nhắn theo cú pháp prefix + tên lệnh ở phần config
    api.sendMessage("Pong! - Prefix", event.threadID, event.messageID);
}

module.exports.noprefix = function (api, event, args, client) {
    // Tương tự như trên nhưng không cần prefix
    api.sendMessage("Pong! - noPrefix", event.threadID, event.messageID);
}

module.exports.onload = function (api, client) {
    // Hàm được thực thi khi bot khởi chạy
    console.log("Onload!!")
}
