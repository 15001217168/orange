(function ($) {
    $(function () {
        $("#typeid").val($("#type").val()||"ios");
        $("#type").val($("#typeid option:selected").text());
        $("#typeid").off().on("change", function () {
            $("#type").val($("#typeid option:selected").text());
        });
    });
}(jQuery));