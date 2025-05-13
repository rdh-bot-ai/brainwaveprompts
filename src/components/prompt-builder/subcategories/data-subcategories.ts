
import { SubCategory } from "../types/subcategory-types";

export const DATA_SUBCATEGORIES: SubCategory[] = [
  {
    id: "interpret",
    name: "Data Interpretation",
    description: "Finding meaning in data sets",
    defaultPrompt: "Analyze the following data about [topic/dataset] and provide meaningful interpretations. Identify patterns, outliers, correlations, and potential causations. Explain the significance of key findings for [audience/purpose].",
  },
  {
    id: "visualize",
    name: "Visualization Planning",
    description: "Planning effective data displays",
    defaultPrompt: "Recommend appropriate visualization approaches for data about [topic/dataset]. Suggest specific chart types, key variables to highlight, color schemes, and annotations that would effectively communicate the insights.",
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
