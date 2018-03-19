<template>
    <div class="animated fadeIn">
      <spn>
        江宁基督教佑恩堂，原名江宁排头基督教堂，位于南京市江宁区西门子路99号。
排头教堂成立于1998年，于2016年开始进行原址重建，并预计将于2018年5月完成重建工程。
      </spn>
      <br>
      <img src="static/img/pic1.png" class="pic">
      <br>
      <spn>
        本系统为佑恩堂官方微信号后台管理系统，由本教会弟兄无偿独立开发，包含功能有微信号系统维护、消息推送、文章发布等功能。
如系统出现故障或有任何疑问，可联系：XXXXXXXXXXX。
      </spn>
      <img src="static/img/pic2.png" class="pic">
    </div>
</template>

<script>
import IntroChartCount from "./charts/IntroChartCount";
import IntroChartPie from "./charts/IntroChartPie";

export default {
  components: { IntroChartCount, IntroChartPie },
  name: "dashboard",
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,

      speed: 10000
    };
  },
  methods: {
    test_logout() {
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    const token = this.$store.getters.token;
  }
};
</script>

<style type="text/css" scoped>
.pic {
  width: 100%;
}
.content {
  padding-left: 5px;
}
.dashboard_feature {
  text-align: center;
}
</style>