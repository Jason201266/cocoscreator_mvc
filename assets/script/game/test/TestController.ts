/*
 * @Description: 测试controller类
 * @Author: coder
 * @Date: 2019-08-13 23:05:14
 * @LastEditTime: 2019-08-13 23:46:06
 */
import ControllerBase from "../../framework/core/ControllerBase"
import TestModel from "../model/TestModel"

export default class TestController extends ControllerBase {
    testModel: TestModel = null;

    init_ () {
        this.testModel = this.getModel(TestModel);
    }

    ontestBtn () {
        let testLabel = this.view_.nodeDict_["testLabel"]
        testLabel.getComponent(cc.Label).string = this.testModel.getTestStr()
    }
}