<template>
    <Tabs>
        <TabPane label="欢迎词" icon="ribbon-b">
            <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="文字" icon="reply">
                    <div class="container">
                        <Input v-model="textarea" class="ivu-input1" type="textarea" :autofocus="false" :autosize="{minRows: 14,maxRows: 14}" style="height:inherit;" placeholder="Enter something..."></Input>
                    </div>
                </TabPane>
                <TabPane label="图片" icon="key">
                    <div class="container">
                        <Button type="ghost" icon="chevron-down" @click="modal1 = true">选择</Button>
                    </div>
                    <Modal
                        v-model="modal1"
                        :scrollable="true"
                        title="选择封面">
                        <Scroll :on-reach-bottom="handleReachBottom">
                          <Card :title="item.title" v-for="item in mediaList" :media="item" :key="item.id" style="margin: 0;cursor: pointer;">
                            <div style="text-align:center">
                                <img :src="item.url" @click="onSelectItem(item)">
                            </div>
                          </Card>
                        </Scroll>
                        <div slot="footer"></div>
                    </Modal>
                </TabPane>
            </Tabs>
            <Button>保存</Button>
            </Col>
        </TabPane>
        <TabPane label="默认回复" icon="reply">
            <Tabs type="card">
                <TabPane label="文字" icon="reply">文字</TabPane>
                <TabPane label="图片" icon="key">图片</TabPane>
            </Tabs>
        </TabPane>
        <TabPane label="关键词回复" icon="key">
            <Tabs type="card">
                <TabPane label="文字" icon="reply">文字</TabPane>
                <TabPane label="图片" icon="key">图片</TabPane>
            </Tabs>
        </TabPane>
    </Tabs>
</template>

<script>
import IntroChartCount from "./charts/IntroChartCount";
import IntroChartPie from "./charts/IntroChartPie";
import {
  listMedia,
} from "api/resource";
import {
    saveDefultReply,
    getDefultReply,
    updateDefultReply,
    deleteDefultReply,
    saveKeyReply,
    getKeyReply,
    listKeyReply,
    updateKeyReply,
    deleteKeyReply,
} from "api/reply";

export default {
  components: { IntroChartCount, IntroChartPie },
  name: "interaction",
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,

      speed: 10000,

      textarea: '',
      
      mediaList: [],
      modal1:false,
      offset: 0,
    };
  },
  methods: {
    test_logout() {
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleReachBottom() {
      this.listAllMedia(this.offset);
    },
    listAllMedia(offset) {
      this.$Loading.start();
      listMedia(offset, 10, "type:image")
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          this.mediaList = this.mediaList.concat(data);
          console.log(this.mediaList);
          if (this.mediaList != null) {
            this.offset = this.mediaList.length;
          }
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },
    getDefultSubscribeReply() {
      this.$Loading.start();
      getDefultReply("subscribe")
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          this.textarea = data.content;
          console.log("------------------getDefultReply----------------------");
          console.log(data);
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },
    getDefultReceiveMessageReply() {
      this.$Loading.start();
      getDefultReply("receiveMessage")
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          console.log(data);
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },
  },
  mounted() {
    const token = this.$store.getters.token;
    this.getDefultSubscribeReply();
  }
};
</script>

<style type="text/css" >
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
h3,
h4,
h5 {
  margin: 12px;
}
h3 {
  margin-bottom: 20px;
}
p {
  margin: 12px;
}
.row-margin-top {
  margin-top: 30px;
}
/*
textarea {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 0px solid #dddee1;
    border-radius: 0px;
}
*/
.ivu-input:hover {
    border-color: transparent;
}
.ivu-tabs .ivu-tabs-card{
    background: transparent;
}
.ivu-input1{
    border-radius: 0px;
    border-top: 0px solid #dddee1;
    border-radius: 0px;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
    width: 100%;
    height:inherit;
}
.ivu-input:focus {
    border-color:transparent;
    outline: 0;
    box-shadow: transparent;
    -webkit-box-shadow: transparent;
}
.ivu-input {
    border-color:transparent;
    outline: 0;
    box-shadow: transparent;
    -webkit-box-shadow: transparent;
    border: 0px solid #dddee1;
    border-radius: 0px;
}
.container{
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 0px;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
}
</style>
<style scoped>
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 120px;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        /* padding: 16px; */
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
         border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
