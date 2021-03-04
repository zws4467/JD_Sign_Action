const axios = require("axios");
const common = require('./common');
const cookie = process.env.SMZDM_COOKIE;

const title = '什么值得买'
const header = {
    headers: {
        'Host': 'zhiyou.smzdm.com',
        'Referer': 'https://www.smzdm.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
        'Cookie': `${cookie}`
    }
};

function sign() {
    return new Promise(async (resolve) => {
        let data;
        let url = 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin';
        try {
            let res = await axios.get(url, header);
            if (res.data.error_code === 0) {
                data = `签到成功!\n签到天数: ${res.data.data.checkin_num} | Lv:${res.data.data.rank} | 经验值:${res.data.data.exp}`
            } else {
                data = res.data.error_msg
            }
            console.log(data);
            await common.sendMessage(title, data);
        } catch (e) {
            console.log(e);
        }
        resolve();
    });
}

sign();
