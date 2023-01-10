<template>
  <div class="min-h-screen w-full">
    <div class="flex flex-col">
      <div class="text-3xl text-center font-semibold">สถานะการแจ้งซ่อม</div>
      <div class="w-full">
        <canvas ref="statusChart" height="400" />
      </div>
      <div class="pt-32 text-3xl text-center font-semibold">
        สถิติการแจ้งซ่อมตามปี
      </div>
      <div class="w-full">
        <canvas ref="statisticsLogsChart" height="400" />
      </div>
    </div>
  </div>
</template>

<script>
//? Package
import Chart from "chart.js";
//? API
import http from "@/services/APIService";
export default {
  data() {
    return {
      statusData: {
        labels: ["Waiting", "Success", "Cancel"],
        datasets: [
          {
            label: "Repair Status",
            data: [12, 19, 3],
            backgroundColor: [
              "rgba(255, 150, 0, 0.8)",
              "rgba(0, 150, 0, 0.8)",
              "rgba(255, 0, 0, 0.8)",
            ],
            borderColor: [
              "rgba(255, 150, 0, 1)",
              "rgba(0, 150, 0, 1)",
              "rgba(255, 0, 0, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },

      statisticsRepairLogs: {
        labels: [
          new Date().getFullYear() - 3,
          new Date().getFullYear() - 2,
          new Date().getFullYear() - 1,
          new Date().getFullYear(),
        ],
        datasets: [
          {
            label: "รายงานภาพรวม การแจ้งซ่อมตามปี",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255, 150, 0, 0.8)",
              "rgba(0, 150, 0, 0.8)",
              "rgba(255, 0, 0, 0.8)",
              "rgba(0, 0, 255, 0.8)",
            ],
            borderColor: ["rgba(255, 150, 0, 1)"],
            borderWidth: 1,
          },
        ],
      },
    };
  },

  mounted() {
    this.statusChart();
    this.statisticsLogsChart();
  },

  methods: {
    statusChart() {
      this.statusChart = new Chart(this.$refs.statusChart, {
        type: "doughnut",
        data: this.statusData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    },

    statisticsLogsChart() {
      this.statisticsLogsChart = new Chart(this.$refs.statisticsLogsChart, {
        type: "bar",
        data: this.statisticsRepairLogs,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    },
  },
};
</script>
