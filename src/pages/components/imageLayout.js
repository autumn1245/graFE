import React, { ReactElement, FC, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { StarOutlined } from '@ant-design/icons';
import style from "./index.less";
import catery from "../../utils/classify";
const { catery: cateryList } = catery

const ImageLayout = ({srcArray,onClick,size=300,dispatch})  => {
    const [imageList, setImageList] = useState([]);
    const getPicInfoFromCoOS = async (src) => {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    }
                }
            };
            xhr.onerror = function () {
                console.log("error!");
            };
            xhr.open("GET", src + "?imageInfo");
            xhr.withCredentials = false;
            xhr.send(null);
        });
    };

    const getImageMessage = async (linkList) => {
        const linkMessageList = [];
        for (let i = 0; i < linkList.length; i++) {
            const item = linkList[i];
            const back = await getPicInfoFromCoOS(item.p_url);
            const ans = {};
            try {
                const { width, height } = JSON.parse(back);
                ans.width = width;
                ans.height = height;
            } catch (e) {
                throw "图片信息获取错误" + item;
            }
            linkMessageList.push({
                width: parseInt(ans.width) || 0,
                height: parseInt(ans.height) || 0,
                id:item.id,
                src: item.p_url,
                sid:item.p_sid
            });
        }
        return linkMessageList;
    };

    const collectionHandler = (id) => {
        const userID = localStorage.getItem("userId") || "0";
        if (userID==="0") {
            message.error('请先登录！')
            history.push('/login')
            return;
        }
       dispatch({
            type: 'collect/toStarPic',
            payload: {uid:userID,pid:id},
        })
    }

    const getImage = async () => {
        const linkMessageList = await getImageMessage(srcArray);
        setImageList(linkMessageList);
    };
    console.log(imageList,'imageList====')
    useEffect(() => {
        getImage();
    }, [srcArray]);
    return (
        <div className={`${style.flex} self`}>
            {imageList.map((item) => {
                return (
                    <div
                        className={style["flex-item"]}
                        key={item.src + Math.random()}
                        style={{ width: (item.width * size) / item.height }}
                        onClick={()=>onClick && onClick(item.id)}
                    >
                        <div style={{ paddingBottom: `${(item.height / item.width) * 100}%` }}></div>
                        <img src={item.src + "?imageMogr2/thumbnail/400x"} alt="" />
                        <div className={style["mark"]}>
                        <div className={style["mark__collection"]}>
                                <StarOutlined style={{ fontSize: 22 }} onClick={(e) => {
                                    e.stopPropagation();
                                    collectionHandler(item.id)
                                }
                                }/>
                            </div>
                            <div className={style["mark__message"]}>
                                    <span>{cateryList&&cateryList.find(each => {
                                        return each.id === item.sid
                                    }).name || ""}</span>          
                        </div>
                        </div>
                    </div>
                );
            })}
            <i className={style["last"]}></i>
        </div>
    );
};
export default ImageLayout;
