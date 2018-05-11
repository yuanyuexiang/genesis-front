<template>
    <div class="animated fadeIn">
        <!-- <Row>
            <Col :md="24">
                <h3 style="text-align:center">群发功能</h3>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <h3 style="text-align:center">群发功能</h3>
            </Col>
        </Row> -->
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
                                    <span class="the-only-one-digest">{{item.digest}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="16">
                <Tabs value="name1">
                    <TabPane label="图文" name="name1">
                        <div class="resource-article">
                            <!-- <ArticleItem v-for="item in articleList" :article="item" :key="item.id"></ArticleItem> -->
                            <div  v-for="article in articleList" :article="article" :key="article.id">
                            <div class="product product-main">
                                <router-link :to="'/product/' + article.id" class="product-main">
                                    <img class="the-only-one-thumb_url" :src="article.thumb_url"> 
                                    <span class="the-only-one-title">{{article.title}}</span>
                                    <span class="the-only-one-digest">{{article.digest}}</span>
                                </router-link>
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
      articleListNew:[],
      offset:0
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
          this.articleList=this.articleList.concat(data);
          console.log(this.articleList);
          if(this.articleList != null){
            this.offset = this.articleList.length;
          }
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },

  },
  mounted() {
    this.listAllArticle(this.offset);
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
  content: '';
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
  content: '';
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
  background-color: #FFF;
  height: 100%;
}
.product{
    break-inside: avoid;
    box-sizing: border-box;
}
.product-main{
    display: block;
    border: 2px solid #dddee1;
    overflow: hidden;
    background: #fff;
    position: relative;
}
.the-one-thumb_url{
    width: 100%;
}
.the-one-title{
    position: absolute;
    left: 0;
    color: #fff;
    bottom: 0px;
    margin-left: 10px;
    margin-right: 10px;
    text-overflow:ellipsis;
    height: 30px;
    line-height: 30px;
    text-align: left
}
.the-other-title{
    width: 70%;
    height: 50px;
    line-height: 150%;
    padding: 10px;
    text-align: left;
    float: left;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    display:-webkit-box;
    overflow:hidden;
}
.the-other-thumb_url{
    width: 30%;
    float: right;
}
.item{
    position: relative;
}
.the-only-one-thumb_url{
    width: 100%;
}
.the-only-one-title{
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    height: 50px;
    line-height: 150%;
    color: black;
    font-size: 1.2em;
    text-align: left;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    display:-webkit-box;
    overflow:hidden;
}
.the-only-one-digest{
    height: 50px;
    line-height: 130%;
    float: left;
    text-align: left;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    display:-webkit-box;
    margin-left: 10px;
    margin-right: 10px;
}
.resource-article {
  column-count: 4;
  column-gap: 0;
}
</style>