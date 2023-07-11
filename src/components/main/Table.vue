<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Products</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Products</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>

        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>List Product</h3>
                    <a href="#" @click.prevent="add()">
                        <i class="bx bx-plus"></i>
                    </a>
                    <i class="bx bx-filter"></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th style="text-align: end">Name</th>
                            <th style="width: 20vw; text-align: center">
                                Description
                            </th>
                            <th style="text-align: left">Price</th>
                            <th>Stock</th>
                            <th>Author</th>
                            <th v-if="showEdit">Change</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <RowTable
                            v-for="(product, i) in products"
                            :key="product.id"
                            :product="product"
                            :id="i"
                            @edit="edit"
                            @statsEdit="statsEdit"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import RowTable from "./rowTable.vue";

export default {
    props: ["products"],
    data() {
        return {
            editForm: 0,
            showEdit: false,
        };
    },
    emits: ["edit", "add", "statsEdit"],
    created() {
        this.show();
    },
    methods: {
        edit(id) {
            this.$emit("edit", id);
        },
        add() {
            this.$emit("add");
        },
        show() {
            if (localStorage.getItem("role") == "admin") {
                this.showEdit = true;
            }
        },
        statsEdit(status, id) {
            this.$emit("statsEdit", status, id);
        },
    },
    components: { RowTable },
};
</script>

<style>
th {
    text-align: center;
    width: 5vw;
}
tbody {
    max-height: 70vh;
}
.table-content {
    height: 100vh;
}
.bx-edit {
    cursor: pointer;
}
</style>
