# -*- coding: utf-8 -*-

"""源自廖雪峰的博客 字符串和编码 一节"""
# Python提供了ord()和chr()函数，可以把字母和对应的数字相互转换：
a = ord('A')
print(a)  # 65
b = chr(65)
print(b)  # A

# Python在后来添加了对Unicode的支持，以Unicode表示的字符串用u'...'表示，比如：
cn = u'中文'
print(cn)  # 中文
# 写u'中'和u'\u4e2d'是一样的，\u后面是十六进制的Unicode码。因此，u'A'和u'\u0041'也是一样的。
md = u'中'
print(md)  # 中
md_u = u'\u4e2d'
print(md_u)  # 中

"""
字符串'xxx'虽然是ASCII编码，但也可以看成是UTF-8编码，而u'xxx'则只能是Unicode编码。
把u'xxx'转换为UTF-8编码的'xxx'用encode('utf-8')方法：
"""
s = u'ABC'.encode('utf-8')
print(s)  # ABC
s_cn = u'中文'.encode('utf-8')
print s_cn  # 中文

# 把UTF-8编码表示的字符串'xxx'转换为Unicode字符串u'xxx'用decode('utf-8')方法：
print 'abc'.decode('utf-8')  # abc
print '\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')  # 中文

"""
占位符：
%d  整数       %f  浮点数        %s  字符串         %x  十六进制整数
"""
print 'Hi %s! Good morning!' % 'Harry'  # Hi Harry! Good morning!
print 'Hi %s! You have $%d money.' % ('Harry', 10000000)  # Hi Harry! You have $10000000 money.
