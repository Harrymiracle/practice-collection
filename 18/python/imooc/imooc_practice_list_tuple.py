# -*- coding: utf-8 -*-

"""慕课网 廖雪峰 列表和元组"""

L = ['Adam', 'Lisa', 'Bart']
L[0], L[-1] = L[-1], L[0]  # 交换值
print L  # ['Bart', 'Lisa', 'Adam']

L.append('Jack')
print L  # ['Bart', 'Lisa', 'Adam', 'Jack']

L.insert(1, 'Lucy')
print L  # ['Bart', 'Lucy', 'Lisa', 'Adam', 'Jack']

L.pop(2)
print L  # ['Bart', 'Lucy', 'Adam', 'Jack']
