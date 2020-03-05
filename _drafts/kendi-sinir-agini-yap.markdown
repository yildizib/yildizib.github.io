---
layout: "post"
title: "Kendi Sinir Ağını Yap"
date: "2020-03-03 23:47"
author: "İbrahim YILDIZ<yildizib@gmail.com>"
description: "Kendi sinir ağını nasıl yaparsın?"
tags: ["machine learning", "neural network"]
categories: ["blog"]
---

### Kendi Sinir Ağını Yap

```python
import pandas as pd
import numpy as np

for i in range(1,10):
  print(i)
```

* Burada yapılanları [Tariq Rashid][1] web güncesinde bulabilirsiniz.
$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$
$
    \left[
    \begin{matrix}
    1 & x & x^2 \\
    1 & y & y^2 \\
    1 & z & z^2 \\
    \end{matrix}
    \right]$


    $
    \begin{cases}
    a_1x+b_1y+c_1z=d_1 \\
    a_2x+b_2y+c_2z=d_2 \\
    a_3x+b_3y+c_3z=d_3
    \end{cases}
    $


    $
    \begin{aligned}
    a=&\left(1+2+3+  \cdots \right.
    & \cdots+ \left. \infty-2+\infty-1+\infty\right)
    \end{aligned}
    $


    $$
    \begin{array}{|c|c|c|}
    \hline
      \text{Set} & \text{Operation} & \text{Identity} \\
    \hline
       \mathbb{Z} & + & 0 \\
    \hline
       \mathbb{Q} & + & 0 \\
    \hline
       \mathbb{R} & + & 0 \\
    \hline
       \mathbb{Z} & \times & 1 \\
    \hline
       \mathbb{Q} & \times & 1 \\
    \hline
       \mathbb{R} & \times & 1 \\
    \hline
    \end{array}
    $$

    $$\begin{align}
       v + w & = 0  &&\text{Given} \tag 1\\
       -w & = -w + 0 && \text{additive identity} \tag 2\\
       -w + 0 & = -w + (v + w) && \text{equations $(1)$ and $(2)$}
    \end{align}$$

* fig 1.3 tabloda gördüğünüz...

$$
\begin{array}{rrrrr|rr}
               & x_1 & x_2 & s_1 & s_2 & s_3 &    \\ \hline
           s_1 &   0 &   1 &   1 &   0 &   0 &  8 \\
           s_2 &   1 &  -1 &   0 &   1 &   0 &  4 \\
           s_3 &   1 &   1 &   0 &   0 &   1 & 12 \\ \hline
               &  -1 &  -1 &   0 &   0 &   0 &  0
\end{array}
$$


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
<!-- Urls -->
[1]: https://google.com.tr "Tariq Rashid Blog"
<!-- Images & Files -->
[img_chain]: /assets/images/chain.gif "Chain Gif"
