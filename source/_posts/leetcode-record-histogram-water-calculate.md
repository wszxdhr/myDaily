---
title: Leetcode解题记-直方图水量
date: 2020-05-23 14:16:32
categories: [Leetcode]
tags: [Leetcode,算法]
---

给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为 1。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的直方图，在这种情况下，可以接 6 个单位的水（蓝色部分表示水）。 感谢 Marcos 贡献此图。

<!-- more -->

https://leetcode-cn.com/problems/volume-of-histogram-lcci/

{% folding yellow open, 示例 %}

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6

{% endfolding %}

## 自己的解

{% folding cyan open, 详细代码 %}

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let result = 0
    function trimArr (arr) {
        let leftFinish = false
        let rightFinish = false
        let left = 0
        let right = 0
        for (let i = 0; i < arr.length; i++) {
            if (!leftFinish) {
                if (arr[i] > 0) {
                    leftFinish = true
                    left = i
                }
            }
            if (!rightFinish) {
                if (arr[arr.length - 1 - i] > 0) {
                    rightFinish = true
                    right = arr.length - i
                }
            }
            if (leftFinish && rightFinish) break
        }
        return arr.slice(left, right)
    }
    let tempHeight = trimArr(height)
    while (tempHeight.length > 0) {
        const rowResult = []
        let count = 0
        tempHeight.forEach((item, index) => {
            if (item <= 0) {
                count++
            }
        })
        result += count
        tempHeight = trimArr(tempHeight.map(item => item - 1))
    }
    return result
};
```

思路：从下往上逐行计算，算完一行把所有数据 -1 并trim一下，每次计算trim后里面含多少个小于等于0的数字，就是能装多少水

缺点：复杂度高了，嵌套了两层循环
{% endfolding %}

## 别人的思路
{% folding cyan open, 详细代码 %}
双指针。。。太强了
https://leetcode-cn.com/problems/volume-of-histogram-lcci/solution/shuang-zhi-zhen-jing-jian-dai-ma-1ms-by-walkerwk/

```java
class Solution {
    public int trap(int[] height) {
        if(height.length < 3) return 0;

        int left = 0, right = height.length - 1;
        int leftmax = height[left], rightmax = height[right];
        int res = 0;

        while(left < right){
            if(leftmax < rightmax){
                res += leftmax - height[left++];
                leftmax = Math.max(height[left], leftmax);
            }else{
                res += rightmax - height[right--];
                rightmax = Math.max(height[right], rightmax);
            }
        }

        return res;
    }
}
```

双指针从左右各取最大值记录，左指针算左面一格存水量，右指针算右侧一格存水量，均和各自最大值对比，相当于把一个直方图劈成两半计算，然后左右指针各多做一次(`while (left < rifht)`在最后判断为否之前还会测一次)来判断分割线两侧的存水量

思路清奇，实在是强

{% endfolding %}