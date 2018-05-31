<template>
    <div class="animated fadeIn">
        <Row>
            <Col span="8">
                <div class="device-ios">
                    <div class="device-inner">
                        <div v-for="(item, index) in articleListNew" :key="item.id" class="item">
                            <div v-if="articleList.length>1">
                                <div v-if="index==0" class="">
                                    <img class="the-one-thumb_url" :src="item.thumb_url"> 
                                    <span class="the-one-title">{{item.title}}</span>
                                </div>
                                <div v-if="index>0" class="">
                                    <span class="the-other-title">{{item.title}}</span>
                                    <img class="the-other-thumb_url" :src="item.thumb_url"> 
                                </div>
                            </div>
                            <div v-if="articleList.length==1">
                                <div>
                                    <img class="the-only-one-thumb_url" :src="item.thumb_url"> 
                                    <span class="the-only-one-title">{{item.title}}</span>
                                    <span class="the-only-one-digest">{{item.title}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title="发布准备"
                    v-model="modalPublish"
                    :closable="false"
                    @on-ok="onPublish"
                    :scrollable="true">
                    <span>指定发布时间</span>
                    <TimePicker
                        :disabled-hours="disabledHours"
                        :value="theSelectedTime"
                        @on-change="handleChange"
                        placeholder="选择时间"
                        style="margin-left: 0px;width: 168px">
                    </TimePicker>
                </Modal>
                <Button class="publish" @click="onPrePublish" :disabled="articleListNew.length<=0" type="primary">发布</Button>

            </Col>
            <Col span="16">
                <Tabs value="name1">
                    <TabPane label="图文" name="name1">
                        <div class="resource-article">
                            <!-- <ArticleItem v-for="item in articleList" :article="item" :key="item.id"></ArticleItem> -->
                            <div v-for="article in articleList" :article="article" :key="article.id">
                                <div class="product product-main">
                                    <img class="the-only-one-thumb_url" :src="article.thumb_url"> 
                                    <span class="the-only-one-title">{{article.title}}</span>
                                    <span class="the-only-one-digest">{{article.digest}}</span>
                                    <!-- <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
                                    <Checkbox v-model="article.status" class="product-add-cart" @on-change="checkAllGroupChange(article)"></Checkbox>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="图片" name="name2">图片</TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>
</template>

<script>
import ArticleItem from "./components/ArticleItem.vue";
import {
  saveMaterialNews,
} from "api/material";
import {
  createAnnouncement,getAnnouncementOpportunities
} from "api/announcement";
import {
  saveArticle,
  listArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  updateArticleReviewStatus
} from "api/resource";
export default {
  components: { ArticleItem },
  data() {
    return {
      articleList: [],
      articleListNew: [],
      offset: 0,
      theSelectedItem: [],
      checkAll: false,
      indeterminate: true,
      modalPublish: false,
      publishTime: null,
      theSelectedTime:null,
      disabledHours:[],
      formDate:{},
      opportunities:0,
    };
  },
  methods: {
    listAllArticle(offset) {
      this.$Loading.start();
      listArticle(offset, 8)
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          this.articleList = this.articleList.concat(data);
          console.log(this.articleList);
          if (this.articleList != null) {
            this.offset = this.articleList.length;
          }
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },
    checkAllGroupChange(data) {
      console.log(data);
      if (data.status) {
        this.articleListNew.push(data);
      } else {
        var index = this.articleListNew.indexOf(data);
        if (index > -1) {
          this.articleListNew.splice(index, 1);
        }
      }
    },
    onPrePublish() {
      if(this.opportunities==0){
        this.$Message.error("今日发布次数已经用完");
        return;
      }
      this.modalPublish = true;
      let nowTime = new Date();
      for(var i=0;i<nowTime.getHours();i++){
        this.disabledHours.push(i);
      }
      console.log(this.disabledHours);
      let hours = nowTime.getHours()<23?nowTime.getHours()+1:nowTime.getHours();
      let time = hours+":"+nowTime.getMinutes()+":"+nowTime.getSeconds();
      // //console.log("----"+dateTime);
      // let month = nowTime.getMonth()+1<10?"0"+(nowTime.getMonth()+1):nowTime.getMonth()+1
      // let dateTime = nowTime.getFullYear()+"-"+month+"-"+nowTime.getDate()+"T"+time+"+08:00"//nowTime.toDateString()+" "+time
      // console.log("----"+dateTime);
      // this.publishTime = dateTime;
      this.theSelectedTime = time;
      let month = nowTime.getMonth()+1<10?"0"+(nowTime.getMonth()+1):nowTime.getMonth()+1;
      let dateTime = nowTime.getFullYear()+"-"+month+"-"+nowTime.getDate()+"T"+time+"+08:00";
      this.publishTime = dateTime;
    },
    handleChange(time) {
      let nowTime = new Date();
      console.log(nowTime.toDateString());
      let month = nowTime.getMonth()+1<10?"0"+(nowTime.getMonth()+1):nowTime.getMonth()+1;
      let dateTime = nowTime.getFullYear()+"-"+month+"-"+nowTime.getDate()+"T"+time+"+08:00";
      console.log("----"+dateTime);
      this.publishTime = dateTime;
    },
    onPublish() {
      console.log(this.disabledHours);
      this.formDate.msgtype = "text";
      this.formDate.content = "群发测试 群发测试 群发测试";
      this.formDate.publish_time = this.publishTime;
      console.log(this.formDate.publish_time);
      createAnnouncement(this.formDate).then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.error(message);
          }
          const data = responseData.data;
          this.opportunities = 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAnnouncementOpportunities(){
      getAnnouncementOpportunities().then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }
          const data = responseData.data;
          this.opportunities = data;
          console.log("--------------+++++++++++++++++++++_____________________");
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.listAllArticle(this.offset);
    this.getAnnouncementOpportunities();
  }
};
</script>

<style type="text/css" scoped>
.device-ios {
  width: 320px;
  height: 548px;
  background: #111;
  border-radius: 20px;
  box-shadow: 0px 0px 0px 2px #aaa;
  padding: 30px 2px;
  position: relative;
  margin-right: 80px;
}
.device-ios:before {
  content: "";
  width: 60px;
  height: 10px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  margin-left: -30px;
  background: #333;
  top: 10px;
}
.device-ios:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 20px;
  left: 50%;
  margin-left: -20px;
  bottom: 4px;
  border-radius: 20%;
  box-sizing: border-box;
  border: 5px solid #333;
}
.device-inner {
  background-color: #fff;
  height: 100%;
}
.product {
  break-inside: avoid;
  box-sizing: border-box;
}
.product-main {
  display: block;
  border: 2px solid #dddee1;
  overflow: hidden;
  background: #fff;
  position: relative;
}
.the-one-thumb_url {
  width: 100%;
}
.the-one-title {
  position: absolute;
  left: 0;
  color: #fff;
  bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  text-overflow: ellipsis;
  height: 30px;
  line-height: 30px;
  text-align: left;
}
.the-other-title {
  width: 70%;
  height: 50px;
  line-height: 150%;
  padding: 10px;
  text-align: left;
  float: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.the-other-thumb_url {
  width: 30%;
  float: right;
}
.item {
  position: relative;
}
.the-only-one-thumb_url {
  width: 100%;
}
.the-only-one-title {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  line-height: 150%;
  color: black;
  font-size: 1.2em;
  text-align: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.the-only-one-digest {
  height: 50px;
  line-height: 130%;
  float: left;
  text-align: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-left: 10px;
  margin-right: 10px;
}
.resource-article {
  column-count: 4;
  column-gap: 0;
}
.product-add-cart {
  display: none;
  padding: 4px 8px;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  display: inline-block;
}
.publish {
  margin-top: 10%;
}
</style>