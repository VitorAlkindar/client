<template>
  <v-autocomplete
    v-model="autocompleteList"
    :items="usersAuto"
    item-text="name"
    outlined
    dense
    label="Nome"
    multiple
  ></v-autocomplete>
</template>

<script>
export default {
  name: "Autocomplete",
  props: {
    usersAuto: { type: Array, required: true },
  },
  watch: {
    autocompleteList(array) {
      this.$emit("updateChosenUserNames", array);
    },
  },
  data() {
    return {
      autocompleteList: [],
    };
  },
};
</script>
