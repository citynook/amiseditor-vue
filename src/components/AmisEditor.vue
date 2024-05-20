<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="amis">
    <amisEditor
      className="is-fixed"
      :isMobile="isMobile"
      :preview="isPreview"
      :theme="theme"
      :amisEnv="env"
      :value="schema"
      :onChange="onChange"
      :onSave="onSave"
      :showCustomRenderersPanel="true"
      :actionOptions="actionOptions"
    />
  </div>
</template>
<script>
  import { alert, confirm } from 'amis';
  import { Editor } from 'amis-editor';
  import { applyPureReactInVue } from 'veaury';
  import 'amis/sdk/iconfont.css';
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fortawesome/fontawesome-free/css/v4-shims.css';
  import '../../../node_modules/amis-editor-core/lib/style.css';
  import 'amis/lib/themes/cxd.css';

  const defaultSchema = {
    type: 'page',
    title: '新页面',
    body: [],
    id: 'u:3303380d1b8c',
    asideResizor: false,
    style: {
      boxShadow: ' 0px 0px 0px 0px transparent',
    },
    pullRefresh: {
      disabled: true,
    },
    regions: ['body', 'toolbar', 'header', 'aside'],
  };
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Editor',
    components: {
      amisEditor: applyPureReactInVue(Editor),
    },
    props: {
      isPreview: {
        type: Boolean,
        default: false,
      },
      isMobile: {
        type: Boolean,
        default: false,
      },
      theme: {
        type: String,
        default: 'cxd',
      },
    },
    data() {
      return {
        refreshKey: Math.random() * (3 - 1),
        schema: defaultSchema,
        actionOptions: {
          showOldEntry: false,
        },
        env: {
          fetcher: (config) => {
            console.log('AmisEditor Request: ', config.method, config.url, config.data, config);
            return null;
          },
          alert,
          notify: (type, msg) => {
            //toast[type] ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息') : console.warn('[Notify]', type, msg);
            //console.log('[notify]', type, msg);
          },
          confirm,
          copy: (contents, options = {}) => {
            //const ret = copy(contents, options);
            //ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
            return true;
          },
        },
      };
    },
    mounted() {
      this.schema = this.value;
    },
    methods: {
      setSchema(data) {
        if (data == null || data == undefined) {
          this.schema = defaultSchema;
        } else {
          this.schema = Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data;
        }
      },

      getSchema() {
        return this.schema;
      },

      onChange(e) {
        this.schema = e;
        // eslint-disable-next-line vue/require-explicit-emits
        this.$emit('onChange', e);
      },
      onSave() {},
    },
  };
</script>

<style lang="less" scoped>
  .amis {
    width: 100%;
    height: calc(100vh - 60px * 2.7) !important;

    #editor {
      width: 100%;
      height: calc(100vh - 60px * 2.7) !important;
    }
  }

  .ae-Editor .ae-Editor-inner {
    height: calc(100vh - 60px * 2.7) !important;
  }
</style>
