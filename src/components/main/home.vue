<template>
    <div class="head-title">
        <div class="left">
            <h1>Dashboard</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class="bx bx-chevron-right"></i></li>
            </ul>
        </div>
    </div>

    <ul class="box-info">
        <li>
            <i class="bx bxs-shopping-bags"></i>
            <span class="text">
                <h3>{{ products.length }}</h3>
                <p>Total Products</p>
            </span>
        </li>
        <li>
            <i class="bx bx-category"></i>
            <span class="text">
                <h3>{{ categories.length }}</h3>
                <p>Total Category</p>
            </span>
        </li>
        <li>
            <i class="bx bxs-dollar-circle"></i>
            <span class="text">
                <h3>$ {{ totalSales }}</h3>
                <p>Total Assets</p>
            </span>
        </li>
    </ul>

    <div class="table-data">
        <div class="todo">
            <div class="head">
                <h3>Todos</h3>
                <i class="bx bx-plus"></i>
                <i class="bx bx-filter"></i>
            </div>
            <ul class="todo-list">
                <li class="completed">
                    <p>Todo List</p>
                    <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="completed">
                    <p>Todo List</p>
                    <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="not-completed">
                    <p>Todo List</p>
                    <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="completed">
                    <p>Todo List</p>
                    <i class="bx bx-dots-vertical-rounded"></i>
                </li>
                <li class="not-completed">
                    <p>Todo List</p>
                    <i class="bx bx-dots-vertical-rounded"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ["products", "categories", "totalSales"],
    data() {
        return {};
    },
};
</script>
