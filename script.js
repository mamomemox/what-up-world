body {
  margin: 0;
  font-family: 'Work Sans', 'Noto Sans', sans-serif;
  background-color: #ffffff;
  color: #181111;
}

.metric-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-icon {
  font-size: 2em;
  margin-bottom: 10px;
}

.metric-value {
  font-size: 1.8em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 1em;
  color: #666;
  margin-bottom: 5px;
}

.metric-change {
  font-size: 0.9em;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
}

.trend-up { background: #d4edda; color: #155724; }
.trend-down { background: #f8d7da; color: #721c24; }
.trend-neutral { background: #e2e3e5; color: #383d41; }

.chart-container {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.chart-title {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.chart-canvas {
  position: relative;
  height: 350px;
  width: 100%;
}

.table-container {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.table-title {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th {
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
}

.data-table tr:hover {
  background: #f8f9fa;
}

.report-section {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.report-text {
  white-space: pre-wrap;
  line-height: 1.8;
  font-size: 1.05em;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin: 30px 0;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
