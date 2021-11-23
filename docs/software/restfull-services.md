---
title RESTfull сервіси
---
# RESTfull сервіси

REST (Representational State Transfer) використовує HTTP як протокол передачі даних для запитів і відповідей. API-інтерфейс RESTful може не відповідати всім офіційним характеристикам REST, зазначеним доктором Роєм Філдінгом , який вперше описав цю модель. Отже, API є «RESTful» або «REST-подібними». (Деякі розробники наполягають на використанні терміну «RESTful», коли API не відповідає всім характеристикам REST, але більшість людей просто називають їх «REST API»).

API REST можуть використовувати будь-який формат повідомлень, який хочуть використовувати розробники API, включаючи XML, JSON, Atom, RSS, CSV, HTML і інші. Незважаючи на різноманітність параметрів формату повідомлень, більшість API REST використовують JSON (нотацію об'єктів JavaScript) в якості формату повідомлень за замовчуванням. Вони використовують JSON, тому що він забезпечує легкий, простий і більш гнучкий формат повідомлень, який збільшує швидкість зв'язку.

Відмінною рисою REST є те, що API-інтерфейси REST фокусуються на ресурсах (тобто на речах, а не на дії) і способах доступу до ресурсів. Ресурси, як правило, є різними типами інформації. Ви отримуєте доступ до ресурсів через URL (Uniform Resource Locators), так само, як перехід за URL-адресою у вашому браузері дозволяє підключитися до інформаційного ресурсу. URL-адреси супроводжуються методом, який вказує, як ви хочете взаємодіяти з ресурсом. Загальні методи включають ```GET``` (читання), ```POST``` (створення), ```PUT``` (оновлення) і ```DELETE``` (видалення). Кінцева точка зазвичай включає параметри запиту, які визначають більш детальну інформацію про подання ресурсу. Наприклад, можна вказати (в параметрі запиту) обмеження на відображення 5 примірників ресурсу:

```
http://localhost:8080/api/presidents?limit=5&format=json
```

Кінцева точка показує весь шлях до ресурсу. Однак в документації ви зазвичай поділяєте цей URL на більш конкретні частини:
- Базовий шлях (базовий URL або хост) відноситься до загального шляху до API. У наведеному вище прикладі базовий шлях - [http://localhost:8080/api](localhost:8080/api);
- Відношення кінцевої точки до кінцевого шляху цієї точки. У наведеному прикладі це ```/presidents```;
- ```?limit=5&format=json``` частина кінцевої точки містить параметри рядка запиту для цієї точки.

У наведеному вище прикладі кінцева точка отримає ресурс ```homes``` і обмежить результат до 5 примірників. Буде повернуто відповідь в форматі JSON.

Можна мати кілька кінцевих точок, які посилаються на один і той же ресурс. Ось один з варіантів:

```
http://localhost:8080/api/presidents/{id}
```

Наведена URL-адреса може бути кінцевою точкою, яка витягує ресурс, що містить певний ідентифікатор.

## Підготовлення проекту

За основу будемо брати попередній проект та за допомогою команди ```npm install lodash``` і ```npm install uuid``` встановимо необхідні залежності:

```json {25,26}
{
  "name": "koa-restful",
  "version": "1.0.0",
  "description": "В цьому розділі розміщені програмні коди.",
  "main": "1.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server",
    "dev": "nodemon server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "@koa/cors": "^3.1.0",
    "@koa/router": "^10.1.1",
    "koa": "^2.13.4",
    "koa-bodyparser": "^4.3.0",
    "koa-cookie": "^1.0.0",
    "koa-logger": "^3.2.1",
    "koa-router": "^10.1.1",
    "koa-static": "^5.0.0",
    "lodash": "^4.17.21",
    "uuid": "^8.3.2"
  }
}
```

Бібліотека [lodash](https://www.npmjs.com/package/lodash) є однією з найбільш поширених бібліотек для оброблення масивів, колекцій об'єктів, тощо. Бібліотека [uuid](https://www.npmjs.com/package/uuid) дозволяє генерувати UUID (Universally Unique Identifier) - універсальні унікальні ідентифікатори.


## Розроблення контролера

Розробимо контролер, який реалізує CRUD-інтерфейс (Create, Read, Update, Delete) для нашої моделі ```./models/presidents.js```. Створимо файл ```./routes/controller.js```:

```js
const Presidents = require("../models/presidents")
const { findIndex, last, isUndefined } = require("lodash")
const { v4 } = require("uuid")


let _read = options => (options && !isUndefined(options.id)) ? Presidents.filter(p => p.id === options.id)[0] : Presidents


let _update = options  => {
    let result
    let index = findIndex( Presidents, p => p.id === options.id )
    if ( index >= 0 ) {
        Presidents[index] = options
        result = Presidents[index]
    }

    return result
}

let _create = options => {
    options.id = v4()
    Presidents.push( options )
    return last( Presidents )
}

let _delete = options => {
    let result
    let index = findIndex( Presidents, p => p.id === options.id )
    if ( index >= 0 ) {
        result = Presidents.splice( index, 1 )
    }
    return result
}


module.exports = {
    create: _create,
    read: _read,
    update: _update,
    delete: _delete
}
``` 

Спочатку імпортуємо нашу модель, потім - необхідні засоби з бібліотек ```lodash``` та ```uuid```.

Нагадаємо, що наша модель є колекцією об'єктів:

```js
module.exports = [
  {
    id: 1,
    name: "Barrac Obama",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/274px-President_Barack_Obama.jpg"
  },
  {
    id: 2,
    name: "Donald Trump",
    photo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"
  },
  {
    id: 3,
    name: "Joe Biden",
    photo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg"
  }
]
```

тому методи контролера реалізуються за допомогою її оброблення.

Функція зчитування <b>```_read```</b> приймає опціональний параметр ```options```, що містить інформацію про примірник моделі, який потрібно зчитати. В тому випадку, коли  ```options``` задана та містить поле ```id```, функція ```_read``` повертає примірник з затребуваним ```id```. Якщо примірник з таким ```id``` - відсутній, то функція поверне значення ```undefined```. Якщо параметр ```options``` - відсутній, або в ньому не визначено поле ```id```, то функція поверне всю колекцію.

Функція оновлення <b>```_update```</b> приймає параметр ```options```, що містить інформацію про примірник моделі, який потрібно оновити. За допомогою функції ```findIndex``` здійснюємо пошук індексу примірника, який потребує оновлення. Якщо такий примірник знайдений (```findIndex``` повертає значення рівне або більше 0), тоді дані з ```options``` перезаписуємо в знайдений примірник та повертаємо його з функції. У випадку, коли примірник не знайдений, функція повертає значення  ```undefined```.

Функція створення нового примірника моделі <b>```_create```</b> приймає параметр ```options```, що містить інформацію про примірник моделі, який потрібно створити. За допомогою функції ```v4()``` створюємо унікальний ідентифікатор примірника та додаємо новий примірник в кінець колекції. Функція повертає створений примірник моделі.

Функція видалення примірника моделі <b>```_delete```</b> приймає параметр ```options```, що містить інформацію про примірник моделі, який потрібно видалити. за допомогою ```findIndex``` здійснюємо пошук індексу примірника, який потребує видалення. Якщо примірник знайдений, видаляємо його за допомогою метода масива ```splice```. Функція повертає видалений примірник.

Модуль експортує об'єкт контроллера, який містить методи ```create```, ```read```, ```update``` та ```delete```, тобто реалізований CRUD-інтерфейс для моделі ```./models/presidents.js```.

## Розроблення роутера

В файлі ```./routes/index.js``` визначаємо обробники шляхів нашого RESTfull сервіса:


 ```js
const Router = require('koa-router')
const controller = require("./controller")
const { extend } = require("lodash")

let router = new Router()

router
    .post( "/presidents", (ctx, next) => {
        ctx.body = controller.create(ctx.request.body)
    })
    .get("/presidents", (ctx, next) => {
        ctx.body = controller.read({id: ctx.request.query.id})
    })
    .get("/presidents/:id", (ctx, next) => {
        ctx.body = controller.read({id: ctx.params.id})
    })
    .put( "/presidents", ( ctx, next ) => {
        ctx.body = controller.update( extend( {}, ctx.request.body, ctx.request.query ))
    })
    .put( "/presidents/:id", ( ctx, next ) => {
        ctx.body = controller.update( extend( {}, ctx.request.body, ctx.request.query, {id: ctx.params.id} ))
    })
    .delete("/presidents", ( ctx, next ) => {
        ctx.body = controller.delete( extend( {}, ctx.request.body, ctx.request.query ))
    })
    .delete("/presidents/:id", ( ctx, next ) => {
        ctx.body = controller.delete( {id: ctx.params.id} )
    })

module.exports = router 
 ```


В нашому сервісі використовується один ресурс [http://localhost:8080/presidents](http://localhost:8080/api/presidents), доступ до кінцевих точок здійснюється за двома шляхами:
- ```presidents```;
- ```presidents/:id```;

з допомогою методів HTTP-запитів ```POST``` (створення нового примірника), ```GET``` (зчитування моделі), ```PUT``` (оновлення примірника), ```DELETE``` (видалення примірника).

Параметри запитів можуть передаватися за допомогою ```params```, ```query``` та ```body```. Наприклад, такі url:
[http://localhost:8080/api/presidents?id=1](http://localhost:8080/presidents?id=1) та [http://localhost:8080/api/presidents/1](http://localhost:8080/presidents/1) повинні повертати однаковий результат.

За допомогою функції ```extend``` з бібліотеки ```lodash``` з наявних джерел параметрів, відповідно до методів HTTP-запитів,  формуємо ```options```, які передаються в методи контролера.

## Перевірка працездатності сервісу

Запуск сервісу здійснюється за допомогою команди:

```bash
npm start
```

Для перевірки працездатності сервісу будемо використовувати [Tabbed Postman - REST Client](https://chrome.google.com/webstore/detail/tabbed-postman-rest-clien/coohjcphdfgbiolnekdpbcijmhambjff).

Спочатку спробуємо використати різні варіанти зчитування даних:
- ```options```відсутні - зчитуємо всю колекцію
<center>
    <img src="/02_01.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
- ```options``` присутні у ```query```, але ```id``` не заданий - зчитуємо всю колекцію
<center>
    <img src="/02_02.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
- ```options``` присутні у ```params```
<center>
    <img src="/02_03.jpg" style="
    width:80%;
    margin:1em 0;    
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>
- ```options``` присутні у ```query```
<center>
    <img src="/02_04.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Перевіремо інші методи нашого сервісу.

Створимо новий примірник.

<center>
    <img src="/02_05.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Перевіремо, що він доданий в кінець колекції.

<center>
    <img src="/02_06.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Оновимо цей примірник.

<center>
    <img src="/02_07.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Первіремо оновлення.

<center>
    <img src="/02_08.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Видалимо його.

<center>
    <img src="/02_09.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Перевіремо, що примірник видалений.

<center>
    <img src="/02_10.jpg" style="
    width:80%;
    margin:1em 0;
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>