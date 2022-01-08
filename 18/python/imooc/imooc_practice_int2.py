# -*- coding: utf-8 -*-

"""慕课网 廖雪峰 变量和数据类型2"""

s = ('Python was started in 1989 by "Guido".\nPython is free and easy to learn.')
print s

print r'''
      "To be, or not to be": that is the question.
      Whether it's nobler in the mind to suffer.
      '''

print r'''
      静夜思

      床前明月光，
      疑是地上霜。
      举头望明月，
      低头思故乡。
      '''

print 2.5 + 10 / 4  # 4.5
print 2.5 + 10.0 / 4  # 5.0

a = 'python'
print 'hello,', a or 'world'    # hello, python    a 为True时返回 a 的值
b = ''
print 'hello,', b or 'world'    # hello world    b 为False时返回 'world'