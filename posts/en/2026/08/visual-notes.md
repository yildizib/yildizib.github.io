---
title: "Visual notes are executable explanations"
slug: "visual-notes"
date: 2026-08-19
language: en
translation_key: "visual-notes"
description: "A small example of diagrams and mathematics living beside the prose they explain."
tags: ["writing", "visualization", "mathematics"]
permalink: /en/visual-notes/
mermaid: true
math: true
---

Diagrams and equations work best when they remain close to the sentence that needs them. They should clarify an idea, not become a separate document to maintain. This post is a compact catalogue of the formats available in the blog.

## 1. A publishing flow

```mermaid
flowchart LR
  A[Markdown source] --> B[Eleventy build]
  B --> C[Static blog]
```

## 2. An inline equation

A small expression such as $E = mc^2$ can stay inside the sentence it supports.

## 3. A display equation

$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$

## 4. A request sequence

```mermaid
sequenceDiagram
  participant Author
  participant Repository
  participant Pages
  Author->>Repository: Merge reviewed post
  Repository->>Pages: Run build workflow
  Pages-->>Author: Publish static page
```

## 5. A quadratic relationship

The roots of $ax^2 + bx + c = 0$ are defined by:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## 6. A state transition

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Review
  Review --> Published: approved
  Review --> Draft: revise
  Published --> [*]
```

## 7. A small matrix

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

## 8. A class relationship

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
  Post "1" --> "many" Derivative : provides source
```

## 9. An integral

For a continuously changing quantity, the accumulated value can be described as:

$$
\int_a^b f(x)\,dx
$$

## 10. A distribution

```mermaid
pie title Reading time allocation
  "Writing" : 45
  "Reviewing" : 30
  "Editing" : 25
```

## 11. An e-commerce order flow

```mermaid
flowchart TB
  Customer([Customer]) --> Storefront[Storefront]
  Storefront --> Catalog[Browse catalog]
  Catalog --> Cart[Shopping cart]
  Cart --> Checkout[Checkout]

  subgraph Commerce[Commerce services]
    Checkout --> Pricing[Price and promotion check]
    Pricing --> Inventory[Reserve inventory]
    Inventory --> Order[Create order]
  end

  subgraph Payment[Payment]
    Order --> Gateway[Payment gateway]
    Gateway --> Approved{Payment approved?}
    Approved -- No --> Cart
    Approved -- Yes --> Confirmation[Send confirmation]
  end

  subgraph Fulfillment[Fulfillment]
    Confirmation --> Warehouse[Pick and pack]
    Warehouse --> Carrier[Create shipment]
    Carrier --> Tracking[Send tracking link]
    Tracking --> Delivered([Delivered])
  end

  Delivered --> Support[Support, returns, and feedback]
  Support --> Customer
```

Keeping these elements in Markdown means the explanation, its source, and its visual form can evolve together.
