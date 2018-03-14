<template>
    <navbar class="navbar">
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
        <router-link to="/">
            <p class="logo-youentang">公众号管理系统</p>
        </router-link>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item d-md-down-none">
                <a class="nav-link">
                    <Icon type="android-notifications" size="20"></Icon>
                    <span class="badge badge-pill badge-danger">5</span>
                </a>
            </li>
            <Dropdown class="nav-item">
                <a href="javascript:void(0)">
                    <span slot="button">
                        <span class="d-md-down-none">{{userName}}</span>
                        <span class="d-md-down-none">你好！</span>
                    </span>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item divided>
                        <router-link tag="div" to='/administrator' class="nav-link">
                            <p class="dropdown-itemp">
                                <Icon type="android-contact"></Icon>用户</p>
                        </router-link>
                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="android-settings"></Icon>设置</p>
                    </Dropdown-item>

                    <Dropdown-item>
                        <a href="" @click="Logout">
                            <p class="dropdown-itemp">
                                <Icon type="power"></Icon>注销</p>
                        </a>
                    </Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <li class="nav-item d-md-down-none">
                <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
            </li>
        </ul>
    </navbar>
</template>
<script>
import navbar from "./Navbar";

export default {
  name: "header",
  data() {
    return {
      roles: this.$store.getters.roles.toString(),
      userName: this.$store.getters.name
    };
  },
  components: {
    navbar
  },
  methods: {
    Logout(e) {
      e.preventDefault();
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    click() {
      // do nothing
    },
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-mobile-show");
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("aside-menu-hidden");
    }
  }
};
</script>

<style type="text/css" scoped>
.logo-youentang {
  text-align: left;
  font-size: 25px;
  padding: 10px;
  color: white;
}
.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 10px;
}
.header-item .ivu-dropdown-item {
  padding: 15px;
}
.header-item {
  width: 130px;
  /*background-color: #20a8d8;*/
  /*background-color: white;*/
  height: 55px;
}
.header-item a {
  color: white !important;
}
.navbar {
    background-color: #1d355b;
}
/*1d355b*/
</style>
