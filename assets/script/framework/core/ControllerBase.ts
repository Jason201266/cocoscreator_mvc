/*
 * @Description: controller基类
 * @Author: coder
 * @Date: 2019-08-01 10:39:43
 * @LastEditTime: 2019-08-13 23:45:25
 */
import ViewBase from "./ViewBase"
import ModelBase from "./ModelBase"
import SingletonFactory from "../utils/SingletonFactory"

export default abstract class ControllerBase {  
    //界面 component
    view_: ViewBase = null;

    //设置代理
    setDelegate<T extends ViewBase> (T) {
        this.view_ = T;
    };

    //获取指定model单例数据
    getModel<T extends ModelBase> (c: { new(): T }): T {
        return SingletonFactory.getInstance(c);
    }

    init_ () {
    }
    
};
