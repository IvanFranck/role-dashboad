<template>
  <b-container class="mt-3">
    <b-row role="header" class="mb-5 d-flex justify-content-between">
      <feather stroke="#dc3545" type="moon"></feather>
      <b-row class="copy-secondary">
        <b-col style="gap: 8px" class="d-flex justify-content-center align-items-center">
          <span class="">English</span>
          <feather type="calendar"></feather>
        </b-col>
        <b-col
          class="user-mail d-flex justify-content-center align-items-center copy-primary"
        >
          <span>nzima.ivan.franck@gmail.com</span>
          <div class="feather--triangle">
            <feather
              type="triangle"
              size=".56rem"
              stroke="#01030f"
              fill="#01030f"
            ></feather>
          </div>
        </b-col>
      </b-row>
    </b-row>

    <div class="main d-flex flex-column">
      <b-row class="align-items-center d-flex justify-content-baseline gap-2">
        <h3 class="copy-secondary border-right pr-4 m-0 mr-4">LIST OF ROLE</h3>
        <feather stroke="#dc3545" type="home"></feather>
      </b-row>
      <!-- TODO: add shadow to table view control section -->
      <TheTableControl @open-create-role-model-event="handleOpenCreateRoleModal" />

      <TheRoleModal :roleToEdit="roleToEdit" :action="action" />

      <!-- TODO: add shadow to table view -->
      <b-row class="bg-light p-4 rounded-lg shadow">
        <TheTableLayout v-on:open-edit-role-model-event="handleOpenEditRoleModal" />
      </b-row>
    </div>
  </b-container>
</template>

<script>
import TheTableLayout from "./components/TheTableLayout.vue";
import TheTableControl from "./components/TheTableControl.vue";
import TheRoleModal from "./components/TheRoleModal.vue";

export default {
  components: {
    TheTableLayout,
    TheTableControl,
    TheRoleModal,
  },
  data() {
    return {
      action: "create",
      roleToEdit: null,
      value: 0,
      perPage: 3,
      currentPage: 1,
      items: [
        { first_name: "Dickerson", last_name: "MacDonald", age: 40 },
        { first_name: "Larsen", last_name: "Shaw", age: 21 },
        { first_name: "Geneva", last_name: "Wilson", age: 89 },
        { first_name: "Jami", last_name: "Carney", age: 38 },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },

  methods: {
    handleOpenEditRoleModal(item) {
      this.action = "edit";
      this.roleToEdit = { ...item };
      this.$bvModal.show("modal-center");
    },

    handleOpenCreateRoleModal() {
      this.action = "create";
      this.$bvModal.show("modal-center");
    },
  },
};
</script>

<style scoped lang="scss">
header > div {
  gap: 20px;
}

.user-mail {
  gap: 8px;
  .feather--triangle {
    rotate: 180deg;
  }
}

.main {
  gap: 20px;
}
</style>
