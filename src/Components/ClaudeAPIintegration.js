import React, { useState } from "react";
import Map from "./Map";
import FilterPanel from "./FilterPanel";
import { Play, Save, Share2, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ClaudeAPIintegration = ({ setGeoJsonData, setResponseText, responseText }) => {
const analysisTypes = [
  "Location Suitability",
  "Proximity Analysis",
  "Infrastructure Availability",
  "Market Potential",
  "Regulatory Compliance",
];
const quickPrompts = [
  "Find optimal retail location",
  "Evaluate development potential",
  "Suggest sites near major roads",
  "Locate plots within 15km of airport",
];

const [responses, setResponses] = useState([]);
const [showHistory, setShowHistory] = useState(true);
  const [query, setQuery] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [analysisType, setAnalysisType] = useState("");
  const [parameters, setParameters] = useState({});
  const [summary, setSummary] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [followUps, setFollowUps] = useState([]);


const [analysisResults, setAnalysisResults] = useState({
    keyMetrics: {
      totalPlots: 12,
      avgArea: 3.2,
      maxSuitability: 92,
    },
    chartData: [
      { name: "Plot A", score: 78 },
      { name: "Plot B", score: 85 },
      { name: "Plot C", score: 92 },
    ],
    properties: [
      { id: 1, name: "Plot A", area: 2.5, score: 78 },
      { id: 2, name: "Plot B", area: 3.4, score: 85 },
      { id: 3, name: "Plot C", area: 4.1, score: 92 },
    ],
  });


const handleClaudeSpatialQuery = async () => {
    setLoading(true);
    setResponseText("");
    setGeoJsonData(null);

    const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), 120000); // 10 seconds
 // Abort after 10 sec
    try {
      const res = await fetch("https://mvp-backend-te87.onrender.com/api/claude_spatial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
         signal: controller.signal,
      });
 clearTimeout(timeout); // cancel timeout if success
      const data = await res.json();

      if (data.geojson) {
        setGeoJsonData(JSON.stringify(data.geojson));
        setResponseText(data.message || "Results loaded.");
        setResponses(prev => [...prev, { question: query, answer: data.message }]);
      } else {
        setResponseText(data.message || "No matching results.");
      }
    } catch (err) {
    console.error("Claude query error:", err);
    if (err.name === "AbortError") {
      setResponseText("Query timed out. Please try again.");
    } else {
      setResponseText("Error fetching response.");
    }
  } finally {
    setLoading(false);
  }
  };

const handleFilterApply = async (filters) => {
    const response = await fetch('/api/filter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });

    const filteredGeoJSON = await response.json();
    applyFiltersToMap(filteredGeoJSON); // Update map with new data
  };
  
  const runAnalysis = () => {
    console.log("Running analysis:", analysisType, parameters);
     setShowResults(true);
  };

  const saveAnalysis = () => {
    console.log("Saving analysis configuration", analysisType, parameters);
  };

  const shareResults = () => {
    console.log("Sharing analysis results...");
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Claude AI Interaction</h2>

      <button
        className="text-blue-600 text-sm underline mb-4"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide Chat History' : 'Chat History'}
      </button>

      {showHistory && (
        <div className="overflow-y-auto max-h-60 space-y-2 border rounded-md p-2 bg-gray-50 mb-4">
          {responses.map((item, index) => (
            <div key={index} className="text-sm space-y-1">
              <div className="bg-gray-100 p-2 rounded">
                <strong>User:</strong> {item.question}
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <strong>ClaudeAI:</strong> {item.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Prompts */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Quick Prompt Templates</h4>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setQuery(prompt)}
              className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="space-y-2">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Claude about this location..."
        />
        <button
          onClick={handleClaudeSpatialQuery}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Thinking..." : "Ask Claude"}
        </button>
  {loading && (
  <div className="flex items-center gap-2 mt-2">
    <span className="text-sm text-gray-500">Claude is thinking</span>
    <span className="dot-animation">
      <span className="dot"></span><span className="dot"></span><span className="dot"></span>
    </span>
  </div>
)}

{responseText && (
  <div className={`mt-2 text-sm p-2 rounded ${
    responseText.includes("Failed") || responseText.includes("error")
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
  }`}>
    {responseText}
  </div>
)}

      </div>

      {/* Follow-up Suggestions */}
      {followUps.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Follow-up Suggestions</h4>
          <div className="flex flex-wrap gap-2">
            {followUps.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 bg-yellow-100 text-sm rounded hover:bg-yellow-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
  <FilterPanel onApply={handleFilterApply} />

      {/* Context Controls / Analysis Settings */}
      
       {/* Analysis Controls Section */}
      <div className="border rounded p-4 bg-gray-50 space-y-4">
        <h3 className="text-lg font-semibold">Analysis Controls</h3>

        <div>
          <label className="block font-medium mb-1">Analysis Type</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            <option value="">Select Type</option>
            {analysisTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Parameter 1 (e.g. Distance in km)</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            onChange={(e) =>
              setParameters({ ...parameters, param1: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Parameter 2 (e.g. Min area in acres)</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            onChange={(e) =>
              setParameters({ ...parameters, param2: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={runAnalysis}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Play className="w-4 h-4 mr-2" /> Run Analysis
          </button>
          <button
            onClick={saveAnalysis}
            className="flex items-center bg-gray-300 px-4 py-2 rounded"
          >
            <Save className="w-4 h-4 mr-2" /> Save
          </button>
          <button
            onClick={shareResults}
            className="flex items-center bg-gray-100 border px-4 py-2 rounded"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share
          </button>
        </div>
      </div>

      {/* Results Dashboard Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-5xl rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowResults(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Results Dashboard</h3>

            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-500">Total Plots</p>
                <p className="text-xl font-bold">{analysisResults.keyMetrics.totalPlots}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-500">Avg Area (acres)</p>
                <p className="text-xl font-bold">{analysisResults.keyMetrics.avgArea}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-500">Top Suitability</p>
                <p className="text-xl font-bold">{analysisResults.keyMetrics.maxSuitability}%</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Suitability Scores</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analysisResults.chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Matching Properties</h4>
              <table className="w-full text-sm border rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2 border">ID</th>
                    <th className="text-left p-2 border">Name</th>
                    <th className="text-left p-2 border">Area (acres)</th>
                    <th className="text-left p-2 border">Suitability</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.properties.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2 border">{p.id}</td>
                      <td className="p-2 border">{p.name}</td>
                      <td className="p-2 border">{p.area}</td>
                      <td className="p-2 border">{p.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <button className="bg-gray-200 px-4 py-2 rounded text-sm">Export CSV</button>
              <button className="bg-gray-200 px-4 py-2 rounded text-sm">Download PDF</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Share Results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ClaudeAPIintegration;






