<template>
 
 <div>
  <!--
  <editor ref="editorRef" :isPreview="isPreview" 
                :is-mobile="isMobile" @reload="handleReload" @save="handleSave" />
-->
 </div>
 <div >
  <!--
  <TemeEditor ref="themeEditorRef" @save="handleSave" />
-->
</div>

 <div>
  <AmisRenderer :schema="schema" />
 </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, onBeforeUnmount } from 'vue';
//import { alert, confirm } from 'amis';
//import { Editor, setThemeConfig } from 'amis-editor';
import ThemeEditor from 'amis-theme-editor';
import Editor from './AmisEditor.vue';
import TemeEditor from './AmisThemeEditor.vue';
import AmisRenderer from './AmisRenderer.vue';
import AmisDemo from './AmisDemo.vue';

export default defineComponent({
    //components: { BasicModal, Editor, ShortcutKey: applyPureReactInVue(ShortcutKey) },
    components: { Editor, TemeEditor, AmisRenderer },
    emits: ['reload', 'save', 'register'],
    setup(_, { emit }) {
      const isPreview = ref(false);
      const isMobile = ref(false);
      const editorRef = ref<any>(null);
      const themeEditorRef = ref<any>(null);
      const schema = ref<Object>();
      schema.value = AmisDemo;

      function handleReset() {
        setSchema();
      }

      function handleReload() {
        emit('reload');
      }

      function handleSave() {
        let schema = getSchema();
        emit('save', schema);
      }

      function getSchema() {
        return (unref(editorRef) as any).getSchema();
      }

      function setSchema(schema?: any) {
        (unref(editorRef) as any).setSchema(schema);
      }

      function handleExit() {
      }

      return {
        editorRef,
        themeEditorRef,
        isPreview,
        isMobile,
        schema,
        handleReset,
        handleReload,
        handleSave,
        handleExit,
        getSchema,
        setSchema,
      };
    },
  });
</script>

<style lang="scss" scoped>
.out-box{
    display:flex;
    height:100%;
     .left-box {
          min-width: 35px;
          background: #FFFFFF;
          position: relative;
 
          .x-resizer {
            position: absolute;
            top: 50%;
            right: -11px;
            z-index: 1;
            width: 25px;
            height: 50px;
            margin-top: -25px;
            border-radius: 5px;
            background-color: gray;
            cursor: col-resize;
          }
        }
        .right-box {
          flex: 1;
          background: #FFFFFF;
          margin-left: 10px;
          position: relative;
          min-width: 650px;
        }
      }
</style>