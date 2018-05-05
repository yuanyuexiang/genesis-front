<template>
    <div class="animated fadeIn">
      <div id="container">
          <span class="allResource">当前系统所有的素材资源</span>
          <span class="addResource">
            <a @click="onAddTheArticle">+ 添加资源</a>
            <!--
            <router-link to="/resource/addMaterial">+ 添加素材</router-link>
            -->
          </span>
        </div>
        <Tabs>
            <TabPane label="图文库" icon="images">
                <div class="resource-article">
                    <ArticleItem v-for="item in articleList" :article="item" :key="item.id"></ArticleItem>
                </div>
            </TabPane>
            <TabPane label="图片库" icon="image">
              <div class="resource-article">
                    <MediaItem v-for="item in mediaList" :media="item" :key="item.id"></MediaItem>
                </div>
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
import ArticleItem from "./components/ArticleItem.vue";
import MediaItem from "./components/MediaItem.vue";
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
  components: { ArticleItem, MediaItem},
  /*
  computed: {

    list() {
      return this.articleList;
    },
    articleList() {
      let list = [...this.list];
     
      return list;
    }
  },*/
  data() {

    return {
      filterBrand: "",
      filterColor: "",
      order: "",
      articleList:[],
      mediaList:[]
    };
  },
  methods: {
      listAllArticle(page){
          listArticle(page-1,12)
          .then(response =>{
            const responseData = response.data;
            const code = responseData.code;
            if(code != 0){
                const message = responseData.message;
                this.$Message.info(message);
            }
            
            const data = responseData.data;
            this.articleList=data;
            console.log(this.articleList);
          }).catch(error=>{
            console.log(error);
          });
      },
      listAllMedia(page){
          listMedia(page-1,12,"type:image")
          .then(response =>{
            const responseData = response.data;
            const code = responseData.code;
            if(code != 0){
                const message = responseData.message;
                this.$Message.info(message);
            }
            
            const data = responseData.data;
            this.mediaList=data;
            console.log(this.mediaList);
          }).catch(error=>{
            console.log(error);
          });
      },
      onAddTheArticle(){
        alert(this.$router);
        console.log(this.$router);
      }
    
  },
  mounted() {
    //this.$store.dispatch("getProductList");
    this.listAllArticle(1);
    this.listAllMedia(1);
  }
};
</script>

<style type="text/css" scoped>
.list-control {
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.list-control-filter {
  margin-bottom: 16px;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.product-not-found {
  text-align: center;
  padding: 32px;
}
.resource-article{
    column-count: 4;
    column-gap: 0;
}
.addResource{
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