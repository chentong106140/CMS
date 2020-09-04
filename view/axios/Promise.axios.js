//https://www.runoob.com/w3cnote/javascript-promise-object.html

var axios  = typeof exports === 'object' && typeof module === 'object' ?  require("axios")  : axios;

axios.defaults.baseURL = 'https://chentong.herokuapp.com';
axios.defaults.headers.common['Authorization'] = "chentong";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.post['Content-Type'] = 'text/plain';
axios.defaults.timeout = 5000;
axios.defaults.method = 'get';
axios.defaults.responseType = 'json';

//对请求数据进行处理后请求
axios.defaults.transformRequest = [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    //data = Qs.stringify({});
    console.log("transformRequest");
    //console.log(data);
    return data;
}];

//对响应数据进行处理后响应
axios.defaults.transformResponse = [function (data) {
    // 这里提前处理返回的数据
    console.log("transformResponse");
    //console.log(data);
    return data;
}];

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log("开始请求");
    //console.log(config);
    return config;
}, function (error) {
    console.log("开始请求报错");
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log("开始响应");
    //console.log(response);
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


function ajax(url) {
    return new Promise((resolve, reject) =>{
        axios.get(url,{auth:{username:"ctt",password:"123"}}).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
}


ajax("/").then(res =>{
    console.log("响应成功");
    console.log(res.data);
}).catch(res =>{
    console.log("响应失败");
    console.log(res.data);
});