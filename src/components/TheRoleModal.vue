<template>
  <b-modal
    header-bg-variant="secondary-200"
    :title="action === 'create' ? 'Add new role' : `Edit role: ${roleToEdit.role_name}`"
    size="lg"
    class="copy-2"
    ref="modal"
    id="modal-center"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    centered
  >
    <template #modal-header-close="">
      <feather stroke="red" type="x"></feather>
    </template>
    <template #modal-footer="{ ok, cancel }">
      <b-button size="sm" variant="danger" @click="cancel()"> Cancel </b-button>
      <b-button size="sm" variant="primary" @click="ok()"> OK </b-button>
    </template>
    <b-form ref="formnew" @submit.stop.prevent="handleSubmit">
      <b-form-group
        class="font-weight-light"
        label="Role name"
        label-for="name-input"
        label-cols-lg="3"
        invalid-feedback="Role name is required"
        :state="nameState"
      >
        <b-form-input
          placeholder="role_name"
          id="name-input"
          v-model="name"
          :state="nameState"
          required
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="font-weight-light"
        label="Permission"
        label-for="permission-input"
        label-cols-lg="3"
        invalid-feedback="permission name is required"
        :state="permissionState"
      >
        <b-form-input
          placeholder="role_permission"
          id="permission-input"
          v-model="permission"
          :state="permissionState"
          required
          trim
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      permission: "",
    };
  },
  props: {
    roleToEdit: { type: Object, required: false },
    action: {
      type: String,
      default: "create",
      validator: function (value) {
        return ["create", "edit"].includes(value);
      },
    },
  },
  computed: {
    nameState() {
      return this.name.length > 0;
    },
    permissionState() {
      return this.permission.length > 0;
    },
    ...mapState({
      tableItems: (state) => state.roles.items,
    }),
  },
  methods: {
    ...mapActions("roles", ["addNewRole", "updateRole"]),
    resetModal() {
      this.name = "";
      this.permission = "";
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.nameState && !this.permissionState) {
        return;
      }
      // Dispacth action of create or edit role
      if (this.action === "create")
        this.addNewRole({ role_name: this.name, role_permission: this.permission });
      else if (this.action === "edit") {
        this.updateRole({
          index: this.roleToEdit.index,
          role_name: this.name,
          role_permission: this.permission,
        });
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-center");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/_variable.scss";
.modal-header {
  background-color: $body-bg;
}
</style>
