var Topic = React.createClass({
    click: function (id, e) {
        window.location.href = '/td?id=' + id;
        return false;
    },
    render: function () {
        return (
            <div
                className="col-xs-8"
                onClick={this
                .click
                .bind(this, this.props.data.id)}>
                <div className="collection-wrap">
                    <a className="avatar-collection" href="javascript:void(0);">
                        <img src={this.props.data.img} alt=""></img>
                    </a>
                    <h4>
                        <a href="javascript:void(0);">{this.props.data.name}</a>
                    </h4>
                    <p className="collection-description">{this.props.data.des}</p>
                    <a className="btn btn-success follow">
                        <i className="iconfont ic-follow"></i>
                        <span>关注</span>
                    </a>
                    <hr></hr>
                    <div className="count">
                        <a href="javascript:void(0);">{this.props.data.content_count}篇文章</a>{this.props.data.focus_count}·K人关注</div>
                </div>
            </div>
        );
    }
});
var TopicList = React.createClass({
    getInitialState: function () {
        return {
            data:[]
        };
    },
    componentDidMount: function () {
        var _seft=this;
        $.post(this.props.url, {
                page_index: 1,
                page_size: 12,
                key: ""
            }, function (result) {
                if (result.error) {
                    alert(result.message);
                } else {
                    _seft.setState({data: result.data});
                }
            });
    },
    render: function () {
        var html = this
            .state
            .data
            .map(function (item) {
                return (
                    <Topic data={item} key={item.id}></Topic>
                );
            });
        return (
            <div>
                {html}
            </div>
        );
    }
});
ReactDOM.render(
    <TopicList url='/get_topics'/>, document.getElementById('topic_list_container'));