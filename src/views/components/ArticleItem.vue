<template>
    <div class="product product-main">
        <router-link :to="'/product/' + article.id" class="product-main">
            <img class="the-only-one-thumb_url" :src="article.thumb_url"> 
            <span class="the-only-one-title">{{article.title}}</span>
            <span class="the-only-one-digest">{{article.digest}}</span>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            article: Object
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