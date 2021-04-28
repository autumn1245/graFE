import axios from 'axios';
import { message } from 'antd'
/**
 * axios request basic func
 * @param  {object} options
 */
async function request(options) {
    const { headers, url } = options;
    return axios({
            ...options,
            url,
            headers: {
                ...headers,
                'current-path': window.location.href,
            },
        })
        .then(res => {
            console.log(res.data,'res.data=====')
            return res.data; 
        })
        // .then(data => parseErrorMessage(data, options))
        .catch(err => {
            // if (hasProperty(err, 'err_no') && err.err_show !== false) {
            //   message.error(err.err_msg || '好像出错了~');
            //   return err;
            // }
            // if (hasProperty(err, 'errno') && err.err_show !== false) {
            //   message.error(err.errmsg || '好像出错了~');
            //   return err;
            // }
            // if (err.message && err.message.includes('timeout')) {
            //   message.error('请求超时~');
            //   return {};
            // }
             console.log('=-=========输出', err.message);
            //  message.error('服务异常！', err);
            return {};
        });
}
/**
 * post method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function post(url, params, options) {
    return request({
        url,
        // ...baseOptions,
        method: 'post',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        data: JSON.stringify(params),
        ...options,
    });
}

/**
 * postJson method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function postJson(url, params, options) {
    return request({
        url,
        //...baseOptions,
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(params),
        ...options,
    });
}

/**
 * get method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function get(url, params, options) {
    return request({
        //...baseOptions,
        url,
        params,
        ...options,
    });
}

export {
    get,
    post,
    postJson
}