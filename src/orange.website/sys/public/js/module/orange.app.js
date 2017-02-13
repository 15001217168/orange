(function ($) {
    $(function () {
        $("#typeid").val($("#type").val()||"ios");
        $("#type").val($("#typeid").val());
        $("#typeid").off().on("change", function () {
            $("#type").val($("#typeid").val());
        });
    });
}(jQuery));