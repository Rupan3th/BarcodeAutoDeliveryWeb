<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title class="mytitle">文字信息
          <v-btn flat icon color="green" @click="refresh_table()"         >
            <v-icon large>cached</v-icon>
          </v-btn> 
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <v-text-field
          class="mysearchfield"
          v-model="search"
          append-icon='search'
          label="搜索"
          single-line
          hide-details
        ></v-text-field>  

        <v-spacer></v-spacer>  

        <v-dialog v-model="dialogDelete" max-width="500px">
          <template v-slot:activator="{ attrs }">            
            <v-btn 
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"                           
              @click="delete_selected()"
            >
              删除
            </v-btn>
            <div style="margin-top: 20px; margin-left: 20px;">              
              <v-checkbox value             
                v-model="all_checked"
                label = "全部"
                @change="allcheckboxUpdated(all_checked)"
                :disabled="!btnIsValid"
              >
              </v-checkbox>         
            </div>            
          </template>   

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
      :pagination.sync="pagination"
      class="elevation-1"
      rows-per-page-text="每页行数" 
    >
      
      <template slot="items" slot-scope="props" >
          <td>{{ props.item.cam_model }}</td>
          <td class="text-xs-right">{{ props.item.ex_serial_num }}</td>
          <td class="text-xs-right">{{ props.item.order_num }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <td class="text-xs-right">{{ props.item.send_time }}</td>
          <td class="text-xs-right">{{ props.item.message }}</td>
          <!-- <td class="text-xs-right">{{ props.item.image }}</td> -->
          <td style="text-align: center;  max-width: 50px"  >   
            <template selected="{ props.item }">
              <div style="margin-top: 12px; margin-bottom: -12px;">                
                <v-checkbox :disabled="!btnIsValid"
                  v-model="props.item.selected"
                  value
                ></v-checkbox>
              </div>            
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
      pagination: {
          sortBy: 'send_time',
          descending: true,
          rowsPerPage: 10
        },

      dialog: false,
      dialogDelete: false,
      formIsValid: false,
      itemIsValid: true,
      btnIsValid: true,
      search: '',
      headers: [
        {
          text: '相机型号',
          align: 'center',
          sortable: false,
          value: 'cam_model',
        },
        { text: 'ExSerialNumber', value: 'ex_serial_num', align: 'center', },
        { text: '订单号', value: 'order_num', align: 'center', },
        { text: '手机号码', value: 'phone_num', align: 'center', },
        { text: '发送时间', value: 'send_time', align: 'center', },
        { text: '信息内容', value: 'message', align: 'center', },
        // { text: '图像', value: 'image', align: 'center', },
        { text: '作用', value: 'actions', sortable: false , align: 'center',},
      ],
      start_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      end_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,

      time: null,
      timemenu1: false,
      timemenu2: false,    

      desserts: [],
      push_addresses: [],
      selected_idxs: '',
      editedIndex: -1,
      
      defaultItem: {
        idx: '',
        cam_model: '',
        order_num: '',
        phone_num: '',
        ex_serial_num: '',
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
            var d = new Date(res.data[i].send_time);
            var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                        
            let newItem = {
              cam_model: res.data[i].cam_model,
              order_num:  res.data[i].order_num,
              phone_num:  res.data[i].phone_num,
              ex_serial_num: res.data[i].ex_serial_num,
              send_time: datestring,
              message: res.data[i].message,
              // image: res.data[i].image
              selected: false
            }
            
            this.desserts.push(newItem)
            // console.log('desserts ====', this.desserts[i])
          }
        })
        .catch(err => {
          console.log('err ====', err)
        }) 
      },      

      async refresh_table(){
        this.desserts= [];
        this.initialize();
      },

      async delete_selected () {
        this.push_addresses = [];
        this.selected_idxs = '';
        for(var i=0; i<this.desserts.length; i++) {
          // console.log(' Selected value ['+this.desserts[i].cam_model+'] ===== ', this.desserts[i].selected)      
          if(this.desserts[i].selected == true) {
            // console.log(' Selected phone  ===== ', this.desserts[i].phone_num)     
            let newItem = {
              cam_model: this.desserts[i].cam_model,              
              order_num: this.desserts[i].order_num,
              phone_num: this.desserts[i].phone_num,              
              ex_serial_num: this.desserts[i].ex_serial_num,
              message: this.desserts[i].message                 
            } 
            this.push_addresses.push(newItem)
          }          
        }                
        if(this.push_addresses.length > 0) {         
          for(var i=0; i<this.push_addresses.length; i++) {   
            await axios.post('/apis/messages/get_idx_selected', this.push_addresses[i])
            .then(res => {               
                this.selected_idxs = this.selected_idxs+ res.data[0].idx + ','                
              })
            .catch(err => {
                  console.log('err ====', err)
              })
            
          }
          this.selected_idxs = this.selected_idxs.slice(0, -1);
          console.log('get idx of selected_idxs ====', this.selected_idxs)

          this.dialogDelete = true
          
        }
        
        else alert("请选择要删除的项目。")
      },

      async deleteItemConfirm () {
        // this.desserts.splice(this.editedIndex, 1)
        /// Delete Selected item db concect  ///
        
        await axios.post('/apis/messages/delete_multi_selected', { idxs: this.selected_idxs} )
        .then(res => {
            console.log('delete res ====', res.data.affectedRows)
            if(parseInt(res.data.affectedRows) > 0){
              this.dialogDelete = false
              
            }
            
          })
        .catch(err => {
              console.log('err ====', err)
          })
        ///////////////////         
      },
     
      closeDelete () {
        this.dialogDelete = false
        this.desserts= [];
        this.initialize();
      },
      

      allcheckboxUpdated(all_checked) {               
        console.log(' ------ All Select checked -------', all_checked) 
        for(var i=0; i<this.desserts.length; i++) {
          console.log(' this.desserts['+i+']-------', this.desserts[i]) 
          if(all_checked == true)  this.desserts[i].selected = true;
          else this.desserts[i].selected = false;
        }
      },

    },
  }
</script>