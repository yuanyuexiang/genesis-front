<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
            <div>
                <div id="container" style="margin-bottom:1px;">
                    <p>
                        <span class="listAdministrator">当前系统所有的管理员</span>
                        <span class="addAdministrator">+添加管理员</span>
                    </p>
                </div>
                <div style="position:relative;">
                    <Table stripe :columns="columns" :data="administratorData" ref="table"></Table>
                    <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                                align-items: center;
                                justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                        <Spin size="large"></Spin>
                        <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                    </div>
                </div>
                <Page :total="this.administratorData.length" show-total @on-change="setInitPage" style="text-align:right;margin-top:50px"></Page>
            </div>
            </Col>
        </Row>
        <Modal v-model="modalPhone" title="修改账号/手机号" @on-ok="ok" @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <Form-item label="新手机号">
                    <Input placeholder="请输入手机号"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
var vue;
var uploader;

export default {
  name: "buttons",
  data() {
    return {
      progresshow: false,
      progresscount: 0,
      progresstatus: "active",
      progressspeed: 0,
        modalPhone: false,
      pageindex: 1,
      page_video_list: [],
      lodding: false,
      list_loadding: false,
      columns: [
        {
          title: "账号/手机号",
          key: "phone"
        },
        {
          title: "昵称",
          key: "name"
        },
        {
          title: "角色",
          key: "role"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //this.show(params.index);
                      this.modalPhone = true;
                    }
                  }
                },
                "修改权限"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "冻结账号"
              )
            ]);
          }
        }
      ],
      administratorData: [
        {
          phone: "15077826106",
          name: "John Brown",
          role: "editor",
          status: 0
        },
        {
          phone: "15077826106",
          name: "John Brown",
          role: "editor",
          status: 0
        }
      ]
    }; //return
  }, //data
  methods: {
    setInitPage(page) {
      this.page_video_list = [];
      this.pageindex = page;
      let video_list = this.video_list;
      for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
        if (i < video_list.length) {
          this.page_video_list.push(this.video_list[i]);
        }
      }
    }
  },
  mounted() {
    const vue = this;

    this.list_loadding = true;
    setTimeout(function() {
      vue.list_loadding = false;
    }, 2000);
    this.setInitPage(1);
  }
};
</script>

<style type="text/css" scoped>
.listAdministrator {
  display: inline-block;
  width: 50%;
  color: #2d8cf0;
  margin-top: 10px;
}
.addAdministrator {
  display: inline-block;
  width: 50%;
  text-align: right;
  color: #2d8cf0;
  margin-top: 10px;
}
.ivu-tag-dot {
  border: none !important;
}
tr.ivu-table-row-hover td .ivu-tag-dot {
  background-color: #ebf7ff !important;
}
.demo-i-circle-custom h1 {
  color: #3f414d;
  font-size: 10px;
  font-weight: normal;
}
.demo-i-circle-custom p {
  color: #657180;
  font-size: 8px;
  margin: 5px 0 2px;
}
.demo-i-circle-custom span {
  display: block;
  padding-top: 15px;
  color: #657180;
  font-size: 10px;
}
.demo-i-circle-custom span :before {
  content: "";
  display: block;
  width: 50px;
  height: 1px;
  margin: 0 auto;
  background: #e0e3e6;
  position: relative;
  top: -20px;
}
.demo-i-circle-custom span i {
  font-style: normal;
  color: #3f414d;
}
/*wz-btn wz-btn-primary wz-btn-small wz-btn-loading*/

.ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading) {
  padding: 2px 10px !important;
}
td.ivu-table-expanded-cell {
  background-color: white !important;
}
</style>