<template>
    <button :type="type" @click="handleClick()">
        {{ label }}
    </button>
</template>

<script>
export default {
    props: ["label", "type"],
    emits: ["click"],
    methods: {
        handleClick() {
            this.$emit("click");
        },
    },
};
</script>
