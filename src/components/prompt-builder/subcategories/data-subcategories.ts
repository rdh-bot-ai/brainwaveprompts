import { SubCategory } from "../types/subcategory-types";

export const DATA_SUBCATEGORIES: SubCategory[] = [
  {
    id: "interpret",
    name: "Data Interpretation",
    description: "Finding meaning in data sets",
    defaultPrompt: "Analyze the following data about [topic/dataset] and provide meaningful interpretations. Include: \n\n1) Patterns and trends across time periods or categories\n\n2) Outliers and anomalies with potential explanations for their occurrence\n\n3) Correlations between different variables, with caution about causation claims\n\n4) Potential causations where evidence exists to support them\n\n5) Statistical significance of findings when applicable\n\n6) Contextual factors that might influence the interpretation\n\n7) Limitations of the dataset that might affect conclusions\n\n8) Comparative analysis against benchmarks or historical data\n\n9) Business implications or actionable insights derived from the data\n\n10) Recommendations for further data collection or analysis\n\nExplain the significance of key findings for [audience/purpose], translating technical insights into relevant business or operational outcomes.",
  },
  {
    id: "visualize",
    name: "Visualization Planning",
    description: "Planning effective data displays",
    defaultPrompt: "Recommend appropriate visualization approaches for data about [topic/dataset]. Suggest: \n\n1) Specific chart types matched to the data structure and story you want to tell\n\n2) Key variables to highlight and their visual encodings (position, color, size, etc.)\n\n3) Color schemes appropriate for the data type (sequential, diverging, or categorical)\n\n4) Annotations and callouts to guide audience understanding\n\n5) Interactive elements that would enhance exploration (if applicable)\n\n6) Multiple visualization options for different aspects of the same dataset\n\n7) Sequencing of visualizations to build a coherent data narrative\n\n8) Text elements needed to provide context (titles, subtitles, legends, etc.)\n\n9) Approaches for handling missing data or outliers in visualizations\n\n10) Design considerations for the intended viewing medium (presentation slides, dashboard, print, etc.)\n\nFor each recommendation, explain the rationale and how it effectively communicates the key insights from the data.",
  },
  {
    id: "metrics",
    name: "KPI & Metrics",
    description: "Key performance indicators",
    defaultPrompt: "Develop a framework of key metrics and KPIs to track [objective/goal]. Include definitions, calculation methods, benchmarks, and explain how each metric relates to overall business/organizational goals.",
  },
  {
    id: "forecast",
    name: "Predictions & Forecasting",
    description: "Future data projections",
    defaultPrompt: "Based on the provided data about [topic], generate forecasts and predictions for [timeframe]. Explain the methodology, assumptions, confidence levels, and key factors that could influence these projections.",
  },
  {
    id: "predictive",
    name: "Predictive Analysis",
    description: "Future trends prediction",
    defaultPrompt: "Develop predictive analysis for [metric/trend] based on [historical data]. Include key variables, assumptions, and confidence levels.",
  },
  {
    id: "segmentation",
    name: "Market Segmentation",
    description: "Customer grouping analysis",
    defaultPrompt: "Create market segmentation analysis for [customer base]. Identify key segments, characteristics, and targeting opportunities.",
  },
  {
    id: "conversion",
    name: "Conversion Analysis",
    description: "Sales funnel optimization",
    defaultPrompt: "Analyze conversion data for [process/funnel]. Identify bottlenecks, optimization opportunities, and success metrics.",
  }
];
