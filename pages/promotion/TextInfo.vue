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
      
        <v-dialog v-model="dialog" max-width="500">      
          <template v-slot:activator="{ attrs }">            
            <v-btn 
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"                           
              @click="editMessage()"
            >
              推送
            </v-btn>
            <div style="margin-top: 20px; margin-left: 20px;">              
              <v-checkbox value
                v-model="all_checked"
                label = "全部"
                @change="allcheckboxUpdated(all_checked)"
              >
              </v-checkbox>         
            </div>            
          </template>   

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>              
              <v-container>    

                <v-text-field :readonly = "true"
                      v-model="order_nums"
                      label="订单号"
                      prepend-icon="precision_manufacturing"                      
                ></v-text-field>
                
                <v-text-field :readonly = "true"
                      v-model="phone_nums"
                      label="手机号码"
                      prepend-icon="phone_android"                      
                ></v-text-field>
                
                <v-textarea outlined 
                  prepend-inner-icon="comment"
                  v-model="message_content"
                  label="信息内容"
                  rows="4"
                  
                ></v-textarea>

                <!-- <v-img                  
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="500"
                  max-width="100%"
                  v-if="url" :src="url"
                  v-model= "url"
                ></v-img>

                 <input type="file" id="image_uploads" ref="file" 
                    v-on:change="handleFileUpload()"                    
                    accept="image/png, image/jpeg"/> -->
                
              </v-container>              
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary "
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn               
                color="primary "
                text
                @click="send"
              >
                发送
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">是否确实要删除此项目？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary " text @click="closeDelete">取消</v-btn>
              <v-btn color="primary " text @click="deleteItemConfirm">确认</v-btn>
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
          <td class="text-xs-right">{{ props.item.pid }}</td>
          <td class="text-xs-right">{{ props.item.vid }}</td>
          <td class="text-xs-right">{{ props.item.manufacturer }}</td>  
          <td class="text-xs-right">{{ props.item.product_info }}</td>
          <!-- <td class="text-xs-right">{{ props.item.serial_num }}</td> -->
          <td class="text-xs-right">{{ props.item.ex_serial_num }}</td>
          <td class="text-xs-right">{{ props.item.order_num }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <td class="text-xs-right">{{ props.item.end_time }}</td>
          <td class="text-xs-right">{{ props.item.remarks }}</td>
          <td class="text-xs-right" >    
            <template selected="{ props.item }">
              <div style="margin-top: 12px; margin-bottom: -12px;">                
                <v-checkbox
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
          sortBy: 'end_time',
          descending: false,
          rowsPerPage: 10
        },

      dialog: false,
      dialogDelete: false,
      formIsValid: false,
      itemIsValid: true,
      btnIsValid: true,
      search: '',
      url: null,      
      file: '',
      
      headers: [
        {
          text: '相机型号',
          align: 'center',
          sortable: false,
          value: 'cam_model',
        },
        { text: 'PID', value: 'pid', align: 'center' },
        { text: 'VID', value: 'vid', align: 'center' },
        { text: 'Manufacturer', value: 'manufacturer', align: 'center' },
        { text: 'ProductInfo', value: 'product_info', align: 'center' },
        // { text: '序列号', value: 'serial_num' },
        { text: 'ExSerialNumber', value: 'ex_serial_num', align: 'center' },
        { text: '订单号', value: 'order_num', align: 'center' },
        { text: '手机号码', value: 'phone_num', align: 'center' },    
        { text: '结束日期', value: 'end_time', align: 'center' },
        { text: '状态', value: 'remarks', align: 'center' },
        { text: '选择', value: 'selected', sortable: false , align: 'center'},
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
      editedIndex: -1,
      editedItem: {
        idx: '',
        cam_model: '',
        pid: '',
        vid: '',
        manufacturer: '',
        product_info: '',
        serial_num: '',
        ex_serial_num: '',
        order_num: '',
        phone_num: '',
        start_time: '',
        end_time: '',
        client_name: '',
        remarks: '',    
      },
      defaultItem: {
        idx: '',
        cam_model: '',
        pid: '',
        vid: '',
        manufacturer: '',
        product_info: '',
        serial_num: '',
        ex_serial_num: '',
        order_num: '',
        phone_num: '',
        start_time: '',
        end_time: '',
        client_name: '',
        remarks: '',           
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

        await axios.post('/apis/camera_list/camera_list')
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('start_time ====', res.data[i].start_time.toString().substring(0, 10))
            var state_active = "";
            if(res.data[i].allow == "2") { state_active = "活性" }
            else if(res.data[i].allow == "1") { state_active = "等待回应" }
            else { state_active = "试用版" }

            let newItem = {
              cam_model: res.data[i].cam_model,
              pid: res.data[i].pid,
              vid: res.data[i].vid,
              manufacturer: res.data[i].manufacturer,
              product_info: res.data[i].product_info,
              serial_num: res.data[i].serial_num,
              ex_serial_num: res.data[i].ex_serial_num,
              order_num: res.data[i].order_num,
              phone_num:  res.data[i].phone_num,
              start_time: res.data[i].start_time.toString().substring(0, 10),
              end_time: res.data[i].end_time.toString().substring(0, 10),
              remarks: state_active,
              selected: false
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

      editMessage(){        
        this.push_addresses = [];
        for(var i=0; i<this.desserts.length; i++) {
          // console.log(' Selected value ['+this.desserts[i].cam_model+'] ===== ', this.desserts[i].selected)      
          if(this.desserts[i].selected == true) {
            // console.log(' Selected phone  ===== ', this.desserts[i].phone_num)     
            let newItem = {
              cam_model: this.desserts[i].cam_model,              
              order_num: this.desserts[i].order_num,
              phone_num: this.desserts[i].phone_num,
              serial_num: this.desserts[i].serial_num,    
              ex_serial_num: this.desserts[i].ex_serial_num                     
            } 
            this.push_addresses.push(newItem)
          }          
        }                
        console.log(' push_addresses  ===== ', this.push_addresses)     
        
        if(this.push_addresses.length > 0) {
          this.phone_nums = ''
          this.order_nums = ''
          for(var ii=0; ii<this.push_addresses.length; ii++) {
            this.phone_nums += this.push_addresses[ii].phone_num+', '; 
            this.order_nums += this.push_addresses[ii].order_num+', ';            
          } 
          
          this.dialog = true
        }
        
        else alert("请选择要发送push的项目。")
      },

      async editItem (item) {
        // if(this.$store.state.userLevel != "1") { this.itemIsValid = false}       
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        /// Get idx Selected item db concect  ///
        await axios.post('/apis/camera_list/get_idx_selected', this.editedItem)
        .then(res => {
            console.log('get idx of res ====', res.data[0].idx)
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
        await axios.post('/apis/camera_list/get_idx_selected', this.editedItem)
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
        await axios.post('/apis/camera_list/delete_selected', this.editedItem)
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
      
      async send () {  
        if( this.message_content != null) {

          for(var i=0; i<this.push_addresses.length; i++){
            this.push_addresses[i].message = this.message_content
            this.push_addresses[i].image = this.url

            console.log('push_addresses['+i+'] include message ==', this.push_addresses)          
            // Object.assign(this.desserts[this.editedIndex], this.editedItem)

            ///Update Row selected item db concect  ///
            await axios.post('/apis/messages/send_sms', this.push_addresses[i])
              .then(res => {

              })
              .catch(err => {
                console.log('err ====', err)
              })
              ///////////////////  

              let formData = new FormData();
              formData.append('file', this.file);
              axios.post( '/TextInfo',
                formData,
                {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }
              ).then(function(){
                console.log('SUCCESS!!');
              })
              .catch(function(){
                console.log('FAILURE!!');
              });

          }      
         
          this.close()   
        }

      },

      allcheckboxUpdated(all_checked) {               
        console.log(' ------ All Select checked -------', all_checked) 
        for(var i=0; i<this.desserts.length; i++) {
          console.log(' this.desserts['+i+']-------', this.desserts[i]) 
          if(all_checked == true)  this.desserts[i].selected = true;
          else this.desserts[i].selected = false;
        }
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.url = URL.createObjectURL(this.file);
        
      }
    },

  }
</script>