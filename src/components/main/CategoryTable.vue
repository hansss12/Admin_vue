<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Category</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Categories</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Category</h3>
                    <a href="#" @click.prevent="add()">
                        <i class="bx bx-plus"></i>
                    </a>
                    <i class="bx bx-filter"></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created Date</th>
                            <th>Last Update</th>
                            <th v-if="showEdit"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(category, index) in categories"
                            :key="category.id"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.createdAt.split("T")[0] }}</td>
                            <td>{{ category.updatedAt.split("T")[0] }}</td>
                            <td v-if="showEdit" style="text-align: center">
                                <a
                                    style="color: black"
                                    href="#"
                                    @click.prevent="edit(category.id)"
                                >
                                    <i class="bx bx-edit"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["categories"],
    data() {
        return {
            showEdit: false,
        };
    },
    created() {
        this.show();
    },
    methods: {
        show() {
            if (localStorage.getItem("role") == "admin") {
                this.showEdit = true;
            }
        },
        edit(id) {
            this.$emit("editCategory", id);
        },
        add() {
            this.$emit("addCategory");
        },
    },
};
</script>

<style>
.bxs-x-circle {
    font-size: 1.5em;
    position: relative;
    left: 1vw;
}
tbody {
    max-height: 30vh;
}
.table-content {
    height: 100vh;
}
</style>
