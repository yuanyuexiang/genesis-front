<template>
    <div class="product product-main">
        <!--
        <router-link :to="'/product/' + info.id" class="product-main">
            <img :src="info.image">
            <h4>{{ info.name }}</h4>
            <div class="product-color" :style="{ background: colors[info.color]}"></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
        </router-link>
        -->
        <div v-for="(item, index) in materialNews.content.news_item" :key="item.id" class="item">
            <div v-if="materialNews.content.news_item.length>1">
                <div v-if="index==0" class="">
                    <img class="the-one-thumb_url" :src="item.url"> 
                    <span class="the-one-title">{{item.title}}</span>
                </div>
                <div v-if="index>0" class="">
                    <span class="the-other-title">{{item.title}}</span>
                    <img class="the-other-thumb_url" :src="item.url"> 
                </div>
            </div>
            <div v-if="materialNews.content.news_item.length==1">
                <div>
                    <img class="the-only-one-thumb_url" :src="item.url"> 
                    <span class="the-only-one-title">{{item.title}}</span>
                    <span class="the-only-one-digest">{{item.digest}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            materialNews: Object
        },
        data () {
            return {
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e'
                },
                news_item:[
                    {
                        url:'http://c.hiphotos.baidu.com/image/h%3D300/sign=e7ea61e75dda81cb51e685cd6267d0a4/4bed2e738bd4b31ccd851da88bd6277f9e2ff86c.jpg',
                        title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。'
                    },
                    {
                        url:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1767309032,288351360&fm=58&s=61EDBE468CA449131EA6F27A0300F07B&bpow=121&bpoh=75',
                        title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。'
                    },
                    {
                        url:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1767309032,288351360&fm=58&s=61EDBE468CA449131EA6F27A0300F07B&bpow=121&bpoh=75',
                        title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。'
                    },
                    {
                        url:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1767309032,288351360&fm=58&s=61EDBE468CA449131EA6F27A0300F07B&bpow=121&bpoh=75',
                        title:'我们在天上的父，愿人都尊你的名为圣。愿你的国降临，愿你的旨意行在地上，如同行在天上。'
                    }
                ]

            }
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
                let x = materialNews;
            }
        },
        mounted(){
            //alert(JSON.stringify(this.materialNews.content.news_item.length));
        }
    };
</script>
<style scoped>
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .product-main:hover h4{
        color: #0070c9;
    }
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
    .product{
        /*width: 25%;
        float: left;
        */
        break-inside: avoid;
        box-sizing: border-box;
    }
    .product-main{
        display: block;
        border: 2px solid #dddee1;
        /*margin: 6px;
        padding: 16px;
        
        border-radius: 6px;*/
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
</style>