<template>
  <div>
    <div v-bind="getRootProps()"
      class="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center pointer-events-auto"
      :class="files.length === 0 ? 'cursor-pointer' : ' pointer-events-none'">
      <div v-if="files.length === 0" class="pointer-events-auto">
        <input v-bind="getInputProps()" class="hidden" type="file" accept="image/*"/>
        <img src="@/assets/images/svg/upload.svg" alt="" class="mx-auto mb-4" />
        <p v-if="isDragActive" class="text-sm text-slate-500 dark:text-slate-300 font-light">
          Arraste arquivos aqui ...
        </p>
        <p v-else class="text-sm text-slate-500 dark:text-slate-300 font-light">
          Arraste seu arquivo para upload.
        </p>
      </div>
      <div class="flex space-x-4">
        <div v-for="(file, i) in files" :key="i" class="mb-4 flex-none pointer-events-auto">
          <div :class="'max-w-['+width+'px] max-h-['+height+'px] mx-auto mt-6 rounded-md pointer-events-auto'" key="{i}">
            <img :src="file.preview" class="object-cover h-full w-full block rounded-md pointer-events-auto"/>

          </div>
          <Button type="button" @click="removeImage(i)" btnClass="btn-danger"
            class="mt-2 pointer-events-auto">Remover</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDropzone } from "vue3-dropzone";
import { ref, watch } from "vue";
import Button from '@/components/Button';
export default {
  name: "UseDropzoneDemo",
  components: {
    Button
  },
  props: {
    predefinedUrl: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '300',
      required: false
    },
    height: {
      type: String,
      default: '300',
      required: false
    },
  },
  setup(props, { emit }) {
    const files = ref([]);

    if (props.predefinedUrl) {
      files.value.push({ preview: props.predefinedUrl });
    }

    function onDrop(acceptedFiles) {
      files.value = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }

    const { getRootProps, getInputProps, open, ...rest } = useDropzone({ onDrop });

    function removeImage(index) {
      emit('replaced', true);
      files.value = [...files.value.slice(0, index), ...files.value.slice(index + 1)];
      const fileInput = ref("fileInput");
      fileInput.click(); // Abre a janela de seleção de arquivos
      
    }

    function handleFilesUpdate() {
      emit("files", files.value);
    }

    watch(files, () => {
      handleFilesUpdate();
    }, { deep: true })

    return {
      getRootProps,
      getInputProps,
      ...rest,
      files,
      removeImage
    };
  }
};
</script>
<style scoped>
.pointer-events-none {
  pointer-events: none;
}

.pointer-events-auto {
  pointer-events: auto;
}
</style>