<template>
  <div>
    <template>     
      <v-toolbar flat >
        <v-toolbar-title class="mytitle">版本信息
          <v-btn flat icon color="green" @click="refresh_table()"         >
            <v-icon large>cached</v-icon>
          </v-btn> 
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <!-- <v-text-field
          v-model="search"
          append-icon='search'
          label="搜索"
          single-line
          hide-details
        ></v-text-field>   -->

        <v-spacer></v-spacer>  
      
        <v-dialog v-model="dialog" max-width="500">      
          <template v-slot:activator="{ attrs }">            
            <v-btn :disabled="!btnIsValid"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"                           
              @click="editMessage()"
            >
              新版本上传
            </v-btn>
           
          </template>   

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>              
              <v-container>    

                <v-text-field :readonly = "false"
                      v-model="version_num"
                      label="版本号"
                      prepend-icon="filter_9_plus"                      
                ></v-text-field>
                
                <v-textarea outlined 
                  prepend-inner-icon="lightbulb"
                  v-model="message_content"
                  label="版本信息"
                  rows="1"
                  
                ></v-textarea>

               <div class="container">
                    <label>
                       <input type="file" @change="handleFileUpload( $event )"/>
                    </label>
                    <br>
                        <progress max="100" :value.prop="uploadPercentage" ></progress>
                    <br><hr/>                      
                </div>
                
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
                @click="submitFile()"
              >
                上传
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
          <td class="text-xs-right">{{ props.item.ver_num }}</td>
          <td class="text-xs-right">{{ props.item.org_name }}</td>
           <td class="text-xs-right">{{ props.item.size }}</td>
          <td class="text-xs-right">{{ props.item.ver_info }}</td>
          <td class="text-xs-right">{{ props.item.file_name }}</td>
          <td class="text-xs-right" >    
            <template actions="{ props.item }">
              <v-btn 
                  flat icon color="green" 
                  @click="downloading(props.item)"
              >
                  <v-icon small>download</v-icon>
              </v-btn>
              
              
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
          sortBy: 'ver_num',
          descending: true,
          rowsPerPage: 10
        },

      dialog: false,
      dialogDelete: false,
      formIsValid: false,
      itemIsValid: true,
      btnIsValid: true,
      search: '',            
      file: '',
      uploadPercentage: 0,
      version_num: '',
      message_content: '',
      
      headers: [        
        { text: '版本号', value: 'ver_num', align: 'center', width: '100px' },
        { text: '文件名', value: 'org_name', sortable: false, align: 'center', width: '250px' },
        { text: '文件大小', value: 'size', sortable: false, align: 'center', width: '100px' },
        { text: '版本信息', value: 'ver_info', sortable: false,  align: 'center' },
        { text: '文件目录路径', value: 'file_name', sortable: false,  align: 'center' },
        { text: '选择', value: 'selected', sortable: false , align: 'center', width: '50px'},
      ],           
      desserts: [],
      
      editedIndex: -1,
      editedItem: {
        idx: '',
        ver_num: '',
        org_name: '',   
        size: '',     
        ver_info: '',  
        file_name: '',
        full_name: ''    
      },
      defaultItem: {
        idx: '',
        ver_num: '',
        org_name: '',   
        size: '',     
        ver_info: '',  
        file_name: '',
        full_name: ''       
      },
    }),
    computed: {
      formTitle () {
        return '新版本上传'
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

        handleFileUpload( event ){
                    this.file = event.target.files[0];
        },

        editMessage(){                
            this.dialog = true              
        },

        async initialize () {            
            console.log("User Session  ====  ", this.$store.state.userLevel)        

            await axios.post('/apis/upload/getListFiles')
                .then(res => {
                    console.log('res ====', res.data)
                    var i;
                    for(i=0; i<res.data.length; i++){     
                        axios.post('/apis/versions/get_version_info', {'filename': res.data[i].name})
                        .then(response => {
                            console.log('response ====', response.data)

                            if(response.data.length > 0){
                                var slength = response.data[0].size.length;
                                var size_string = response.data[0].size;
                                if(slength > 5){
                                  size_string = response.data[0].size.substring(0,slength-5) + ',' + response.data[0].size.substring(slength-5, slength)
                                }
                                let newItem = {
                                    ver_num: response.data[0].ver_num,
                                    org_name: response.data[0].org_name,   
                                    size: size_string,                           
                                    ver_info: response.data[0].info,       
                                    file_name: response.data[0].filename,
                                    full_name: response.data[0].full_name,        
                                }
                        
                                this.desserts.push(newItem)
                            }                            

                        })
                        .catch(err => {
                            console.log('err ====', err)
                        }) 
                                       
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

        async downloading (item) {            
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            
            var link = document.createElement('a');
            link.href = "/uploads/"+item.file_name;
            link.style = "display: none";
            link.download = item.file_name;
            document.body.append(link);
            link.click();
            link.remove();

            // await axios.post('/apis/upload/download', {name : item.file_name})
            // .then(res => {
            //     console.log('Download Success !!')
                
            // })
            // .catch(err => {
            //     console.log('err ====', err)
            // })       
        },

        submitFile(){			
                if(this.file != '' && this.version_num != '' && this.message_content != '') {
                    let formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('v_num', this.version_num);
                    formData.append('v_info', this.message_content);                
                    console.log("Formdata: ", this.file)  

                    axios.post('/apis/upload/upload',				
                        formData,
                        {
                            headers: {
                                    'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: function( progressEvent ) {
                                this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                                if(this.uploadPercentage == 100){
                                    this.close();          
                                    this.desserts = [];                         
                                    this.initialize();      
                                    this.uploadPercentage = 0;              
                                }
                            }.bind(this)
                        }
                    ).then(function(){
                        console.log('SUCCESS!!');                          
                                    
                    })
                    .catch(function(e){
                        console.log('FAILURE!!', e);
                    });

                }else {
                    alert("选择要上载的文件并正确填写版本信息。");
                }      
                
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
  
     
    },

  }
</script>