/*
 * @Description: 测试model类
 * @Author: coder
 * @Date: 2019-08-13 23:05:31
 * @LastEditTime: 2019-08-13 23:45:48
 */
import ModelBase from "../../framework/core/ModelBase"

export default class TestModel extends ModelBase {
    testStr: string = "获取成功";

    getTestStr () {
        return this.testStr
    }
}