let axios = require('axios');
const cheerio = require('cheerio');
const {buildFromDom} = require('../parser/html');

let pageFormat = {
    selector: '#grid-container',
    channels: {
        selector: ['#content-section'],
    }
};

const getChannels = async () => {
    let headers = {
        Cookie: "VISITOR_INFO1_LIVE=eNSH77Pydns; GPS=1; __Secure-3PSID=uQdtJHDU2QT_k8lnKajLf0PY6EN4PnmmOHYCIiIjmqgICHDHqXSm-RsuZuM6c27l10vZew.; __Secure-HSID=AojWCsWsYtRc6XP_m; __Secure-SSID=AwRJm0JYp8ln3Yjyl; YSC=ihJIWrIYaiE; SID=uQdtJHDU2QT_k8lnKajLf0PY6EN4PnmmOHYCIiIjmqgICHDHVD_eb865zmND5ZBDufR9ew.; HSID=AojWCsWsYtRc6XP_m; SSID=AwRJm0JYp8ln3Yjyl; APISID=7baQl5W0z4gwbGLz/ADPI1CksmlG9MTpZ8; SAPISID=Hp1xVx8_QbXTqNKh/ASPPClbzPaw1KvNqH; __Secure-APISID=7baQl5W0z4gwbGLz/ADPI1CksmlG9MTpZ8; __Secure-3PAPISID=Hp1xVx8_QbXTqNKh/ASPPClbzPaw1KvNqH; LOGIN_INFO=AFmmF2swRgIhAKkATDwJuivqrhr42cHStlz2Qa9vlgc0z25ILiv3BhYxAiEA_Vj1EeTmnMmsCgeZy5vjd0In8pWoA1WRaEab_ioFIpA:QUQ3MjNmeklnTlE2aFpqNmpZUmRVOUdaTUdFUC13Q21NVWM1clRoa1l0Y0x5dHgzRTFBZWYyTGhPbFpHS0t1TWJ2UXBZeXM0SXhYRFYzbzBWT0VKM3JyVDdCLUxLZ2g4MWxqNGpvZl9talR5dEFSLW0xREgyWFlFcjFIazROZ0R6aWF2QU9xS2VEaWg3bUJ6LUdjZ2VYajAzWmxjRlc0UWZfT3BIeHhxWXc2ZzdTYlM5MDFCcmNtTXlybDVka1RKc2JUM3lvYm1FbFBZV0dJOTM0WVZZTUlzTC0tNGkydWRpQ2tFclBFRkl0a0tXSlV4ZzdIR1U0QVlaS1Z6ajFQdVFaU2FjZ19QX2dzVg==; SIDCC=AN0-TYvnzzBd3H8RFmnXGhiEl6tQ8DKTZLL6O-pG-mjovrOLXNYKCl6Smnkd9C6LolgKsnL1"
    };
    response = await axios.get('https://www.youtube.com/feed/channels', {headers});

    return response.data;

    let $ = cheerio.load(response.data);
    let channels = buildFromDom($, pageFormat);

    return channels;
}

module.exports = {
    getChannels
};
