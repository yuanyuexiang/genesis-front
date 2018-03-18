<template>
    <div class="login-container" style="margin: 0px;overflow: hidden;">
        <div id="canvascontainer" ref='can'></div>
        <div class="log-logo">佑恩堂公众号管理系统</div>
        <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form">
            <Form-item prop="phone">
                <Input type="text" v-model="loginForm.phone" placeholder="用户名" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" class="login-button" @click="handleLogin('loginForm')" long>登录</Button>
            </Form-item>
            <!--
        <div class='tips'>admin账号为:admin@wz.com 密码123456</div>
        <div class='tips'>editor账号:editor@wz.com 密码123456</div>
        -->
        </Form>
        <div class="app-copyright">
            <p>© 2018 江宁区基督教佑恩堂</p>
        </div>
    </div>
</template>

<script>
import { isPhoneNumber } from "utils/validate";
export default {
  name: "login",
  data() {
    const validatePhoneNumber = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        phone: "",
        password: ""
      },
      loginRules: {
        phone: [
          { required: true, trigger: "blur", validator: validatePhoneNumber }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ]
      },
      loading: false,
      showDialog: false
    };
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByPhone", this.loginForm)
            .then(() => {
              this.$Message.success("登录成功");
              this.loading = true;
              this.$router.push({ path: "/" });
            })
            .catch(err => {
              this.$Message.error("登录失败，用户名或者密码错误！");
              this.loading = false;
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    }
  },
  init() {},
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
};
</script>
<style >
#canvascontainer {
  position: absolute;
  top: 0px;
}
.wz-input-group-prepend {
  background-color: #141a48;
  border: 1px solid #2d8cf0;
  border-right: none;
  color: #2d8cf0;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
.login-container {
  height: 100vh;
  background-color: #0d1f2a;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 1px solid #2d8cf0;
    -webkit-appearance: none;
    border-radius: 3px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .log-logo {
    left: 0;
    right: 0;
    text-align: center;
    color: #2d8cf0;
    font-weight: bold;
    font-size: 30px;
    margin: 120px auto;
    margin-bottom: 30px;
    float: top;
  }
  .login-form {
    left: 0;
    right: 0;
    width: 350px;
    padding: 35px 35px 15px 35px;
    margin: 10px auto;
  }
  .app-copyright {
    left: 0;
    right: 0;
    bottom: 20px;
    margin-top: 150px;
    position: relative;
    text-align: center;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .login-button {
    background-color: #a87f54;
    border-color: #a87f54;
  }
}
</style>
