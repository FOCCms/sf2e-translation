---
draft: true
title: Оффлайн вариант в Обсидиан
---
# Оффлайн вариант в Обсидиан

Данную версию перевода можно использовать локально практически также как и онлайн.

Для этого необходимо скачать программу https://obsidian.md/ и [архив с правилами](https://github.com/FOCCms/sf2e-translation/archive/refs/heads/v4.zip) . 

Затем распаковать архив в любое удобное место и затем в обсидиан открыть папку <путь до распакованного архива>/contents как хранилище.

Далее вы можете менять и редактировать версию правил как вам нравится.

Обсидиан лучше раскрывается с плагинами, поэтому я рекомендую использовать настройки и плагины указанные ниже как отправную точку для большего комфорта.

## Настройки и плагины

### Редактор

Ограничить максимальную длину строки: выкл
Свойства в документе: скрытый
Отображать номера строк: вкл
Проверять орфографию: вкл
Выбрать языки: английский, русский

### Файлы и ссылки

Всегда обновлять внутренние ссылки: вкл
Формат новой ссылки: **Абсолютный путь относительно хранилища** (обязательно! требуется для работы с quartz 4)

Место для вложенных файлов по умолчанию: В папке, указанной ниже
Путь к папке для вложенных файлов: assets

### Оформление

Основная тема: Тёмная
Темы: Things
Встроенный заголовок: выкл
Шрифт: 24
#### Фрагменты CSS кода

Нажать на иконку папки, создать файл, скопировать в него код. После возможно потребуется нажать рефреш (слева от иконки папки) и включить тумблер напротив появившегося названия файла

trait_bages.css
```css
/* Бейджи для ссылок на заметки в папке traits/ — и в чтении, и в Live Preview */
:where(.markdown-reading-view, .markdown-source-view.mod-cm6)
  a.internal-link[data-href^="traits/"],
:where(.markdown-reading-view, .markdown-source-view.mod-cm6)
  a.internal-link[href*="traits/"] {
  display: inline-block;
  padding: .05em .55em;
  border: 1px solid var(--color-accent);
  border-radius: 999px;
  background: var(--background-modifier-hover);
  font-weight: 600;
  text-decoration: none;
}
```

embed-headers.css
```css
/* Уменьшить заголовки только во встраиваемых заметках */

.markdown-embed h1 { font-size: 1.5em; }
.markdown-embed h2 { font-size: 1.3em; }
.markdown-embed h3 { font-size: 1.1em; }
.markdown-embed h4 { font-size: 0.9em; }
.markdown-embed h5 { font-size: 0.7em; }
.markdown-embed h6 { font-size: 0.5em; }
```

### Встроенные плагины
эти включены у меня, рекомендуется их оставить включенными. Остальные по желанию.

- Базы данных
- Быстрый переход
- Восстановление файлов
- Граф
- Исходящие ссылки
- Компоновщик заметок
- Обратные ссылки
- Предпросмотр страницы
- Структура
- Счётчик слов
- Файловый менеджер
- Шаблоны (в настройках указать папку к шаблонам `templates`)

### Сторонние плагины

#### Advanced Tables

#### Style Settings

1. перейти в настройки плагина
2. нажать import
3. вставить следующий текст и нажать save
```
{
  "minimal-advanced@@cursor": "default",
  "minimal-advanced@@hide-settings-desc": false,
  "minimal-advanced@@styled-scrollbars": false,
  "underwater-theme@@underwater-colors-dark": "nord-dark",
  "underwater-theme@@callout": "normal",
  "underwater-theme@@checkbox": "normal",
  "underwater-theme@@vault-icon": "vault-book",
  "things-style@@active-line": true,
  "things-style@@progress-color": true,
  "things-style@@em-color": "#74D279",
  "things-style@@mobile-black-background": false,
  "things-style@@default-font-color": false,
  "things-style@@text-highlight-bg-d": "#C0AA54",
  "things-style@@code-normal": "#D29652",
  "catppuccin-theme-settings@@catppuccin-theme-dark": "ctp-macchiato",
  "catppuccin-theme-settings@@catppuccin-theme-accents": "ctp-accent-blue",
  "catppuccin-icon-styles@@ctp-icon-hide": true,
  "catppuccin-interface-styles@@ctp-bold-folder-title": true,
  "anuppuccin-theme-settings@@anuppuccin-theme-dark": "ctp-mocha",
  "anuppuccin-theme-settings@@anuppuccin-light-theme-accents": "ctp-accent-light-sapphire",
  "anuppuccin-theme-settings@@anuppuccin-theme-accents": "ctp-accent-sapphire",
  "anuppuccin-theme-settings@@anp-active-line": "anp-current-line-border-only",
  "anuppuccin-theme-settings@@anp-callout-select": "anp-callout-sleek",
  "anuppuccin-theme-settings@@anp-custom-checkboxes": true,
  "anuppuccin-theme-settings@@anp-speech-bubble": true,
  "anuppuccin-theme-settings@@anp-codeblock-numbers": true,
  "anuppuccin-theme-settings@@anp-codeblock-wrap-edit": "none",
  "anuppuccin-theme-settings@@anp-list-toggle": false,
  "anuppuccin-theme-settings@@anp-callout-color-toggle": false,
  "anuppuccin-theme-settings@@list-indent": 2,
  "anuppuccin-theme-settings@@anp-toggle-preview": false,
  "anuppuccin-theme-settings@@anp-inline-title-vis": "block",
  "anuppuccin-theme-settings@@anp-color-transition-toggle": false,
  "anuppuccin-theme-settings@@anp-cursor": "pointer",
  "anuppuccin-theme-settings@@anp-h1-divider": false,
  "anuppuccin-theme-settings@@anp-decoration-toggle": true,
  "anuppuccin-theme-settings@@anp-bold-custom": "anp-bold-mauve",
  "anuppuccin-theme-settings@@anp-italic-custom": "anp-italic-green",
  "anuppuccin-theme-settings@@anp-highlight-custom": "anp-highlight-yellow",
  "anuppuccin-theme-settings@@anp-header-color-toggle": true,
  "anuppuccin-theme-settings@@anp-header-margin-toggle": true,
  "anuppuccin-theme-settings@@anp-header-divider-color-toggle": false,
  "anuppuccin-theme-settings@@hide-comment-indicators": false,
  "anuppuccin-theme-settings@@anp-canvas-dark-bg": true,
  "anuppuccin-theme-settings@@anp-colorful-frame-icon-toggle-dark": false,
  "anuppuccin-theme-settings@@anp-colorful-frame": false,
  "anuppuccin-theme-settings@@anp-custom-vault-toggle": false,
  "anuppuccin-theme-settings@@anp-file-icons": false,
  "anuppuccin-theme-settings@@anp-floating-header": false,
  "anuppuccin-theme-settings@@anp-collapse-folders": false,
  "anuppuccin-theme-settings@@anp-status-bar-select": "anp-floating-status-bar",
  "anuppuccin-theme-settings@@anp-alt-tab-style": "anp-default-tab",
  "anuppuccin-theme-settings@@anp-disable-newtab-align": false,
  "anuppuccin-theme-settings@@anp-bg-fix": false,
  "anuppuccin-theme-settings@@anp-hide-borders": false,
  "anuppuccin-theme-settings@@anp-layout-select": "none",
  "anuppuccin-theme-settings@@h3-font": "Noto Serif",
  "anuppuccin-theme-settings@@anp-editor-font-lp": "Noto Serif",
  "anuppuccin-theme-settings@@anp-editor-font-rv": "Noto Serif",
  "anuppuccin-theme-settings@@anp-editor-font-source": "Noto Serif",
  "anuppuccin-theme-settings@@anuppuccin-accent-toggle": true,
  "things-style@@fancy-code": true,
  "things-style@@fancy-highlight": true,
  "things-style@@no-kanban-styles": false
}
```

#### Omnisearch

##### Сочетания клавиш
Vault search: Ctrl + Shift + F  — будет конфликт с дефолт поиском. необходимо нажать на красный тег, появится конфликтующее сочетание. у "Поиск: Искать во всех файлах" нажать крестик возле сочетания.

#### Front Matter Title

##### Настройки
В разделе features включить всё

#### Folder Notes

##### Настройки
###### General
Folder note name template: index
(не "{{index}}", а просто "index")

Sync folder name: выкл

Enable front matter title plugin integration: вкл

###### Folder overview

Front Matter Title Plugin integration: вкл

#### Smart Typography

Curly Quotes: выкл

#### Shortcuts Extender

### Сочетания клавиш

Перезагрузить приложение без сохранения: Ctrl + Alt + Shift + R
(Нужно если заголовки отображаются некорректно)

Убрать все сочетания "Перейти на вкладку" – конфликтуют с Shortcuts Extender.

Убрать сочетание "Удалить абзац" (Ctrl+D) – можно случайно что то стереть при попытке поиска по странице (Ctrl + F)

Переключиться между режимами Динамический просмотр/Исходный код — Ctrl + R

Вставить шаблон — Alt + O