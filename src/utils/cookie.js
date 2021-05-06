export default {
    //设置cookie
    setCookie(key, value) {
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));//保存期限
        const expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    },

    //获取cookie
    getCookie(key) {
        const name = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    
    }
}