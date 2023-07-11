<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Category</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Form Category</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Category Form</h3>
                    <i class="bx bx-filter"></i>
                </div>
                <form method="post" @submit.prevent="submitCategory()">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"
                            ><i class="bx bxs-shopping-bags"></i
                        ></span>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Category name"
                            aria-label="Category name"
                            aria-describedby="basic-addon1"
                            v-model="name"
                        />
                    </div>
                    <div class="d-grid gap-2">
                        <Button
                            class="btn btn-outline-danger"
                            type="button"
                            label="Cancel"
                            @click="handleCancel()"
                        />
                        <Button
                            class="btn btn-outline-primary"
                            type="submit"
                            label="Confirm"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Button from "./Button.vue";
export default {
    data() {
        return {
            name: "",
        };
    },
    props: ["isEdit", "categoryById"],
    emits: ["subCategory", "cancel", "subEditCategory"],
    methods: {
        submitCategory() {
            if (!this.isEdit) {
                this.$emit("subCategory", this.name);
            } else {
                this.$emit(
                    "subEditCategory",
                    this.categoryById.category.id,
                    this.name
                );
            }
        },
        handleCancel() {
            this.$emit("cancel");
        },
        show() {
            if (this.isEdit) {
                this.name = this.categoryById.name;
            }
        },
    },
    created() {
        this.show();
    },
    watch: {
        categoryById(value) {
            this.name = value.category.name;
        },
    },
    components: {
        Button,
    },
};
</script>
