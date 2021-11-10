/*
 * @Author: AlanGolphi
 * @Date: 2021-06-07 19:08:57
 * @LastEditTime: 2021-06-08 14:50:58
 */
const basicMap = new Map();

// 增
basicMap.set("1", "a");

// 删
basicMap.delete("1"); //删除某一个键
basicMap.clear(); //删除Map里所有的键值

// 改

basicMap.set("1", "lalala"); //重新set即修改
