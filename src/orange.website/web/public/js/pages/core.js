    require('../../js/plugins/loading/style.css');
    //var $ = require('../jquery/jquery-2.1.1.min.js');
    $(function() {
        $('#divUser').hover(function() {
            $('#ulUserList').show();
        }, function() {
            $('#ulUserList').hide();
        });
        $('#loading').hide();
    });