const crypto = require('crypto');
const axios = require('axios')

const headers = {
    "Content-Type": "application/json;charset=utf-8"
};

class Bot {

    constructor(options) {
        const {access_token, secret, base_url = 'https://oapi.dingtalk.com/robot/send'} = options
        const timestamp = new Date().getTime()
        const sign = this.signFn(secret, `${timestamp}\n${secret}`)
        this._webhookUrl = `${base_url}?access_token=${access_token}&timestamp=${timestamp}&sign=${sign}`
    }

    signFn = (secret, content) => {
        const str = crypto.createHmac('sha256', secret).update(content)
            .digest()
            .toString('base64');
        return encodeURIComponent(str);
    }

    async send(msg) {
        try {
            const {data} = await axios({
                url: this._webhookUrl,
                method: 'post',
                data: msg,
                headers
            })
            return data
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

function getTextMsg(text) {
    return {
        "text": {
            "content": text
        },
        "msgtype": "text"
    }
}

function getLinkMsg({text, title, picUrl, messageUrl}) {
    return {
        "link": {
            text,
            title,
            picUrl,
            messageUrl
        },
        "msgtype": "link"
    }
}

function getMarkdownMsg({title, text}) {
    return {
        "msgtype": "markdown",
        "markdown": {title, text}
    }
}
function getActionCardMsg({title, text,btnOrientation,singleTitle,singleURL}) {
    return {
        "msgtype": "actionCard",
        "actionCard": {title, text,btnOrientation,singleTitle,singleURL}
    }
}
module.exports = Bot
