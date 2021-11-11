<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form @submit.prevent>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>{{ title_txt }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-text-field prepend-icon="person" id="id" name="id" label="用户名" type="text" v-model="frmId" @change="validateId"></v-text-field>
                    <v-text-field v-show="itemIsValid" prepend-icon="textsms" label="名称" type="text" v-model="frmName" ></v-text-field>    
                    <v-text-field v-show="itemIsValid" prepend-icon="phone_android" label="手机号码" maxlength="11" counter="11" v-model="frmPhone"></v-text-field>
                    <v-text-field v-show="itemIsValid" prepend-icon="emoji_transportation" label="公司" type="text" v-model="frmCompany"></v-text-field>
                    <v-text-field v-show="itemIsValid" prepend-icon="construction" label="职位名称" type="text" v-model="frmJob"></v-text-field>
                    <v-text-field prepend-icon="lock" id="password" name="pw" label="密码" type="password" v-model="frmPw" @change="validatePw"></v-text-field>
                    <v-text-field v-show="itemIsValid" prepend-icon="password" id="checkedPassword" name="conf_pw" label="确认密码" type="password" v-model="frmPw_conf" @change="validateCheckedPw"></v-text-field>
                    <v-text-field v-show="itemIsValid" prepend-icon="mail" id="email" name="email" label="电子邮件" type="mail" v-model="frmMail" @change="validateEmail"></v-text-field>
                </v-card-text>

                <p v-if="returnMsg" class="error">
                  {{ returnMsg }}
                </p>

                <v-card-actions>
                  <!-- <NuxtLink to="/v1/login/regist">
                    Go to regist
                  </NuxtLink> -->
                  <a @click="GoToRegist">
                    {{ opt_txt }}
                  </a>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">
                    {{ btn_lavel }}
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
      title_txt: '管理员登录',
      btn_lavel : '登录',
      opt_txt: 'Go to regist',
      returnMsg: null,
      frmId: '',
      frmName: '',
      frmPhone: '',
      frmCompany: '',
      frmJob: '',
      frmPw: '',
      frmPw_conf: '',
      frmMail: '',
      itemIsValid: false,
    }
  },
  methods: {
    async login () {
      if(this.itemIsValid == false){
        try {
          await this.$store.dispatch('login', {
            id: this.frmId,
            pw: this.frmPw
          }).then(() => this.redirect())
        } catch (e) {
          this.returnMsg = e.message
        }
      } else {
        let newItem = {
              id: this.frmId,
              name: this.frmName,
              phone_num: this.frmPhone,
              company: this.frmCompany,
              job_title: this.frmJob,
              pw: this.frmPw,
              level: 2
            }
        if( newItem.id != '' && 
            newItem.name != '' && 
            newItem.phone_num != '' && 
            newItem.company != '' && 
            newItem.job_title != '' && 
            newItem.pw != '')  {
              this.$axios.post('/apis/users/insert_new', newItem)
              .then(res => {
                  alert("success regist") 
                  console.log('success regist')
                  
                  this.itemIsValid = false
                  this.title_txt = '管理员登录'
                  this.btn_lavel = '登录'
                  this.opt_txt = "Go to regist"
                  })
              .catch(err => {
                 alert('err ====', err) 
                    console.log('err ====', err)
                  })
            }
        
      }
      
    },

    async GoToRegist () {     
      if(this.itemIsValid == false){
        this.itemIsValid = true
        this.title_txt = '管理员注册'
        this.btn_lavel = '注册'
        this.opt_txt = "Go to login"
      } else {
        this.itemIsValid = false
        this.title_txt = '管理员登录'
        this.btn_lavel = '登录'
        this.opt_txt = "Go to regist"
      }      
      // this.$router.push('/v1/login/regist')
    },

    redirect () {
      this.$router.push('/')
    },

    validateId() { 
            let id = document.getElementById('id').value 
            console.log(id) 
            if (id.length < 5) { 
                alert("ID至少是5位以上") 
                return false 
            } else if (id.search(/\s/) !== -1) { 
                alert("ID不可能有空白") 
                return false 
            } else { 
              if(this.itemIsValid == true){                
                this.$axios.post("/apis/users/get_users", {id: id} ) 
                .then(res => { 
                    console.log('user by id ====', res.data)
                    if (res.data.length > 0) { 
                        this.frmId = ''
                        alert("ID中伏。该ID已在使用中。") 
                        return false 
                    } else { 
                        alert("ID不是中伏。可以使用的id。") 
                        return true 
                    } 
                }) 
              }
                
            } 
        },

        validatePw() { 
            let pw = document.getElementById("password").value 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (pw.length < 8 || pw.length > 20) { 
                this.frmPw = ''
                alert("请输入8位~20位以内。"); 
                return false; 
            } else if (pw.search(/\s/) !== -1) { 
                this.frmPw = ''
                alert("密码请输入无空格。"); 
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                this.frmPw = ''
                alert("请混合输入英文字母、数字和特殊字符。"); 
                return false; 
            } else { 
                console.log("经过"); return true; 
            } 
        },

    validateCheckedPw() { 
            let pw = document.getElementById("password").value 
            let checkedPw = document.getElementById("checkedPassword").value 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (checkedPw.length < 8 || checkedPw.length > 20) { 
                alert("请输入 8 到 20 位数字。"); 
                return false; 
            } else if (checkedPw.search(/\s/) !== -1) { 
                alert("请输入不带空格的密码。"); 
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                alert("请混合输入英文字母、数字和特殊字符。"); 
                return false; 
            } else if (pw !== checkedPw) { 
                this.frmPw_conf = ''
                alert("密码不正确。") 
            } else { 
                console.log("经过"); return true; 
            } 
        },

        validateEmail() { 
            let email = document.getElementById("email").value 
            const regExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/ 
            if (email.search(/\s/) !== -1) { 
                alert("请输入您的电子邮件地址，不要有空格。") 
                return false 
            } else if (email.match(regExp) === null) { 
                alert("电子邮件格式不正确。") 
                return false 
            } else { 
                console.log("成功") 
                return true 
            } 
        },
    
  }
}
</script>