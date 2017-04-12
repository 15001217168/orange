       import '../../css/web.css';
       import '../../js/plugins/loading/style.css';
       (function($) {
           $('#loading').show();
       }($));
       $(function() {
           $('#divUser').hover(function() {
               $('#ulUserList').show();
           }, function() {
               $('#ulUserList').hide();
           });
           $('#loading').hide();
       });