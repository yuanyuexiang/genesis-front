<template>
    <div class="animated fadeIn">

        <Tabs>
            <TabPane label="图文库" icon="images">
                <div >
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
    saveMaterial,
    listMaterial,
    getMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialCount
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

      
      productList:[
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/0dd7912397dda144a5db01a2beb7d0a20df486cb.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://c.hiphotos.baidu.com/image/pic/item/72f082025aafa40f8197e0cca764034f78f01949.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://c.hiphotos.baidu.com/image/h%3D300/sign=e7ea61e75dda81cb51e685cd6267d0a4/4bed2e738bd4b31ccd851da88bd6277f9e2ff86c.jpg'
                  },
                ]
              },
              data:'xxx'
          },
          {
            media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://g.hiphotos.baidu.com/image/pic/item/b21bb051f8198618303a209c46ed2e738bd4e6ad.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://f.hiphotos.baidu.com/image/pic/item/3c6d55fbb2fb43165038a1622ca4462309f7d387.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://g.hiphotos.baidu.com/image/pic/item/eaf81a4c510fd9f9a1f3ac72292dd42a2934a4c1.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://h.hiphotos.baidu.com/image/pic/item/6159252dd42a28349bde9b1857b5c9ea15cebfad.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://g.hiphotos.baidu.com/image/pic/item/f3d3572c11dfa9ec447f2c0c6ed0f703918fc15c.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://h.hiphotos.baidu.com/image/pic/item/a1ec08fa513d26978e42724659fbb2fb4316d81c.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://c.hiphotos.baidu.com/image/pic/item/72f082025aafa40f8197e0cca764034f78f01949.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          },
          {
              media_id:"abcd",
              content:{
                news_item:[
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://e.hiphotos.baidu.com/image/pic/item/3801213fb80e7bec00e429f3232eb9389b506be1.jpg'
                  },
                  {
                    title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。',
                    url:'http://a.hiphotos.baidu.com/image/pic/item/e850352ac65c10384bfac6d1be119313b07e8918.jpg'
                  }
                ]
              },
              data:'yyy'
          }
      ]

    };
  },
  methods: {
      listAllMaterial(page){
          listMaterial(page,12)
          .then(response =>{
            const responseData = response.data;
            const code = responseData.code;
            if(code != 0){
                const message = responseData.message;
                this.$Message.info(message);
            }
            
            const data = responseData.data;
            console.log(data);
          }).catch(error=>{
            console.log(error);
          });
      }
    
  },
  mounted() {
    //this.$store.dispatch("getProductList");
    //this.listAllMaterial(1);
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
</style>