# -*- coding: utf-8 -*-

age = 20
if age > 18:
    print ('You age is', age)
    print('adult!')

"""
小明身高1.75，体重80.5kg。请根据BMI公式（体重除以身高的平方）帮小明计算他的BMI指数，并根据BMI指数：

低于18.5：过轻
18.5-25：正常
25-28：过重
28-32：肥胖
高于32：严重肥胖
"""

stature = 1.75
weight = 80.75
BMI_rate = weight / (stature ** 2)
print BMI_rate
if BMI_rate < 18.5:
    print('过轻！')
elif BMI_rate < 25:
    print('正常。')
elif BMI_rate < 28:
    print('过重！')
elif BMI_rate < 32:
    print('过重！')
else:
    print('严重肥胖')
