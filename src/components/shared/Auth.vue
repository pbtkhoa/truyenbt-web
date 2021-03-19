<template>
  <modal name="authenticate" transition="pop-out" :width="700" :focus-trap="true" height="auto">
    <div class="bg-white overflow-hidden w-full box-border rounded shadow">
      <div class="inline-block relative align-top box-border h-full w-1/2">
        <div class="w-full h-full">
          <div class="px-5 box-border">
            <div class="box-border p-10 w-full text-center text-xl uppercase">
              {{ isRegisterMode ? 'Tạo tài khoản' : 'Đăng nhập' }}
            </div>
            <form :autocomplete="false" @submit.prevent="submit">
              <div class="mb-10">
                <div v-if="error" class="text-red-600 pl-2 text-xs text-right">{{ error }}</div>
                <div class="absolute invisible overflow-hidden opacity-0 w-0 h-0 left-0 top-0">
                  <input
                    disabled
                    type="password"
                    class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                  />
                </div>
                <div class="form-control">
                  <input
                    v-model.trim="$v.email.$model"
                    type="text"
                    placeholder="Email"
                    class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                  />
                  <div v-if="!$v.email.required" class="text-red-600 pl-2 text-xs text-right">
                    Vui lòng điền vào mục này
                  </div>
                  <div v-if="!$v.email.email" class="text-red-600 pl-2 text-xs text-right">Email không hợp lệ</div>
                </div>
                <div class="form-control">
                  <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    placeholder="Mật khẩu"
                    class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                  />
                  <div v-if="!$v.password.required" class="text-red-600 pl-2 text-xs text-right">
                    Vui lòng điền vào mục này
                  </div>
                  <div v-if="!$v.password.minLength" class="text-red-600 pl-2 text-xs text-right">
                    Mật khẩu phải ít nhất {{ $v.password.$params.minLength.min }} ký tự.
                  </div>
                  <div v-if="!$v.password.maxLength" class="text-red-600 pl-2 text-xs text-right">
                    Mật khẩu không được dài quá {{ $v.password.$params.maxLength.max }} ký tự.
                  </div>
                </div>

                <div v-if="isRegisterMode" class="form-control">
                  <input
                    v-model.trim="$v.passwordConfirm.$model"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                  />
                  <div v-if="!$v.passwordConfirm.required" class="text-red-600 pl-2 text-xs text-right">
                    Vui lòng điền vào mục này
                  </div>
                  <div v-if="!$v.passwordConfirm.minLength" class="text-red-600 pl-2 text-xs text-right">
                    Mật khẩu phải ít nhất {{ $v.passwordConfirm.$params.minLength.min }} ký tự.
                  </div>
                  <div v-if="!$v.passwordConfirm.maxLength" class="text-red-600 pl-2 text-xs text-right">
                    Mật khẩu không được dài quá {{ $v.passwordConfirm.$params.maxLength.max }} ký tự.
                  </div>
                  <div v-if="!$v.passwordConfirm.sameAsPassword" class="text-red-600 pl-2 text-xs text-right">
                    Mật khẩu không trùng nhau.
                  </div>
                </div>
                <input
                  v-if="isRegisterMode"
                  type="text"
                  placeholder="Tên"
                  class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                />
                <input
                  v-if="isRegisterMode"
                  type="text"
                  placeholder="Họ"
                  class="block box-border mb-1 w-full outline-none text-xs border-0 border-b border-gray-500 py-1 px-2 transition-all duration-500"
                />
              </div>
              <div class="justify-center flex text-xs">
                <span v-if="isRegisterMode">
                  Đã có tài khoản?
                  <a href="#" class="text-xs no-underline" @click="onClickChangeMode">Đăng nhập</a></span
                >
                <span v-else>
                  Chưa có tài khoản?
                  <a href="#" class="text-xs no-underline" @click="onClickChangeMode">Đăng ký</a></span
                >
              </div>

              <div class="mb-2 flex justify-between">
                <button
                  v-if="isRegisterMode"
                  class="bg-white box-border rounded p-3 mt-2 w-full cursor-pointer border text-gray-500 border-gray-500 uppercase text-sm transition hover:text-gray-400 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  :disabled="isSubmitting"
                >
                  Tạo tài khoản
                </button>
                <button
                  v-else
                  class="bg-white box-border rounded p-3 mt-2 w-full cursor-pointer border text-gray-500 border-gray-500 uppercase text-sm transition hover:text-gray-400 hover:border-gray-400 disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  :disabled="isSubmitting"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="inline-block relative align-top box-border h-full w-1/2">
        <div class="absolute left-0 bottom-0 w-full"></div>
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
