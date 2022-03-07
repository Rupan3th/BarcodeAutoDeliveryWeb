
export default function ({ store, redirect, error, app, route }) {
  const cookie_userid = app.$cookies.get('user_id')
  const cookie_userlevel = app.$cookies.get('user_level')

  console.log(cookie_userid + " "+ cookie_userlevel)

  if((!cookie_userid || !cookie_userlevel) && route.path !== '/v1/login') {
    return redirect('/v1/login')
  }

  store.commit('LOGIN', cookie_userid)
  store.commit('SESSION', cookie_userlevel)


  // auth check
  // if (!store.state.authUser) {
  //   return redirect('/v1/login')
  // }
}

