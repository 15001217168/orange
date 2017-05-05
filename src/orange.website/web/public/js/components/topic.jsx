//主题列表
class Topic extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <div className="col-xs-8">
                <div className="collection-wrap">
                    <a className="avatar-collection" href={'/td/' + this.props.data.id}>
                        <img src={this.props.data.img} alt=""></img>
                    </a>
                    <h4>
                        <a href={'/td/' + this.props.data.id}>{this.props.data.name}</a>
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
};
class TopicList extends React.Component
{
    constructor(props)
    {
        super(props);
        var _seft = this;
        this.state = {
            data: []
        };
        $.post(this.props.url, {
            page_index: 1,
            page_size: 12,
            key: ""
        }, function (result) {
            if (result.error) {
                alert(result.message);
                _seft.setState({data: []});
            } else {
                _seft.setState({data: result.data});
            }
        });
    }
    render() {
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
}
module.exports.TopicList = TopicList;

class TopicHead extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <div>
                <a className="avatar-collection" href="/">
                    <img src={this.props.data.img}></img>
                </a>
                <a className="btn btn-success follow">
                    <i className="iconfont ic-follow"></i>
                    <span>关注</span>
                </a>
                <div className="btn btn-hollow js-contribute-button">
                    投稿
                </div>
                <div className="title">
                    <a className="name" href="/">{this.props.data.name}</a>
                </div>
                <div className="info">
                    收录了{this.props.data.content_count}篇文章 · {this.props.data.favourite_count}人关注 · {this.props.data.word_count}字
                </div>
            </div>
        );
    }
}
module.exports.TopicHead = TopicHead;

class HomeTopic extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <a
                className="col-xs-4 col-lg-3 back-drop"
                target="_blank"
                href={'/td/' + this.props.item.id}>
                <img src={this.props.item.img} alt="195"></img>
                <div className="name">{this.props.item.name}</div>
                <div className="mask"></div>
            </a>
        );
    }
}

class HomeTopicList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.data
        };
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
    }
    render() {
        var html = this
            .state
            .data
            .map(function (item) {
                return (
                    <HomeTopic item={item} key={item.id}></HomeTopic>
                );
            });
        return (
            <div class="row">
                {html}
                <a className="col-xs-4 col-lg-3" target="_blank" href="/t">
                    <div className="more-hot-collection">更多热门专题
                        <i className="iconfont ic-link"></i>
                    </div>
                </a>
            </div>
        );
    }
}
module.exports.HomeTopicList = HomeTopicList;
