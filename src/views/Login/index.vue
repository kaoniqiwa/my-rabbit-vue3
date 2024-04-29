<script setup lang="ts">
import type { FormInstance, FormRules, FormProps, ComponentSize } from 'element-plus'
import { reactive, ref } from 'vue'

interface RuleForm {
  account: string
  password: string
  checkPass: string
  agree: boolean

}

/**标签对齐方式 */
const labelPosition = ref<FormProps['labelPosition']>('right')

/**表单组件大小 */
const formSize = ref<ComponentSize>('default')

/**表单组件引用 */
const ruleFormRef = ref<FormInstance>()

/**表单域  "account": "xiaotuxian001","password": "123456"*/
const ruleForm = reactive<RuleForm>({
  account: '',
  password: '',
  checkPass: '',
  agree: true,

})

/**表单校验规则 */
const rules = ref<FormRules<RuleForm>>({
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      validator(rule: any, value: any, callback: any) {
        if (value == '') {
          callback(new Error('密码不能为空'))
        } else if (value.length < 6 || value.length > 14) {
          callback(new Error('密码长度为6-14个字符'))
        } else {
          if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField('checkPass', (isValid: boolean) => {
              if (isValid) {
                callback()
              } else {
                callback(new Error('两次密码不一致'))
              }
            })

            return
          } else {
            callback()
          }

        }
      }
    }
  ],
  checkPass: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      validator(rule: any, value: any, callback: any) {
        if (value == '') {
          callback(new Error('密码不能为空'))
        } else if (value.length < 6 || value.length > 14) {
          callback(new Error('密码长度为6-14个字符'))
        } else if (ruleForm.password !== '' && value !== ruleForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
  ],
  agree: [
    {
      validator(rule: any, value: any, callback: any) {
        console.log(rule);

        if (value) {
          callback()
        } else {
          callback(new Error('sd'))
        }
      }
    }
  ],

})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <div>
    {{ ruleForm }}
    <header class="login-header">

      <div class="container">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="ruleFormRef" :inline="false" :model="ruleForm" :rules="rules" :label-position="labelPosition"
              label-width="100px" :size="formSize" status-icon>
              <el-form-item prop="account" label="账户">
                <el-input v-model="ruleForm.account" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="ruleForm.password" />
              </el-form-item>
              <el-form-item prop="checkPass" label="确认密码">
                <el-input v-model="ruleForm.checkPass" />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="ruleForm.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="submitForm(ruleFormRef)">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .logo {
      width: 200px;

      a {
        display: block;
        height: 132px;
        line-height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
      }
    }

    .entry {
      width: 120px;
      margin-bottom: 38px;
      font-size: 16px;

      i {
        font-size: 14px;
        color: $xtxColor;
        letter-spacing: -5px;
      }
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }

    .account-box {
      .form {
        padding: 0 20px 20px 20px;

        .subBtn {
          background: $xtxColor;
          width: 100%;
          color: #fff;
        }
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      +a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
