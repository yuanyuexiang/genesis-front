<template>
    <div class="animated fadeIn">
        <Row>
            
          <Col span="16">

          <Form ref="mediaForm" autoComplete="on" :model="mediaForm" :label-width="50">
            <FormItem label="标题" prop="title">
              <Input v-model="mediaForm.title" autoComplete="on" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="介绍" prop="introduction">
              <Input v-model="mediaForm.introduction" autoComplete="on" placeholder="请输入介绍"></Input>
            </FormItem>
            <FormItem label="封面">
              <Col span="20">
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
                  <Col span="4" class="img-col">
                  <div>
                    <img v-if="fileUrl!=''" :src="fileUrl"/>
                    <span v-if="fileStatus!=''">{{fileStatus}}</span>
                  </div>
                  </Col>
                  
                </Row>
              </Col>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitMedia">提交</Button>
            </FormItem>
          </Form>
          </Col>
          <Col span="8">

          </Col>
        </Row>
    </div>
</template>

<script>
import {
  saveMedia,
  listMedia,
  getMedia,
  updateMedia,
  deleteMedia,
  updateMediaReviewStatus
} from "api/resource";

export default {
  data() {
    return {
      mediaForm: {
        title: "",
        introduction: ""
      },
      fileParam: {
        title: "封面",
        introduction: "封面介绍"
      },
      fileUrl: "",
      fileStatus: ""
    };
  },
  methods: {
    handleSuccess(res, file) {
      this.fileStatus = "";
      this.fileUrl = res.data.url;
    },
    handleProgress(event, file, fileList) {
      console.log("-------------------------------");
      console.log(event);
      this.fileStatus = "正在上传";
    },
    handleBeforeUpload() {
      if (this.mediaForm.title != "" && this.mediaForm.introduction != "") {
        this.fileParam.title = this.mediaForm.title;
        this.fileParam.introduction = this.mediaForm.introduction;
      }
      return true;
    },
    submitMedia() {
      this.$router.push({ path: "/resource", query:{tabName:"media"}});
    }
  },
  mounted() {
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