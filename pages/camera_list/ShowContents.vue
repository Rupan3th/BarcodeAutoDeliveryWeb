<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title>设备清单</v-toolbar-title>
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
               
                  
                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.cam_model"
                      label="相机型号"
                      prepend-icon="camera"         
                    ></v-text-field>
                  
                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.phone_num"
                      label="手机号码"
                      prepend-icon="phone_android"
                      maxlength="11"
                      counter="11"
                    ></v-text-field>     

                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.serial_num"
                      label="序列号"
                      prepend-icon="pin"
                    ></v-text-field>

                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.uid"
                      label="UID"
                      prepend-icon="pin"
                    ></v-text-field>               
                    
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
                      <!-- <v-flex xs12 sm6>
                        <v-menu
                          ref="tmenu1"
                          v-model="timemenu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.start_hour"
                              label="开始小时"
                              prepend-icon="watch_later"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="timemenu1"
                            v-model="editedItem.start_hour"
                            full-width
                            @click:minute="$refs.tmenu1.save(time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>                   -->
                    </v-layout>                      
                           
                    <!-- <v-layout row wrap>
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
                      <v-flex xs12 sm6>
                        <v-menu
                          ref="tmenu2"
                          v-model="timemenu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.end_hour"
                              label="结束小时"
                              prepend-icon="watch_later"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="timemenu2"
                            v-model="editedItem.end_hour"
                            full-width
                            @click:minute="$refs.tmenu2.save(time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>   
                    </v-layout>                   -->
                    
                  
                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.client_name"
                      label="客户名称"
                      prepend-icon="account_box"
                    ></v-text-field>
                  
                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.remarks"
                      label="备注"
                      prepend-icon="summarize"
                    ></v-text-field>
                  
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
      sort-by="start_time"
      class="elevation-1"
    >
      
      <template slot="items" slot-scope="props" >
          <td>{{ props.item.cam_model }}</td>
          <td class="text-xs-right">{{ props.item.phone_num }}</td>
          <td class="text-xs-right">{{ props.item.serial_num }}</td>
          <td class="text-xs-right">{{ props.item.uid }}</td>
          <td class="text-xs-right">{{ props.item.start_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.start_hour }}</td> -->
          <td class="text-xs-right">{{ props.item.end_time }}</td>
          <!-- <td class="text-xs-right">{{ props.item.end_hour }}</td> -->
          <td class="text-xs-right">{{ props.item.client_name }}</td>
          <td class="text-xs-right">{{ props.item.remarks }}</td>
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
          text: '相机型号',
          align: 'start',
          sortable: false,
          value: 'cam_model',
        },
        { text: '手机号码', value: 'phone_num' },
        { text: '序列号', value: 'serial_num' },
        { text: 'UID', value: 'uid' },
        { text: '开始日期', value: 'start_time' },     
        // { text: '开始小时', value: 'start_hour' },   
        { text: '结束日期', value: 'end_time' },
        // { text: '结束小时', value: 'end_hour' },        
        { text: '客户名称', value: 'client_name' },
        { text: '状态', value: 'remarks' },
        { text: '行动', value: 'actions', sortable: false },
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
        phone_num: '',
        serial_num: '',
        uid: '',
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
        phone_num: '',
        serial_num: '',
        uid: '',
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

        await axios.post('/apis/camera_list/camera_list')
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
            var sdateString = sdate.getFullYear() +"-"+ (sdate.getMonth()+1) +"-"+ sdate.getDate()
            var edate = new Date(res.data[i].end_time);
            var edateString = edate.getFullYear() +"-"+ (edate.getMonth()+1) +"-"+ edate.getDate()

            let newItem = {
              cam_model: res.data[i].cam_model,
              phone_num:  res.data[i].phone_num,
              serial_num: res.data[i].serial_num,
              uid: res.data[i].uid,
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
            this.editedItem.phone_num == ''  ||
            this.editedItem.serial_num == ''  ||
            this.editedItem.uid == ''  ||
            this.editedItem.start_time == ''  ||
            // this.editedItem.start_hour == ''  ||
            this.editedItem.end_time == ''  ||
            // this.editedItem.end_hour == ''  ||            
            this.editedItem.client_name == ''  ||
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