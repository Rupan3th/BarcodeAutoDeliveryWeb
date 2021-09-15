<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form @submit.prevent>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>管理员登录</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field prepend-icon="person" id="id" name="id" label="用户名" type="text" v-model="frmId"></v-text-field>
                    <v-text-field prepend-icon="lock" id="pw" name="pw" label="密码" type="password" v-model="frmPw"></v-text-field>
                </v-card-text>

                <p v-if="returnMsg" class="error">
                  {{ returnMsg }}
                </p>

                <v-card-actions>
                  <!-- <NuxtLink to="/v1/regist">
                    Go to regist
                  </NuxtLink> -->
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">
                    登录
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'loginLayout',
  data () {
    return {
      returnMsg: null,
      frmId: '',
      frmPw: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          id: this.frmId,
          pw: this.frmPw
        }).then(() => this.redirect())
      } catch (e) {
        this.returnMsg = e.message
      }
    },
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>