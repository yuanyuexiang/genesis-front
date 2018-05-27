<template>
    <div class="animated fadeIn">
        <Row>
          <Col span="16">
          <Form ref="articleForm" autoComplete="on" :model="articleForm" :label-width="50">
            <FormItem label="标题" prop="title">
              <Input v-model="articleForm.title" autoComplete="on" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="摘要" prop="digest">
              <Input v-model="articleForm.digest" autoComplete="on" placeholder="请输入摘要"></Input>
            </FormItem>
            <FormItem label="封面">
              <Col span="4">
              <Checkbox :value="true" @on-change="checkChange">添加封面</Checkbox>
              </Col>
              <Col span="20" v-if="articleForm.show_cover_pic">
                <Row :gutter="12">
                  <Col span="4">
                    <Upload action="/genesis/v1/media" 
                    :on-success="handleSuccess"
                    :on-progress="handleProgress"
                    :before-upload="handleBeforeUpload"
                    name="file" :data="fileParam"
                    :show-upload-list="false"
                    accept="jpg,jpeg,png">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                  </Col>
                  <Col span="4">
                    <Button type="ghost" icon="chevron-down" @click="modal1 = true">选择</Button>
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
                  </Col>
                  <Col span="4" class="img-col">
                  <div>
                    <img v-if="fileUrl!=''" :src="fileUrl"/>
                    <span v-if="fileStatus!=''">{{fileStatus}}</span>
                  </div>
                  </Col>
                </Row>
              </Col>
            </FormItem>
            <FormItem label="内容" prop="content">
              <vue-tinymce ref="tinymce" v-model="articleForm.content" :setting="setting1"></vue-tinymce>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitArticle">提交</Button>
            </FormItem>
          </Form>
          </Col>
          <Col span="8">

          </Col>
        </Row>
    </div>
</template>

<script>
import { VueTinymce, TinymceSetting } from "vue-tinymce";
import {
  saveArticle,
  listArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  updateArticleReviewStatus,
  saveMedia,
  listMedia,
  getMedia,
  updateMedia,
  deleteMedia,
  updateMediaReviewStatus
} from "api/resource";

export default {
  components: { VueTinymce, TinymceSetting },
  data() {
    return {
      articleForm: {
        title: "",
        show_cover_pic: 1,
        digest: "",
        content: "",
        thumb_id: -1,
        thumb_url: ""
      },
      fileParam: {
        title: "封面",
        introduction: "封面介绍"
      },
      fileUrl: "",
      fileStatus: "",
      content1: "<p>可直接粘贴图片地址插入图片</p>",
      setting1: Object.assign({}, TinymceSetting, {
        height: 400,
        language_url: "./static/langs/zh_CN.js",
        block_formats:
          "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
      }),
      modal1: false,
      mediaList: [],
      offset: 0
    };
  },
  methods: {
    handleSuccess(res, file) {
      this.fileStatus = "";
      this.fileUrl = res.data.url;
      this.articleForm.thumb_id = res.data.id;
      this.articleForm.thumb_url = res.data.url;
    },
    handleProgress(event, file, fileList) {
      console.log("-------------------------------");
      console.log(event);
      this.fileStatus = "正在上传";
    },
    handleBeforeUpload() {
      if (this.articleForm.title != "" && this.articleForm.digest != "") {
        this.fileParam.title = this.articleForm.title;
        this.fileParam.introduction = this.articleForm.digest;
      }
      return true;
    },
    checkChange(status) {
      this.articleForm.show_cover_pic = status ? 1 : 0;
    },
    submitArticle() {
      saveArticle(this.articleForm)
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          console.log("--------------saveArticle-----------------");
          console.log(data);
          this.$router.push({ path: "/resource", query:{tabName:"article"}});
        })
        .catch(error => {
          console.log("--------------saveArticle-----------------");
          console.log(error);
        });
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
    handleReachBottom() {
      this.listAllMedia(this.offset);
    },
    onSelectItem(item) {
      this.modal1 = false;

      this.articleForm.thumb_id = item.id;
      this.articleForm.thumb_url = item.url;
      let vue = this;
      setTimeout(function() {
        vue.fileUrl = item.url;
      }, 500);
    }
  },
  mounted() {
    this.listAllMedia(this.offset);
  }
};
</script>

<style type="text/css" scoped>
img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>