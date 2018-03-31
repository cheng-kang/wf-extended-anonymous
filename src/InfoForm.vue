<template>
  <transition name="fade">
    <div>
      <i-alert show-icon closable>{{t('alert')}}</i-alert>
      <i-form v-if="shouldRender" ref="form" :model="form" :rules="rules" inline>
        <i-form-item>
          <span>{{t('profile')}}</span>
        </i-form-item>
        <i-form-item prop="displayName">
          <i-input type="text" v-model="form.displayName" :placeholder="t('displayName')">
            <i-icon type="ios-person-outline" slot="prepend"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item prop="email">
          <i-input type="text" v-model="form.email" :placeholder="t('email')">
            <i-icon type="ios-email-outline" slot="prepend"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="update">{{updateButtonTitle}}</i-button>
        </i-form-item>
      </i-form>
    </div>
  </transition>
</template>
<script>
import { getCookie } from './utils';

export default {
  name: 'info-form',
  props: [
    't',
    'commonData',
  ],
  data() {
    return {
      form: {
        email: '',
        displayName: '',
      },
      rules: {
        email: [
          { required: true, message: this.t('empty_email'), trigger: 'blur' },
          { type: 'email', message: this.t('invalid_email'), trigger: 'blur' },
        ],
        displayName: [
          { required: true, message: this.t('empty_display_name'), trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    shouldRender() {
      return !this.commonData.user;
    },
    updateButtonTitle() {
      return this.t((this.form.email && this.form.displayName) ? 'update' : 'save');
    },
  },
  created() {
    const { email, displayName } = getCookie();
    this.$set(this.form, 'email', email);
    this.$set(this.form, 'displayName', displayName);
  },
  methods: {
    update() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          document.cookie = `WfExtendedAnonymous=${JSON.stringify(this.form)}`;
          this.$Message.success(this.t('updated'));
        } else {
          this.$Message.error(this.t('failed'));
        }
      });
    },
  },
};
</script>
<style scoped>
.ivu-form {
  display: flex;
  justify-content: flex-end;
}
.ivu-form-item {
  margin: 0 0 16px 0 !important;
}
.ivu-form-item:nth-child(1) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 32px;
  font-weight: 600;
  margin: 0 0 0 0 !important;
}
.ivu-form-item:nth-child(2) {
  margin-right: 16px !important;
}
.ivu-form-item:not(:first-child):not(:last-child) {
  flex: 1;
}
.ivu-form-item:last-child {
  display: none;
}
.ivu-form:hover .ivu-form-item:nth-child(3) {
  margin-right: 16px !important;
}
.ivu-form:hover .ivu-form-item:last-child {
  display: inline-block;
}
</style>
