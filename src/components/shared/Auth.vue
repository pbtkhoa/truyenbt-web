<template>
  <modal name="authenticate" transition="pop-out" :width="700" :focus-trap="true" height="auto">
    <div class="box-authenticate">
      <div class="box-part">
        <div class="partition">
          <div class="partition-form">
            <div class="partition-title">{{ isRegisterMode ? 'Tạo tài khoản' : 'Đăng nhập' }}</div>
            <form :autocomplete="false" @submit.prevent="submit">
              <div class="form-data">
                <div v-if="error" class="error text-center">{{ error }}</div>
                <div class="autocomplete-fix">
                  <input disabled type="password" />
                </div>
                <div class="form-control">
                  <input v-model.trim="$v.email.$model" type="text" placeholder="Email" />
                  <div v-if="!$v.email.required" class="error">Vui lòng điền vào mục này</div>
                  <div v-if="!$v.email.email" class="error">Email không hợp lệ</div>
                </div>
                <div class="form-control">
                  <input v-model.trim="$v.password.$model" type="password" placeholder="Mật khẩu" />
                  <div v-if="!$v.password.required" class="error">Vui lòng điền vào mục này</div>
                  <div v-if="!$v.password.minLength" class="error">
                    Mật khẩu phải ít nhất {{ $v.password.$params.minLength.min }} ký tự.
                  </div>
                  <div v-if="!$v.password.maxLength" class="error">
                    Mật khẩu không được dài quá {{ $v.password.$params.maxLength.max }} ký tự.
                  </div>
                </div>

                <div v-if="isRegisterMode" class="form-control">
                  <input v-model.trim="$v.passwordConfirm.$model" type="password" placeholder="Xác nhận mật khẩu" />
                  <div v-if="!$v.passwordConfirm.required" class="error">Vui lòng điền vào mục này</div>
                  <div v-if="!$v.passwordConfirm.minLength" class="error">
                    Mật khẩu phải ít nhất {{ $v.passwordConfirm.$params.minLength.min }} ký tự.
                  </div>
                  <div v-if="!$v.passwordConfirm.maxLength" class="error">
                    Mật khẩu không được dài quá {{ $v.passwordConfirm.$params.maxLength.max }} ký tự.
                  </div>
                  <div v-if="!$v.passwordConfirm.sameAsPassword" class="error">Mật khẩu không trùng nhau.</div>
                </div>
                <input v-if="isRegisterMode" type="text" placeholder="Tên" />
                <input v-if="isRegisterMode" type="text" placeholder="Họ" />
              </div>
              <div class="link-set">
                <span v-if="isRegisterMode">Đã có tài khoản? <a href="#" @click="onClickChangeMode">Đăng nhập</a></span>
                <span v-else>Chưa có tài khoản? <a href="#" @click="onClickChangeMode">Đăng ký</a></span>
              </div>

              <div class="button-set">
                <button v-if="isRegisterMode" class="large-btn" :disabled="isSubmitting">Tạo tài khoản</button>
                <button v-else class="large-btn" :disabled="isSubmitting">Đăng nhập</button>
              </div>
            </form>
            <!--            <button class="large-btn facebook-btn">Đăng nhập bằng <span>facebook</span></button>-->
          </div>
        </div>
      </div>
      <div class="box-part">
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>
<script lang="ts">
import Vue from 'vue'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import User from '~/models/User'
import { setUserForAuth } from '~/utils/helpers'

export default Vue.extend({
  props: {
    isRegisterMode: {
      type: Boolean,
      default: false,
    },
    onChangeMode: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      isSubmitting: false,
      error: '',
    }
  },
  validations() {
    const validate = {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12),
      },
    }
    if (this.isRegisterMode) {
      return {
        ...validate,
        passwordConfirm: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(12),
          sameAsPassword: sameAs('password'),
        },
      }
    }
    return validate
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isSubmitting = true
        this.error = ''
        if (this.isRegisterMode) {
          this.submitRegister()
        } else {
          this.submitLogin()
        }
        this.isSubmitting = false
      }
    },
    async submitLogin() {
      try {
        const { data } = await this.$auth.loginWith('authToken', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        setUserForAuth(this.$cookies, this.$auth, data)
        this.$modal.hide('authenticate')
      } catch (e) {
        this.error = 'Đăng nhập không thành công'
      }
    },
    async submitRegister() {
      try {
        const user: User = await this.$axios.$post(`auth/register`, {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          password_confirm: this.passwordConfirm,
        })
        setUserForAuth(this.$cookies, this.$auth, user)
        this.$modal.hide('authenticate')
      } catch (e) {
        this.error = 'Đăng ký không thành công'
      }
    },
    onClickChangeMode() {
      this.error = ''
      this.$props.onChangeMode()
    },
  },
})
</script>
<style lang="scss">
$facebook_color: #3880ff;
.box-authenticate {
  background: $white;
  overflow: hidden;
  width: 100%;
  min-height: 450px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .error {
    color: $danger;
    padding-left: 8px;
    font-size: $font-size-base * 0.8;
    text-align: right;
    &:before {
      content: '*';
    }
  }
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 50%;
    &#bp-right {
      //background: url('/static/panorama.jpg') no-repeat top left;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: $white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
      text-transform: uppercase;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
      .form-data {
        margin-bottom: 40px;
      }
    }
  }
  input[type='password'],
  input[type='text'] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
  }
  button {
    background: $white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
    &:disabled {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
      cursor: not-allowed;
    }
  }
  a {
    font-size: $font-size-base * 0.8;
    text-decoration: none;
  }
  .large-btn {
    width: 100%;
    span {
      font-weight: 600;
    }
  }
  .button-set {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
  .link-set {
    justify-content: center;
    display: flex;
    font-size: $font-size-base * 0.8;
  }
  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    background: $white;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
      color: $white;
    }
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
