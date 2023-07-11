<script>
export default {
    name: "LoginPage",
    data() {
        return {
            log: "",
        };
    },
    emits: ["logs"],
    methods: {
        callback(response) {
            this.log = response;
            this.$emit("logs", this.log);
        },
    },
};
</script>

<template>
    <GoogleLogin :callback="callback" prompt />
</template>
