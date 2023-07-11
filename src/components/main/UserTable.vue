<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>Our Teams</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Teams</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>List Staff & Admin</h3>
                    <i class="bx bx-filter"></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style="text-align: start">Name</th>
                            <th style="text-align: center">Email</th>
                            <th style="text-align: center">Joined At</th>
                            <th style="text-align: center">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users.user" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td style="text-align: start">
                                {{ user.username }}
                            </td>
                            <td style="text-align: center">
                                {{ user.email }}
                            </td>
                            <td style="text-align: center">
                                {{ user.createdAt.split("T")[0] }}
                            </td>
                            <td style="text-align: center">
                                {{ user.role }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["users"],
    mounted() {
        console.log(this.users);
    },
};
</script>
