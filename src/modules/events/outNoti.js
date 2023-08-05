module.exports.config = {
    name: 'outNoti',
    version: '1.0.0',
    credit: 'DungDz',
    description: 'Thông báo khi có người rời nhóm',
    usage: ''
}

module.exports.run = function (api, event, client) {
    
    if (event.logMessageType != 'log:unsubscribe') return;
    
    api.getUserInfo(event.logMessageData.leftParticipantFbId, (err, userInfo) => {
            msgbody = `Thuyền viên ${userInfo[event.logMessageData.leftParticipantFbId].name} vì chán sống nên đã quyết định ra đảo ở :( \nHy vọng bạn ấy sẽ không sao cả!`;
            msg = {
                body: msgbody,
                mentions: [
                    {
                        tag: userInfo[event.logMessageData.leftParticipantFbId].name,
                        id: event.logMessageData.leftParticipantFbId
                    }
                ]
            }
            api.sendMessage(msg, event.threadID);
    })

}

