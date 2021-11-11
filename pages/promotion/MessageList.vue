<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title>文字信息</v-toolbar-title>
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
      sort-by="start_time"
      class="elevation-1"
    >
      
      <template slot="items" slot-scope="props" >
          <td>{{ props.item.cam_model }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <td class="text-xs-right">{{ props.item.serial_num }}</td>
          <td class="text-xs-right">{{ props.item.send_time }}</td>
          <td class="text-xs-right">{{ props.item.message }}</td>
          <td class="text-xs-right">{{ props.item.image }}</td>
          <td class="text-xs-right" >    
            <template actions="{ props.item }">              
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
          text: '相机型号',
          align: 'start',
          sortable: false,
          value: 'cam_model',
        },
        { text: '手机号码', value: 'phone_num' },
        { text: '序列号', value: 'serial_num' },
        { text: '发送时间', value: 'send_time' },
        { text: '消息', value: 'message' },
        { text: '形象', value: 'image' },
        { text: '行动', value: 'actions', sortable: false },
      ],
      start_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      end_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

      time: null,
      timemenu1: false,
      timemenu2: false,    

      desserts: [],
      editedIndex: -1,
      editedItem: {
        idx: '',
        cam_model: '',
        phone_num: '',
        serial_num: '',
        send_time: '',
        message: '',
        image: '',
      },
      defaultItem: {
        idx: '',
        cam_model: '',
        phone_num: '',
        serial_num: '',
        send_time: '',
        message: '',
        image: '',
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

        await axios.post('/apis/messages/message_list')
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('send_time ====', res.data[i].send_time.toString().substring(0, 10))
            let newItem = {
              cam_model: res.data[i].cam_model,
              phone_num:  res.data[i].phone_num,
              serial_num: res.data[i].serial_num,
              send_time: res.data[i].send_time.toString(),
              message: res.data[i].message,
              image: res.data[i].image
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

      async deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        /// Get idx Selected item db concect  ///
        await axios.post('/apis/messages/get_idx_selected', this.editedItem)
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
        await axios.post('/apis/messages/delete_selected', this.editedItem)
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
      

    },
  }
</script>