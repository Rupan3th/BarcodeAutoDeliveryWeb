<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title class="mytitle">试用版单
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
      
        <v-dialog v-model="dialog" max-width="600">      
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

                 <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field 
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
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.pid"
                          label="PID"
                          prepend-icon="text_format"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.vid"
                          label="VID"
                          prepend-icon="pin"
                        ></v-text-field>   
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>                   
                      <v-flex xs12 sm10>
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.manufacturer"
                          label="Manufacturer"
                          prepend-icon="precision_manufacturing"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>                   
                      <v-flex xs12 sm10>
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.product_info"
                          label="Product info"
                          prepend-icon="production_quantity_limits"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.serial_num"
                          label="序列号"
                          prepend-icon="code"
                        ></v-text-field>
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.ex_serial_num"
                          label="ExSerialNumber"
                          prepend-icon="closed_caption"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>                   
                      <v-flex xs12 sm6>
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.order_num"
                          label="订单号"
                          prepend-icon="local_shipping"                          
                        ></v-text-field> 
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-text-field 
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
                        <v-menu :disabled="!itemIsValid"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.start_time"
                                label="开始日期"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.start_time"
                              @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>   
                      </v-flex>  
                      <v-flex xs12 sm6> 
                        <v-menu :disabled="!itemIsValid"
                            v-model="menu2"
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
                              @input="menu2 = false"
                            ></v-date-picker>
                          </v-menu>
                      </v-flex>   
                    </v-layout>    

                    <v-layout row wrap>                   
                      <!-- <v-flex xs12 sm6>
                        <v-text-field 
                          v-model="editedItem.client_name"
                          label="客户姓名"
                          prepend-icon="account_box"
                        ></v-text-field>
                      </v-flex>   -->
                      <v-flex xs12 sm6> 
                        <v-text-field :disabled="!itemIsValid"
                          v-model="editedItem.remarks"
                          label="状态"
                          prepend-icon="summarize"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>        
                  
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
          <td style="text-align: right; padding-left: 0px; min-width: 175px">{{ props.item.product_info }}</td>
          <td class="text-xs-right">{{ props.item.serial_num }}</td>
          <td class="text-xs-right">{{ props.item.ex_serial_num }}</td>
          <td class="text-xs-right">{{ props.item.order_num }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <!-- <td class="text-xs-right">{{ props.item.uid }}</td> -->
          <td class="text-xs-right">{{ props.item.start_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.start_hour }}</td> -->
          <td class="text-xs-right">{{ props.item.end_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.end_hour }}</td> -->
          <!-- <td class="text-xs-right">{{ props.item.client_name }}</td> -->
          <td class="text-xs-right">{{ props.item.remarks }}</td>
          <td style="text-align: center;  padding-left: 0px; max-width: 70px">    
            <template actions="{ props.item }">    
              <v-layout row wrap>                   
                <v-flex xs12 sm6>
                    <v-btn 
                      flat icon color="green" 
                      @click="editItem(props.item)"
                    >
                        <v-icon small >border_color</v-icon>
                    </v-btn>                        
                </v-flex>  
                <v-flex xs12 sm6> 
                    <v-btn :disabled="!btnIsValid"
                      flat icon color="red" 
                      @click="deleteItem(props.item)"
                    >
                        <v-icon small>delete</v-icon>
                    </v-btn>
                </v-flex>
              </v-layout>                 
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
          sortBy: 'start_time',
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
        { text: 'PID', value: 'pid', align: 'center' },
        { text: 'VID', value: 'vid', align: 'center'},
        { text: 'Manufacturer', value: 'manufacturer', align: 'center'},
        { text: 'ProductInfo', value: 'product_info', align: 'center'},
        { text: '序列号', value: 'serial_num', align: 'center'},
        { text: 'ExSerialNumber', value: 'ex_serial_num', align: 'center'},
        { text: '订单号', value: 'order_num', align: 'center'},
        { text: '手机号码', value: 'phone_num', align: 'center'},        
        // { text: 'UID', value: 'uid' },
        { text: '开始日期', value: 'start_time', align: 'center'},     
        // { text: '开始小时', value: 'start_hour' },   
        { text: '结束日期', value: 'end_time', align: 'center'},
        // { text: '结束小时', value: 'end_hour' },        
        // { text: '客户姓名', value: 'client_name' },
        { text: '状态', value: 'remarks', align: 'center'},
        { text: '作用', value: 'actions', sortable: false, align: 'center'},
      ],
      // start_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      // end_time: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
        product_info: '',
        serial_num: '',
        ex_serial_num: '',
        order_num: '',
        phone_num: '',        
        // uid: '',
        start_time: '',
        // start_hour: '',
        end_time: '',
        // end_hour: '',
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
        // uid: '',
        start_time: '',
        // start_hour: '',
        end_time: '',
        // end_hour: '',
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
      async initialize () {
        console.log("User Session  ====  ", this.$store.state.userLevel)        

        await axios.post('/apis/camera_list/trial_list')
        .then(res => {
          console.log('response ====', res.data)
          var i;
          for(i=0; i<res.data.length; i++){
            console.log('allow state ====', res.data[i].allow)
            var state_active = "";
            if(res.data[i].allow == "2") { state_active = "活性" }
            else if(res.data[i].allow == "1") { state_active = "等待回应" }
            else { state_active = "试用版" }

            var sdate = new Date(res.data[i].start_time);
            var sday ="";
            if(sdate.getDate() < 10) {
              sday = "0"+ sdate.getDate()
            }else {
              sday = sdate.getDate()
            }
            var smonth ="";
            if((sdate.getMonth()+1) < 10){
              smonth = "0"+ (sdate.getMonth()+1);
            }else{
              smonth = (sdate.getMonth()+1);
            }
            var sdateString = sdate.getFullYear() +"-"+ smonth +"-"+ sday           
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
              product_info: res.data[i].product_info,
              serial_num: res.data[i].serial_num,
              ex_serial_num: res.data[i].ex_serial_num,
              order_num: res.data[i].order_num,
              phone_num:  res.data[i].phone_num,              
              // uid: res.data[i].uid,
              start_time: sdateString,
              // start_hour: res.data[i].start_hour.toString().substring(0, 5),  
              end_time: edateString,
              // end_hour: res.data[i].end_hour.toString().substring(0, 5),              
              client_name: res.data[i].client_name,
              remarks: state_active
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

      async refresh_table(){
        this.desserts= [];
        this.initialize();
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
            this.editedItem.pid == ''  ||
            this.editedItem.vid == ''  ||
            this.editedItem.manufacturer == ''  ||
            this.editedItem.product_info == ''  ||
            this.editedItem.order_num == ''  ||
            this.editedItem.phone_num == ''  ||
            this.editedItem.serial_num == ''  ||
            this.editedItem.ex_serial_num == ''  ||
            // this.editedItem.uid == ''  ||
            this.editedItem.start_time == ''  ||
            // this.editedItem.start_hour == ''  ||
            this.editedItem.end_time == ''  ||
            // this.editedItem.end_hour == ''  ||            
            // this.editedItem.client_name == ''  ||
            this.editedItem.remarks == '' ) this.formIsValid = true
        else{
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            ///Update Row selected item db concect  ///
            await axios.post('/apis/camera_list/update_row', this.editedItem)
            .then(res => {

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