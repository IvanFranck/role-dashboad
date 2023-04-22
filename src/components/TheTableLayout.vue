<template>
  <!-- TODO: set header sticky -->
  <b-table
    id="roles-table"
    select-mode="multi"
    head-variant="light"
    ref="selectableTable"
    :items="tableItems"
    :fields="fields"
    :tbody-transition-props="transProps"
    :busy="isBusy"
    :per-page="perPage"
    :current-page="currentPage"
    :filter="filter"
    :filter-included-fields="['role_name', 'role_permission']"
    primary-key="role_name"
    no-select-on-click
    selectable
    show-empty
    hover
    @filtered="onFiltered"
    @row-selected="onRowSelected"
  >
    <!-- TODO: handle check all tabel rows -->

    <template #head(selected)="">
      <b-form-checkbox @change="toggleSelectAllRows" />
    </template>

    <!-- TODO: handle check one rows -->
    <template #cell(selected)="{ rowSelected, index }">
      <b-form-checkbox @change="handleSelectRole(index)" :checked="rowSelected" />
    </template>

    <template #cell(actions)="{ item, index }">
      <b-row class="g-3 d-flex justify-content-center">
        <feather stroke="#28a745" size="1rem" type="eye"></feather>
        <feather
          @click="handleCLickOnEdit(item, index)"
          stroke="#007bff"
          size="1rem"
          type="edit"
        >
        </feather>
        <feather
          @click="handleRemoveItem(index)"
          stroke="#dc3545"
          size="1rem"
          type="trash"
        ></feather>
      </b-row>
    </template>

    <template #table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </template>
    <template #empty="">
      <h4 class="text-center copy-2">No data. Create a new role</h4>
    </template>
    <template #emptyfiltered="">
      <h4 class="text-center copy-2">Role not found</h4>
    </template>
  </b-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      allSelected: false,
      transProps: {
        name: "flip-list",
      },
      fields: [
        "selected",
        "actions",
        {
          key: "role_name",
          label: "ROLE NAME",
          sortable: true,
        },
        {
          key: "role_permission",
          label: "PERMISSION",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      tableItems: (state) => state.roles.items,
      perPage: (state) => state.perPage,
      currentPage: (state) => state.currentPage,
      selected: (state) => state.roles.selected,
      filter: (state) => state.roles.filter,
    }),
    isBusy() {
      if (this.tableItems) return false;
      return true;
    },
  },

  methods: {
    ...mapActions("roles", ["removeRole", "updateFilteredItems", "updateSelectedRows"]),
    ...mapActions(["changePage"]),
    toggleSelectAllRows() {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected();
        this.allSelected = false;
      } else {
        this.$refs.selectableTable.selectAllRows();
        this.allSelected = true;
      }
    },
    handleRemoveItem(index) {
      this.removeRole(index);
    },
    handleCLickOnEdit(item, index) {
      this.$emit("open-edit-role-model-event", { index, ...item });
    },
    handleSelectRole(index) {
      const tableRef = this.$refs.selectableTable;
      if (!tableRef.isRowSelected(index)) tableRef.selectRow(index);
      else tableRef.unselectRow(index);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.updateFilteredItems(filteredItems);
      this.changePage(1);
    },
    onRowSelected(items) {
      this.updateSelectedRows(items);
    },
  },
};
</script>

<style lang="scss">
@import "/src/assets/_variable.scss";

.page-item {
  .page-link {
    background-color: $body-bg;
    color: $body-color;
  }
}

.page-item.active {
  .page-link {
    background-color: $danger !important;
    border-color: $danger !important;
  }
}

.page-link:focus {
  box-shadow: none !important;
}

table#roles-table .flip-list-move {
  transition: transform 0.3s;
}

th {
  font-weight: 500 !important;
}
tbody {
  tr {
    font-size: 0.9rem;
    font-weight: 400 !important;
    color: $text-secondatry;
  }
}
</style>
