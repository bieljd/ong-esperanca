export interface DadosImpacto {
  ano: number;
  toneladas: number;
}

const dados: DadosImpacto[] = [
  { ano: 2018, toneladas: 8 },
  { ano: 2019, toneladas: 14 },
  { ano: 2020, toneladas: 12 },
  { ano: 2021, toneladas: 18 },
  { ano: 2022, toneladas: 22 },
  { ano: 2023, toneladas: 26 },
  { ano: 2024, toneladas: 28 },
];

interface ChartConstructor {
  new (canvas: HTMLCanvasElement, config: Record<string, unknown>): unknown;
}

function inicializarGrafico(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("#grafico-impacto");
  const ChartGlobal = (window as Window & { Chart?: ChartConstructor }).Chart;

  if (!canvas || !ChartGlobal || canvas.dataset.graficoInicializado === "true") return;

  const contexto = canvas.getContext("2d");
  if (!contexto) return;

  const gradiente = contexto.createLinearGradient(0, 0, 0, 300);
  gradiente.addColorStop(0, "rgba(14, 74, 110, 0.22)");
  gradiente.addColorStop(1, "rgba(14, 74, 110, 0)");

  new ChartGlobal(canvas, {
    type: "line",
    data: {
      labels: dados.map((item) => item.ano),
      datasets: [{
        label: "Toneladas recolhidas",
        data: dados.map((item) => item.toneladas),
        borderColor: "#0E4A6E",
        backgroundColor: gradiente,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#0E4A6E",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: { parsed: { y: number | null } }): string => `${context.parsed.y ?? 0} t`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(107, 114, 128, 0.16)" },
          ticks: { callback: (valor: string | number): string => `${valor} t` },
        },
      },
    },
  });

  canvas.dataset.graficoInicializado = "true";
}

document.addEventListener("DOMContentLoaded", inicializarGrafico);