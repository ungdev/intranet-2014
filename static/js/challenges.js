/* jshint strict: true, undef: true, browser: true, jquery: true */

(function () {
    'use strict';

    $.ajax({
        type: 'get',
        url: '/challenges',
        success: function (msg) {
            render(msg);
        }
    });

    // Render links
    function render (challenges) {
        var $challengesList = $('#challengesList').empty();
        Object.keys(challenges).forEach(function (name, index) {
            var $li = $('<li/>');
            var $a = $('<a/>')
                        .attr('href', '#')
                        .attr('data-challenge', name);
            var $h4 = $('<h4/>')
                        .text(challenges[name].title);

            $h4.appendTo($a);
            $a.appendTo($li);
            $challengesList.append($li);
        });

        // Events
        var $links          = $('[data-challenge]');
        var $allChallenges  = $('#allChallenges');
        var $oneChallenge   = $('#oneChallenge');
        var $challengeId    = $('#challengeId');
        var $challengeTitle = $('#challengeTitle');
        var $challengeDescr = $('#challengeDescr');

        $links.off('click').click(function (e) {
            e.preventDefault();

            var $self = $(this);
            var link = $self.attr('data-challenge');

            if (!link || !challenges.hasOwnProperty(link)) {
                return;
            }

            var challenge = challenges[link];

            $challengeId.val(link);
            $challengeTitle.text(challenge.title);
            $challengeDescr.text(challenge.description);

            $allChallenges.hide();
            $oneChallenge.show();
        });

        $('#challengeSubmit').click(function (e) {
            e.preventDefault();
            var player = localStorage.getItem('id');
            var id = $('#challengeId').val();

            $.ajax({
                type: 'post',
                url: '/challenges/join/' + id,
                data: {
                    player: player
                }
            });
        });
    }

    render({});
}());
