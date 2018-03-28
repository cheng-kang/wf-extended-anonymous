<template>
  <transition name="fade">
    <i-form v-if="shouldRender" ref="form" :model="form" :rules="rules" inline>
      <i-form-item prop="email">
        <i-input type="text" v-model="form.email" :placeholder="t('email')">
          <i-icon type="ios-email-outline" slot="prepend"></i-icon>
        </i-input>
      </i-form-item>
      <i-form-item prop="displayName">
        <i-input type="text" v-model="form.displayName" :placeholder="t('displayName')">
          <i-icon type="ios-person-outline" slot="prepend"></i-icon>
        </i-input>
      </i-form-item>
      <i-form-item>
        <i-button type="primary" @click="update">{{t('update')}}</i-button>
      </i-form-item>
    </i-form>
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
.ivu-form-item:not(:last-child) {
  margin-right: 16px !important;
  flex: 1;
}
</style>
