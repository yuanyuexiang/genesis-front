import Cookies from 'js-cookie';

const postoffice = {
    state: {
        data:{},
    },
    mutations: {
        POST_DATA: (state,data) => {
            state.data = data;
        },
    },
    actions: {
        postData: ({ commit },data) => {
            commit('POST_DATA',data)
        },
    }
};

export default postoffice;
