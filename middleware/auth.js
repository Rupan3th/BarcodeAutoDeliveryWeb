export default function ({ store, redirect, error }) {
  // auth check
  if (!store.state.authUser) {
    return redirect('/v1/login')
  }
}