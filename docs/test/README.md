# Тестування працездатності системи

## Автоматизація тестування сервісу

[Tabbed Postman - REST Client](https://chrome.google.com/webstore/detail/tabbed-postman-rest-clien/coohjcphdfgbiolnekdpbcijmhambjff) доволі зручний засіб для знайомства з новими веб-сервісами, але для повного тестування - занадто громіздкий.
Для тестування API нашого сервісу скористаємося тестовим фреймворком [jest](https://www.npmjs.com/package/jest) та бібліотекою [axios](https://www.npmjs.com/package/axios), яка дозволяє програмно ініціювать HTTP-запити.

Встановимо необхідні залежності за допомогою команди:

```bash
npm install --save-dev jest 
npm install --save-dev axios 
```

В файлі ```package.json``` додамо скрипт для тестування:

```json {7}
{
  "name": "koa-restful",
  "version": "1.0.0",
  "description": "В цьому розділі розміщені програмні коди.",
  "main": "1.js",
  "scripts": {
    "test": "jest",
    "start": "node server",
    "dev": "nodemon server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "axios": "^0.24.0",
    "jest": "^27.3.1",
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

Тепер за допомогою команди

```bash
npm test
```

```jest``` знайде всі файли, що в назві містять ```.test``` та запустить тестування. Але в нас ще немає тестів.

Модифікуємо ```server.js```:

```js {14-16}
const Koa = require("koa");
const Serve = require('koa-static');
const router = require('../../../edu-dis-labs/src/routes');
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default;
const config = require("./config")

let app = new Koa()
app.use(bodyParser());
app.use(cookie());
app.use(Serve(config.server.staticPath))
app.use(router.routes())

let server = app.listen(config.server.port,console.log(`** EDU JACE server starts at port ${config.server.port}`))

module.exports = server
```

Тепер модуль ```server.js``` експортує змінну ```server```, яку ми будемо використовувати в тесті для програмної зупинки сервера.

Створимо каталог для тестів ```./test```, та в ньому - файл ```./test/rest-api.test.js```:

```js
const server = require("../src/server")
const axios = require("axios")

const endpoint = "http://localhost:8080/presidents"

afterAll( () => server.close())


describe("read entities", () => {

    test("read complete collection without options", () => axios.get(endpoint)
        .then( resp => expect(resp.data.length).toBe(3) )
    )

    test("read one entity by id from params", () => axios.get(`${endpoint}/1`)
        .then( resp => expect(resp.data.name).toBe("Barrac Obama"))
    )

    test("read one entity by id from query", () => axios.get(`${endpoint}?id=1`)
        .then( resp => expect(resp.data.name).toBe("Barrac Obama"))
    )

    test("read empty by unresolved id", () => axios.get(`${endpoint}?id=5`)
        .then( resp => expect(resp.data.length).toBe(3))
    )

})

describe("test CRUD", () => {
    let entityId
    test("create, update, delete workflow", () => axios.post(endpoint,{
            name:"George Washington"
        })
            .then( resp => {
                entityId = resp.data.id
                expect(resp.data.name).toBe("George Washington")
                return axios.get(endpoint)
            })
            .then( resp => {
                expect(resp.data.length).toBe(4)
                return axios.put(`${endpoint}?id=${entityId}`, {
                    name:"George Washington",
                    photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/240px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
                })
            })
            .then( resp => {
                expect(resp.data.id).toBe(entityId)
                return axios.delete(`${endpoint}?id=${entityId}`)
            })
            .then( resp => {
                expect(resp.data[0].id).toBe(entityId)
                return axios.get(endpoint)
            })
            .then( resp => expect(resp.data.length).toBe(3))
    )
})
```
Імпортуємо змінну ```server``` з нашого сервера (зараз сервер запускається на порту 8080). Імпортуємо ```axios```. Визначаємо посилання на кінцеву точку нашого сервісу та розпочинаємо тестування.

По-перше, за допомогою ```afterAll``` визначаємо обробник , який ```jest``` запустить після виконання всіх тестів (нам потрібно зупинити сервер).

По-друге, за допомогою ```describe``` визначаємо два набори тестів:
- для перевірки зчитування даних (```read entities```);
- для перевірки CRUD-інтерфейса в робочому процесі (```test CRUD```).

Набір тестів ```read entities``` складається з 5 простих тестів. Оскільки операція виконання HTTP-запитів є асинхронною, то ```callback```, який визначається в функції ```test```, повинен повертати ```promise```. Цей ```promise```, наприклад для тесту ```read complete collection without options```, формується наступним чином.
1. За допомогою ```axios``` здійснюємо GET-запит за адресою [http://localhost:8080/presidents](http://localhost:8080/presidents) (```axios.get``` повертає ```promise```)
2. Визначаємо для цього промісу обробник ```then```, який активується, коли проміс спрацьовує (```axios.get``` повертає результат запиту). Обробник ```then``` також повертає ```promise```.
3. В цьому обробнику за допомогою ```expect(<testedValue>).toBe(<expectedValue>)``` перевіряємо, що довжина колекції дорівнює 3. тобто ми зчитуємо всю колекцію даних.

Аналогічно побудовані інші тести з цього набору.

Тестовий набір ```test CRUD``` містить один тест, який реалізує наступний робочий процес.
1. Створюється новий примірник даних. Його унікальний ідентифікатор запам'ятовується в змінній ```entityId```, яка використовується для перевірки результатів інших операцій.
2. Зчитується вся колекція, перевіряється її довжина.
3. Примірник даних оновлюється.
4. Він зчитується та перевіряється.
5. Примірник даних видаляється.
6. Знову зчитується вся колекція та перевіряється її довжина.

Результати тестування нашого сервісу наведені нижче.

```bash
PS D:\edu-dis-labs> npm test

> dis-edu@2.1.0 test
> jest

  console.log
    ** EDU JACE server starts at port 8080

      at Object.<anonymous> (src/server.js:14:52)

 PASS  test/rest-api.test.js
  read entities
    √ read complete collection without options (31 ms)
    √ read one entity by id from params (3 ms)
    √ read one entity by id from query (2 ms)
    √ read empty by unresolved id (2 ms)
  test CRUD
    √ create, update, delete workflow (20 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.734 s, estimated 1 s
Ran all test suites.                        
```

