(function($) {
    $.date = {
        convert: function(d) {
            var date = new Date(d);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var second = date.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
        }
    };
    $.request = function(name) {
        var search = location.search.slice(1);
        var arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var ar = arr[i].split("=");
            if (ar[0] == name) {
                if (unescape(ar[1]) == 'undefined') {
                    return "";
                } else {
                    return unescape(ar[1]);
                }
            }
        }
        return "";
    }
    $.browser = function() {
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        };
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        }
        if (userAgent.indexOf("Chrome") > -1) {
            if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
                return "Chrome";
            } else {
                return "360";
            }
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        }
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        };
    }
    $.fn.formSerialize = function() {
        var element = $(this);
        var postdata = {};
        var checkBox = [];
        element.find('input,select,textarea').each(function(r) {
            var $this = $(this);
            var id = $this.attr('id');
            var name = $this.attr("name");
            var type = $this.attr('type');
            switch (type) {
                case "checkbox":
                    if ($this.is(":checked")) {
                        checkBox.push({ k: id, v: $this.val() });
                    }
                    break;
                case "radio":
                    if ($this.is(":checked")) {
                        postdata[name] = $this.val();
                    }
                    break;
                default:
                    var value = $this.val() == "" ? "&nbsp;" : $this.val();
                    if (!$.request("keyValue")) {
                        value = value.replace(/&nbsp;/g, '');
                    }
                    postdata[id] = value;
                    break;
            }
        });
        if (checkBox.length == 1) {
            postdata[checkBox[0].k] = checkBox[0].v;
        }
        if (checkBox.length > 1) {
            var arrks = [];
            $(checkBox).each(function() {
                arrks.push(this.v);
            });
            postdata['mult'] = arrks.join(',');
        }
        return postdata;
    };
    $.pagination = {
        index: 1,
        size: 10,
        total: 0,
        pages: 0,
        url: '#',
        tag: $("#pagination"),
        init: function() {
            this.index = this.tag.data("index");
            this.size = this.tag.data("size");
            this.total = this.tag.data("total");
            this.url = this.tag.data("url");
            this.pages = parseInt((this.total + this.size - 1) / this.size);
            this.changeState();
            $("#previous").on("click", function() {
                $.pagination.previous();
            });
            $("#next").on("click", function() {
                $.pagination.next();
            });
            $("#jump").on("click", function() {
                var i = $(this).val();
                $.pagination.jump(i);
            });
        },
        next: function() {
            if (this.index < this.pages) {
                var i = this.index + 1;
                this.jump(i);
            }
            return false;
        },
        previous: function() {
            if (this.index > 1) {
                var i = this.index - 1;
                this.jump(i);
            }
            return false;
        },
        jump: function(index) {
            if (this.index != index) {
                window.location.href = this.url + index;
            }
            return false;
        },
        changeState: function() {
            var objsf = $("#dataTable tbody tr").first().find("td").first();
            var objlf = $("#dataTable tbody tr").last().find("td").first();
            var sf = 0;
            var lf = 0;
            if ($(objlf).attr("id") != "noResult" && $(objsf).attr("id") != "noResult") {
                sf = $(objsf).html();
                lf = $(objlf).html();
            }
            $("#paginationText").html('显示 ' + sf + ' 到 ' + lf + ' 项，共 ' + this.total + ' 项');
            if (this.index <= 1 && this.pages != 1) {
                $("#previous").addClass("disabled");
                $("#next").removeClass("disabled");
                return false;
            }
            if (this.index >= this.pages && this.pages != 1) {
                $("#next").addClass("disabled");
                $("#previous").removeClass("disabled");
                return false;
            }
            if (this.index == 1 && this.pages == 1) {
                $("#previous").addClass("disabled");
                $("#next").addClass("disabled");
                return false;
            }
            $("#next").removeClass("disabled");
            $("#previous").removeClass("disabled");
        }
    };
    $(function() {
        $("#page-wrapper").css("min-hight", ($('body').height() - 40) + "px");
    });
})(jQuery);