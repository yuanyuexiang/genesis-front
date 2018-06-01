<template>
    <Tabs>
        <TabPane label="欢迎词" icon="ribbon-b">欢迎词</TabPane>
        <TabPane label="默认回复" icon="reply">默认回复</TabPane>
        <TabPane label="关键词回复" icon="key">关键词回复</TabPane>
    </Tabs>
</template>

<script>
import IntroChartCount from "./charts/IntroChartCount";
import IntroChartPie from "./charts/IntroChartPie";

export default {
  components: { IntroChartCount, IntroChartPie },
  name: "interaction",
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
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
.demo-carousel {
  height: 600px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
.demo-carousel img {
  height: 100%;
  width: 100%;
}
h3,
h4,
h5 {
  margin: 12px;
}
h3 {
  margin-bottom: 20px;
}
p {
  margin: 12px;
}
.row-margin-top {
  margin-top: 30px;
}
</style>