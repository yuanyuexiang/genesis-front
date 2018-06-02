<template>
  <div class="resource-media">
    <MediaItem v-for="item in mediaList" :media="item" :key="item.id" @eventFromMediaItem="eventFromMediaItem"></MediaItem>
  </div>
</template>

<script>
import MediaItem from "./MediaItem.vue";

import {
  saveMedia,
  listMedia,
  getMedia,
  updateMedia,
  deleteMedia,
  updateMediaReviewStatus
} from "api/resource";
export default {
  components: { MediaItem},

  data() {
    return {
      filterBrand: "",
      filterColor: "",
      order: "",
      mediaList: [],
      mediaList: [],
      scroll: "",
      offset:0
    };
  },
  methods: {
    listAllMedia(offset) {
      this.$Loading.start();
      listMedia(offset, 10, "type:image")
        .then(response => {
          const responseData = response.data;
          const code = responseData.code;
          if (code != 0) {
            const message = responseData.message;
            this.$Message.info(message);
          }

          const data = responseData.data;
          if(data!=null){
            this.mediaList = this.mediaList.concat(data);
          }
          console.log(this.mediaList);
          if(this.mediaList != null){
            this.offset = this.mediaList.length;
          }
          this.$Loading.finish();
        })
        .catch(error => {
          console.log(error);
          this.$Loading.error();
        });
    },
    onScrollButtom() {
        this.listAllMedia(this.offset);
    },
    eventFromMediaItem(media){
        var index = this.mediaList.indexOf(media);
        if (index > -1) {
          this.mediaList.splice(index, 1);
        }
    },
  },
  mounted() {
    this.listAllMedia(this.offset);
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
.resource-media {
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