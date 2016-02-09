(function ($) {

    var widgets = {};

    $.fn.widgetGenerator = function (defaultParams, dataParam, generator, customStorage) {

        return function (method, methodParams) {

            var $this = $(this),
                params = {};

            if (typeof method == 'object') {
                params = method;
                method = undefined;
                methodParams = undefined;
            }

            params = $.extend({}, defaultParams, params);

            var getWidget = function ($owner) {

                var widget;

                if (!customStorage) {

                    widget = $owner.data(dataParam);

                    if (!widget) {
                        widget = generator($owner, params);
                        $owner.data(dataParam, widget);
                    }

                    return widget;
                }

                var widgetKey = dataParam + '||' + $owner.attr('id');
                widget = widgets[widgetKey];
                if (!widget) {
                    widget = generator($owner, params);
                }
                widgets[widgetKey] = widget;

                return widget;
            };

            if (method) {

                var widget = getWidget($this.first());

                if (!widget.methods[method]) {

                    throw 'Unknown method ' + method;

                }

                return widget.methods[method].call(widget, methodParams);
            }

            $this.each(function () {
                getWidget($(this));
            });

            return $this;
        };
    };
})(jQuery);