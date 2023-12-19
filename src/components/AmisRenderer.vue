<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="amisRoot" :schema="schema"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, unref, watch } from 'vue';
  import { alert, confirm } from 'amis';
  import copy from 'copy-to-clipboard';

  export default defineComponent({
    name: 'AmisRenderer',
    props: {
      schema: {
        type: Object,
        default: () => ({
          type: 'page',
          title: '',
          body: '',
        }),
      },
    },
    setup(props) {
      let amisInstance = null;

      function unmountAmis() {
        if (amisInstance) {
          try {
            // @ts-ignore
            amisInstance.unmount();
          } catch (error) {}
          amisInstance = null;
        }
      }

      function render() {
        const { schema } = props;

        unmountAmis();
        const theme = 'cxd';
        // @ts-ignore
        var amis = amisRequire('amis/embed');
        amisInstance = amis.embed(
          '#amisRoot',
          schema,
          {
          },
          {
            theme: 'cxd',
            fetcher: (config) => {
              return config;
            },
            alert,
            notify: (type, msg) => {
            },
            confirm,
            copy: (contents, options = {}) => {
              return true;
            },
          }
        );
      }

      onMounted(() => {
        render();
      });

      onUnmounted(() => {
        unmountAmis();
      });

      return {
        amisInstance,
      };
    },
  });
</script>
