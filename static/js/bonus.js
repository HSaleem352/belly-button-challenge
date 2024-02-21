// BONUS
// Gauge Chart Function
function GaugeChart(sample) {
    
    // Retrieving data
    d3.json(url).then((data) => {
     
      let metadata = data.metadata;
      
      // Filter based on the sample value
      let S_value = metadata.filter(sampleObj => sampleObj.id == sample);
      
      // First index
      let First_S_data = S_value[0];
      
      // Getting the washing frequency value
      let wfreq = First_S_data.wfreq;
      
      // Gauge Chart Trace
      let trace = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Belly Button Washing Frequency(Weekly)"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            bar: { color: "darkblue" },
            steps: [
              { range: [0, 1], color: "#f7fcfd" },
              { range: [1, 2], color: "#e5f5f9" },
              { range: [2, 3], color: "#ccece6" },
              { range: [3, 4], color: "#99d8c9" },
              { range: [4, 5], color: "#66c2a4" },
              { range: [5, 6], color: "#41ae76" },
              { range: [6, 7], color: "#238b45" },
              { range: [7, 8], color: "#006d2c" },
              { range: [8, 9], color: "#00441b" }
            ],
          }
        }
      ];
      
      // Gauge Chart Layout
      let layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
      
      // Plotting Gauge Chart
      Plotly.newPlot("gauge", trace, layout);
    });
  }

  // Dashboard Update Function Upon Sample Change
function optionChanged(value) { 

    // Logging the new value
    console.log(value); 

    // Calling all functions 
    BarChart(value);
    BubbleChart(value);
    Metadata(value);
    GaugeChart(value);
};
