<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Product</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Add Form Product</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Add Product</h3>
                    <i class="bx bx-filter"></i>
                </div>
                <Form
                    @cancel="handleCancel()"
                    @addSubmitted="addSubmitted()"
                    :isAdd="isAdd"
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
    props: ["productById", "categories", "isAdd"],
    emits: ["cancel", "addSubmitted"],
    methods: {
        handleCancel() {
            this.$emit("cancel");
        },
        addSubmitted() {
            this.$emit("addSubmitted");
        },
    },
    components: {
        Form,
    },
};
</script>
