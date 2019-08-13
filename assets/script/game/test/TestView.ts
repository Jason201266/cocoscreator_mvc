/*
 * @Description: 测试view类
 * @Author: coder
 * @Date: 2019-08-13 23:04:50
 * @LastEditTime: 2019-08-13 23:46:17
 */
const {ccclass, menu, property} = cc._decorator;

import ViewBase from "../../framework/core/ViewBase"
import TestController from "./TestController"

@ccclass
@menu("ui/TestView")
export default class TestView extends ViewBase {

    onLoad () {
        this.init_(TestController)
    }

}
