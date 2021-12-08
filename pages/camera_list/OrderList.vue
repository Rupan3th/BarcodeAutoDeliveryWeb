<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title>订单清单</v-toolbar-title>
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
            <v-btn :disabled="true"
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
                <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="!btnIsValid"
                            v-model="editedItem.cam_model"
                            label="相机型号"
                            prepend-icon="camera"         
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        
                      </v-flex>
                </v-layout>                   

                <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="true"
                          v-model="editedItem.pid"
                          label="PID"
                          prepend-icon="text_format"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="true"
                          v-model="editedItem.vid"
                          label="VID"
                          prepend-icon="pin"
                        ></v-text-field>   
                      </v-flex>
                </v-layout>

                <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="true"
                          v-model="editedItem.order_num"
                          label="订单号"
                          prepend-icon="local_shipping"                          
                        ></v-text-field> 
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="true"
                          v-model="editedItem.phone_num"
                          label="手机号码"
                          prepend-icon="phone_android"
                          maxlength="11"
                          counter="11"
                        ></v-text-field>
                      </v-flex>
                </v-layout>  
                
                <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="true"
                          v-model="editedItem.manufacturer"
                          label="Manufacturer"
                          prepend-icon="precision_manufacturing"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="true"
                          v-model="editedItem.ex_serial_num"
                          label="ExSerial Number"
                          prepend-icon="code"
                        ></v-text-field>
                      </v-flex>
                </v-layout>
              
                <v-layout row wrap>                   
                  <v-flex xs12 sm6>
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.end_time"
                            label="结束日期"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.end_time"
                          @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>   
                  </v-flex>     
                  <v-flex xs12 sm6> 
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.req_time"
                            label="延长日期"
                            prepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.req_time"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                  </v-flex>                   
                </v-layout>
                
                <v-spacer :disabled="!formIsValid"></v-spacer>
                
              </v-container>              
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn               
                color="primary"
                text
                @click="save"
              >
                允许
              </v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">是否确实要删除此项目？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">取消</v-btn>
              <v-btn color="primary" text @click="deleteItemConfirm">确认</v-btn>
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
          <td class="text-xs-right">{{ props.item.serial_num }}</td>
          <td class="text-xs-right">{{ props.item.ex_serial_num }}</td>
          <td class="text-xs-right">{{ props.item.order_num }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>          
          <!-- <td class="text-xs-right">{{ props.item.uid }}</td> -->
          <td class="text-xs-right">{{ props.item.end_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.start_hour }}</td> -->
          <td class="text-xs-right">{{ props.item.req_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.end_hour }}</td>  -->
          <td class="text-xs-right" >    
            <template actions="{ props.item }">
              <v-icon :disabled="!btnIsValid"
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                done_outline
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
        { text: '序列号', value: 'serial_num', align: 'center' },
        { text: 'ExSerialNumber', value: 'ex_serial_num', align: 'center' },
        { text: '订单号', value: 'order_num', align: 'center' },
        { text: '手机号码', value: 'phone_num', align: 'center' },
        // { text: 'UID', value: 'uid' },
        { text: '结束日期', value: 'end_time', align: 'center' },
        // { text: '开始小时', value: 'start_hour' },
        { text: '延长日期', value: 'req_time', align: 'center' },
        // { text: '结束小时', value: 'end_hour' },        
        { text: '作用', value: 'actions', sortable: false, align: 'center' },
      ],
      // end_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // req_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
        pid: '',
        vid: '',
        manufacturer: '',
        serial_num: '',
        ex_serial_num: '',
        order_num: '',
        phone_num: '',
        end_time: '',
        req_time: ''
      },
      defaultItem: {
        idx: '',
        cam_model: '',
        pid: '',
        vid: '',
        manufacturer: '',
        serial_num: '',
        ex_serial_num: '',
        order_num: '',
        phone_num: '',
        end_time: '',
        req_time: ''
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

        await axios.post('/apis/camera_list/get_order_list')
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('req_time ====', res.data[i].req_time.toString().substring(0, 10))

            var rdate = new Date(res.data[i].req_time);
            var rdateString = rdate.getFullYear() +"-"+ (rdate.getMonth()+1) +"-"+ rdate.getDate()
            var edate = new Date(res.data[i].end_time);
            var eday ="";
            if(edate.getDate() < 10) {
              eday = "0"+ edate.getDate()
            }else {
              eday = edate.getDate()
            }
            var emonth ="";
            if((edate.getMonth()+1) < 10){
              emonth = "0"+ (edate.getMonth()+1);
            }else{
              emonth = (edate.getMonth()+1);
            }
            var edateString = edate.getFullYear() +"-"+ emonth +"-"+ eday

            let newItem = {
              cam_model: res.data[i].cam_model,
              pid: res.data[i].pid,
              vid: res.data[i].vid,
              manufacturer: res.data[i].manufacturer,
              serial_num: res.data[i].serial_num,
              ex_serial_num: res.data[i].ex_serial_num,
              order_num:  res.data[i].order_num,
              phone_num:  res.data[i].phone_num,              
              // start_time: res.data[i].start_time.toString().substring(0, 10),
              // start_hour: res.data[i].start_hour.toString().substring(0, 5),
              end_time: edateString,
              // end_hour: res.data[i].end_hour.toString().substring(0, 5),
              req_time: rdateString
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
      
      async save () {  
        if( this.editedItem.cam_model == ''  ||
            this.editedItem.phone_num == ''  ||
            this.editedItem.ex_serial_num == ''  ||
            this.editedItem.end_time == ''  ||
            // this.editedItem.start_hour == ''  ||
            this.editedItem.req_time == '' ) this.formIsValid = true
        else{
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            ///Update Row selected item db concect  ///
            await axios.post('/apis/camera_list/allow_order_row', this.editedItem)
            .then(res => {
              this.desserts.splice(this.editedIndex, 1)
            })
            .catch(err => {
              console.log('err ====', err)
            })
            ///////////////////                

          } else {
            this.desserts.push(this.editedItem)

            /// Insert new Item db concect  ///
            await axios.post('/apis/camera_list/insert_new', this.editedItem)
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