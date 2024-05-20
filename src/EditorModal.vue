<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="Editor">
    <div class="Editor-header">
      <div class="Editor-title">Amis 可视化编辑器</div>
      <div class="Editor-view-mode-group-container">
        <div class="Editor-view-mode-group">
          <div
            :class="`Editor-view-mode-btn editor-header-icon ${!isMobile ? 'is-active' : ''}`"
            @click="isMobile = false"
          >
            <img
              class="icon-pc-preview"
              width="16"
              height="16"
              src="./assets/pc-preview.svg"
            />
          </div>
          <div
            :class="`Editor-view-mode-btn editor-header-icon ${isMobile ? 'is-active' : ''}`"
            @click="isMobile = true"
          >
            <img
              class="icon-h5-preview"
              width="16"
              height="16"
              src="./assets/h5-preview.svg"
            />
          </div>
        </div>
      </div>

      <div class="Editor-header-actions">
        <div class="header-action-btn general-btn" @click="handleReset">清空</div>

        <div class="header-action-btn general-btn" @click="handleReload">重新加载</div>

        <div class="header-action-btn primary" @click="handleSave">保存</div>

        <div class="header-action-btn general-btn" @click="isPreview = !isPreview">
          {{ isPreview ? '编辑' : '预览' }}
        </div>
      </div>
    </div>
    <div class="Editor-inner">
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
    </div>
  </div>
</template>

<script lang="ts">
  import { shallowReactive } from 'vue'
import { alert, confirm } from 'amis'
import { Editor } from 'amis-editor'
import { applyPureReactInVue } from 'veaury'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/v4-shims.css'
import 'amis/lib/themes/default.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import '../node_modules/amis-editor-core/lib/style.css'
import './assets/style.scss';

const defaultSchema = {
  type: 'page',
  title: '新页面',
  body: [],
  id: 'u:3303380d1b8c',
  asideResizor: false,
  style: {
    boxShadow: ' 0px 0px 0px 0px transparent'
  },
  pullRefresh: {
    disabled: true
  },
  regions: ['body', 'toolbar', 'header', 'aside']
}
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Editor',
  components: {
    amisEditor: applyPureReactInVue(Editor)
  },
  props: {
    isPreview: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'cxd'
    }
  },
  setup(props) {
    console.log('setup1: ', defaultSchema);
    console.log('setup2: ', shallowReactive(defaultSchema));
    return {
      schema: shallowReactive(defaultSchema),
    }
  },
  data() {
    return {
      actionOptions: {
        showOldEntry: false
      },
      env: {
        fetcher: (config: any) => {
          console.log('AmisEditor Request: ', config.method, config.url, config.data, config)
          return null
        },
        alert,
        notify: (type: any, msg: any) => {
          //toast[type] ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息') : console.warn('[Notify]', type, msg);
          //console.log('[notify]', type, msg);
        },
        confirm,
        copy: (contents, options = {}) => {
          //const ret = copy(contents, options);
          //ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
          return true
        }
      }
    }
  },
  methods: {
    onChange(e: any) {
      console.log('onChange1 : ', this.schema);
      this.schema = e
      console.log('onChange2: ', this.schema);
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('onChange', e)
    },
    onSave() {}
  }
}
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
