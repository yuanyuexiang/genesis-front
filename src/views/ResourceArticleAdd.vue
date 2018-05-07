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
              <Checkbox v-model="articleForm.show_cover_pic">添加封面</Checkbox>
              </Col>
              <Col span="20" v-if="articleForm.show_cover_pic">
                <Row :gutter="12">
                  <Col span="4">
                    <Upload action="/genesis/v1/media" 
                    :on-success="handleSuccess" 
                    name="file" :data="fileParam"
                    :show-upload-list="false"
                    accept="jpg,jpeg,png">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                  </Col>
                  <Col span="4">
                    <Button type="ghost" icon="chevron-down">选择</Button>
                  </Col>
                  <Col span="4">
                    <img v-if="fileUrl!=''" :src="fileUrl" alt="上海鲜花港 - 郁金香" />
                  </Col>
                  
                </Row>
              </Col>
            </FormItem>
            <FormItem label="内容" prop="content">
              <vue-tinymce ref="tinymce" v-model="articleForm.content" :setting="setting1"></vue-tinymce>
            </FormItem>
            <FormItem>
                <Button type="primary">提交</Button>
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

export default {
  components: { VueTinymce, TinymceSetting },
  data() {
    return {
      articleForm: {
        title: "",
        show_cover_pic: "",
        digest: "",
        content: "",
        thumb_id: "",
        thumb_url: ""
      },
      fileParam: {
        title: "封面",
        introduction: "封面"
      },
      fileUrl: "",
      show_content1_html: false,
      show_content2_html: false,
      content1: "<p>可直接粘贴图片地址插入图片</p>",
      setting1: Object.assign({}, TinymceSetting, {
        height: 400,
        language_url: "./static/langs/zh_CN.js",
        block_formats:
          "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
      })
    };
  },
  methods: {
    handleSuccess(res, file) {
      console.log("-------------------------------");
      console.log(res);
      this.fileUrl = res.data.url;
    }
  }
};
</script>

<style type="text/css" scoped>
img {
  width: auto;
  height: auto;
  max-width: 70%;
  max-height: 70%;
}
</style>