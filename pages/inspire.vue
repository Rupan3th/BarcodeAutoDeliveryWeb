<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title>个人信息</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>             

        <v-spacer></v-spacer>  
      
        <v-dialog v-model="dialog" max-width="500">      
          <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="true"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              编辑
            </v-btn>
          </template>   

          <v-card>
            <v-card-title>
              <span class="text-h5">更新</span>
            </v-card-title>
            <v-card-text>              
              <v-container>   
                    <v-text-field 
                      v-model="frm_old_pw"
                      label="当前密码"
                      prepend-icon="pin"
                      type=password
                      @change="validatePw"
                    ></v-text-field>      

                    <v-text-field    
                      v-model="frm_new_pw"
                      label="新密码"
                      prepend-icon="password"
                      type=password
                      @change="validatePw"
                    ></v-text-field> 

                    <v-text-field  
                      v-model="frm_conf_pw"
                      label="确认密码"
                      prepend-icon="password"
                      type=password
                       @change="validateCheckedPw"
                    ></v-text-field> 
                <v-spacer ></v-spacer>
                
              </v-container>              
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn  :disabled="btnIsValid"              
                color="blue darken-1"
                text
                @click="save"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>
      </v-toolbar>
    </template>

    <v-container > 
      <v-layout row wrap>                   
        <v-flex xs12 sm5>
          <v-text-field  
                          v-model="editedItem.id"
                          label="用户名"
                          prepend-icon="perm_identity"
                        ></v-text-field>
          <v-text-field  
                          v-model="editedItem.name"
                          label="姓名"
                          prepend-icon="textsms"
                        ></v-text-field> 
          <v-text-field 
                          v-model="editedItem.phone_num"
                          label="手机号码"
                          prepend-icon="phone_android"
                          maxlength="11"
                          counter="11"
                        ></v-text-field>   
          <v-text-field 
                          v-model="editedItem.email"
                          label="电子邮件"
                          prepend-icon="email"                      
                        ></v-text-field>
          <v-text-field  
                          v-model="editedItem.company"
                          label="公司名"
                          prepend-icon="emoji_transportation"
                        ></v-text-field>   
          <v-text-field  
                          v-model="editedItem.job_title"
                          label="职位"
                          prepend-icon="construction"
                        ></v-text-field>  
          <v-layout row wrap>                   
            <v-flex xs12 sm10>
              <v-text-field    
                          v-model="editedItem.pw"
                          label="密码"
                          prepend-icon="password"
                          type="password"
                        ></v-text-field> 
            </v-flex>     
            <v-flex xs12 sm2> 
              <v-btn 
                  color="primary"
                  dark
                  class="mb-2"
                  @click="openDlg()"
                >
                  密码修改
              </v-btn>  
            </v-flex> 
          </v-layout>    
          <v-text-field  
                          v-model="editedItem.level"
                          label="级别"
                          prepend-icon="grade"
                        ></v-text-field> 

        </v-flex>  
        <v-flex xs12 sm6> 

        </v-flex>
      </v-layout>    
    </v-container>

  </div>  
</template>

<script>
  import axios from 'axios'
  
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      formIsValid: false,
      itemIsValid: true,
      btnIsValid: true,
      search: '',
      headers: [
        {
          text: '身份证件',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: '名称', value: 'name' },
        { text: '手机号码', value: 'phone_num' },
        { text: '公司', value: 'company' },
        { text: '职位名称', value: 'job_title' },
        { text: '密码', value: 'pw' },
        { text: '等级', value: 'level' },
        // { text: '权限', value: 'actions', sortable: false },
      ],    

      desserts: [],
      editedIndex: -1,
      editedItem: {
        idx: '',
        id: '',
        name: '',
        phone_num: '',
        email: '',
        company: '',
        job_title: '',
        pw: '',        
        level: '',
      },

      frm_new_pw: '',
      frm_old_pw: '',
      frm_conf_pw: '',

      defaultItem: {
        idx: '',
        id: '',
        name: '',
        phone_num: '',
        company: '',
        job_title: '',
        pw: '',
        level: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添新' : '编辑项'
      },      
    },
    
    created () {
      // if(this.$store.state.userLevel != "1") { this.btnIsValid = false}
      this.initialize()
    },
    methods: {           
      redirect () {
        this.$router.push('/')
      },

      async initialize () {
        console.log("User id  ====  ", this.$store.state.authUser)        

        await axios.post('/apis/users/get_users', { id: this.$store.state.authUser, })
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('user id ====', res.data[i].id)
            this.editedItem.id = res.data[0].id
            this.editedItem.name = res.data[0].name
            this.editedItem.phone_num = res.data[0].phone_num
            this.editedItem.email = res.data[0].email
            this.editedItem.company = res.data[0].company
            this.editedItem.job_title = res.data[0].job_title
            this.editedItem.pw = res.data[0].pw
            this.editedItem.level = res.data[0].level
          }
        })
        .catch(err => {
          console.log('err ====', err)
        }) 
      },

      openDlg(){
        this.dialog = true
      },

      async validatePw() { 
            let pw = this.frm_new_pw; 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (pw.length < 8 || pw.length > 20) { 
                this.frm_new_pw = ''
                alert("请输入8位~20位以内。"); 
                this.btnIsValid = true;
                return false; 
            } else if (pw.search(/\s/) !== -1) { 
                this.frm_new_pw = ''
                alert("密码请输入无空格。"); 
                this.btnIsValid = true;
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                this.frm_new_pw = ''
                alert("请混合输入英文字母、数字和特殊字符。"); 
                this.btnIsValid = true;
                return false; 
            } else {  
                if(this.frm_old_pw != "" && this.frm_new_pw != "" && this.frm_conf_pw !="")       {
                  this.btnIsValid = false;
                }  
                console.log("经过"); return true;                 
            } 
        },

      async validateCheckedPw() { 
            let pw = this.frm_new_pw;
            let checkedPw = this.frm_conf_pw; 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (checkedPw.length < 8 || checkedPw.length > 20) { 
                alert("请输入 8 到 20 位数字。"); 
                this.btnIsValid = true;
                return false; 
            } else if (checkedPw.search(/\s/) !== -1) { 
                alert("请输入不带空格的密码。"); 
                this.btnIsValid = true;
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                alert("请混合输入英文字母、数字和特殊字符。"); 
                this.btnIsValid = true;
                return false; 
            } else if (pw !== checkedPw) { 
                this.frm_conf_pw = ''
                alert("密码不正确。") 
                this.btnIsValid = true;
            } else { 
                if(this.frm_old_pw != "" && this.frm_new_pw != "" && this.frm_conf_pw !="")       {
                  this.btnIsValid = false;
                } 
                console.log("经过"); return true; 
            } 
        },

      async editItem (item) {
        if(this.$store.state.userLevel != "1") { this.itemIsValid = false}

        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        /// Get idx Selected item db concect  ///
        await axios.post('/apis/users/get_idx_selected', this.editedItem)
        .then(res => {
            console.log('get idx of res ====', res.data)
            this.editedItem.idx = res.data[0].idx
            console.log('get idx of editedItem ====', this.editedItem)
          })
        .catch(err => {
              console.log('err ====', err)
          })
        /////////////////// 

        this.dialog = true
        // if(this.editedItem.cam_model != '') this.formIsValid = true
        console.log("open dialog", item, this.dialog)
      },

      async deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        /// Get idx Selected item db concect  ///
        await axios.post('/apis/users/get_idx_selected', this.editedItem)
        .then(res => {
            console.log('get idx of delete res ====', res.data[0].idx)
            this.editedItem.idx = res.data[0].idx
            console.log('get idx of delete editedItem ====', this.editedItem)
          })
        .catch(err => {
              console.log('err ====', err)
          })
        /////////////////// 

        this.dialogDelete = true
      },
      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        /// Delete Selected item db concect  ///
        await axios.post('/apis/users/delete_selected', this.editedItem)
        .then(res => {

          })
        .catch(err => {
              console.log('err ====', err)
          })
        /////////////////// 

        this.closeDelete()
      },
      close () {
        this.dialog = false
        console.log("Closing...")
        // this.$nextTick(() => {
        //   this.editedItem.pw = this.editedItem.new_pw
        // })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      async save () {  
        
        // console.log("passwor...", this.frm_new_pw)

        await axios.post('/apis/users/update_password', {new_pw: this.frm_new_pw, old_pw: this.frm_old_pw, id: this.$store.state.authUser})
            .then(res => {              
              if(res.data.affectedRows == 1){
                // console.log("res.data.affectedRows...", res.data.affectedRows)
                alert("成功更新密码.");
                this.frm_new_pw = '';
                this.frm_conf_pw = '';
                this.close()
              }
              else{
                alert("更新密码失败。 请使用正确的输入值。");
              } 
            })
            .catch(err => {
              console.log('err ====', err)
            })                  
       
      }

    },
  }
</script>