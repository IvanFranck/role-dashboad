<template>
  <b-row
    class="shadow align-items-center font-weight-light bg-light p-4 rounded-lg copy-2 copy-secondary gap-2"
  >
    <!-- pagination value input -->
    <b-col cols="6" lg="3" class="flex-row d-flex align-items-center g-2">
      <span>Show</span>
      <b-form-input
        @change="handleInputRange"
        v-model="perPageModel"
        :max="rows"
        :min="0"
        size="sm"
        id="type-number"
        type="number"
      ></b-form-input>
      <span>entries</span>
    </b-col>
    <!-- end pagination value input -->

    <!-- pagination control -->
    <b-col cols="6" lg="5" class="d-flex align-items-center justify-content-center g-2">
      <span>Show {{ this.range.min }} to {{ this.range.max }} of {{ rows }} entries</span>
      <b-pagination
        @change="handlePaginationPageChange"
        v-model="currentPageModel"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="roles-table"
        size="sm"
        pills
      ></b-pagination>
    </b-col>
    <!-- end pagination control -->

    <!--table action -->
    <b-col cols="12" lg="4" class="flex-row d-flex align-items-center g-2">
      <b-button
        @click="handleCLickOnNewRole"
        size="sm"
        class="d-flex align-items-center g-1"
        variant="primary"
        ><feather size="1rem" type="plus"></feather> New
      </b-button>

      <b-button
        :disabled="!selected.length"
        size="sm"
        class="d-flex align-items-center g-1"
        variant="danger"
        @click="handleDeleteRole"
        ><feather size="1rem" type="trash"></feather> Delete
      </b-button>
      <b-form-input
        placeholder="Search..."
        size="sm"
        v-model="filter"
        id="type-text"
        type="search"
        @input="updateFilter($event)"
      ></b-form-input>
    </b-col>
    <!-- end table actions-->
  </b-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      action: "create",
      perPageModel: 5,
      currentPageModel: 1,
      filter: null,
    };
  },
  computed: {
    ...mapState({
      tableItems: (state) => state.roles.items,
      perPage: (state) => state.perPage,
      currentPage: (state) => state.currentPage,
      selected: (state) => state.roles.selected,
      filteredItems: (state) => state.roles.filteredItems,
    }),
    rows() {
      return this.filteredItems.length;
    },
    range() {
      let max = this.currentPage * this.perPage;
      let min = (this.currentPage - 1) * this.perPage + 1;
      max = this.rows > max ? max : this.rows;
      min = min > 0 ? min : 1;
      return {
        max,
        min,
      };
    },
  },
  methods: {
    ...mapActions(["changePage", "changeRange"]),
    ...mapActions("roles", ["updateFilter", "removeRole"]),
    handleCLickOnNewRole() {
      this.$emit("open-create-role-model-event");
    },
    handlePaginationPageChange(page) {
      this.changePage(page);
      this.currentPageModel = page;
    },
    handleInputRange(value) {
      this.changeRange(value);
    },
    handleDeleteRole() {
      this.removeRole(this.selected);
    },
  },

  watch: {
    tableItems: function () {
      if (this.range.min >= this.range.max) {
        if (this.currentPage > 1) this.changePage(this.currentPage - 1);
        this.changePage(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
