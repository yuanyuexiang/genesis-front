const notification = {
    state: {
        count:0
    },
    mutations: {
        ADD_NOTIFICATION: (state,data) => {
            state.count = state.count + 1;
            console.log(data)
        },
        DEL_NOTIFICATION: (state) => {
            state.count = state.count - 1;
            if(state.count < 0){
                state.count = 0;
            }
        }
    },
    actions: {
        addNotification: ({ commit },data) => {
            commit('ADD_NOTIFICATION',data)
        },
        delNotification: ({ commit }) => {
            commit('DEL_NOTIFICATION')
        },
    }
};

export default notification;
