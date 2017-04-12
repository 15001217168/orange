var  ContentList= require('../components/content.jsx');
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


ReactDOM.render(<ContentList url='#' data={data}/>,document.getElementById('content-list-container'));