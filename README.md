# 📝 Todo App

Современное TODO-приложение с разделением на фронтенд и бэкенд.

## 🚀 Технологии

* **Frontend:** Vue 3
* **State Management:** Pinia
* **Backend:** Laravel
* **Database:** MySQL
* **Containerization:** Docker & Docker Compose

---

## 📁 Структура проекта

```text
todo-app/
├── docker-compose.yml
├── README.md
├── backend/      # Laravel API
└── frontend/     # Vue 3 SPA
```

---

## ⚡ Быстрый запуск

### 1. Клонируйте проект

```bash
git clone <repository-url>
cd todo-app
```

### 2. Запустите контейнеры

```bash
docker compose up -d --build
```

### 3. Выполните миграции базы данных

```bash
docker compose exec backend php artisan migrate
```

---

## 🌐 Доступ к приложению

**Frontend**

```text
http://localhost:5173
```

**Backend API**

```text
http://localhost:8000/api/todos
```

---

## 📦 Используемые сервисы

| Сервис         | Назначение                                                  |
| -------------- | ----------------------------------------------------------- |
| Vue 3          | Пользовательский интерфейс                                  |
| Pinia          | Управление состоянием приложения и работа с CRUD-операциями |
| Laravel        | REST API                                                    |
| MySQL          | Хранение данных                                             |
| Docker Compose | Оркестрация контейнеров                                     |

---

## 🛠️ Основные команды

Запуск проекта:

```bash
docker compose up -d --build
```

Остановка проекта:

```bash
docker compose down
```

Просмотр логов:

```bash
docker compose logs -f
```

Выполнение миграций:

```bash
docker compose exec backend php artisan migrate
```

---

## 📌 Возможности

* ✅ Просмотр списка задач
* ✅ Создание новых задач
* ✅ Редактирование существующих задач
* ✅ Изменение статуса выполнения
* ✅ Удаление задач
* ✅ REST API на Laravel
* ✅ Управление состоянием приложения через Pinia
* ✅ Полностью контейнеризированный проект

---
