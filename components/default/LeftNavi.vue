<template>
<div>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawerChild"
    fixed
    app
  >
    <v-list flat>
      <template v-for="item in items">
        <!-- <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout> -->

        <v-list-group style="background: #f6f6f6;"
          v-if="item.children"
          v-model="item.active"
          :key="item.text"          
          :prepend-icon="item.action"
          no-action
        >          
          <!-- 1 depth Group Btn -->
          <v-list-tile slot="activator" >            
            <v-icon style="margin-right: 12px;">{{ item.icon }}</v-icon>            
            <v-list-tile-content >
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- //1 depth Group Btn -->

          <!-- 2 depth Group Btn -->
          <v-list-tile style="margin-left: -48px; background: #ffffff;"
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.to"
          >   
            <v-list-tile-action >         
              <v-icon style="margin-left: 24px;" >{{ child.icon }}</v-icon>   
            </v-list-tile-action>         
            <v-list-tile-content >
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>            
          </v-list-tile>
          <!-- //2 depth Group Btn -->
        </v-list-group>

        <!-- 1 depth Btn -->
        <v-list-tile style="margin-left: -24px; background: #f6f6f6;" v-else :key="item.text" :to="item.to">
          <v-list-tile-action>
            <v-icon style="margin-left: 24px;">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ item.img }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <!-- //1 depth Btn -->

      </template>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  props: ['drawer'],
  data: () => ({
    drawerChild: null,
    //itemList: []
    items: [
      {    
        text: '账号管理',
        icon: 'supervised_user_circle',    
        // active: true,
        children: [
          { icon: 'engineering', text: '一级权限', to: '/account_management/FirstLevel'  },
          { icon: 'manage_accounts', text: '二级权限', to: '/account_management/SecondLevel' }
        ]
      },
      {    
        text: '相机列表',
        icon: 'qr_code_scanner',    
        children: [
          { icon: 'gavel', text: '试用版单', to: '/camera_list/TrialList'  },
          { icon: 'low_priority', text: '订单清单', to: '/camera_list/OrderList'  },
          { icon: 'preview', text: '限定名单', to: '/camera_list/QueryList'  },
          { icon: 'content_paste_search', text: '设备清单', to: '/camera_list/ShowContents' }
        ]
      },
      {    
        text: '推广管理',
        icon: 'devices_other',        
        children: [          
          // { icon: 'perm_media', text: '图片信息', to: '/promotion/PhotoInfo'  },
          { icon: 'edit_notifications', text: '发送消息', to: '/promotion/TextInfo' },
          { icon: 'receipt_long', text: '信息列表', to: '/promotion/MessageList'  }
        ]
      },
      // {    
      //   text: '密码管理',
      //   icon: 'security',     
      //   children: [
      //     { icon: 'security', text: '密码修改', to: '/inspire'  },
      //   ]
      // },

      { icon: 'security', text: '密码修改',  to: '/inspire' },

      // { icon: 'upload_file', text: '新版本上传',  to: '/SingleFile' },
      { icon: 'upload_file', text: '新版本上传',  to: '/VersionList' }
      // { icon: 'contacts', text: 'Index', to: '/' },
      // { icon: 'history', text: 'Inspire', to: '/Inspire' },
      // { icon: 'content_copy', text: '账号管理', to: '/about' },      
      // { icon: 'settings', text: '显示内容' },
      // { icon: 'chat_bubble', text: '图片信息' },
      // { icon: 'help', text: '文字信息' },
      // { icon: 'phonelink', text: '密码修改' }
    ]
  }),
  watch: {
    drawer (value) {
      this.drawerChild = value;
    },
    drawerChild (value) {
      this.$emit('isDrawer', value)
    }
  }
}
</script>
