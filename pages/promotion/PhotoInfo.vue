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
                <v-text-field readOnly
                      v-model="editedItem.phone_num"
                      label="手机号码"
                      prepend-icon="phone_android"                      
                ></v-text-field>
                
                <v-textarea outlined 
                  prepend-inner-icon="comment"
                  
                  label="讯息"
                  rows="6"
                  
                ></v-textarea>

                <!-- <v-radio-group
                  v-model="message_type"
                  mandatory
                >
                  <v-radio
                    label="讯息 1"
                    value="radio-1"
                  ></v-radio>
                  
                    <v-flex xl12 sm11 >
                      <div style="margin-top: -20px">
                         <v-text-field 
                          v-model="editedItem.serial_num"
                          prepend-icon="ppiin"
                        ></v-text-field>
                      </div>                       
                     
                    </v-flex>
                    <v-flex xs12 sm1>  
                      
                        <v-icon
                          small
                          @click="editItem(props.item)"
                        >
                          edit
                        </v-icon>
                                         
                    </v-flex>
                  

                  <v-radio
                    label="讯息 2"
                    value="radio-2"
                  ></v-radio>
                  <v-text-field 
                          v-model="editedItem.serial_num"
                          prepend-icon="ppiin"
                        ></v-text-field>
                </v-radio-group> -->
              

                
                <!-- <v-layout row wrap>                   
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
                  </v-flex>                  
                </v-layout>

                <v-layout row wrap>
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
                </v-layout>

                <v-row>
                    <v-text-field :disabled="!itemIsValid"
                      v-model="editedItem.serial_num"
                      label="序列号"
                      prepend-icon="pin"
                    ></v-text-field>
                </v-row> 
                
                <v-spacer :disabled="!formIsValid"></v-spacer> -->
                
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
          <td class="text-xs-right">{{ props.item.start_time }}</td>
          <td class="text-xs-right">{{ props.item.start_hour }}</td>
          <td class="text-xs-right">{{ props.item.end_time }}</td>
          <td class="text-xs-right">{{ props.item.end_hour }}</td>
          <td class="text-xs-right">{{ props.item.serial_num }}</td>
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
        { text: '开始日期', value: 'start_time' },
        { text: '开始小时', value: 'start_hour' },
        { text: '结束日期', value: 'end_time' },
        { text: '结束小时', value: 'end_hour' },
        { text: '序列号', value: 'serial_num' },
        { text: '选择', value: 'selected', sortable: false },
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
        start_time: '',
        start_hour: '',
        end_time: '',
        end_hour: '',
        serial_num: '',
      },
      defaultItem: {
        idx: '',
        cam_model: '',
        phone_num: '',
        start_time: '',
        start_hour: '',
        end_time: '',
        end_hour: '',
        serial_num: '',
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
            let newItem = {
              cam_model: res.data[i].cam_model,
              phone_num:  res.data[i].phone_num,
              start_time: res.data[i].start_time.toString().substring(0, 10),
              start_hour: res.data[i].start_hour.toString().substring(0, 5),
              end_time: res.data[i].end_time.toString().substring(0, 10),
              end_hour: res.data[i].end_hour.toString().substring(0, 5),
              serial_num: res.data[i].serial_num,
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
        let push_addresses = [];
        for(var i=0; i<this.desserts.length; i++) {
          // console.log(' Selected value ['+this.desserts[i].cam_model+'] ===== ', this.desserts[i].selected)      
          if(this.desserts[i].selected == true) {
            // console.log(' Selected phone  ===== ', this.desserts[i].phone_num)      
            push_addresses.push(this.desserts[i].phone_num)
          }          
        } 
        this.editedItem.phone_num = push_addresses
        console.log(' push_addresses  ===== ', push_addresses)     
        
        if(push_addresses.length > 0)
          this.dialog = true
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
      
      async save () {  
        if( this.editedItem.cam_model == ''  ||
            this.editedItem.phone_num == ''  ||
            this.editedItem.start_time == ''  ||
            this.editedItem.start_hour == ''  ||
            this.editedItem.end_time == ''  ||
            this.editedItem.end_hour == ''  ||
            this.editedItem.serial_num == '' ) this.formIsValid = true
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

      allcheckboxUpdated(all_checked) {       
        console.log(' ------ All Select checked -------') 
        console.log(' ------ All Select checked -------', all_checked) 
        for(var i=0; i<this.desserts.length; i++) {
          console.log(' this.desserts['+i+']-------', this.desserts[i]) 
          if(all_checked == true)  this.desserts[i].selected = true;
          else this.desserts[i].selected = false;
        }
      }
    },
  }
</script>