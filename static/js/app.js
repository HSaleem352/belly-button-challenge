// source URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// fetch the JSON data and log it
d3.json(url).then(function(data){
    console.log(data);
}); 

// Dashboard Initialization Function   
function init() {

    // Selecting the dropdown menu using d3
    let Dropdown_Menu = d3.select("#selDataset");

    // Getting the sample names and populating the drop-down selector using d3
    d3.json(url).then((data) => {
        
        // Setting a variable for the sample names
        let Sample_names = data.names;

        // Adding the samples to dropdown menu
        Sample_names.forEach((id) => {

            console.log(id);

            Dropdown_Menu.append("option")
            .text(id)
            .property("value",id);
        });

        // First sample from the list
        let First_sample = Sample_names[0];

        // Printing the value of First_sample
        console.log(First_sample);

        // Creating the initial plots
        BarChart(First_sample);
        BubbleChart(First_sample);
        Metadata(First_sample);
        GaugeChart(First_sample);
    });
};

// Bar Chart Function
function BarChart(sample) {

    // Retrieving data
    d3.json(url).then((data) => {

        let sample_data = data.samples;

        // Filter based on the sample value
        let S_value = sample_data.filter(result => result.id == sample);

        // First index
        let First_S_data = S_value[0];

        // Getting the sample values, otu_ids, and lables
        let sample_values = First_S_data.sample_values;
        let otu_ids = First_S_data.otu_ids;
        let otu_labels = First_S_data.otu_labels;

        // Logging the data to the console
        console.log(sample_values,otu_ids,otu_labels);

        // Top 10 data in descending order
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Bar Chart Trace
        let bar_trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: 'bar',
            orientation: 'h' 
        };

        // Bar Chart Layout
        let layout = {
            title: "Top 10 OTUs Found"
        };

        // Plotting Bar Chart
        Plotly.newPlot("bar", [bar_trace], layout)
    });
};

// Bubble Chart Function
function BubbleChart(sample) {

    // Retrieving data
    d3.json(url).then((data) => {
     
        let sample_data = data.samples;

        // Filter based on the sample value
        let S_value = sample_data.filter(result => result.id == sample);

        // First index
        let First_S_data = S_value[0];

        // Getting the sample values, otu_ids, and lables
        let sample_values = First_S_data.sample_values;
        let otu_ids = First_S_data.otu_ids;
        let otu_labels = First_S_data.otu_labels;

        // Logging the data to the console
        console.log(sample_values,otu_ids,otu_labels);
        
        // Bubble Chart Trace
        let bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Bubble Chart Layout
        let layout = {
            title: "Bacteria Count Per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Plotting Bubble Chart
        Plotly.newPlot("bubble", [bubble_trace], layout)
    });
};

// Metadata Function
function Metadata(sample) {

    // Retrieving data
    d3.json(url).then((data) => {

        let metadata = data.metadata;

        // Filter based on the sample value
        let S_value = metadata.filter(result => result.id == sample);

        console.log(S_value)

        // First index
        let First_S_data = S_value[0];

        // Clearing the metadata content for user input
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the card
        Object.entries(First_S_data).forEach(([key,value]) => {

            // Print the individual key/value pairs as they are being appended to the metadata card
            console.log(key,value);

            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        });
    });

};

// Initialize function
init();