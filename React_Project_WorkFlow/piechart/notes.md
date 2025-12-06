1) Install Recharts
npm install recharts


3) File structure suggestion

Put the chart component in 
1. src/components/ReligionPieChart.jsx and

2. use it in src/pages/Dashboard.jsx (or wherever your dashboard lives).

4) Full example component (complete, copy/paste ready)

Create src/components/ReligionPieChart.jsx:


/**
 * ReligionPieChart
 * - Counts occurrences of "Hindu", "Muslim", "Christian"
 * - Renders a responsive pie chart
 *
 * Props (optional):
 * - dataArray: an array of strings like ["Hindu","Muslim","Christian"...]
 * - apiUrl: if provided, component will fetch data from this URL (overrides dataArray)
 *
 * If neither prop provided, it falls back to a built-in sample array.
 */




