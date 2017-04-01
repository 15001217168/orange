var Topic = React.createClass({
    render: function() {
        return (this.props.titles.map(function(title){
            return <div className="col-xs-8">
                <div className="collection-wrap">
                    <a className="avatar-collection" target="_blank" href="/">
                        <img src="/img/a.jpg" alt=""></img>
                        </a>
                    <h4>
                    <a target="_blank" href="/">{title}</a></h4>
                    <p className="collection-description">本专题仅收录求职、简历、换工作、职业规划、招聘、职场干货、上班感悟、管...</p>
                    <a className="btn btn-success follow">
                        <i className="iconfont ic-follow"></i>
                        <span>关注</span></a>
                    <hr></hr>
                    <div className="count">
                    <a target="_blank" href="/">23673篇文章</a>·382.0K人关注</div>
                </div>
            </div>;
        }))
    }
});
ReactDOM.render( <Topic titles = {["你好","测试",'加油']} /> , document.getElementById('topic_list_container'));