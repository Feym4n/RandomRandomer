# Инструкции по развертыванию RandomRandomer

## Быстрый старт

### 1. Локальная разработка
```bash
# Клонирование
git clone https://github.com/feym4n/RandomRandomer.git
cd RandomRandomer

# Запуск локального сервера
python -m http.server 8000
# Откройте http://localhost:8000
```

### 2. Публикация на GitHub Pages

#### Настройка Pages
1. Перейдите в Settings репозитория
2. Pages → Source: Deploy from a branch
3. Branch: `main`
4. Folder: `/ (root)`
5. Save

#### URL приложения
После настройки Pages будет доступен по адресу:
`https://feym4n.github.io/RandomRandomer/`

### 3. Подключение к Telegram Bot

#### Через BotFather
1. Откройте `@BotFather` в Telegram
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Bot Settings → Menu Button → Add Web App
5. Заполните:
   - **Name**: `Random`
   - **URL**: `https://feym4n.github.io/RandomRandomer/`
6. Save

#### Проверка работы
1. Откройте бота в Telegram
2. Нажмите кнопку меню (появится после настройки)
3. Проверьте:
   - Генерация чисел работает
   - MainButton активна
   - Переключение тем работает
   - Размер приложения компактный

## Обновление приложения

### Процесс деплоя
```bash
# Внесите изменения в код
git add .
git commit -m "feat: описание изменений"
git push

# Обновите URL в BotFather (добавьте версию)
# https://feym4n.github.io/RandomRandomer/?v=2025-10-03-8
```

### Принудительное обновление кэша
Telegram кеширует мини-приложения. Для обновления:
1. Измените URL в BotFather, добавив версию: `?v=YYYY-MM-DD-N`
2. Или полностью пересоздайте Web App в BotFather

## Отладка

### Проверка в браузере
1. Откройте `https://feym4n.github.io/RandomRandomer/` в браузере
2. Откройте DevTools (F12)
3. Проверьте консоль на ошибки
4. Проверьте работу генерации чисел

### Проверка в Telegram
1. Откройте мини-приложение в Telegram
2. Откройте DevTools (если доступно)
3. Проверьте логи темы в консоли
4. Протестируйте все функции

## Структура файлов

```
RandomRandomer/
├── index.html          # Главная страница
├── styles.css          # Стили (читабельные)
├── app.js             # Логика (читабельная)
├── docs/              # Документация
│   ├── README.md      # Полная документация
│   ├── roadmap.md     # План разработки
│   └── DEPLOYMENT.md  # Этот файл
└── Rules/             # Правила проекта
    ├── project-rules.mdc
    └── roadmap-rules.mdc
```

## Требования

### Минимальные требования
- Современный браузер с поддержкой ES6+
- HTTPS для Telegram Mini Apps
- JavaScript включен

### Рекомендуемые браузеры
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что URL доступен по HTTPS
3. Проверьте настройки BotFather
4. Создайте issue в GitHub репозитории
