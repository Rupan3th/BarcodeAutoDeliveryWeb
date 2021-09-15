<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title>账号管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <v-text-field
          v-model="search"
          append-icon='search'
          label="搜索"
          single-line
          hide-details
        ></v-text-field>  

        <v-spacer></v-spacer>  
      
        <v-dialog v-model="dialog" max-width="500">      
          <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!btnIsValid"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              添新
            </v-btn>
          </template>   

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>              
              <v-container>     
                    <v-text-field  :disabled="!itemIsValid"
                      v-model="editedItem.id"
                      label="身份证件"
                      prepend-icon="perm_identity"
                    ></v-text-field>

                    <v-text-field  :disabled="!itemIsValid"
                      v-model="editedItem.name"
                      label="名称"
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
                      v-model="editedItem.company"
                      label="公司"
                      prepend-icon="emoji_transportation"
                    ></v-text-field>    

                    <v-text-field  
                      v-model="editedItem.job_title"
                      label="职位名称"
                      prepend-icon="construction"
                    ></v-text-field>          
              
                    <v-text-field :disabled="!itemIsValid"   
                      v-model="editedItem.pw"
                      label="密码"
                      prepend-icon="password"
                    ></v-text-field>      

                    <v-text-field :disabled="!itemIsValid"   
                      v-model="editedItem.level"
                      label="权限"
                      prepend-icon="grade"
                    ></v-text-field>    

                <v-spacer :disabled="!formIsValid"></v-spacer>
                
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
              <v-btn               
                color="blue darken-1"
                text
                @click="save"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">是否确实要删除此项目？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="id"
      class="elevation-1"
    >
      
      <template slot="items" slot-scope="props" >
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <td class="text-xs-right">{{ props.item.company }}</td>
          <td class="text-xs-right">{{ props.item.job_title }}</td>
          <td class="text-xs-right">{{ props.item.pw }}</td>
          <td class="text-xs-right">{{ props.item.level }}</td>
          <td class="text-xs-right" >    
            <template actions="{ props.item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon :disabled="!btnIsValid"
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </template>
            
          </td>
      </template>
      
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
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
        { text: '权限', value: 'actions', sortable: false },
      ],    

      desserts: [],
      editedIndex: -1,
      editedItem: {
        idx: '',
        id: '',
        name: '',
        phone_num: '',
        company: '',
        job_title: '',
        pw: '',
        level: '',
      },
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
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },          
    },
    created () {
      if(this.$store.state.userLevel != "1") { this.btnIsValid = false}
      this.initialize()
    },
    methods: {           
      redirect () {
        this.$router.push('/')
      },

      async initialize () {
        console.log("User Session  ====  ", this.$store.state.userLevel)        

        await axios.post('/apis/users/get_users')
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('user id ====', res.data[i].id)
            let newItem = {
              id: res.data[i].id,
              name:  res.data[i].name,
              phone_num: res.data[i].phone_num,
              company: res.data[i].company,
              job_title: res.data[i].job_title,
              pw: res.data[i].pw,
              level: res.data[i].level
            }
            // console.log('editedItem ====', this.editedItem.cam_model)
            this.desserts.push(newItem)
            // console.log('desserts ====', this.desserts[i])
          }
        })
        .catch(err => {
          console.log('err ====', err)
        }) 
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
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      async save () {  
        if( this.editedItem.id == ''  ||
            this.editedItem.name == ''  ||
            this.editedItem.phone_num == ''  ||
            this.editedItem.company == ''  ||
            this.editedItem.job_title == ''  ||
            this.editedItem.pw == ''  ||
            this.editedItem.level == '' ) this.formIsValid = true
        else{
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            ///Update Row selected item db concect  ///
            await axios.post('/apis/users/update_row', this.editedItem)
            .then(res => {

            })
            .catch(err => {
              console.log('err ====', err)
            })
            ///////////////////                

          } else {
            this.desserts.push(this.editedItem)

            /// Insert new Item db concect  ///
            await axios.post('/apis/users/insert_new', this.editedItem)
            .then(res => {

            })
            .catch(err => {
              console.log('err ====', err)
            })
            ///////////////////

          }
          this.close()   
        }
      },
    },
  }
</script>