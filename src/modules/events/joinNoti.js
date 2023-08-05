module.exports.config = {
    name: 'joinNoti',
    version: '1.0.0',
    credit: 'DungDz',
    description: 'Thông báo khi có người tham gia nhóm',
    usage: ''
}

module.exports.run = function (api, event, client) {
    
    if (event.logMessageType != 'log:subscribe') return;
    api.getThreadInfo(event.threadID, (err, info) => {
        msgbody = `Chào mừng ${event.logMessageData.addedParticipants[0].fullName} đã đến với băng hải tặc ${info.threadName}\n`;
        msgbody+= `Bạn là thành viên thứ ${info.participantIDs.length} của băng\n`;
        msgbody+= `Hãy cố gắng tương tác để không bị thuyền trưởng đá khỏi băng nhé!!\n`;

        msg = {
            body: msgbody,
            mentions: [
                {
                    tag: event.logMessageData.addedParticipants[0].fullName,
                    id: event.logMessageData.addedParticipants[0].userFbId
                }
            ]
        }
        api.sendMessage(msg, event.threadID);
    })

}

