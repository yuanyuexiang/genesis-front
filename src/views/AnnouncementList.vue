<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
                <div>
                    <div id="container">
                        <span class="allAnnouncement">发布历史</span>
                    </div>
                    <div style="position:relative;">
                        <Table stripe :columns="columns" :data="announcementList" ref="table"></Table>
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
  deleteAnnouncement,
  listAnnouncement,
  getAnnouncementCount,
} from "api/announcement";
export default {
    name: "buttons",
    data() {
        return {
            columns: [
            {
                title: "是否群发",
                key: "is_to_all",
                width: 100,
                render: (h, params) => {
                    let text = '';
                    if(params.row.is_to_all === true){
                        text = '是';
                    }else{
                        text = '否';
                    }
                    return h("div", [
                    h("span", text)
                    ]);
                },
            },
            {
                title: "标签ID",
                key: "tag_id",
                align: "center",
                width: 80,
            },
            {
                title: "消息类型",
                key: "msgtype",
                width: 100,
            },
            {
                title: "内容",
                key: "content",
            },
            {
                title: "错误码",
                key: "errcode",
                width: 100,
            },
            {
                title: "错误",
                key: "errmsg",
                width: 100,
            },
            {
                title: "状态",
                key: "status",
                align: "center",
                width: 100,
                render: (h, params) => {
                    let text = '';
                    if(params.row.status === 1){
                        text = '已发布';
                    }else if(params.row.status === -1) {
                        text = '已取消';
                    }else {
                        text = '发布中';
                    }
                    return h("div", [
                    h("span", text)
                    ]);
                }
            },
            {
                title: "创建时间",
                key: "create_time",
                width: 150,
                align: "center",
                render: (h, params) => {
                    let now = new Date(params.row.create_time);
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
            {
                title: "发布时间",
                key: "publish_time",
                align: "center",
                width: 150,
                render: (h, params) => {
                    let now = new Date(params.row.publish_time);
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
            ],
            announcementList: [],
            pageTotal: 1,
            lodding: false,
            list_loadding: false,
        }
    },
    methods: {
        setInitPage(page) {
            this.listAllAnnouncement(page);
        },
        listAllAnnouncement(page) {
            listAnnouncement((page - 1) * 10,10)
                .then(response => {
                    const responseData = response.data;
                    const data = responseData.data;
                    console.log(data);
                    this.announcementList = data;
                    this.list_loadding = false;
                })
                .catch(error => {
                    console.log(error);
                });
            setTimeout(function() {
                this.list_loadding = false;
            }, 2000);
        },
        getAllAnnouncementCount() {
            getAnnouncementCount()
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
        this.getAllAnnouncementCount();
        this.listAllAnnouncement(1);
    }
}
</script>

<style type="text/css" scoped>
</style>