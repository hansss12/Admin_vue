<template>
    <div>
        <div class="box">
            <div class="container">
                <div class="top">
                    <span class="question">Have an account?</span>
                    <header class="login">{{ botol }}</header>
                </div>
                <form action="post" v-on:submit.prevent="login()">
                    <div class="input-field">
                        <input
                            type="text"
                            class="input"
                            placeholder="Email"
                            v-model="email"
                        />
                        <i class="bx bx-user"></i>
                    </div>

                    <div class="input-field">
                        <input
                            type="Password"
                            class="input"
                            placeholder="Password"
                            v-model="password"
                        />
                        <i class="bx bx-lock-alt"></i>
                    </div>

                    <div class="input-field">
                        <input type="submit" class="submit" value="Login" />
                    </div>
                </form>

                <div class="two-col">
                    <div class="one">
                        <input type="checkbox" name="" id="check" />
                        <label for="check"> Remember Me</label>
                    </div>
                    <div class="two">
                        <label class="label"
                            ><a href="#" @click="register"
                                >Don't have account?</a
                            ></label
                        >
                    </div>
                </div>
                <div
                    style="
                        display: flex;
                        justify-content: center;
                        margin-top: 2rem;
                    "
                >
                    <LoginGoogle @logs="logs" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginGoogle from "./LoginGoogle.vue";

export default {
    props: ["botol"],
    data() {
        return {
            email: "",
            password: "",
        };
    },
    emits: ["register", "loginSubmitted", "logs"],
    methods: {
        login() {
            this.$emit("loginSubmitted", this.email, this.password);
        },
        register() {
            this.$emit("register");
        },
        logs(log) {
            this.$emit("logs", log.credential);
        },
    },
    components: { LoginGoogle },
};
</script>
