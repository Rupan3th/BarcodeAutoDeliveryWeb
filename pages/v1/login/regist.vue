<template> 
    <v-app >
        <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                <v-form @submit.prevent>
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>管理员注册</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field prepend-icon="person" id="id" name="id" label="用户名" type="text" v-model="frmId" @change="validateId" ></v-text-field>
                        <v-text-field prepend-icon="lock" id="password" name="pw" label="密码" type="password" v-model="frmPw" @change="validatePw"></v-text-field>
                        <v-text-field prepend-icon="lock" id="checkedPassword" name="conf_pw" label="确认密码" type="password" v-model="frmPw_conf" @change="validateCheckedPw"></v-text-field>
                        <v-text-field prepend-icon="mail" id="email" name="email" label="电子邮件" type="mail" v-model="frmMail" @change="validateEmail"></v-text-field>
                    </v-card-text>
                    <v-card-actions>                        
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">
                            注册
                        </v-btn>
                    </v-card-actions>

                    <!-- <div> 
                        <div class="container"> 
                            <div class="input-group mb-3"> 
                                <div class="input-group-prepend"> 
                                    <span class="input-group-text" id="basic-addon1">ID</span> 
                                </div> 
                                <input type="text" id="id" class="form-control" placeholder="请输入用户名。" @change="validateId" /> 
                            </div> 
                            <div class="input-group mb-3"> 
                                <div class="input-group-prepend"> 
                                    <span class="input-group-text" id="basic-addon2">Password</span> 
                                </div> <input type="password" id="password" class="form-control" placeholder="请输入密码。" @change="validatePw" /> 
                            </div> 
                            <div class="input-group mb-3"> 
                                <div class="input-group-prepend"> 
                                    <span class="input-group-text" id="basic-addon3">CheckedPassword</span> 
                                </div> 
                                <input type="password" id="checkedPassword" class="form-control" placeholder="请输入密码。" @change="validateCheckedPw"/> 
                            </div> 
                            <div class="input-group mb-3"> 
                                <div class="input-group-prepend"> 
                                    <span class="input-group-text" id="basic-addon4">Email</span> 
                                </div> 
                                <input type="text" id="email" class="form-control" placeholder="请输入电子邮件地址。" @change="validateEmail"/> 
                            </div> 
                        </div> 
                    </div>  -->
                </v-form>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
    </v-app>
    
</template>
<script>
export default { 
    layout: 'loginLayout',
    data() { 
        return { 

        } 
    }, 
    methods: { 
        validateId() { 
            let id = document.getElementById('id').value 
            console.log(id) 
            if (id.length < 5) { 
                alert("ID至少是5位以上") 
                return false 
            } else if (id.search(/\s/) !== -1) { 
                alert("ID不可能有空白") 
                return false 
            } else { 
                this.$axios.post("", id) 
                .then(res => { 
                    if (res.data === true) { 
                        console.log("中伏")
                        return false 
                    } else if (res.data === false) { 
                        console.log("不是中伏。") 
                        return true 
                    } 
                }) 
            } 
        },

        validatePw() { 
            let pw = document.getElementById("password").value 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (pw.length < 8 || pw.length > 20) { 
                alert("请输入8位~20位以内。"); 
                return false; 
            } else if (pw.search(/\s/) !== -1) { 
                alert("密码请输入无空格。"); 
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                alert("请混合输入英文字母、数字和特殊字符。"); 
                return false; 
            } else { 
                console.log("经过"); return true; 
            } 
        },

        validateCheckedPw() { 
            let pw = document.getElementById("password").value 
            let checkedPw = document.getElementById("checkedPassword").value 
            let number = pw.search(/[0-9]/g); 
            let english = pw.search(/[a-z]/ig); 
            let specialCharacter = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
            if (checkedPw.length < 8 || checkedPw.length > 20) { 
                alert("请输入 8 到 20 位数字。"); 
                return false; 
            } else if (checkedPw.search(/\s/) !== -1) { 
                alert("请输入不带空格的密码。"); 
                return false; 
            } else if (number < 0 || english < 0 || specialCharacter < 0) { 
                alert("请混合输入英文字母、数字和特殊字符。"); 
                return false; 
            } else if (pw !== checkedPw) { 
                alert("密码不正确。") 
            } else { 
                console.log("经过"); return true; 
            } 
        },

        validateEmail() { 
            let email = document.getElementById("email").value 
            const regExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/ 
            if (email.search(/\s/) !== -1) { 
                alert("请输入您的电子邮件地址，不要有空格。") 
                return false 
            } else if (email.match(regExp) === null) { 
                alert("电子邮件格式不正确。") 
                return false 
            } else { 
                console.log("成功") 
                return true 
            } 
        },

    }
}
</script>
