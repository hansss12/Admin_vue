<template>
    <form method="post" @submit.prevent="submit()">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
                ><i class="bx bxs-shopping-bags"></i
            ></span>
            <input
                v-if="!isAdd"
                type="text"
                class="form-control"
                placeholder="Product name"
                aria-label="Product name"
                aria-describedby="basic-addon1"
                v-model="productById.name"
            />
            <input
                v-if="isAdd"
                type="text"
                class="form-control"
                placeholder="Product name"
                aria-label="Product name"
                aria-describedby="basic-addon1"
                v-model="name"
            />
        </div>
        <label for="form-select" class="mb-3">Categories</label>
        <select
            v-if="!isAdd"
            v-model="productById.categoryId"
            class="form-select mb-3"
            aria-label="Default select example"
        >
            <option
                v-for="category in categories"
                :value="category.id"
                :selected="category.id == productById.categoryId"
            >
                {{ category.name }}
            </option>
        </select>
        <select
            v-if="isAdd"
            v-model="categoryId"
            class="form-select mb-3"
            aria-label="Default select example"
            placeholder="--Select Category--"
        >
            <option selected disabled value="default">
                --Select Category--
            </option>
            <option v-for="category in categories" :value="category.id">
                {{ category.name }}
            </option>
        </select>
        <div class="input-group mb-3">
            <span class="input-group-text">Description</span>
            <textarea
                v-if="!isAdd"
                class="form-control"
                aria-label="With textarea"
                v-model="productById.description"
            ></textarea>
            <textarea
                v-if="isAdd"
                class="form-control"
                aria-label="With textarea"
                v-model="description"
            ></textarea>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">$</span>
            <input
                v-if="!isAdd"
                type="text"
                class="form-control"
                placeholder="Price"
                aria-label="Price"
                v-model="productById.price"
            />
            <input
                v-if="isAdd"
                type="text"
                class="form-control"
                placeholder="Price"
                aria-label="Price"
                v-model="price"
            />
            <span class="input-group-text"
                ><i class="bx bxs-bar-chart-alt-2"></i
            ></span>
            <input
                v-if="!isAdd"
                type="text"
                class="form-control"
                placeholder="Stock"
                aria-label="Stock"
                v-model="productById.stock"
            />
            <input
                v-if="isAdd"
                type="text"
                class="form-control"
                placeholder="Stock"
                aria-label="Stock"
                v-model="stock"
            />
        </div>

        <div class="mb-3">
            <label for="basic-url" class="form-label">Image URL</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3"
                    >https://example.com/photos.jpg</span
                >
                <input
                    v-if="!isAdd"
                    placeholder="Image"
                    type="text"
                    class="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    v-model="productById.imgUrl"
                />
                <input
                    v-if="isAdd"
                    placeholder="Image"
                    type="text"
                    class="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    v-model="imgUrl"
                />
            </div>
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
</template>

<script>
import Button from "./Button.vue";
export default {
    props: ["productById", "categories", "isAdd"],
    emits: ["cancel", "editSubmitted", "addSubmitted"],
    data() {
        return {
            name: "",
            categoryId: "default",
            description: "",
            price: null,
            stock: null,
            imgUrl: "",
        };
    },
    methods: {
        handleCancel() {
            this.$emit("cancel");
        },
        submit() {
            if (!this.isAdd) {
                this.$emit("editSubmitted");
            } else {
                this.$emit("addSubmitted");
            }
        },
    },
    components: {
        Button,
    },
};
</script>
