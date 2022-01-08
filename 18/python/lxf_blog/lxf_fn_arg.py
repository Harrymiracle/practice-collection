# -*- coding: utf-8 -*-

"""源自廖雪峰的博客 函数--函数的参数 一节"""


def power_2(x):  # 二次方
    res = x * x
    print(res)
    return res


power_2(5)  # 25
power_2(15)  # 225


def power_n(x, n=2):  # 传入默认参数：带有默认参数的放后面
    res = 1
    while n > 0:
        res = res * x
        n -= 1
    print(res)
    return res


power_n(2, 3)  # 8
power_n(5, 3)  # 125
power_n(2)  # 4 使用默认参数才不会报错


# 默认参数使用例子--给小学一年级办入学
def student(name, gender, age=6, city='成都'):
    print name + ' ' + gender + ' ' + str(age) + ' ' + city


student('张三', '男')  # 张三 男 6 成都
student('李四', '男', 7, '遂宁')  # 李四 男 7 遂宁


# 默认值的问题
def test(x=[]):
    x.append('End')
    print(x)


test()  # ['End']
test()  # ['End', 'End']
test()  # ['End', 'End', 'End']
"""
原因解释如下：
Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，
每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。
所以，定义默认参数要牢记一点：默认参数必须指向不变对象！
"""


def test_2(x=None):
    if x is None:
        x = []
    x.append('End')
    print x


test_2()  # ['End']
test_2()  # ['End']
test_2()  # ['End']
