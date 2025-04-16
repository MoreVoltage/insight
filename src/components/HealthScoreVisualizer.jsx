import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

const HealthScoreVisualizer = () => {
  // Example water product for visualization
  const exampleProduct = {
    name: "Sample Bottled Water",
    initialScore: 100,
    contaminants: 12,
    pHDeduction: 8,
    tdsDeduction: 5,
    packagingDeduction: 15,
    sourceDeduction: 10,
    treatmentDeduction: 6,
    incompleteDataDeduction: 0,
    totalDeduction: 56,
    finalScore: 35
  };

  // Data for the breakdown chart
  const breakdownData = [
    { name: 'Contaminants', deduction: exampleProduct.contaminants, color: '#FF6B6B' },
    { name: 'pH', deduction: exampleProduct.pHDeduction, color: '#4ECDC4' },
    { name: 'TDS', deduction: exampleProduct.tdsDeduction, color: '#1A535C' },
    { name: 'Packaging', deduction: exampleProduct.packagingDeduction, color: '#FF9F1C' },
    { name: 'Source', deduction: exampleProduct.sourceDeduction, color: '#6A0572' },
    { name: 'Treatment', deduction: exampleProduct.treatmentDeduction, color: '#F9C80E' },
    { name: 'Missing Data', deduction: exampleProduct.incompleteDataDeduction, color: '#666666' }
  ];

  // Data for the source comparison chart
  const sourceData = [
    { name: 'Natural Spring', penalty: 0, color: '#75D701' },
    { name: 'Artesian', penalty: 1, color: '#92D050' },
    { name: 'Glacier', penalty: 2, color: '#A8D08D' },
    { name: 'Deep Well', penalty: 2, color: '#BDD7EE' },
    { name: 'Mineral', penalty: 3, color: '#9BC2E6' },
    { name: 'Deep Ocean', penalty: 4, color: '#8FAADC' },
    { name: 'Ground', penalty: 5, color: '#8796C4' },
    { name: 'Air Capture', penalty: 5, color: '#7F7FBF' },
    { name: 'Rainwater', penalty: 6, color: '#767AB6' },
    { name: 'Purified', penalty: 7, color: '#7030A0' },
    { name: 'Distilled', penalty: 9, color: '#5E30A0' },
    { name: 'Municipal', penalty: 10, color: '#4C207F' }
  ];

  // Data for the treatment methods comparison chart
  const treatmentData = [
    { name: 'UV', penalty: 0, color: '#75D701' },
    { name: 'Carbon/Ultrafiltration', penalty: 1, color: '#92D050' },
    { name: 'Ozone/Nanofiltration', penalty: 2, color: '#A8D08D' },
    { name: 'Mineral Enrichment', penalty: 3, color: '#BDD7EE' },
    { name: 'Reverse Osmosis', penalty: 4, color: '#9BC2E6' },
    { name: 'Ionization/Electrodialysis', penalty: 5, color: '#8FAADC' },
    { name: 'Distillation', penalty: 6, color: '#8796C4' },
    { name: 'Alkalinization', penalty: 7, color: '#7F7FBF' },
    { name: 'Chlorination', penalty: 10, color: '#4C207F' }
  ];

  // Data for the packaging comparison chart
  const packagingData = [
    { name: 'Glass', penalty: 0, color: '#75D701' },
    { name: 'Aluminum', penalty: 2, color: '#A8D08D' },
    { name: 'Carton', penalty: 4, color: '#9BC2E6' },
    { name: 'BPA-Free', penalty: 8, color: '#767AB6' },
    { name: 'Plastic', penalty: 15, color: '#4C207F' }
  ];

  // Data for the scoring curve visualization
  const scoreCurveData = [];
  for (let i = 0; i <= 100; i += 5) {
    let adjustedScore = i;
    if (i > 80) {
      const excess = i - 80;
      const reducedExcess = excess * 0.6;
      adjustedScore = 80 + reducedExcess;
    }
    scoreCurveData.push({
      rawScore: i,
      finalScore: adjustedScore
    });
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 shadow-md rounded">
          <p className="text-gray-700">{`${label}: ${payload[0].value} points`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      {/* Score Formula Visualization */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">How the Score is Calculated</h2>
        <div className="flex flex-wrap items-center justify-center mb-6 gap-4">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-lg font-bold">Starting Score</p>
            <p className="text-3xl font-bold text-green-600">100</p>
          </div>
          <div className="text-3xl">−</div>
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <p className="text-lg font-bold">Total Deductions</p>
            <p className="text-3xl font-bold text-red-600">{exampleProduct.totalDeduction}</p>
          </div>
          <div className="text-3xl">=</div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-lg font-bold">Raw Score</p>
            <p className="text-3xl font-bold text-blue-600">{100 - exampleProduct.totalDeduction}</p>
          </div>
          <div className="text-3xl">→</div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <p className="text-lg font-bold">Final Score</p>
            <p className="text-3xl font-bold text-purple-600">{exampleProduct.finalScore}</p>
          </div>
        </div>
        <p className="text-gray-600 text-center italic">Note: Scores above 80 are further reduced by 40% for the excess points to make high scores harder to achieve</p>
      </div>

      {/* Sample Product Score Breakdown */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Sample Product Deduction Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={breakdownData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 20]} label={{ value: 'Points Deducted', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="deduction" fill="#8884d8">
                {breakdownData.map((entry, index) => (
                  <rect key={`rect-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scoring Curve Visualization */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">High Score Penalty Curve</h2>
        <p className="mb-2 text-gray-600">Scores above 80 are reduced by 40% of the excess to make high scores harder to achieve</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scoreCurveData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rawScore" label={{ value: 'Raw Score', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={[0, 100]} label={{ value: 'Final Score', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <ReferenceLine x={80} stroke="red" label="Penalty Threshold" />
              <Bar dataKey="finalScore" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Type Penalties */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Water Source Penalties</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sourceData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 15]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="penalty" fill="#8884d8">
                {sourceData.map((entry, index) => (
                  <rect key={`rect-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Treatment Method Penalties */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Treatment Method Penalties</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={treatmentData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 15]} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Bar dataKey="penalty" fill="#8884d8">
                {treatmentData.map((entry, index) => (
                  <rect key={`rect-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Packaging Penalties */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Packaging Penalties</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={packagingData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 15]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="penalty" fill="#8884d8">
                {packagingData.map((entry, index) => (
                  <rect key={`rect-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contaminant Scoring Explanation */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Contaminant Penalty Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-lg mb-2">For contaminants above the safety limit:</p>
          <p className="mb-4">Penalty = log₂(contaminant/limit) × 25 + 5</p>
          
          <p className="font-semibold text-lg mb-2">For contaminants at 50-100% of the safety limit:</p>
          <p>Penalty = ((ratio - 0.5) ÷ 0.5) × 5</p>
        </div>
      </div>

      {/* pH Scoring Explanation */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">pH Penalty Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">Ideal pH Range: 7.0 - 8.0</p>
          <p className="mb-4">If pH &lt; 7.0: Penalty = (7.0 - pH)^1.7 × 7</p>
          <p>If pH &gt; 8.0: Penalty = (pH - 8.0)^1.7 × 7</p>
        </div>
      </div>

      {/* TDS Scoring Explanation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">TDS Penalty Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">Ideal TDS Range: 200 - 400 ppm</p>
          <p className="mb-4">If TDS &lt; 200: Penalty = ((200 - TDS) ÷ 200)^1.5 × 25</p>
          <p>If TDS &gt; 400: Penalty = ((TDS - 400) ÷ 40) + 5</p>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreVisualizer;