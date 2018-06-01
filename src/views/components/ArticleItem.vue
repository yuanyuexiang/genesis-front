<template>
    <div class="product product-main">
        <div @click="editArticle(article)" class="product-main">
            <div :class="'subscript subscript-color'+ article.review_status">{{subscriptText}}</div> 
            <img class="the-only-one-thumb_url" :src="article.thumb_url">
            <span class="the-only-one-title">{{article.title}}</span>
            <span class="the-only-one-digest">{{article.digest}}</span>
            <Button type="ghost" class="article-delete" @click.stop="deleteArticle(article)">删除</Button>
            <Button type="ghost" class="article-review" @click.stop="reviewArticle(article)">评审</Button>
        </div>
        <Modal v-model="modalReview" :scrollable="true" title="评审" ok-text="通过" cancel-text="不通过" @on-ok="onReviewPassArticle()" @on-cancel="onReviewNotPassArticle()">
            <h4 style="text-align: center">{{article.title}}</h4>
            <div style="text-align: center;">&nbsp</div>
            <div style="text-align: center;">作者:{{article.author}}</div>
            <div v-html="article.content"></div>
        </Modal>
    </div>
</template>
<script>
import {
  saveArticle,
  listArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  updateArticleReviewStatus,
} from "api/resource";
export default {
    props: {
        article: Object
    },
    data () {
        return {
            modalReview:false,
            subscriptText:"未评审",
        }
    },
    methods: {
        handleCart(){
            this.$store.commit('addCart', this.info.id);
            let x = materialNews;
        },
        editArticle(article){
            this.$router.push({path:"/resource/editArticle"});
            this.$store.dispatch("postData",article)
        },
        deleteArticle(article){
            console.log(article)
            deleteArticle(article.id).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.$emit("eventFromArticleItem",article)
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        reviewArticle(article){
            console.log(article);
            this.modalReview = true;
        },
        onReviewPassArticle(){
            updateArticleReviewStatus(this.article.id,{review_status:1}).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.article.review_status = 1;
                    this.subscriptText = "通过";
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        onReviewNotPassArticle(){
            updateArticleReviewStatus(this.article.id,{review_status:-1}).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.article.review_status = -1;
                    this.subscriptText = "未通过";
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
    },
    created() {
        if (this.article.review_status == 1){
            this.subscriptText = "通过";
        }else if (this.article.review_status == -1){
            this.subscriptText = "未通过";
        }else{
            this.subscriptText = "未评审";
        }
    },
};
</script>
<style>
    .subscript{
        color: #fff;
        height: 25px;
        width: 90px;
        position: absolute;
        right: -30px;
        text-align: center;
        line-height: 30px;
        font-family: "黑体";
        -moz-transform:rotate(45deg);
        -webkit-transform:rotate(45deg);
        -o-transform:rotate(45deg);
        -ms-transform:rotate(45deg);
        transform:rotate(45deg);
    }
    .subscript-color0{
        background-color: #0c60ee;
    }
    .subscript-color1{
        background-color: #5cb85c;
    }
    .subscript-color-1{
        background-color: #ed3f14;
    }
</style>

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
    .article-delete{
        display: none;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        left: 5px;
    }
    .article-review{
        display: none;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .product-main:hover .article-review{
        display: inline-block;
    }
    .product-main:hover .article-delete{
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
        cursor:pointer;
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