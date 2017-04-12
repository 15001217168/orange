import '../../css/writer/writer.css';
import '../../css/writer/base.css';
import '../../font-awesome/fonts/fontawesome-webfont.woff';
import '../../font-awesome/fonts/fontawesome-webfont.eot';
import '../../font-awesome/fonts/fontawesome-webfont.svg';
$(function() {
    var Writer = function() {
        var _bindClick = function() {
            $('#ulContentList li').off().on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('#txtTitle').val($(this).find('span').html());
                var content_id = $(this).data('content_id');
                if (content_id != '0') {
                    $.post("/get_user_content_detail", {
                        content_id: content_id
                    }, function(result) {
                        if (!result.error) {
                            $('#txtTitle').val(result.data.title).data('content_id', content_id);
                            _editor.setMarkdown(decodeURIComponent(result.data.markdown));
                        } else {
                            alert(result.message);
                        }
                    });
                }
            });
            $('#ulContentList li a[data-type="delete"]').off().on('click', function() {
                var objLi = $(this).parent();
                var content_id = objLi.data('content_id');
                if (content_id != '0') {
                    $.post("/delete_content", {
                        content_id: content_id
                    }, function(result) {
                        if (!result.error) {
                            objLi.remove();
                            _editor.setMarkdown('');
                            $('#txtTitle').val('');
                        } else {
                            alert(result.message);
                        }
                    });
                } else {
                    objLi.remove();
                }
                return false;
            });
        };
        var _editor = this.editor;
        var _autoSave = function() {
            var title = $('#txtTitle').val(),
                id = $('#txtTitle').data('content_id'),
                html = _editor.getHTML(),
                markdown = _editor.getMarkdown();

            if (title.length == 0) {
                alert('标题不能为空');
                return;
            }
            if (html.length == 0 || markdown.length == 0) {
                alert('内容不能为空');
                return;
            }
            $.post('/save_content', {
                content_id: id,
                title: title,
                content: encodeURIComponent(html),
                markdown: encodeURIComponent(markdown),
                typeid: '0000'
            }, function(result) {
                if (!result.error) {
                    $('#ulContentList li.one-notebook.item.active').find('span').html(title).data('content_id', result.data.content_id);
                    $('#txtTitle').data('content_id', result.data.content_id);
                    //alert(result.message);
                } else {
                    alert(result.message);
                }
            });

        };
        this.initData = function() {
            $.post('/get_user_contents', {
                page_index: 1,
                page_size: 12,
                key: "",
                typeid: ''
            }, function(result) {
                if (!result.error) {
                    var data = {
                        list: result.data
                    };
                    var html = template('contentItem', data);
                    $("#ulContentList").html(html);
                    _bindClick();
                } else {
                    alert(result.message);
                }
            });
        };
        this.init = function() {
            var _self = this;
            $('#btnCreateContent').off().on('click', function() {
                $('#ulContentList li').removeClass('active');
                var html = template('contentItem', {
                    list: [{
                        id: 0,
                        title: '未命名内容',
                        is_active: true
                    }]
                });
                $('#ulContentList').append(html);
                _bindClick();
            });
            _self.initData();
            _editor = editormd("editormd ", {
                width: "100%",
                height: 700,
                path: "/js/plugins/editor.md/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                watch: false,
                toolbarIcons: function() {
                    return ["undo", "redo", "|", "bold", "del", "italic", "quote", "hr", "|", "h1", "h2", "h3", "h4", "h5", "|", "list-ul", "list-ol", "link", "upload", "code-block", "|", "watch", "preview", "fullscreen", "|", "save"]
                },
                saveHTMLToTextarea: true,
                toolbarIconTexts: {
                    save: "保存" // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
                },
                onchange: function() {
                    _autoSave();
                },
                toolbarCustomIcons: {
                    upload: '<label for="imgUpload" class="fa fa-picture-o" title="上传图片"></label>',
                },
                toolbarHandlers: {
                    save: function(cm, icon, cursor, selection) {
                        _autoSave();
                    },
                },
                onload: function() {
                    $('#imgUpload').on('change', function() {
                        $('#fileForm').ajaxSubmit(function(res) {
                            if (res.error) {
                                alert(res.message);
                            } else {
                                var img = '![](' + res.data.url + '  "")';
                                _editor.cm.replaceSelection(img);
                            }
                        });
                    });
                }
            });
        };
    };

    new Writer().init();
});