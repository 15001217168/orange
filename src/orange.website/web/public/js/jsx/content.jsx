var Content = React.createClass({
    click: function (id, e) {
        window.location.href = '/td?id=' + id;
        return false;
    },
    render: function () {
        return (
            <li className="have-img">
                <a className="wrap-img" href="/p/{this.props.item.id}" target="_blank">
                    <img src={this.props.item.img}></img>
                </a>
                <div className="content">
                    <div className="author">
                        <a className="avatar" target="_blank" href="/u/{this.props.item.author.token}">
                            <img src={this.props.item.author.avatar} alt="96"></img>
                        </a>
                        <div className="name">
                            <a className="blue-link" target="_blank" href="/u/{this.props.item.author.token}">{this.props.item.author.nick_name}</a>
                            <span className="time"></span>
                        </div>
                    </div>
                    <a className="title" target="_blank" href="/p/{this.props.item.id}">{this.props.item.title}</a>
                    <p className="abstract">
                        {this.props.item.des}
                    </p>
                    <div className="meta">
                        <a className="collection-tag" target="_blank" href="#">{this.props.item.type.name}</a>
                        <a target="_blank" href="/p/{this.props.item.id}">
                            <i className="iconfont ic-list-read"></i>
                            {this.props.item.favourite}
                        </a>
                        <a target="_blank" href="/p/{this.props.item.id}">
                            <i className="iconfont ic-list-comments"></i>
                            {this.props.item.favourite}
                        </a>
                        <span>
                            <i className="iconfont ic-list-like"></i>
                            {this.props.item.favourite}
                        </span>
                    </div>
                </div>
            </li>
        );
    }
});
var ContentList = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        var _seft = this;
        if (this.props.url != '#') {
            $
                .post(this.props.url, {
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
        } else {
            _seft.setState({data: this.props.data});
        }
    },
    render: function () {
        var html = this
            .state
            .data
            .map(function (item) {
                return (
                    <Content item={item} key={item.id}></Content>
                );
            });
        return (
           <ul className="note-list" id="">
                {html}
            </ul>
        );
    }
});
module.exports=ContentList;
