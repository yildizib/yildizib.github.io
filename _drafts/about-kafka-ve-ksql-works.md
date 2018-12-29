---
layout: post
title: Kafka ve KSQL hakkında...
tags: 
- Kafka 
- Kafka SQL 
- Kafka Stream 
- Big Data
author: İbrahim YILDIZ
description: Apache Kafka ve Kafka SQL hakkında karalamalar...
---

## Apache Kafka 

### Giriş

Kafka temelde bir mesaj broker özelliklerini barındıran ama sadece brokerdan fazlası olan, confluent firmasıyla bir streaming platformuna doğru koşan (*koşmadan ziyade artık olmuştur diyebiliriz*) projedir.

Hikayesini her yerde bulabilirsiniz; LinkedIn de iç ihityaçları doğrultusunda, veritabanları ve çok fazla muhtelif kaynaklarda bulunan verileri vardır. Asıl olan ihtiyaçları bu sürekli veri akışını idare edebilecek/yönetebilecek bir çözmüm ihtiyacıdır diyebiliriz. 

Burada kurulan mimaride akan veriyi yönetebilmek, veri hacmi ve çeşitliliği arttıkça zor ve zahmetli olmaktadır.

Detaylı ve ingilizce metin '**Confluent**' firmasının kafka ile alaklı kitabında mevcut. Kitabın adı "[Kafka The Definitive Guide][1]"'dır. 

**Aşağıda neden kafka çözümünü ürettiklerini kendileri açıklıyorlar:** 

> ![about_kafka_and_ksql_img_1.png](/assets/images/about_kafka_and_ksql_img_1.png)


Kafkanın bir streaming platformu olarak; mesaj olaraj verileri alıp gönderme, kaydetme, onları işleme yeteneğine sahiptir. Diyerek devam ediyor kitap.


Reklamı bir kenera bırakırsak kafka artık sadece bir mesaj broker değil, ancak onuda içeren, daha fazlası bir platformdur. Artık kolayca kafka kümeleri oluşturabilirsiniz. Kafka kümesinde otomatik bir lider seçilir, kümeye dahil olan elemanlar üzerinde yük paylaşılır. 

İşte bu noktada küme oluşturma kolaylığı, küme üzerinde veri paylaşımı ve verinin kopyalarının problemlere karşı yönetilmesini de gerçekleşttirmesi, bunun çok kolay olması gayet memnun edici özelliklerinden.

Ayrıca hala tam anlamadığım noktaları olsa da streaming platform olarak akan veri üzerinde işlemlere de izin vermesi cabası... :). 

### Bazı tanımlar ve özellikleri














[1]: https://www.confluent.io/resources/kafka-the-definitive-guide/ "Kafka The Definitive Guide"