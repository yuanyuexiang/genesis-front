<template>
    <div class="animated fadeIn">
        
        <Tabs>
            <TabPane label="图文库" icon="images">
                <Layout>
        <Header>Header</Header>
        <Layout>
            <Content>Content</Content>
            <Sider hide-trigger>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
            </TabPane>
            <TabPane label="图片库" icon="image">图片库</TabPane>
            <!--
            <TabPane label="语言库" icon="mic-a">语言库</TabPane>
            <TabPane label="视频库" icon="android-film">视频库</TabPane>
            -->
        </Tabs>
        <!--
        <Row style="background-color: white !important;">
            <Col span="12">
            <span>图文素材</span>
            </Col>
            <Col span="12" >
            <span style="text-align: right;display: inline-block;width: 100%;">+图文素材</span>
            </Col>
            
        </Row>
        -->
        <hr>
    </div>
</template>

<script>
export default {
}
</script>

<style type="text/css" scoped>
</style>