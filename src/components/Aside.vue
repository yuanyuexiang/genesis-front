<template>
    <aside class="aside-menu px-4">
        <div class="aside-options">
            <div class="clearfix mt-4">
                <h6>
                    <b>通知</b>
                    <!-- <i-switch class="float-right">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch> -->
                </h6>
            </div>
            <div>
              <b>&nbsp</b>
              <hr>
            </div>
            <div v-for="(item) in msgList" :key="item">
                <p class="text-muted">{{item}}</p>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
  name: "aside",
  data() {
    return {
      userID: this.$store.getters.uid,
      msgList: [],
      res: {},
      ws: null,
      wsurl: process.env.WEBSOCKET_URL+'/genesis/v1/websocket'
    };
  },
  created() {
    this.initws()
  },
  mounted() {
    this.runws()
  },
  methods: {
    runws () {
      let content = 'userID=' + this.userID
      if (this.ws.readyState === this.ws.OPEN) {
        this.sendmessage(content)
      } else if (this.ws.readyState === this.ws.CONNECTING) {
        let that = this
        setTimeout(function () {
          that.sendmessage(content)
        }, 300)
      } else {
        this.initws()
        let that = this
        setTimeout(function () {
          that.sendmessage(content)
        }, 500)
      }
    },
    initws () {
      this.ws = new WebSocket(this.wsurl+"?userID="+this.userID)
      this.ws.onmessage = this.getmessage
    },
    getmessage (e) {
      this.res = JSON.parse(e.data)
      console.log(this.res.data)
      this.$store.dispatch("addNotification",this.res.data)
      this.msgList.push(this.res.data.msg);
    },
    sendmessage (content) {
      this.ws.send(content)
    }
  }
};
</script>
<style type="text/css">
.wz-progress-show-info .wz-progress-outer {
  padding-right: 0px;
  margin-right: 0px;
}
</style>
<style scoped>
.text-muted {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.demo-i-circle-custom h1 {
  color: #3f414d;
  font-size: 28px;
  font-weight: normal;
}
.demo-i-circle-custom p {
  color: #657180;
  font-size: 14px;
  margin: 10px 0 15px;
}
.demo-i-circle-custom span {
  display: block;
  padding-top: 15px;
  color: #657180;
  font-size: 14px;
}
/*.demo-i-circle-custom:before{
      content: '';
      display: block;
      width: 80px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: 100px;
  };*/
.demo-i-circle-custom span i {
  font-style: normal;
  color: #3f414d;
}
</style>
