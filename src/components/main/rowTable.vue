<template>
    <tr>
        <td>{{ id + 1 }}</td>
        <td>
            <img :src="product.imgUrl" />
        </td>
        <td style="text-align: center">{{ product.name }}</td>
        <td style="width: 20vw; text-align: center">
            {{ product.description }}
        </td>
        <td style="text-align: center">$ {{ product.price }}</td>
        <td style="text-align: center">{{ product.stock }}</td>
        <td style="text-align: center">
            {{ product.authors.username }}
        </td>
        <td v-if="showAdmin">
            <select
                style="
                    align-items: center;
                    border: none;
                    background: transparent;
                "
                v-model="product.status"
                @change="onChange($event, product.id)"
            >
                <option
                    v-for="stat in stats"
                    :selected="product.status == stat"
                    :disabled="product.status == stat"
                    :hidden="product.status == stat"
                    :value="stat"
                >
                    {{ stat }}
                </option>
            </select>
        </td>
        <td style="text-align: center">
            <span class="status" :class="product.status">{{
                product.status
            }}</span>
        </td>
        <td style="text-align: center">
            <a
                v-if="showEdit"
                style="color: black"
                href="#"
                @click.prevent="edit(product.id)"
            >
                <i class="bx bx-edit"></i>
            </a>
        </td>
    </tr>
</template>

<script>
export default {
    data() {
        return {
            showAdmin: false,
            showEdit: false,
            stats: ["Active", "InActive", "Archived"],
            status_patch: "",
        };
    },
    props: ["product", "id"],
    emits: ["edit", "statsEdit"],
    created() {
        this.show();
    },
    methods: {
        edit(id) {
            this.$emit("edit", id);
        },
        show() {
            if (
                localStorage.getItem("role") == "admin" ||
                localStorage.getItem("id") == this.product.authorId
            ) {
                this.showEdit = true;
            }
            if (localStorage.getItem("role") == "admin") {
                this.showAdmin = true;
            }
        },
        onChange(event, id) {
            this.$emit("statsEdit", event.target.value, id);
        },
    },
};
</script>
