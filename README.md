# ci

[![Build Status](https://travis-ci.org/gcor/ci.svg?branch=master)](https://travis-ci.org/gcor/ci)
[![bitHound Overall Score](https://www.bithound.io/github/gcor/ci/badges/score.svg)](https://www.bithound.io/github/gcor/ci)

[Приложение](https://thawing-wave-71324.herokuapp.com/) выводит случайное число от -50 до 50. 


### Гитхаб ###
Запретил через гитхаб пушить в мастер. Каждую фичу можно добавить только через пулреквест и отправить в мастер только после проверок bitHound и Travis. 

### Сборка ###
В проекте для сборки использовал gulp, для тестирования mocha и chai, для линтинга eslint. Чтобы приложение собралось на сервере, в package.json добавлен скрипт `"postinstall": "gulp build"`, а в Travis шаг `before_install`

### Логи ###
Heroku может передавать логи:
* приложения: На картинке те, что с app[web.1]. Показываются `console.timeEnd('render')`, `Node app is running on port 13542` и другие.
* системные: те что с `heroku[router]`.
 * `at=info` — тип сообщения
 * `method=GET` — HTTP метод
 * `path="/"` — HTTP путь
 * `host=thawing-wave-71324.herokuapp.com` — HTTP заголовок хост
 * `request_id=463f9314-a323-4f93-8a90-1f61e89fecf3` — id запроса
 * `fwd="109.252.105.212"` — заголовок X-Forwarded-For
 * `dyno=web.1` — имя контейнера, который обслуживает запрос
 * `connect=1ms` — время, затраченное за соединение с бэкендом
 * `service=5ms` — время, затраченное на передачу данных между бэкендом и клиентом
 * `status=200` — Код http ответа
 * `bytes=407` — Число переданных байтов с бэкенда на клиент

* логи api: Например, `heroku[api]: Deploy 4611dc4 by gcor.media@gmail.com`, `heroku[api]: Release v21 created by gcor.media@gmail.com`

![logs](https://hsto.org/files/2d9/28a/547/2d928a547ee24b39ab17a0430da7da44.png)

### UptimeRobot ###
Сервис для мониторинга доступности ресурса по http(s), наличию ключевых слов, пингу и порту.

![uptime](https://hsto.org/files/450/ff0/8cd/450ff08cd0e24b64b6573588c28d29e2.png)


