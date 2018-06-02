<template>
    <div class="product product-main">
        <div @click="editMedia(media)" class="product-main">
            <div :class="'subscript subscript-color'+ media.review_status">{{subscriptText}}</div> 
            <img class="the-only-one-thumb_url" :src="media.url"> 
            <span class="the-only-one-title">{{media.title}}</span>
            <span class="the-only-one-digest">{{media.introduction}}</span>
            <Button type="ghost" class="media-delete" @click.stop="deleteMedia(media)">删除</Button>
            <Button type="ghost" class="media-review" @click.stop="reviewMedia(media)">评审</Button>
        </div>
        <Modal v-model="modalReview" :scrollable="true" title="评审" ok-text="通过" cancel-text="不通过" @on-ok="onReviewPassMedia()" @on-cancel="onReviewNotPassMedia()">
            <h4 style="text-align: center">{{media.title}}</h4>
            <div style="text-align: center;">&nbsp</div>
            <div style="text-align: center;">作者:{{media.author}}</div>
            <div v-html="media.content"></div>
        </Modal>
    </div>
</template>
<script>
import {
  saveMedia,
  listMedia,
  getMedia,
  updateMedia,
  deleteMedia,
  updateMediaReviewStatus,
} from "api/resource";
export default {
    props: {
        media: Object
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
        editMedia(media){
            this.$router.push({path:"/resource/editMedia"});
            this.$store.dispatch("postData",media)
        },
        deleteMedia(media){
            console.log(media)
            deleteMedia(media.id).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.$emit("eventFromMediaItem",media)
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        reviewMedia(media){
            console.log(media);
            this.modalReview = true;
        },
        onReviewPassMedia(){
            updateMediaReviewStatus(this.media.id,{review_status:1}).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.media.review_status = 1;
                    this.subscriptText = "通过";
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        onReviewNotPassMedia(){
            updateMediaReviewStatus(this.media.id,{review_status:-1}).then(response => {
                const responseData = response.data;
                const code = responseData.code;
                if (code != 0) {
                    const message = responseData.message;
                    this.$Message.info(message);
                }else{
                    this.media.review_status = -1;
                    this.subscriptText = "未通过";
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
    },
    created() {
        if (this.media.review_status == 1){
            this.subscriptText = "通过";
        }else if (this.media.review_status == -1){
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
    .media-delete{
        display: none;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        left: 5px;
    }
    .media-review{
        display: none;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .product-main:hover .media-review{
        display: inline-block;
    }
    .product-main:hover .media-delete{
        display: inline-block;
    }
</style>