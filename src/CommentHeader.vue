<template>
  <div v-if="false"></div>
</template>
<script>
export default {
  name: 'comment-header',
  props: [
    'comment',
    'config',
    'db',
  ],
  computed: {
    isAnonymousComment() {
      return this.comment.uid === this.config.anonymousUserId || this.comment.WfExtendedAnonymous;
    },
  },
  created() {
    if (!this.isAnonymousComment) return;
    this.db.ref(`plugins/WfExtendedAnonymous/a/a/x/x/u/${this.comment.commentId}`).on('value', (snapshot) => {
      const { email, displayName } = snapshot.val() || {};
      if (email && displayName) {
        this.$set(this.$parent.author, 'WfExtendedAnonymous', true);
        this.$set(this.$parent.author, 'email', email);
        this.$set(this.$parent.author, 'displayName', displayName);
      }
    });
  },
};
</script>