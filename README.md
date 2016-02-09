# js-widget-generator

$.fn.widgetGenerator предназначен для облегчения создания jquery-плагинов. Выходным значением является функция, которая может
быть использована в jQuery.fn

## Установка

1. Загрузить через git: https://github.com/novokshonovev/js-widget-generator.git
или 
2. Установка через composer 
2.1 Добавить в composer.json проекта:

* репозиторий 
```json
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/novokshonovev/js-widget-generator"
        }
    ],
```
* и зависимость
```json
    "require": {
        "dowlatow/js-widget-generator": "dev-master"
    },
```
2.2 Выполнить установку: ``composer install``



## Параметры

**Параметр**(значение по умолчанию) - Описание:

* **defaultParams** ({}) - набор параметров по умолчанию для генерируемого плагина;
* **dataParam** (null) - строковый параметр, который используется как идентификатор для data-параметра при присвоении объекта-плагина элементу;
* **generator** (null) - функция, которая генерирует объект-плагин, входные параметры $owner (элемент, на котором использован плагин) и params (параметры вызова);
* **customStorage** (false) - при значении false объект-плагин хранится в data-атрибуте элемента-владельца, в противном случае - общий реестр плагинов (для адресации используется id владельца и data-param);

 
## Принципы работы

Объект-плагин, сгенерированный с помощью generator должен реализовывать логику плагина. Общедоступные методы плагина
должны быть реализованы в свойстве methods объекта плагина. В этом случае вызов метода осуществляется следующим образом:
jQuery(<selector).<pluginName>(<methodName>, <param>). При необходимости передать несколько параметров следует
использовать возможности объектов и массивов.

## Примеры использования

```JavaScript

var HelloWorld = function ($element, params) {

    this.methods = {
        show: function(text){
            alert($element.text() + params.text + text);
        }
    };
};

$.fn.helloWorld = $.fn.widgetGenerator(
    {
        text: 'Hello world'
    },
    'hello-widget', function ($element, params) {
        return new HelloWorld($element, params);
    }
);


$('a').helloWorld({text: 'Sample text'});

$('a').first().helloWorld('show', 'Surprise');

```