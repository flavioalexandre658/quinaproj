let colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#475569",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
  purple: "#A3A1FB",
};

function colorOpacity(color, opacity) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

export const basicArea = {
  series: [
    {
      name: "Colaboradores", // Adicione a label customizada aqui
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#4669FA"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      colors: "#4669FA",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 100, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#475569",
          fontFamily: "Inter",
        },
      },
    },

    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: "#475569",
          fontFamily: "Inter",
        },
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};
export const basicAreaDark = {
  series: [
    {
      name: "Colaboradores", // Adicione a label customizada aqui
      data: [],
    },
  ],
  chartOptions: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#4669FA"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: "#334155",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      colors: "#4669FA",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [50, 100, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#CBD5E1",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: "#CBD5E1",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};

export const donutTwo = {
  series: [],

  chartOptions: {
    labels: ["Disponíveis", "Pendentes", "Pagos"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px", // Altere o tamanho da fonte aqui
        //colors: [colors["dark-light"], colors["dark-light"], colors["dark-light"]], // Altere as cores dos rótulos de dados aqui
      },
    },
    colors: [colors.info, colors.warning, colors.success],
    legend: {
      position: "bottom",
      fontSize: "8px",
      fontFamily: "Inter",
      fontWeight: 400,
      markers: {
        width: 8,
        height: 8,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
      },
    },
  },
};



export const donutTwoDark = {
  series: [],

  chartOptions: {
    labels: ["Disponíveis", "Pendentes", "Pagos"],
    dataLabels: {
      enabled: true,
    },

    colors: [colors.info, colorOpacity(colors.info, 0.16)],
    legend: {
      position: "bottom",
      fontSize: "8px",
      fontFamily: "Inter",
      fontWeight: 400,
      show: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "40%",
          labels: {
            show: true,
            name: {
              show: false,
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color: "#CBD5E1",
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Inter",
              color: "#CBD5E1",
              formatter(val) {
                // eslint-disable-next-line radix
                return `${parseInt(val)*100}%`;
              },
            },
            total: {
              show: true,
              fontSize: "10px",
              label: "",
              color: "white",
              formatter() {
                return "70";
              },
            },
          },
        },
      },
    },
  },
};
