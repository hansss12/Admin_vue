<template>
    <div class="body">
        <section id="sidebar">
            <a href="#" class="brand">
                <i class="bx bxs-smile"></i>
                <span class="text">IDEA</span>
            </a>
            <ul class="side-menu top">
                <li :class="{ active: isActive }">
                    <a href="#" @click.prevent="home()">
                        <i class="bx bxs-dashboard"></i>
                        <span class="text">Dashboard</span>
                    </a>
                </li>
                <li :class="{ active: isHide0 }">
                    <a href="#" @click.prevent="products()">
                        <i class="bx bxs-shopping-bag-alt"></i>
                        <span class="text">Products</span>
                    </a>
                </li>
                <li :class="{ active: isHide1 }">
                    <a href="#" @click.prevent="category()">
                        <i class="bx bx-category"></i>
                        <span class="text">Categories</span>
                    </a>
                </li>
                <li :class="{ active: isHide2 }">
                    <a href="#" @click.prevent="history()">
                        <i class="bx bx-history"></i>
                        <span class="text">History</span>
                    </a>
                </li>
                <li :class="{ active: isHide3 }">
                    <a href="#" @click.prevent="user()">
                        <i class="bx bxs-group"></i>
                        <span class="text">Team</span>
                    </a>
                </li>
            </ul>
            <ul class="side-menu">
                <li>
                    <a href="#" @click="logout" class="logout">
                        <i class="bx bxs-log-out-circle"></i>
                        <span class="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
        <!-- SIDEBAR -->

        <!-- CONTENT -->
        <section id="content">
            <!-- NAVBAR -->
            <nav>
                <a href="#" class="profile">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    />
                </a>
                <h4 style="position: relative; top: 15%">{{ username }}</h4>
            </nav>
            <!-- NAVBAR -->

            <!-- MAIN -->
            <main>
                <Home
                    :products="product"
                    :categories="categories"
                    :totalSales="totalSales"
                    v-if="currentPage == 'home'"
                />
                <Table
                    :products="product"
                    v-if="currentPage == 'products'"
                    @edit="edit"
                    @add="add"
                    @statsEdit="statsEdit"
                />
                <CategoryTable
                    :categories="categories"
                    v-if="currentPage == 'category'"
                    @editCategory="editCategory"
                    @addCategory="addCategory"
                />
                <HistoryTable
                    :histories="histories"
                    v-if="currentPage == 'history'"
                />
                <ProductEditForm
                    :productById="productById"
                    :categories="categories"
                    @cancel="handleCancel()"
                    @editSubmitted="editSubmitted()"
                    v-if="currentPage == 'productEdit'"
                />
                <ProductAddForm
                    :productById="productById"
                    :categories="categories"
                    :isAdd="isAdd"
                    @cancel="handleCancel()"
                    @addSubmitted="addSubmitted()"
                    v-if="currentPage == 'productAdd'"
                />
                <FormCategory
                    v-if="currentPage == 'formCategory'"
                    :isEdit="isEdit"
                    :categoryById="categoryById"
                    @subCategory="subCategory"
                    @cancel="handleCancel"
                    @subEditCategory="subEditCategory"
                />
                <UserTable v-if="currentPage == 'user'" :users="users" />
            </main>
            <!-- MAIN -->
        </section>
        <!-- CONTENT -->
    </div>
</template>

<script>
import CategoryTable from "./main/CategoryTable.vue";
import HistoryTable from "./main/HistoryTable.vue";
import Home from "./main/home.vue";
import Table from "./main/Table.vue";
import ProductEditForm from "./main/form/ProductEditForm.vue";
import ProductAddForm from "./main/form/ProductAddForm.vue";
import FormCategory from "./main/form/FormCategory.vue";
import UserTable from "./main/UserTable.vue";

export default {
    props: [
        "product",
        "categories",
        "productById",
        "totalSales",
        "fetchProductbyId",
        "editFetched",
        "addFetched",
        "histories",
        "statusSubmitted",
        "categoryById",
        "users",
        "username",
    ],
    data() {
        return {
            currentPage: "home",
            isAdd: true,
            isEdit: false,
            isActive: true,
            isHide0: false,
            isHide1: false,
            isHide2: false,
            isHide3: false,
        };
    },
    methods: {
        home() {
            if (!this.isActive) {
                this.isActive = !this.isActive;
                this.isHide0 = false;
                this.isHide1 = false;
                this.isHide2 = false;
                this.isHide3 = false;
                this.currentPage = "home";
            }
        },
        products() {
            if (!this.isHide0) {
                this.isActive = false;
                this.isHide0 = !this.isHide0;
                this.isHide1 = false;
                this.isHide2 = false;
                this.isHide3 = false;
                this.currentPage = "products";
            }
        },
        category() {
            if (!this.isHide1) {
                this.isActive = false;
                this.isHide0 = false;
                this.isHide1 = !this.isHide1;
                this.isHide2 = false;
                this.isHide3 = false;
                this.currentPage = "category";
            }
        },
        history() {
            if (!this.isHide2) {
                this.isActive = false;
                this.isHide0 = false;
                this.isHide1 = false;
                this.isHide2 = !this.isHide2;
                this.isHide3 = false;
                this.currentPage = "history";
            }
        },
        user() {
            if (!this.isHide3) {
                this.isActive = false;
                this.isHide0 = false;
                this.isHide1 = false;
                this.isHide2 = false;
                this.isHide3 = !this.isHide3;
                this.currentPage = "user";
            }
        },
        edit(id) {
            this.$emit("edit", id);
            this.currentPage = "productEdit";
        },
        add() {
            this.currentPage = "productAdd";
        },
        handleCancel() {
            this.currentPage = "category";
        },
        async editSubmitted() {
            const submitEdit = await this.editFetched(this.productById);
            if (submitEdit) {
                this.currentPage = "products";
            }
        },
        async addSubmitted() {
            const submitAdd = await this.addFetched(this.productById);
            if (submitAdd) {
                this.currentPage = "products";
            }
        },
        subEditCategory(id, name) {
            this.$emit("subEditCategory", id, name);
            this.currentPage = "category";
        },
        logout() {
            this.$emit("logout");
        },
        async statsEdit(status, id) {
            const stats = await this.statusSubmitted(status, id);
            if (stats) {
                this.currentPage = "products";
            }
        },
        async subCategory(name) {
            await this.$emit("subCategory", name);
            this.currentPage = "category";
        },
        editCategory(id) {
            this.isEdit = true;
            this.$emit("editCategory", id);
            this.currentPage = "formCategory";
        },
        addCategory() {
            this.currentPage = "formCategory";
        },
    },
    emits: ["edit", "logout", "subCategory", "editCategory", "subEditCategory"],
    components: {
        Home,
        Table,
        CategoryTable,
        HistoryTable,
        ProductEditForm,
        ProductAddForm,
        FormCategory,
        UserTable,
    },
};
</script>
