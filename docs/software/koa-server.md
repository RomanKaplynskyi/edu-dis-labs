---
title Розроблення веб-сервера за допомогою KOA
---
# Розроблення веб-сервера за допомогою KOA
## Підготовлення проекту

Для початку роботи необхідно встановити [Node.js](https://nodejs.org/uk/) та [nodemon](https://www.npmjs.com/package/nodemon)

Перевірити це встановлення за допомогою команд:

```bash
node --version                                                                                 
v16.10.0                                                                                                                                 
                                                                                                                                         
npm --version                                                                                  
7.24.0     
```

На наступному кроці треба створити каталог проекту, перейти в нього та ініціювати проект за допомогою команди:

```bash
npm init
```
### Файлова структура


Після цього, створити наступну файлову структуру:

```bash
.
├───assets                                                                                                                               
├───models                                                                                                                               
├───routes
└── package.json             
```
Призначення каталогів:
- **assets** - статичні файли;
- **models** - файли, що експортують моделі даних;
- **routes** - файли, що експортують обробники запитів.

### Встановлення залежностей

Встановіть необхідні для роботи пакети:

```
npm install koa
npm install @koa/cors
npm install koa-router
npm install koa-bodyparser
npm install koa-logger
npm install koa-static
npm install koa-bodyparser
npm install koa-cookie
```

Встановлені залежності будуть додані в файл ```package.json```, який повинен мати наступний вигляд:

```json
{
  "name": "koa-getting-started",
  "version": "1.0.0",
  "description": "В цьому розділі розміщені програмні коди.",
  "main": "1.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
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
    "koa-static": "^5.0.0"
  }
}
```

В секцію ```scripts``` додамо скрипти для запуску сервера в ```production``` та ```development``` режимах

```json {8-9}
{
  "name": "koa-getting-started",
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
    "koa-static": "^5.0.0"
  }
}
```

## Конфігурування сервера

Необхідність модуля конфігурування обумовлена бажанням швидко переналаштовувати наш сервер. При цьому можна використовувати змінні середовища, доступ до яких здійснюється за допомогою об'єкту ```process.env.<env variable name>```. Так, наприклад при розгортанні на хмарних платформах PAAS зазвичай здійснюється динамічне призначення порта (системна змінна ```PORT```), на якому повинен бути запущений сервер. З іншого боку, при розробці сервера на локальному комп'ютері простіше зафіксувати конкретний порт ( в прикладі - 8080 ).

Таким чином, якщо існує системна змінна ```process.env.PORT```, тоді сервер запускаємо на цьому порту, інакше (режим розробки на локальному комп'ютері)  - на порту 8080.

Створимо файл  ```config.js``` з наступним кодом:

```js
module.exports = {
    server:{
        port: process.env.PORT || 8080,
        staticPath: "./assets"
    }
}
```

## Перший запуск

Створимо файл ```server.js``` з такими рядками:


```js
const Koa = require("koa")
const config = require("./config")

let app = new Koa()

app.listen(config.server.port,console.log(`** EDU JACE server starts at port ${config.server.port}`))
```

Ми імпортуємо встановлену за допомогою ```npm``` бібліотеку [koa](https://koajs.com/), а також наш файл конфігурації, створюємо примірник сервера та запускаємо його на відповідному до системного оточення порту. Після запуску сервера виводимо на консоль повідомлення про те, що сервер запущений.

Запустимо сервер за допомогою команди  ```npm run dev``` та отримаємо в консолі наступний текст:

```bash
npm run dev

> koa-getting-started@1.0.0 dev
> nodemon server

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
** EDU JACE server starts at port 8080
```


Бачимо, що при запуску ```npm run dev```  активується виклик ```nodemon server``` та наш сервер запускається на порту 8080 в оточенні  ```nodemon```, який забезпепує "гаряче перезавантаження" (тобто ми працюємо на локальному комп'ютері).


Тепер в браузері робимо запит за адресою <a href="http://localhost:8080">http://localhost:8080</a>, та маємо наступну відповідь від сервера:


<center>
    <img src="/1.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>



Наш сервер - запущений, але не обробляє запитів (принаймні типу ```GET```). Якби запуск не вдався - сторінка б не завантажилась.

## Налаштування проміжного ПЗ. Доступ до статичних файлів

KOA, по суті, являє собою інструмент серійного виклику функцій проміжної обробки певних отриманих даних та запитів.

Функції проміжної обробки (middleware) - це функції, які мають доступ до об'єкту запиту ```request```, об'єкту відповіді ```response``` і наступної функції проміжної обробки ```next``` в циклі оброблення запиту.
Функції проміжної обробки можуть виконувати такі завдання:
- Виконання будь-якого коду.
- Внесення змін до об'єкти запитів і відповідей.
- Завершення циклу "запит-відповідь".
- Виклик наступної функції тимчасової роботи з стека.

Якщо поточна функція проміжної обробки завершує цикл "запит-відповідь", вона повинна викликати ```next()``` для передачі управління наступної функції проміжної обробки. В іншому випадку запит зависне.


<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml
actor Client
participant app
participant middleware1
participant middleware2
participant middleware3

Client -> app: request
app -> middleware1: ctx, next
middleware1 -> middleware1
app <-- middleware1: next()
app -> middleware2: ctx, next
middleware2 -> middleware2
app <-- middleware2: next()
app -> middleware3: ctx, next
middleware3 -> middleware3: ctx.body = ...
app <-- middleware3
Client <-- app: response
@enduml

</center>


Однією з вбудованих функцій проміжної обробки є функція оброблення запитів до статичного контенту за допомогою інструмента ```koa-static```, яка дозволяє налаштувати доступ до статичних файлів.

Вдосконалимо наш сервер:

```js {2,7}
const Koa = require("koa")
const Serve = require("koa-static")
const config = require("./config")

let app = new Koa()

app.use(serve(config.server.staticPath))

app.listen(config.server.port, console.log(`** EDU JACE server starts at port ${config.server.port}`))
```
Для ```koa-static``` необхідно вказати шлях до статичних файлів. В даному випадку, цей шлях записаний в ```config.server.staticPath``` (значення ```"./assets"```)

В каталозі ```./assets``` створимо файл ```index.html```:

```html

<body>
    <h1> EDU JACE server </h1>
 </body> 
```

Перезавантажимо сторінку за адресою <a href="http://localhost:8080">http://localhost:8080</a>. Побачимо відповідь сервера:

<center>
    <img src="/2.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>


## Оброблення запитів

Маршрутизація визначає, як сервер відповідає на клієнтський запит до конкретної адреси (end point), яким є URI (або шлях), і певного методу запиту HTTP (GET, POST і т.п.).

Кожен маршрут може мати одну або кілька функцій обробки, які виконуються при зіставленні маршруту.

KOA підтримує всі методи маршрутизації, що відповідають методам стандартним HTTP (get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, та багато інших).

Шляхи маршрутів можуть бути рядками, шаблонами рядків або регулярними виразами:
- ```/``` - рядок, що позначає кореневий маршрут;
- ```/about``` - рядок, що позначає маршрут ```/about``` (наприклад, [http://localhost:8080/about](http://localhost:8080/about));
- ```/ab?cd``` - шаблон рядка, в якому є необов'язкове включення ```b``` (```acd```,```abcd```);
- ```/ab+cd``` - шаблон рядка, в якому є одне або декілька включень ```b``` (```abcd```,```abbcd```,```abbbcd```, ...);
- ```/ab*cd``` - шаблон рядка, в якому є будь-яка комбінація символів після ```b``` (```abcd```,```abxcd```,```ab123cd```, ...);
- ```/a/``` - регулярний вираз, який відповідає рядку з літерою ```a```;
- ```/.*fly$/``` - регулярний вираз, який відповідає рядку, якій закінчується на ```fly```.


Об'єкт ```Router``` являє собою ізольований екземпляр проміжного програмного забезпечення і маршрутів. Ви можете сприймати це як “міні-застосунок”, здатний виконувати лише проміжне програмне забезпечення та функції маршрутизації. Для використання маршрутизації необхідно лише підключити інструмент ```koa-router``` та створити новий екземпляр цього класу. Ви можете використовувати його як аргумент для ```app.use()```.

Після того як ви створили об'єкт маршрутизатора, ви можете додати проміжний шар і HTTP метод маршрутів (наприклад get, put, post, і так далі) до нього.

Уявімо, що наш сервер буде надавати доступ до даних про президентів Сполучених Штатів.

По-перше, змоделюємо сховище даних. Для цього в каталозі ```./models``` створимо файл ```presidents.js```:

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

По-друге, в каталозі ```./routes``` створимо файл ```index.js```:

```js
const Router = require('koa-router')
const Presidents = require("../models/presidents")
let router = new Router()

let getPresidents = (ctx, next) => {
  ctx.body = Presidents
}

router
        .get("/api/presidents", getPresidents)

module.exports = router
```


Створюємо примірник маршрутизатора (```Router```), імпортуємо нашу модель (```Presidents```), визначаємо функцію оброблення запиту (```getPresidents```), задаємо для ```router``` обробник, який відповідає шляху ```/presidents``` та експортуємо ```router```.

Останнє, в файлі ```server.js```підключаємо ```router``` та налаштовуємо маршрутизатор:

```js {3,9}
const Koa = require("koa")
const Serve = require("koa-static")
const router = require("./routes")
const config = require("./config")

let app = new Koa()

app.use(Serve(config.server.staticPath))
app.use(router.routes())

app.listen(config.server.port, console.log(`** EDU JACE server starts at port ${config.server.port}`))
```

Таким чином, наш сервер має обробник запитів за шляхом [http://localhost:8080/api/presidents](http://localhost:8080/api/presidents). В браузері звернемося за цією адресою і отримаємо відповідь:

<center>
    <img src="/3.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>


## Оброблення параметрів запиту

Додаткові параметри запиту можна передавати декількома способами:
- за допомогою частини шляху;
- за допомогою ```queryString```;
- за допомогою ```body```;
- за допомогою  ```cookie```.

Якщо в якості шляху використовувати спеціальний шаблон з параметрами ```/prePath/:param1/:param2/postPath```, тоді доступ до параметрів запиту (```param1```, ```param2```) може здійснюватися за допомогою ```query.params```.

```QueryString``` є частиною уніфікованого покажчика ресурсу (URL) , який присвоює значення зазначених параметрів. Рядок запиту зазвичай включає поля, додані до базової URL-адреси веб-браузером або іншим клієнтським додатком.
Типова URL-адреса, що містить ```queryString```, така: [https://example.com/over/there?name=ferret](https://example.com/over/there?name=ferret). В цьому випадку, шлях - це ```/over/there```, а  ```queryString``` - ```name=ferret```. Знак питання використовується як роздільник і не є частиною ```query```. Доступ до параметрів, які передані через ```queryString``` здійснюється за допомогою ```response.query```
В запитах ```POST```,```PUT``` та інших (окрім ```GET```) можна використати тіло запиту (```body```) для передачі додаткових атрибутів. Коли ви передаєте атрибути в ```body```, ви передаєте атрибути як частину об'єкта, описаного як ```json```.
Для зручності оброблення ```body``` використовують спеціальне middleware [body-parser](https://www.npmjs.com/package/body-parser), яке аналізує ```body``` у проміжному програмному забезпеченні перед вашими обробниками, доступними в ```req.body```. Цей модуль забезпечує наступні аналізатори:
- Парсер тіла JSON
- Аналізатор сирого тіла
- Синтаксичний розбір тексту тексту
- Синтаксичний аналізатор форми, кодований URL-адресою
  ```bodyParser``` надає різні способи створення проміжного програмного забезпечення. Усі проміжні засоби заповнюватимуть ```req.body```, коли заголовок запиту ```Content-Type``` відповідає ```type``` параметру, або порожнім об’єктом ( {}), якщо ```Content-Type``` не було зіставлено або сталася помилка. Наприклад, ```bodyParser.json``` повертає проміжне програмне забезпечення, яке лише аналізує ```json``` і переглядає запити лише там, де ```Content-Type```відповідає цій опції (```application/json```). Цей аналізатор приймає будь-яке кодування Unicode тіла та підтримує автоматичне розгортання gzip та deflate кодування.
  ```HTTP-cookie``` - у комп'ютерній термінології поняття, яке використовується для опису інформації у вигляді текстових або бінарних даних, отриманих від веб-сайту на веб-сервері, яка зберігається у клієнта, тобто браузера, а потім відправлена на той самий сайт, якщо його буде повторно відвідано. Таким чином веб-сервер помічає браузер користувача при відвідуванні. Кукі створюються за ініціативою скриптового сценарію на стороні веб-браузера. При наступному візиті сервер буде знати, що користувач вже тут був. За допомогою кукі-технології можна вивчити вподобання відвідувача. Кукі є одним із найточніших засобів визначення унікального користувача. Для зручності оброблення ```cookies``` використовують спеціальне middleware [cookie-parser](https://www.npmjs.com/package/cookie-parser), яке аналізує Cookie заголовок та заповнює ```req.cookies``` об’єктом, який закріплений за іменами файлів cookie.
  Для перевірки способів передачі параметрів в запитах, доповнемо файл ```./routes/index.js```:
```js {9-16,20,21}
const Router = require('koa-router')
const Presidents = require("../models/presidents")
let router = new Router()

let getPresidents = (ctx, next) => {
  ctx.body = Presidents
}

let echoRequest = (ctx, next) => {
  ctx.body = {
    param: ctx.params.param,
    queryString: ctx.request.query,
    body: ctx.request.body,
    cookie: ctx.cookie
  }
}

router
        .get("/api/presidents", getPresidents)
        .get("/echo/:param", echoRequest)
        .post("/echo/:param", echoRequest)

module.exports = router
```

Визначаємо новий обробник запитів ```echoRequest```, який у відповіді повертає параметри, передані в запиті. Потім назначаємо цей обробник на запити ```GET``` та ```POST``` за шляхом ```/echo/:param``` (```param``` - параметр запиту, як частина шляху).

Налагодим необхідне middleware в файлі ```server.js```:

```js {4-5,9-10}
const Koa = require("koa");
const Serve = require('koa-static');
const router = require('../../../edu-dis-labs/src/routes');
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default;
const config = require("./config")

let app = new Koa(
app.use(bodyParser());
app.use(cookie());
app.use(Serve(config.server.staticPath))
app.use(router.routes())

app.listen(config.server.port,console.log(`** EDU JACE server starts at port ${config.server.port}`))
```

В браузері здійснимо запит за адресою [http://localhost:8080/api/echo/1?name=Barrac&isCurrent=true](http://localhost:8080/api/echo/1?name=Barrac&isCurrent=true):

<center>
    <img src="/5.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>

Як бачимо, ```body``` - це пустий об'єкт, тому що в запитах ```GET``` ```body``` не підтримується.

Для реалізації запиту ```POST``` скористаємося розширенням [Tabbed Postman - REST Client](https://chrome.google.com/webstore/detail/tabbed-postman-rest-clien/coohjcphdfgbiolnekdpbcijmhambjff) для браузера Chrome:

<center>
    <img src="/4.jpg" style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    ">
</center>