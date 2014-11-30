/* jshint strict: true, undef: true, browser: true, jquery: true */
/* global FlipClock */

(function () {
    'use strict';
    $.ajax({
        type: 'get',
        url: '/events',
        success: function (msg) {
            render(msg);
        }
    });

    // Rendering
    function render (events) {
        var $list = $('#list');
        Object.keys(events).forEach(function (name) {
            var $h3 = $('<h3/>').text(events[name].title);
            var $clock = $('<div/>').addClass('clock');
            var $descritpion = $('<div/>')
                                    .text(events[name].description)
                                    .addClass('description');

            // Countdown
            var clock = new FlipClock($clock, {
                autoStart: false,
                countdown: true
            });
            var thisDate = new Date().getTime();
            clock.setTime((events[name].date - thisDate) / 1000);
            clock.start();

            $list.append($h3).append($clock).append($descritpion);
        });
    }
    render({});
}());
