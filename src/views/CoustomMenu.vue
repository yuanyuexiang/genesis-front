<template>
    <Tree :data="data5" :render="renderContent"></Tree>
</template>
<script>
    export default {
        data () {
            return {
                data5: [
                    {
                        title: '公众号菜单',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-plus-empty',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '52px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: [
                            {
                                title: '教会信息',
                                expand: true,
                                children: [
                                    {
                                        title: '教会位置',
                                        expand: true
                                    },
                                    {
                                        title: '教会介绍',
                                        expand: true
                                    },
                                    {
                                        title: '聚会时间',
                                        expand: true
                                    },
                                    {
                                        title: '主日证道',
                                        expand: true
                                    },
                                    {
                                        title: '主日预告',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: '信仰生活',
                                expand: true,
                                children: [
                                    {
                                        title: '初信答疑',
                                        expand: true
                                    },
                                    {
                                        title: '如何祈祷',
                                        expand: true
                                    },
                                    {
                                        title: '服侍团契',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: '关于我们',
                                expand: true,
                                children: [
                                    {
                                        title: '文章投稿',
                                        expand: true
                                    },
                                    {
                                        title: '奉献支持',
                                        expand: true
                                    },
                                    {
                                        title: '传播事工',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                }
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
        }
    }
</script>
