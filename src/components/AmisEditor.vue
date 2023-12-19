<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="amis">
    <amisEditor
      className="is-fixed"
      :isMobile="isMobile"
      :preview="isPreview"
      theme="cxd"
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
  import { Editor, setThemeConfig } from 'amis-editor';
  import { applyPureReactInVue } from 'veaury';
  import { cxdData } from 'amis-theme-editor-helper';
  import './assets/style.scss';

  setThemeConfig(cxdData);
  const defaultSchema = {
    type: 'page',
    asideResizor: false,
    regions: ['body'],
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
    },
    data() {
      return {
        schema: { ...defaultSchema },
        lastSchema: { ...defaultSchema },
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
    methods: {
      setSchema(data) {
        let schema = null;

        if (isNullOrUnDef(data) == false) {
          if (isJsonObjectString(data) == true) {
            try {
              schema = JSON.parse(data);
            } catch (error) {}
          } else if (isObject(data) == true) {
            schema = data;
          }
        }

        if (isNullOrUnDef(schema) == true) {
          schema = defaultSchema;
        }
        this.lastSchema = { ...schema };
        this.schema = { ...schema };
      },

      getSchema() {
        return this.lastSchema;
      },

      onChange(e) {
        this.lastSchema = { ...e };
        // eslint-disable-next-line vue/require-explicit-emits
        this.$emit('onChange', e);
      },
      onSave() {},
    },
  };
</script>
