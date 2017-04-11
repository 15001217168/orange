
var ContentList=require('./content.jsx');

var data = [
    {
        id: '1',
        title: '测试数据',
        des: '测试数据',
        img:'img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: 'img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:''
        }
    },
    {
        id: '2',
        title: '测试数据',
        des: '测试数据',
        img:'img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: 'img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:''
        }
    },
    {
        id: '3',
        title: '测试数据',
        des: '测试数据',
        img:'img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: 'img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:''
        }
    },
    {
        id: '4',
        title: '测试数据',
        des: '测试数据',
        img:'img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: 'img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:''
        }
    },
    {
        id: '5',
        title: '测试数据fafafafaf',
        des: '测试数据',
        img:'img/aaa.jpg',
        favourite:'56',
        author: {
            token: 'abac',
            avatar: 'img/aa.jpg',
            nick_name: '刘雪松'
        },
        type:{
            name:'测试',
            code:''
        }
    },
];
ReactDOM.render(<ContentList url='#' data={data}/>,document.getElementById('content-list-container'));