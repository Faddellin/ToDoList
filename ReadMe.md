# ToDoList
Web ToDoList приложение, фронтенд написан на React, бэкенд на Java

Система предназначена для ведения личного списка задач разными пользователями.


## Содержание
- [О проекте](#о-проекте)
- [Технологии](#технологии)
- [Установка](#установка)
- [Требования](#требования)
- [Статус](#статус)

## О проекте

Мой учебный проект представляет собой Full-stack Web приложение, разработанное на основе Spring Boot и React + TS.



## Технологии
- [Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Установка

Клонируйте репозиторий проекта:
```sh
git clone https://github.com/Faddellin/ToDoList.git
```

Изменить настройки Backend приложения можно по пути ToDoList\ToDoList_Java\src\main\resources\application.properties

Перед началом запуска Backend приложения необходимо создать в PostgreSql базу данных с названием, указанным в application.properties (по умолчанию: to_do_listdb)


Для запуска Web API необходимо перейти в папку проекта (YOUR_PATH\ToDoList\ToDoList_Java) и использовать команду:
```sh
mvn spring-boot:run
```


Для запуска Web сайта необходимо перейти в папку проекта (YOUR_PATH\ToDoList\ToDoList_Front) и выполнить следующие действия:
 - Для установки всех зависимостей:
```sh
npm install
```
- Для запуска приложения:
```sh
npm run start
```


Система готова к полноценной работе.

### Требования
Для работы проекта необходимы:
 - [PostgreSQL](https://www.postgresql.org/download/).
 - [Apache Maven](https://maven.apache.org/download.cgi)
 - [Node.js](https://nodejs.org/en/download/)



### Статус
Разработка системы завершена.

На текущий момент происходит разработка тестирования для данной системы.
