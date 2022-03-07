import axios from 'axios'

export const state = () => ({
  sidebar: false,
  authUser: null,
  userLevel: null,
  topMenu: [
    {
      id: "cam_module",
      name: "cam_model_name"
    },
    {
      id: "cam_serial",
      name: "cam_model_NO"
    }
  ]
})

export const mutations = {
  toggleSidebar: function (state) {
    state.sidebar = !state.sidebar
  },
  LOGIN: function (state, user) {
    state.authUser = user
    
  },
  SESSION: function (state, user) {   
    state.userLevel = user
  },
  LOGOUT: function () {    
    state.authUser = null
  },
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_MENU: function (state, data) {
    state.topMenu = data.topMenu
    state.aside = data.aside
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server rendering of every page
  async nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login({ commit }, { id, pw }) {
    console.log("I am going now -------")
    let { data } = await axios.post('/apis/login/login', { id, pw })
    
    console.log("login response data ===", data)
    if (!data.id) {
      throw new Error('登录失败.')
    }
    
    commit('LOGIN', data.id)
    commit('SESSION', data.level)
    
    this.$cookies.set('user_id', data.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    this.$cookies.set('user_level', data.level, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    
  },
  async logout({ commit }) {  
    // this.$cookies.remove('user_id')
    await axios.post('/apis/logout').then(() => {
      commit('LOGOUT')      
      this.$cookies.remove('user_id')
      console.log("Log out  ", this.$cookies.get('user_id') + " "+ this.$cookies.get('user_level'))
  
    })    
    
  }
  // async camera_list({ commit }, { id, pw }) {
  //   let { data } = await axios.post('/apis/controllers/camera_list/camera_list')
  //   if (!data.id) {
  //     throw new Error('登录失败.')
  //   }
  // }
}