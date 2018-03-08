<template>
    <Tabs value="name1">
        <TabPane label="个人资料" name="name1">
            <Form ref="formValidate" :model="administrator" :label-width="100">
                <FormItem label="账号/手机号：" prop="name" class="myLable">
                    <span class="myLable">{{administrator.phone}}</span>
                    <a class="navbar-togglerk" @click="modalPhone = true">
                        <Icon type="edit" class="myIcon"></Icon>
                    </a>
                    <Modal v-model="modalPhone" title="修改账号/手机号" @on-ok="ok" @on-cancel="cancel">
                        <Form :model="formItem" :label-width="80">
                            <Form-item label="新手机号">
                                <Input placeholder="请输入手机号"></Input>
                            </Form-item>
                        </Form>
                    </Modal>
                </FormItem>
                <FormItem label="昵称：" prop="mail" class="myLable">
                    <span class="myLable">{{administrator.name}}</span>
                    <a class="navbar-togglerk" @click="modalName = true">
                        <Icon type="edit" class="myIcon"></Icon>
                    </a>
                    <Modal v-model="modalName" title="修改昵称" @on-ok="ok" @on-cancel="cancel">
                        <Form :model="formItem" :label-width="80">
                            <Form-item label="新昵称">
                                <Input placeholder="请输入昵称"></Input>
                            </Form-item>
                        </Form>
                    </Modal>
                </FormItem>
                <FormItem label="密码：" prop="mail" class="myLable">
                    <span class="myLable">******</span>
                    <a class="navbar-togglerk" @click="modalPassword = true">
                        <Icon type="edit" class="myIcon"></Icon>
                    </a>
                    <Modal v-model="modalPassword" title="修改密码" @on-ok="ok" @on-cancel="cancel">
                        <Form :model="formItem" :label-width="80">
                            <Form-item label="旧密码">
                                <Input placeholder="请输入旧密码"></Input>
                            </Form-item>
                            <Form-item label="新密码">
                                <Input placeholder="请输入新密码"></Input>
                            </Form-item>
                        </Form>
                    </Modal>
                </FormItem>
                <FormItem label="角色：" prop="mail" class="myLable">
                    <span class="myLable">{{administrator.roles}}</span>
                    <a class="navbar-togglerk" @click="modalRoles = true">
                        <Icon type="edit" class="myIcon"></Icon>
                    </a>
                    <Modal v-model="modalRoles" title="修改权限角色" @on-ok="ok" @on-cancel="cancel">
                        <!--
                        <Form :model="formItem" :label-width="80">
                            <Form-item label="当前角色">
                                <Radio-group v-model="formItem.radio">
                                    <Radio label="male">记者</Radio>
                                    <Radio label="female">编辑</Radio>
                                    <Radio label="female">工程师</Radio>
                                </Radio-group>
                            </Form-item>
                        </Form>
                        -->
                        <span>无权修改</span>
                    </Modal>
                </FormItem>
                <FormItem label="状态：" prop="mail" class="myLable">
                    <span class="myLable">已激活</span>
                    <a class="navbar-togglerk" @click="modalStatus = true">
                        <Icon type="edit" class="myIcon"></Icon>
                    </a>
                    <Modal v-model="modalStatus" title="修改权限角色" @on-ok="ok" @on-cancel="cancel">
                        <span>无权修改</span>
                    </Modal>
                </FormItem>
            </Form>
        </TabPane>
    </Tabs>
</template>
<script>
export default {
  data() {
    return {
      administrator: {
        roles: this.$store.getters.roles.toString(),
        name: this.$store.getters.name,
        phone: this.$store.getters.phone,
        uid: this.$store.getters.uid
      },
      modalPhone: false,
      modalName: false,
      modalPassword: false,
      modalRoles: false,
      modalStatus: false
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  }
};
</script>
<style scoped>
.myLable {
  background: lightyellow;
  border-radius: 5px;
}
.myIcon {
  transform: translateY(-50%);
  top: 50%;
  right: 10px;
  position: absolute;
}
</style>