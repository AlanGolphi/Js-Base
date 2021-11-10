/*
 * @Author: AlanGolphi
 * @Date: 2021-06-02 18:09:12
 * @LastEditTime: 2021-06-02 18:12:38
 */
//可以打断点按F5调试，即可看函数调用堆栈顺序
fun1 = () => {
	fun2();
};
fun2 = () => {
	fun3();
};
fun3 = () => {};

fun1();
