---
title: "Gorsel notlar calistirilabilir aciklamalardir"
slug: "gorsel-notlar"
date: 2026-08-19
language: tr
translation_key: "visual-notes"
description: "Diyagramlarin ve denklemlerin acikladiklari metnin yaninda yasadigi kucuk bir ornek."
tags: ["yazma", "gorsellestirme", "matematik"]
permalink: /tr/gorsel-notlar/
mermaid: true
math: true
---

Diyagramlar ve denklemler, ihtiyac duyan cumleye yakin olduklarinda en iyi sonucu verir. Bir fikri aciklamali, bakimi gereken ayri bir belgeye donusmemelidirler. Bu yazi blogda kullanilabilecek bicimlerin kucuk bir katalogudur.

## 1. Bir yayin akisi

```mermaid
flowchart LR
  A[Markdown kaynak] --> B[Eleventy build]
  B --> C[Statik blog]
```

## 2. Satir ici denklem

$E = mc^2$ gibi kucuk bir ifade, destekledigi cumlenin icinde kalabilir.

## 3. Blok denklem

$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$

## 4. Istek sirasi

```mermaid
sequenceDiagram
  participant Author as Yazar
  participant Repository as Depo
  participant Pages
  Author->>Repository: Incelenmis yaziyi merge et
  Repository->>Pages: Build workflow calistir
  Pages-->>Author: Statik sayfayi yayinla
```

## 5. Ikinci dereceden iliski

$ax^2 + bx + c = 0$ denkleminin kokleri soyle tanimlanir:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## 6. Durum gecisi

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review
  Review --> Published: onay
  Review --> Draft: duzelt
  Published --> [*]
```

## 7. Kucuk bir matris

$$
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

## 8. Sinif iliskisi

```mermaid
classDiagram
  class Post {
    +title
    +language
    +tags
  }
  class Derivative {
    +platform
    +format
    +source_commit
  }
  Post "1" --> "many" Derivative : kaynak saglar
```

## 9. Integral

Surekli degisen bir niceligin birikmis degeri soyle ifade edilebilir:

$$
\int_a^b f(x)\,dx
$$

## 10. Dagilim

```mermaid
pie title Okuma zamani dagilimi
  "Yazma" : 45
  "Inceleme" : 30
  "Duzenleme" : 25
```

## 11. E-commerce siparis akisi

```mermaid
flowchart TB
  Customer([Musteri]) --> Storefront[Magaza arayuzu]
  Storefront --> Catalog[Katalogda gezin]
  Catalog --> Cart[Sepet]
  Cart --> Checkout[Odeme adimi]

  subgraph Commerce[Ticaret servisleri]
    Checkout --> Pricing[Fiyat ve kampanya kontrolu]
    Pricing --> Inventory[Stok ayir]
    Inventory --> Order[Siparis olustur]
  end

  subgraph Payment[Odeme]
    Order --> Gateway[Odeme gecidi]
    Gateway --> Approved{Odeme onaylandi mi?}
    Approved -- Hayir --> Cart
    Approved -- Evet --> Confirmation[Onay gonder]
  end

  subgraph Fulfillment[Teslimat]
    Confirmation --> Warehouse[Topla ve paketle]
    Warehouse --> Carrier[Kargo olustur]
    Carrier --> Tracking[Takip baglantisi gonder]
    Tracking --> Delivered([Teslim edildi])
  end

  Delivered --> Support[Destek, iade ve geri bildirim]
  Support --> Customer
```

Bu ogeleri Markdown icinde tutmak, aciklamanin, kaynaginin ve gorsel biciminin birlikte gelismesini saglar.
