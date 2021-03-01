Результат выполнения [тестового задания](http://git.15web.ru/hr/15web-front-test). 
Смотреть вживую: https://xkcd.zex.by

> Разработать новый интерфейс просмотра комиксов для сайта https://xkcd.com.
> * Только интерфейс просмотра комиксов. Другие страницы не нужны.
> * Интерфейс содержит: название, картинку, управляющие элементы, текстовую транскрипцию и дату размещения.
> * Оформление на ваше усмотрение. Вы делаете редизайн и должны быть довольны результатом.
> * При навигации меняется URL, комиксы должны быть доступны по прямой ссылке.
> * Разработка без использования фреймворков и библиотек. Чистые HTML, CSS и JavaScript. Будет достаточно простой сборки на Webpack. CSS фреймворки вроде Bootstrap тоже использовать не нужно.
> * Данные брать из открытого JSON-интерфейса https://xkcd.com/json.html.
> 
> При проверке задания внимание будет уделяться организации кода.  
> 
> Декомпозируйте структуру проекта, не пишите монолитные файлы скриптов и стилей.


## Установка зависимостей
`npm install`

## Релиз
Настроить веб-сервер на папку `dist`

## Config сервера nginx
(чтоб при любых запросах открывался "главный файл" index.html)
```
location / {
  try_files $uri $uri/ /index.html?$query_string;
}
```