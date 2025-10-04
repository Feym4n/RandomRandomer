# RandomRandomer - Telegram Mini App

## Описание проекта

**RandomRandomer** — это мини-приложение Telegram для генерации случайных целых чисел в заданном диапазоне. Простой и быстрый инструмент для получения случайных значений с удобным интерфейсом, адаптированным под Telegram.

## Цели проекта

- **Простота использования**: Минималистичный интерфейс с интуитивным управлением
- **Быстрота работы**: Мгновенная генерация чисел без задержек
- **Адаптивность**: Корректная работа на всех устройствах (мобильные, планшеты, десктоп)
- **Интеграция с Telegram**: Полная совместимость с Telegram WebApp API
- **Доступность**: Поддержка светлой и тёмной тем Telegram

## Технологии

### Frontend
- **HTML5** — семантическая разметка с accessibility
- **CSS3** — адаптивные стили, CSS Grid/Flexbox, медиа-запросы
- **Vanilla JavaScript** — без фреймворков для минимального размера
- **Bootstrap 5** — компоненты и утилиты (CDN)

### Интеграции
- **Telegram WebApp API** — интеграция с Telegram
- **Crypto API** — криптографически стойкая генерация чисел
- **Google Fonts** — шрифт Montserrat

### Хостинг
- **GitHub Pages** — статический хостинг
- **HTTPS** — обязательное требование для Telegram Mini Apps

## Функциональность

### Основные возможности
- Генерация случайного целого числа в диапазоне [min, max]
- Интерактивное изменение границ диапазона (клик по полям)
- Валидация входных данных
- Анимация результата
- Поддержка клавиатуры (Enter для генерации)

### Telegram-специфичные функции
- Интеграция с MainButton Telegram
- Автоматическое переключение тем (светлая/тёмная)
- Компактный размер для Desktop Telegram
- Отключение подтверждения закрытия

## Структура проекта

```
RandomRandomer/
├── index.html          # Главная страница
├── styles.css          # Стили приложения
├── app.js             # Логика приложения
├── docs/              # Документация
│   ├── README.md      # Этот файл
│   └── roadmap.md     # План разработки
└── Rules/             # Правила проекта
    ├── project-rules.mdc
    └── roadmap-rules.mdc
```

## API Reference

### Telegram WebApp Integration
```javascript
// Инициализация
const tg = window.Telegram?.WebApp;
tg?.ready?.();
tg?.expand?.();

// MainButton
tg.MainButton.setText('Рандом');
tg.MainButton.onClick(callback);
tg.MainButton.show() / hide();

// Темы
tg.onEvent('themeChanged', callback);
tg.themeParams.bg_color; // Цвет фона Telegram
tg.themeParams.text_color; // Цвет текста Telegram
```


