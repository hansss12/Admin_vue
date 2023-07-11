<script>
import login from "./components/login.vue";
import register from "./components/register.vue";
import Dashboard from "./components/Dashboard.vue";
import axios from "axios";
let currentPage = "";

if (localStorage.getItem("access_token")) {
    currentPage = "admin";
} else {
    currentPage = "login";
}
export default {
    components: {
        login,
        register,
        Dashboard,
    },

    data() {
        return {
            currentPage: currentPage,
            message: "Login",
            products: [],
            categories: [],
            histories: [],
            users: [],
            productById: {},
            categoryById: {},
            username: "",
            totalSales: 0,
        };
    },
    created() {
        if (localStorage.getItem("access_token")) {
            this.fetchProduct();
            this.fetchCategories();
            this.fetchHistory();
            this.fetchUser();
            this.username = localStorage.getItem("username");
        } else {
            currentPage = "login";
        }
    },
    methods: {
        register() {
            if (this.currentPage == "register") {
                this.currentPage = "login";
            } else {
                this.currentPage = "register";
            }
        },
        async submitRegister(
            username,
            email,
            password,
            phoneNumber,
            address,
            callback
        ) {
            try {
                const register = await axios({
                    url: "https://idea-branded-things-production.up.railway.app/register",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        username,
                        email,
                        password,
                        phoneNumber,
                        address,
                    },
                });
                callback();
                if (this.currentPage == "register") {
                    this.currentPage = "login";
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Register successfully",
                    });
                } else {
                    this.currentPage = "register";
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        login() {
            if (this.currentPage == "login") {
                this.currentPage = "register";
            } else {
                this.currentPage = "login";
            }
        },
        async loginSubmit(email, password) {
            try {
                const sign_in = await axios({
                    url: "https://idea-branded-things-production.up.railway.app/login",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        email,
                        password,
                    },
                });
                localStorage.setItem("access_token", sign_in.data.token);
                localStorage.setItem("id", sign_in.data.id);
                localStorage.setItem("username", sign_in.data.username);
                localStorage.setItem("role", sign_in.data.role);
                this.username = localStorage.getItem("username");
                this.fetchProduct();
                this.fetchCategories();
                this.fetchHistory();
                if (this.currentPage == "login") {
                    this.currentPage = "admin";
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully",
                    });
                } else {
                    this.currentPage = "login";
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again !!",
                });
            }
        },
        async loginGoogle(response) {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: "https://idea-branded-things-production.up.railway.app/google-sign-in",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        googletoken: response,
                    },
                });
                console.log(data);
                localStorage.setItem("access_token", data.accessToken);
                localStorage.setItem("id", data.id);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                this.username = localStorage.getItem("username");
                this.fetchProduct();
                this.fetchCategories();
                this.fetchHistory();
                this.currentPage = "admin";
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully",
                });
            } catch (error) {
                console.log(response);
                Swal.fire({
                    icon: "warning",
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        },
        logout() {
            Swal.fire({
                title: "Are you sure?",
                text: "You will redirected to login page!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("access_token");
                    this.currentPage = "login";
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-start",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "You has been logout!",
                    });
                }
            });
        },
        async fetchProduct() {
            try {
                const product = await axios({
                    url: "https://idea-branded-things-production.up.railway.app/products",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: localStorage.getItem("access_token"),
                    },
                });
                product.data.forEach((element) => {
                    this.totalSales += Math.floor(
                        (element.stock * element.price) / product.data.length
                    );
                });
                this.products = product.data;
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async fetchCategories() {
            try {
                const category = await axios({
                    url: "https://idea-branded-things-production.up.railway.app/categories",
                    method: "GET",
                    headers: {
                        authorization: localStorage.getItem("access_token"),
                    },
                });
                this.categories = category.data;
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async fetchProductbyId(id) {
            try {
                const product = await axios({
                    url: `https://idea-branded-things-production.up.railway.app/products/${id}`,
                    method: "GET",
                    headers: {
                        authorization: localStorage.getItem("access_token"),
                    },
                });
                this.productById = product.data;
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async fetchUser() {
            const { data } = await axios({
                url: "https://idea-branded-things-production.up.railway.app/",
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            this.users = data;
        },
        async fetchHistory() {
            try {
                const history = await axios({
                    url: `https://idea-branded-things-production.up.railway.app/histories`,
                    method: "GET",
                    headers: {
                        authorization: localStorage.getItem("access_token"),
                    },
                });
                this.histories = history.data;
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async editSubmitted(data) {
            try {
                const result = await Swal.fire({
                    title: "Do you want to update this product?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                });
                if (result.isConfirmed) {
                    const edit = await axios({
                        url: `https://idea-branded-things-production.up.railway.app/products/${data.id}`,
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            authorization: localStorage.getItem("access_token"),
                        },
                        data: {
                            name: data.name,
                            categoryId: data.categoryId,
                            description: data.description,
                            price: data.price,
                            stock: data.stock,
                            imgUrl: data.imgUrl,
                        },
                    });
                    this.fetchProduct();
                    this.fetchHistory();
                    setTimeout(() => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                );
                            },
                        });

                        Toast.fire({
                            icon: "success",
                            title: "Product updated successfully",
                        });
                    }, 200);
                    return edit;
                } else if (result.isDenied) {
                    Swal.fire("Product is not updated", "", "info");
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async addSubmitted(data) {
            try {
                const result = await Swal.fire({
                    title: "Do you want to create this product?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                });
                if (result.isConfirmed) {
                    const add = await axios({
                        url: `https://idea-branded-things-production.up.railway.app/products`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            authorization: localStorage.getItem("access_token"),
                        },
                        data: {
                            name: data.name,
                            categoryId: data.categoryId,
                            description: data.description,
                            price: data.price,
                            stock: data.stock,
                            imgUrl: data.imgUrl,
                        },
                    });
                    this.fetchProduct();
                    this.fetchHistory();
                    setTimeout(() => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                );
                            },
                        });

                        Toast.fire({
                            icon: "success",
                            title: "Create product successfully",
                        });
                    }, 200);
                    return add;
                } else if (result.isDenied) {
                    Swal.fire("Product is not created", "", "info");
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async statusSubmitted(status, id) {
            try {
                const result = await Swal.fire({
                    title: "Do you want to update this product?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                });
                if (result.isConfirmed) {
                    const edit = await axios({
                        url: `https://idea-branded-things-production.up.railway.app/products/${id}`,
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            authorization: localStorage.getItem("access_token"),
                        },
                        data: {
                            status,
                        },
                    });
                    console.log(edit);
                    this.fetchProduct();
                    this.fetchHistory();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Product updated successfully",
                    });

                    return edit;
                } else if (result.isDenied) {
                    Swal.fire("Product is not updated", "", "info");
                    this.fetchProduct();
                    this.fetchHistory();
                } else {
                    this.fetchProduct();
                    this.fetchHistory();
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async addCategory(name) {
            try {
                const { data } = await axios({
                    url: `https://idea-branded-things-production.up.railway.app/categories`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: localStorage.getItem("access_token"),
                    },
                    data: {
                        name,
                    },
                });
                this.fetchCategories();
                this.fetchHistory();
                setTimeout(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Create product successfully",
                    });
                }, 200);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async subEditCategory(id, name) {
            try {
                const { data } = await axios({
                    url: `https://idea-branded-things-production.up.railway.app/categories/${id}`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        authorization: localStorage.getItem("access_token"),
                    },
                    data: {
                        name,
                    },
                });
                this.fetchCategories();
                this.fetchHistory();
                setTimeout(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Create Category successfully",
                    });
                }, 200);
            } catch (error) {
                console.log(name, id);
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    footer: "Try again",
                });
            }
        },
        async getCategoryById(id) {
            const { data } = await axios({
                url: `https://idea-branded-things-production.up.railway.app/categories/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    authorization: localStorage.getItem("access_token"),
                },
            });
            console.log(data);
            this.categoryById = data;
        },
    },
};
</script>

<template>
    <login
        v-if="currentPage == 'login'"
        @loginSubmitted="loginSubmit"
        :botol="message"
        @register="register"
        @logs="loginGoogle"
    />
    <register
        v-if="currentPage == 'register'"
        @login="login"
        @registerSubmitted="submitRegister"
    />
    <Dashboard
        v-if="currentPage == 'admin'"
        @logout="logout"
        :product="products"
        :categories="categories"
        @edit="fetchProductbyId"
        :productById="productById"
        :totalSales="totalSales"
        :fetchProductbyId="fetchProductbyId"
        :editFetched="editSubmitted"
        :addFetched="addSubmitted"
        :histories="histories"
        :statusSubmitted="statusSubmitted"
        @subCategory="addCategory"
        @editCategory="getCategoryById"
        :categoryById="categoryById"
        @subEditCategory="subEditCategory"
        :users="users"
        :username="username"
    />
</template>
