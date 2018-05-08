<template>
    <div class="resource-article">
        <ArticleItem v-for="item in articleList" :article="item" :key="item.id"></ArticleItem>
    </div>
</template>

<script>
import ArticleItem from "./ArticleItem.vue";
import MediaItem from "./MediaItem.vue";

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
      filterBrand: "",
      filterColor: "",
      order: "",
      articleList: [],
      scroll: "",
      offset:0
    };
  },
  methods: {
    listAllArticle(offset) {
      listArticle(offset, 50)
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
        })
        .catch(error => {
          console.log(error);
        });
    },
    onAddTheArticle() {
      alert(this.$router);
      console.log(this.$router);
    },
    onScrollButtom() {
        console.log("----------------------------arb----------------------------------");
        this.listAllArticle(this.offset);
    }
  },
  mounted() {
    this.listAllArticle(this.offset);
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