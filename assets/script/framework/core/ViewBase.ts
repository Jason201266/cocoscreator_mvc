/*
 * @Description: view基类
 * @Author: coder
 * @Date: 2019-07-10 02:26:34
 * @LastEditTime: 2019-08-13 23:45:30
 */
import ControllerBase from "./ControllerBase"
import ModelBase from "./ModelBase";

//用于类名传入
interface NewClass_<T extends ControllerBase> {
    new(): T;
}

export default abstract class ViewBase extends cc.Component {
    //controller
    controller_ = null
    //节点
    nodeDict_ = {}; 
    //点击监听
    registerEvent_ = new Map<string, Function>();

    //初始化controller
    //初始化监听
    init_<T extends ControllerBase> (cName?: NewClass_<T>) {
        this.initComponent_();

        //区分：包含controller 和 无 controller
        //注意：一些简单的界面，不包含model数据相关的可不使用controller
        if (cName) {
            this.controller_ = new cName();
            this.controller_.setDelegate(this)
            this.controller_.init_()
        }

        this.initListener_()
    }

    //初始化组件查找
    initComponent_ () {
        this.nodeDict_ = {};

        let linkWidget = function(self, nodeDict_) {
            let children = self.children;
            for (let i = 0; i < children.length; i++) {
                let widgetName = children[i].name;
                if (nodeDict_[widgetName]) {
                    cc.error("component name duplication" + children[i].name);
                } else {
                    nodeDict_[widgetName] = children[i];
                }

                if (children[i].childrenCount > 0) {
                    linkWidget(children[i], nodeDict_);
                }
            }
        }.bind(this);
        linkWidget(this.node, this.nodeDict_);
    }

    // 添加监听
    initListener_ () {
        for (const key in this.nodeDict_) {
            if (this.nodeDict_.hasOwnProperty(key)) {
                const element = this.nodeDict_[key];
                let isBtn = element.getComponent(cc.Button)
                if (!isBtn) { continue }

                let callName = "on" + key
                if (this.controller_ && this.controller_[callName]) {
                    this.onRegisterEvent_(key, this.controller_[callName])
                }
                else if (this[callName]) {
                    this.onRegisterEvent_(key, this[callName])
                }
            }
        }
    }

    //注册点击监听事件
    onRegisterEvent_(name: string, callback: Function) {
        if (!this.nodeDict_[name]) {
            return
        }

        let self = this.controller_ != null ? this.controller_ : this 
        this.nodeDict_[name].on(cc.Node.EventType.TOUCH_END, callback, self);
        this.registerEvent_.set(name, callback);
    }

    //移除监听事件
    unRegisterEvent_(name: string, callback: Function) {
        let self = this.controller_ != null ? this.controller_ : this 
        this.nodeDict_[name].off(cc.Node.EventType.TOUCH_END, callback, self);
    }
}