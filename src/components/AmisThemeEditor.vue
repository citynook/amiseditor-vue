<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="amis">
    <!--
    <amisThemeEditor
      className="is-fixed"
      :themeId="themeId"
      :value="schema"
      :versionData="versionData"
      :name="name"
      :onChange="onChange"
      :onSave="onSave"/>
  -->
</div>
</template>
<script>
  //import ThemeEditor from 'amis-theme-editor';
  import { applyPureReactInVue } from 'veaury';
  import { cxdData } from 'amis-theme-editor-helper';
  import './assets/style.scss';
  import { setThemeConfig } from 'amis-editor';

  setThemeConfig(cxdData);
  const defaultSchema = cxdData;

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'AmisThemeEditor',
    components: {
      //amisThemeEditor: applyPureReactInVue(ThemeEditor),
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
        themeId: 'cxd',
        schema: cxdData,
        versionData: cxdData,
        name: 'test',
        lastSchema: {},
      };
    },
    methods: {
      setSchema(data) {
        /*
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
        //this.lastSchema = { ...schema };
        this.schema = { ...schema };*/
      },

      getSchema() {
        return ''; //this.lastSchema;
      },

      onChange(e) {
        //this.lastSchema = { ...e };
        // eslint-disable-next-line vue/require-explicit-emits
        //this.$emit('onChange', e);
      },
      onSave() {},
    },
  };
</script>
