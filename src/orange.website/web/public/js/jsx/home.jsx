var  ContentList= require('../components/content.jsx');
var HomeTopicList=require('../components/topic.jsx').HomeTopicList;
var data = [
    {
        id: '1',
        title: '测试数据',
        des: '测试数据',
        img:'/img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: '/img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:'2'
        }
    },
    {
        id: '2',
        title: '测试数据',
        des: '测试数据',
        img:'/img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: '/img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:'2'
        }
    }
];

var toplistData=[
{
        id: '1',
        name: '测试数据',
        img:'/img/aaa.jpg',
    },
    {
        id: '2',
        name: '测试数据',
        img:'/img/aaa.jpg',
    }
];

ReactDOM.render(<ContentList url='#' data={data}/>,document.getElementById('content-list-container'));
ReactDOM.render(<HomeTopicList url='#' data={toplistData}/>,document.getElementById('topic-list-container'));