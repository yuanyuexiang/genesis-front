<template>
    <div class="animated fadeIn">
      <div id="container">
          <span class="allMaterialNews">当前系统所有的素材</span>
          <span class="addMaterialNews">
            <a @click="onAddTheMaterial">+ 添加素材</a>
            <!--
            <router-link to="/material/addMaterial">+ 添加素材</router-link>
            -->
          </span>
        </div>
        <Tabs>
            <TabPane label="图文库" icon="images">
                <div class="material-news">
                    <MaterialNewsItem v-for="item in materialNewsList" :materialNews="item" :key="item.id"></MaterialNewsItem>
                </div>
            </TabPane>
            <TabPane label="图片库" icon="image">图片库</TabPane>
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
import MaterialNewsItem from "./components/MaterialNewsItem.vue";
import {
    listMaterialNews
} from "api/material";
export default {
  components: { MaterialNewsItem },
  computed: {

    list() {
      return this.productList;
    },
    materialNewsList() {
      let list = [...this.list];
     
      return list;
    }
  },
  data() {

    return {
      filterBrand: "",
      filterColor: "",
      order: "",
      productList:[]
    };
  },
  methods: {
      listAllMaterialNews(page){
          listMaterialNews(page,12)
          .then(response =>{
            const responseData = response.data;
            const code = responseData.code;
            if(code != 0){
                const message = responseData.message;
                this.$Message.info(message);
            }
            
            const data = responseData.data;
            this.productList=data.item;
            console.log(this.productList);
          }).catch(error=>{
            console.log(error);
          });
      },
      onAddTheMaterial(){
        alert(this.$router);
        console.log(this.$router);
      }
    
  },
  mounted() {
    //this.$store.dispatch("getProductList");
    this.listAllMaterialNews(1);
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
.material-news{
    column-count: 4;
    column-gap: 0;
}
.addMaterialNews{
  float: right;
}
.allMaterialNews {
  display: inline-block;
  width: 49.5%;
  color: #2d8cf0;
  margin-top: 10px;
}
.addMaterialNews {
  display: inline-block;
  width: 50%;
  text-align: right;
  color: #2d8cf0;
  margin-top: 10px;
}
</style>