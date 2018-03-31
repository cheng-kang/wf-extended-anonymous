import CommentHeader from './CommentHeader';
import InfoForm from './InfoForm';
import { getCookie } from './utils';

export default {
  components: {
    'header.after': [
      InfoForm,
    ],
    'comment.before': [
      CommentHeader,
    ],
  },
  hooks: {
    postComment: {
      before: [
        ({ t, Message, commonData }) => {
          if (commonData.user) return true;

          const _t = t('WfExtendedAnonymous');

          const { email, displayName } = getCookie();

          if (!email) {
            Message.error(_t('empty_email'));
            return false;
          }
          if (!displayName) {
            Message.error(_t('empty_display_name'));
            return false;
          }
          return true;
        },
      ],
      after: [
        ({ t, comment, db, Message, commonData }) => {
          if (commonData.user) return true;

          const _t = t('WfExtendedAnonymous');

          const { email, displayName } = getCookie();

          if (email && displayName) {
            db.ref(`plugins/WfExtendedAnonymous/a/a/x/x/u/${comment.commentId}`).set({
              email,
              displayName,
            });
            return true;
          }
          Message.error(_t('invalid_information'));
          return false;
        },
      ],
    },
  },
  translation: {
    fallback: 'en',
    en: {
      alert: 'Before joining the discussion, you need to set Email & Display Name. For full signed-in user experience, please use the Sign-Up & Sign-in buttons on the top right.',
      displayName: 'Display Name',
      email: 'Email',
      empty_display_name: 'Display name cannot be empty.',
      empty_email: 'Email cannot be empty.',
      invalid_email: 'Please enter a valid email address.',
      invalid_information: 'Invalid user information, failed to save.',
      failed: 'Failed to update.',
      parsing_cookie_error: '[WfExtendedAnonymous] Error: failed to parse cookie.',
      profile: 'Profile',
      save: 'Save',
      update: 'Update',
      updated: 'Updated!',
    },
    'zh-CN': {
      alert: '在参与讨论之前，你需要设置邮箱和昵称。如果你想体验完整的用户功能，请使用右上角的注册、登录按钮。',
      displayName: '昵称',
      email: '邮箱',
      empty_display_name: '昵称不能为空。',
      empty_email: '邮箱不能为空',
      invalid_email: '请输入有效的邮箱地址。',
      invalid_information: '用户信息有缺失，相关信息保存失败。',
      failed: '更新失败。',
      parsing_cookie_error: '[WfExtendedAnonymous] 错误：解析 cookie 失败。',
      profile: '个人信息',
      save: '保存',
      update: '更新',
      updated: '更新成功！',
    },
  },
};
