const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data; // Declare data as a global variable


// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it. Storing in Data variable
// Create a horizontal bar chart with a dropdown menu to display 
//the top 10 OTUs found in that individual.


d3.json(url).then(responseData => {
    // Assign the data to the global variable
    data = responseData;

    // Extract the sample data
    const samples = data.samples;
  
    // Create the dropdown menu
    const dropdown = d3.select("#selDataset");
    samples.forEach(sample => {
      dropdown
        .append("option")
        .text(sample.id)
        .property("value", sample.id);
    });

    // Initial sample ID
    const initialSampleId = samples[0].id;

    //Update the bar chart based on the initial sample ID
    optionChanged(initialSampleId);
});

// Function to update the bar chart based on the selected sample ID
function optionChanged(selectedSampleId) {
    // Find the selected sample
    const selectedSample = data.samples.find(sample => sample.id === selectedSampleId);
    const selectedMetadata = data.metadata.find(meta => meta.id === parseInt(selectedSampleId));

    //update Bar chart
    updateBarChart(selectedSample);
    //update Bubble chart
    updateBubbleChart(selectedSample);
    // Display metadata
    displayMetadata(selectedMetadata);
    createGaugeChart(selectedMetadata);
}



// Function to update the bar chart based on the selected sample
function updateBarChart(selectedSample){
// Get the OTU ids and corresponding sample values
const otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
const sampleValues = selectedSample.sample_values.slice(0, 10).reverse();

// Create a bar chart using Plotly
let trace = {
  x: sampleValues,
  y: otuIds.map(id => `OTU ${id}`),
  type: 'bar',
  orientation: 'h',
};

let plotData = [trace];

let layout = {
  title: `Top 10 OTU IDs Based on Sample Values for Sample ${selectedSample} (Descending Order)`,
  xaxis: { title: 'Sample Values' },
  yaxis: { title: 'OTU ID' },
};

Plotly.newPlot('bar', plotData, layout);

}


// Function to update the bubble chart based on the selected sample
function updateBubbleChart(selectedSample) {
    // Get the OTU ids, corresponding sample values, marker sizes, marker colors, and text values
    const otuIds = selectedSample.otu_ids;
    const sampleValues = selectedSample.sample_values;
    const markerSizes = sampleValues;
    const markerColors = otuIds;
    const textValues = selectedSample.otu_labels;
  
    // Create a bubble chart using Plotly
    let trace = {
      x: otuIds,
      y: sampleValues,
      mode: 'markers',
      marker: {
        size: markerSizes,
        color: markerColors,
        colorscale: 'Viridis',
        opacity: 0.7,
      },
      text: textValues,
    };
  
    let plotData = [trace];
  
    let layout = {
      title: `Bubble Chart for Sample ${selectedSample.id}`,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' },
    };
  
    Plotly.newPlot('bubble', plotData, layout);
  }

// Function to display metadata
function displayMetadata(selectedSample) {
    //let metadata = data.metadata.filter(entry => entry.id == selectedSample)[0];

    // Select the HTML element where you want to display the metadata
    const metadataDisplay = d3.select("#sample-metadata");
  
    // Clear existing metadata
    metadataDisplay.html("");

    // Display specific metadata fields
     metadataDisplay
     .append("p")
     .text(`ID: ${selectedSample.id}`);

    metadataDisplay
    .append("p")
    .text(`Ethnicity: ${selectedSample.ethnicity}`);

    metadataDisplay
    .append("p")
    .text(`Gender: ${selectedSample.gender}`);

    metadataDisplay
    .append("p")
    .text(`Age: ${selectedSample.age}`);

    metadataDisplay
    .append("p")
    .text(`Location: ${selectedSample.location}`);

    metadataDisplay
    .append("p")
    .text(`BB Type: ${selectedSample.bbtype}`);

    metadataDisplay
    .append("p")
    .text(`Wfreq: ${selectedSample.wfreq}`);
    }

//creating a gauge chart 

function createGaugeChart(wfreq) {
    // Convert wfreq to a value between 0 and 180 degrees for the gauge chart
    const level = parseFloat(wfreq.wfreq) * 20;
  
    // Trig to calc meter point
    const degrees = 180 - level;
    const radius = 0.5; // size of the gauge chart
    const radians = (degrees * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
  
    // Path for the gauge chart
    const mainPath = `M -0.02 -0.05 L 0.02 -0.05 L ${x} ${y} Z`;
  
    // Data for the gauge chart
    const gaugeData = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "WFreq",
        text: level,
        hoverinfo: "text+name",
      },
      {
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(0, 105, 11, .5)",
            "rgba(10, 120, 22, .5)",
            "rgba(14, 127, 0, .5)",
            "rgba(110, 154, 22, .5)",
            "rgba(170, 202, 42, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(240, 230, 215, .5)",
            "rgba(255, 255, 255, 0)",
          ],
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false,
      },
    ];
  
    // Layout for the gauge chart
    const gaugeLayout = {
      shapes: [
        {
          type: "path",
          path: mainPath,
          fillcolor: "850000",
          line: { color: "850000" },
        },
      ],
      title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
      yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
    };
  
    // Plot the gauge chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  }


// Event listener for dropdown change
// d3.select("#selDataset").on("change", function() {
//     const selectedSampleId = this.value;
//     optionChanged(selectedSampleId, data.samples);
//   });

/////INITIAL TEST FOR ONE ID DATA WORKING
// d3.json(url).then(data => {
//     console.log(data);
//     const samples = data.samples;
//     // Sort the samples based on sample values in descending order
//     const sortedSamples = samples.sort((a, b) => b.sample_values - a.sample_values);

//    // Get the top ten OTU ids
//    //using reverse to sort in decending order
//     const topTenOTUIds = sortedSamples[0].otu_ids.slice(0, 10).reverse();
//     const topTenSampleValues = sortedSamples[0].sample_values.slice(0, 10).reverse();
//     console.log("Top Ten OTU IDs:", topTenOTUIds);


//     // Create a bar chart using Plotly
//     const trace = {
//         x: topTenSampleValues,
//         y: topTenOTUIds.map(id => `OTU ${id}`),
//         type: 'bar',
//         orientation: 'h',
//     };

//     const plotData = [trace];

//     const layout = {
//         title: 'Top 10 OTU IDs Based on Sample Values',
//         xaxis: { title: 'Sample Values' },
//         yaxis: { title: 'OTU ID' },
//     };

//     Plotly.newPlot('bar', plotData, layout);
// });




