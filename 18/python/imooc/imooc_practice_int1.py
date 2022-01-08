# -*- coding: utf-8 -*-

"""慕课网 廖雪峰 变量和数据类型1"""

# 计算十进制整数 45678 和十六进制整数 0x12fd2 之和
num1 = 45678
num2 = 0x12fd2
sum1 = num1 + num2
print(sum1)  # 123456
int_num2 = int('0x12fd2', 16)
print(int_num2)  # 77778
sum2 = num1 + int_num2
print(sum2)  # 123456

# 请用字符串表示出Learn Python in imooc
str = 'Learn Python in imooc'
print(str)
# inp = raw_input('请输入"Learn Python in imooc": ')
# print(inp)

'''
计算以下表达式的布尔值
100 < 99
0xff == 255
'''
if 100 < 99:
    print('True')
else:
    print('False')  # False

print(100 < 99)  # False

if 0xff == 255:
    print('True')  # True
else:
    print('False')

print(0xff == 255)  # True

# 用多种方式打印出 hello, python.
print 'hello, python.'
print 'hello, ' + 'python'
print 'hello,', 'python'

'''
等差数列可以定义为每一项与它的前一项的差等于一个常数，可以用变量 x1 表示等差数列的第一项，用 d 表示公差，
请计算数列 1 4 7 10 13 16 19 ... 前 100 项的和。
'''


def list_num(n):
    x1 = sum_d = 1
    d = 3
    for i in range(1, n):  # 取值为 1-n，不包括 n
        sum_d += i * d + x1
    print sum_d


list_num(1)  # 1
list_num(2)  # 5
list_num(3)  # 12
list_num(100)  # 14950


def cal(n):
    x = 1
    d = 3
    s = 1
    for i in range(1, n):
        # x = x + d
        # s = x + s
        s += x + d * i
    print s


cal(100)

x1 = 1
d = 3
n = 100
x100 = x1 + (n - 1) * d
s = (x1 + x100) * 100 / 2
print s  # 14950

x1 = 1
d = 3
n = 100
x100 = x1 + (n - 1) * d
s = x1 * n + n * (n - 1) * d / 2
print s  # 14950
