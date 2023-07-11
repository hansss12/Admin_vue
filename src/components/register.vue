<template>
    <div>
        <div class="box">
            <div class="container">
                <div class="top">
                    <span class="question">New worker?</span>
                    <header class="login">Register</header>
                </div>
                <form action="post" v-on:submit.prevent="register()">
                    <div class="input-field">
                        <input
                            type="text"
                            class="input"
                            placeholder="Username"
                            v-model="username"
                        />
                        <i class="bx bx-user"></i>
                    </div>
                    <div class="input-field">
                        <input
                            type="text"
                            class="input"
                            placeholder="Email"
                            v-model="email"
                        />
                        <i class="bx bx-envelope"></i>
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
                        <input
                            type="text"
                            class="input"
                            placeholder="Phone Number"
                            v-model="phone"
                        />
                        <i class="bx bx-phone"></i>
                    </div>
                    <div class="input-field">
                        <input
                            type="text"
                            class="input"
                            placeholder="Address"
                            v-model="address"
                        />
                        <i class="bx bx-current-location"></i>
                    </div>
                    <div class="input-field">
                        <input type="submit" class="submit" value="Register" />
                    </div>
                </form>

                <div class="two-col">
                    <div class="one">
                        <input type="checkbox" name="" id="check" />
                        <label for="check"> Remember Me</label>
                    </div>
                    <div class="two">
                        <label class="label"
                            ><a href="#" @click="login"
                                >Have an account?</a
                            ></label
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["botol"],
    data() {
        return {
            username: "",
            email: "",
            password: "",
            phone: "",
            address: "",
        };
    },
    emits: ["registerSubmitted", "login"],
    methods: {
        register() {
            this.$emit(
                "registerSubmitted",
                this.username,
                this.email,
                this.password,
                this.phone,
                this.address,
                this.emptyForm
            );
        },
        login() {
            this.$emit("login");
        },
        emptyForm() {
            this.username = "";
            this.email = "";
            this.password = "";
            this.phone = "";
            this.address = "";
        },
    },
};
</script>
