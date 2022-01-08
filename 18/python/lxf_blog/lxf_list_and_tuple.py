# -*- coding: utf-8 -*-

"""源自廖雪峰的博客 使用list和tuple 一节"""

classmates = ['Michael', 'Bob', 'Tracy']

classmates.append('Adam')
print classmates  # ['Michael', 'Bob', 'Tracy', 'Adam']

classmates.insert(1, 'Jack')
print classmates  # ['Michael', 'Jack', 'Bob', 'Tracy', 'Adam']

removed = classmates.pop()
print removed, classmates  # Adam ['Michael', 'Jack', 'Bob', 'Tracy']

removed_second = classmates.pop(-2)
print removed_second, classmates  # Bob ['Michael', 'Jack', 'Tracy']

classmates[1] = 'Sarah'
print classmates  # ['Michael', 'Sarah', 'Tracy']

classmates_2 = ('Michael', 'Bob', 'Tracy')
""""
    classmates_2这个tuple不能变了，它也没有append()，insert()这样的方法。其他获取元素的方法和list是一样的，
    你可以正常地使用classmates[0]，classmates[-1]，但不能赋值成另外的元素。
    只有1个元素的tuple定义时必须加一个逗号,，来消除歧义：
"""
t = (1,)
print t  # (1,)
