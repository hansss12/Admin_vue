<template>
    <div class="table-content">
        <div class="head-title">
            <div class="left">
                <h1>History</h1>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">History</a>
                    </li>
                    <li><i class="bx bx-chevron-right"></i></li>
                </ul>
            </div>
        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Recent History</h3>
                    <i class="bx bx-filter"></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style="text-align: start">User</th>
                            <th style="text-align: center">Product</th>
                            <th style="text-align: center">Date</th>
                            <th style="text-align: center">description</th>
                            <th style="text-align: center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(history, index) in histories.history"
                            :key="history.id"
                        >
                            <td>{{ index + 1 }}</td>
                            <td style="text-align: start">
                                {{ history.updatedBy }}
                            </td>
                            <td style="text-align: center">
                                {{ history.name }}
                            </td>
                            <td style="text-align: center">
                                {{ history.createdAt.split("T")[0] }}
                            </td>
                            <td style="text-align: center">
                                {{ history.description }}
                            </td>
                            <td style="text-align: center">
                                <span class="status" :class="history.status">{{
                                    history.status
                                }}</span>
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
    props: ["histories"],
};
</script>
<style>
tbody {
    display: block;
    overflow: auto;
}
thead,
tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
</style>
