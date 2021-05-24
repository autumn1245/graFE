/**
 * @desc 文件下载
 * @param {String} url 下载链接
 * @param {String} name 文件名
 *
 */
 export const downloadWithBlob = (url, name) => {
    fetch(url).then((res) =>
      res.blob().then((blob) => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = name;
        a.href = url;
        a.download = filename;
        a.click();
      })
    );
  };
  