<template>
    <div class="animated fadeIn">
        <div id="container">
          <span class="allResource">当前系统所有的素材资源</span>
          <span class="addResource">
            <!--<a @click="onAddTheArticle">+ 添加资源</a>-->
            <router-link to="/resource/addArticle" v-if='tabName=="article"'>+ 添加图文资源</router-link>
            <router-link to="/resource/addMedia" v-if='tabName=="media"'>+ 添加媒体资源</router-link>
          </span>
        </div>
        <Tabs @on-click="onTabClick" id="tabs" :value="tabName">
            <TabPane label="图文库" icon="images" name="article">
              <ArticleManage ref="ArticleManage"></ArticleManage>
            </TabPane>
            <TabPane label="图片库" icon="image" name="media">
              <MediaManage ref="MediaManage"/>
            </TabPane>
            <!--
            <TabPane label="语言库" icon="mic-a">语言库</TabPane>
            <TabPane label="视频库" icon="android-film">视频库</TabPane>
            -->
            
        </Tabs>
        
        <!--
        <Row style="background-color: white !important;">
            <Col span="12">
            <span>图文素材</span>
            </Col>
            <Col span="12" >
            <span style="text-align: right;display: inline-block;width: 100%;">+图文素材</span>
            </Col>
            
        </Row>
        -->
        
    </div>
</template>

<script>
import ArticleManage from "./components/ArticleManage.vue";
import MediaManage from "./components/MediaManage.vue";

export default {
  components: {ArticleManage, MediaManage},

  data() {
    return {
      tabName: "article"
    };
  },
  methods: {
    onTabClick(name){
      this.tabName=name;
    },
    scrollHandler() {
      let scrollTop = document.documentElement.scrollTop;
      console.log(document.documentElement.scrollTop);
      if (scrollTop + window.innerHeight >= document.body.clientHeight) {
        if(this.tabName=="article"){
          this.$refs.ArticleManage.onScrollButtom();
        }else if(this.tabName=="media"){
          this.$refs.MediaManage.onScrollButtom();
        }else{
          console.log("NO TABNAME");
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandler,true);
    if(this.$route.query.tabName != null){
      this.tabName = this.$route.query.tabName
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
};
</script>

<style type="text/css" scoped>
.resource-article {
  column-count: 4;
  column-gap: 0;
}
.addResource {
  float: right;
}
.allResource {
  display: inline-block;
  width: 49.5%;
  color: #2d8cf0;
  margin-top: 10px;
}
.addResource {
  display: inline-block;
  width: 50%;
  text-align: right;
  color: #2d8cf0;
  margin-top: 10px;
}
</style>