<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
                <div>
                    <div id="container">
                        <span class="allUser">当前公众号订阅用户</span>
                    </div>
                    <div style="position:relative;">
                        <Table stripe :columns="columns" :data="userList" ref="table"></Table>
                        <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                                                align-items: center;
                                                justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                            <Spin size="large"></Spin>
                            <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                        </div>
                    </div>
                    <Page :total="this.pageTotal" show-total @on-change="setInitPage" style="text-align:right;margin-top:10px"></Page>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import {
  deleteUser,
  listUser,
  getUserCount,
} from "api/user";
export default {
    name: "buttons",
    data() {
        return {
            columns: [
            {
                title: "用户类型",
                key: "subscribe",
                width: 100,
                render: (h, params) => {
                    let text = '';
                    if(params.row.subscribe === 1){
                        text = '订阅用户';
                    }else{
                        text = '未订阅用户';
                    }
                    return h("div", [
                    h("span", text)
                    ]);
                },
            },
            {
                title: "公众号ID",
                key: "openid",
                align: "center",
                width: 300,
            },
            {
                title: "昵称",
                key: "nickname",
                width: 100,
            },
            {
                title: "性别",
                key: "sex",
                align: "center",
                width: 100,
                render: (h, params) => {
                    let text = '';
                    if(params.row.sex === 1){
                        text = '男';
                    }else{
                        text = '女';
                    }
                    return h("div", [
                    h("span", text)
                    ]);
                }
            },
            {
                title: "城市",
                key: "city",
                width: 100,
            },
            // {
            //     title: "国家",
            //     key: "country"
            // },
            // {
            //     title: "省",
            //     key: "province",
            // },
            // {
            //     title: "语言",
            //     key: "language",
            // },
            // {
            //     title: "头像",
            //     key: "headimgurl",
            // },
            {
                title: "订阅时间",
                key: "subscribe_time",
                width: 200,
                align: "center",
                render: (h, params) => {
                    let now = new Date(params.row.subscribe_time*1000);
                    let year=now.getFullYear();    
                    let month=now.getMonth()+1;    
                    let date=now.getDate();    
                    let hour=now.getHours();    
                    let minute=now.getMinutes();    
                    let second=now.getSeconds();    
                    let text =  year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
                    return h("div", [h("span", text)]);
                }
            },
            // {
            //     title: "联盟ID",
            //     key: "unionid",
            // },
            {
                title: "备注",
                key: "remark",
            },
            // {
            //     title: "分组ID",
            //     key: "groupid",
            // },
            {
                title: "类别",
                key: "type",
                align: "right",
            }
            ],
            userList: [],
            pageTotal: 1,
            lodding: false,
            list_loadding: false,
        }
    },
    methods: {
        setInitPage(page) {
            this.listAllUser(page);
        },
        listAllUser(page) {
            listUser((page - 1) * 10,10)
                .then(response => {
                    const responseData = response.data;
                    const data = responseData.data;
                    console.log(data);
                    this.userList = data;
                    this.list_loadding = false;
                })
                .catch(error => {
                    console.log(error);
                });
            setTimeout(function() {
                this.list_loadding = false;
            }, 2000);
        },
        getAllUserCount() {
            getUserCount()
                .then(response => {
                    const responseData = response.data;
                    const data = responseData.data;
                    console.log(data);
                    this.pageTotal = data;
                })
                .catch(error => {
                    console.log(error);
                });
            setTimeout(function() {
                this.list_loadding = false;
            }, 2000);
        },
    },
    mounted() {
        this.list_loadding = true;
        this.getAllUserCount();
        this.listAllUser(1);
    }
}
</script>

<style type="text/css" scoped>
</style>