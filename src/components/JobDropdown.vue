<template>
  <v-select
    v-model="selectModel"
    :items="jobs"
    label="Job"
    outlined
    dense
    :multiple="multiple"
  ></v-select>
</template>

<script>
export default {
  name: "JobDropdown",
  props: {
    multiple: { type: Boolean, required: false, default: false },
  },

  data() {
    return {
      selectModel: [],
      jobs: ["Dev", "Leader", "Qa", "Product Owner"],
    };
  },
  watch: {
    selectModel(array) {
      this.$emit("updateChosenItem", array);
    },
  },
};
</script>
