<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="24">
      <div>
        <div id="container">
          <span class="allAdministrator">当前系统所有的管理员</span>
          <span class="addAdministrator">
            <a @click="modalAdministrator=true">+ 添加管理员</a>
          </span>
        </div>
        <div style="position:relative;">
          <Table stripe :columns="columns" :data="administratorList" ref="table"></Table>
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
    <Modal v-model="modalPhone" :scrollable="true" title="修改角色权限" @on-ok="onChangeAdministratorRole()" @on-cancel="cancel">
      <Form :label-width="80">
        <Form-item label="角色" prop="Role">
          <Select v-model="administratorChange.Role">
            <Option value="reporter">记者</Option>
            <Option value="editor">编辑</Option>
            <Option value="engineer">工程师</Option>
          </Select>
        </Form-item>
      </Form>
    </Modal>
    <!-- @on-ok="ok" @on-cancel="cancel"-->
    <Modal :scrollable="true" v-model="modalAdministrator" title="添加管理员" @on-ok="onAddAdministrator('administratorForm')">
      <Form ref="administratorForm" autoComplete="on" :model="administratorForm" :rules="ruleValidate" :label-width="100">
        <Form-item label="账号/手机号" prop="PhoneNumber">
          <Input v-model="administratorForm.PhoneNumber" autoComplete="on" placeholder="请输入手机号"></Input>
        </Form-item>
        <Form-item label="密码" prop="Password">
          <Input v-model="administratorForm.Password" autoComplete="on" placeholder="请输入密码"></Input>
        </Form-item>
        <Form-item label="昵称" prop="Name">
          <Input v-model="administratorForm.Name" autoComplete="on" placeholder="昵称"></Input>
        </Form-item>
        <Form-item label="角色" prop="Role">
          <Select v-model="administratorForm.Role">
            <Option value="reporter">记者</Option>
            <Option value="editor">编辑</Option>
            <Option value="engineer">工程师</Option>
          </Select>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  saveAdministrator,
  getAdministrator,
  updateAdministrator,
  updateAdministratorRole,
  updateAdministratorPassword,
  updateAdministratorStatus,
  deleteAdministrator,
  listAdministrator
} from "api/administrator";
import { isPhoneNumber } from "utils/validate";
import md5 from "js-md5";
var vue;
var uploader;

export default {
  name: "buttons",
  data() {
    const validatePhoneNumber = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      administratorChange: {},
      progresscount: 0,
      progresstatus: "active",
      progressspeed: 0,
      modalPhone: false,
      modalAdministrator: false,
      pageTotal: 1,
      lodding: false,
      list_loadding: false,
      formItem: "",
      ruleValidate: {
        PhoneNumber: [{ required: true, trigger: "blur", validator: validatePhoneNumber }],
        Password: [{ required: true, trigger: "blur", validator: validatePass }],
        Name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        Role: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      columns: [
        {
          title: "账号/手机号",
          key: "PhoneNumber"
        },
        {
          title: "昵称",
          key: "Name"
        },
        {
          title: "角色",
          key: "Role",
          render: (h, params) => {
            let text = '';
            if(params.row.Role === 'reporter'){
              text = '记者';
            }else if(params.row.Role === 'editor'){
              text = '编辑';
            }else if(params.row.Role === 'engineer'){
              text = '工程师';
            }else{
              text = '未知';
            }
            return h("div", [
              h("span", text)
            ]);
          }
        },
        {
          title: "状态",
          key: "Status",
          render: (h, params) => {
            var text = params.row.Status?"已激活":"已冻结";
            return h("div", [
              h("strong", text)
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            var text = params.row.Status?"冻结账号":"解冻账号";
            var color = params.row.Status?"error":"warning";
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
                      this.administratorChange = params.row;
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
                    type: color,
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirm(params.row);
                    }
                  }
                },
                text
              )
            ]);
          }
        }
      ],
      administratorList: [
        /*
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
        */
      ],
      administratorForm: {
        Name: "",
        PhoneNumber: "",
        Password: "",
        Status: true,
        Role: ""
      }
    }; //return
  }, //data
  methods: {
    setInitPage(page) {
      this.listAllAdministrator(page);
    },
    onAddAdministrator() {
      this.$refs.administratorForm.validate(valid => {
        if (valid) {
          const administrator = {
            Name: this.administratorForm.Name,
            PhoneNumber: this.administratorForm.PhoneNumber,
            Password: md5(this.administratorForm.Password),
            Status: this.administratorForm.Status,
            Role: this.administratorForm.Role
          };
          saveAdministrator(administrator)
            .then(response => {
              console.log(response);
              if(response.data.code == -1){
                this.$Message.error("用户账号已经存在！");
              }else{
                this.listAllAdministrator(1);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
        }
      });
    },
    onChangeAdministratorRole(){
      let role = this.administratorChange.Role;
      let id = this.administratorChange.ID;
      updateAdministratorRole(id,role).then(response=>{
          const responseData = response.data;
          const data = responseData.data;
          console.log(data);
      }).catch(error => {
          console.log(error);
      });
    },
    onChangeAdministratorStatus(administrator){
      let status = !administrator.Status;
      let id = administrator.ID;
      administrator.Status = status;
      /*
      updateAdministratorStatus(id,status).then(response=>{
          const responseData = response.data;
          const data = responseData.data;
          console.log(data);
      }).catch(error => {
          console.log(error);
      });*/
    },
    ok: () => {
      this.remove(params.index);
    },
    cancel: () => {},
    listAllAdministrator(page) {
      listAdministrator(10, (page - 1) * 10)
        .then(response => {
          const responseData = response.data;
          const data = responseData.data;
          console.log(data);
          this.administratorList = data.list;
          this.pageTotal = data.total;
          this.list_loadding = false;
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(function() {
        this.list_loadding = false;
      }, 2000);
    },
    confirm (administrator) {
        var text = administrator.Status?"冻结账号":"解冻账号";
        this.$Modal.confirm({
            title: text,
            content: '你确定'+text+'吗？',
            onOk: () => {
                this.onChangeAdministratorStatus(administrator);
            },
            onCancel: () => {
                this.$Message.info('Clicked cancel');
            }
        });
    }
  },
  mounted() {
    const vue = this;

    this.list_loadding = true;

    this.listAllAdministrator(1);
  }
};
</script>

<style type="text/css" scoped>
.allAdministrator {
  display: inline-block;
  width: 49.5%;
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