<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Product</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Edit Form Product</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Edit Product</h3>
                    <i class="bx bx-filter"></i>
                </div>
                <Form
                    @cancel="handleCancel()"
                    @editSubmitted="editSubmitted"
                    :productById="productById"
                    :categories="categories"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Form from "./FormProduct.vue";
export default {
    props: ["productById", "categories"],
    emits: ["cancel", "editSubmitted"],
    methods: {
        handleCancel() {
            this.$emit("cancel");
        },
        editSubmitted() {
            this.$emit("editSubmitted");
        },
    },
    components: {
        Form,
    },
};
</script>

<style>
.form-select {
    width: 80vh;
}
</style>
