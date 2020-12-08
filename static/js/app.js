
function plotCharts(id) {
    // Use D3 to read the JSON file
    d3.json("static/js/samples.json").then((importedData) => {
        console.log(importedData);

        // Find top 10 values from dataset
        let sample_values = importedData.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sample_values);

        let otu_ids = importedData.samples[0].otu_ids.slice(0, 10).reverse();
        console.log(otu_ids);

        let otu_labels = importedData.samples[0].otu_labels.slice(0, 10).reverse();
        console.log(otu_labels);

        let otu_id = otu_ids.map(data => "OTU " + data);
        console.log(`OTU IDS: ${otu_id}`)

        // create Trace1 for the bar chart
        let trace1 = {
            x: sample_values,
            y: otu_id,
            type: 'bar',
            orientation: "h"
        };

        let data_bar = [trace1];

        let layout = {
            title: "Top 10 OTU's",
            margin: {
                l: 75,
                r: 75,
                t: 75,
                b: 75
            }
        };

        // Plot the bar chart
        Plotly.newPlot("bar", data_bar, layout);

        // Create trace for the bubble chart
        let trace2 = {
            x: importedData.samples[0].otu_ids,
            y: importedData.samples[0].sample_values,
            mode: 'markers',
            marker: {
                size: importedData.samples[0].sample_values,
                color: importedData.samples[0].otu_ids
            },
            text: importedData.samples[0].otu_labels
        };

        console.log(`otu ids - color ${otu_ids}`)

        let data_bubble = [trace2];

        let layout2 = {
            title: 'OTU ID',
            height: 600,
            width: 1200
        }

        Plotly.newPlot("bubble", data_bubble, layout2);

    });
};

// Plot demographic data based on the selected id
function plotDemographicData(id) {
    d3.json("static/js/samples.json").then((importedData) => {
        let metadata = importedData.metadata;

        // Select metadata based on the id
        let metadata_values = metadata.filter(mdata => mdata.id.toString() === id)[0];
        let dInfo = d3.select("#sample-metadata");

        // Clear the metadata information
        dInfo.html("");

        Object.entries(metadata_values).forEach((key) => {
            dInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
        });
    });

}

// Call optionChanged function to change demographic data based on ID
function optionChanged(newID) {

    plotCharts(newID);
    plotDemographicData(newID);
}


function init() {
    // selection from dropdown box
    let selection = d3.select("#selDataset");

    // Get data from sample file
    d3.json("static/js/samples.json").then((data) => {
        console.log(`Data: ${data}`)

        // Select data based on value in dropdown box
        data.names.forEach(function (name_value) {
            selection.append("option").text(name_value).property("value");
        });

        // Call functions
        let initialValue = data.names[0];
        plotCharts(initialValue);
        plotDemographicData(initialValue);
    });

}





init();

// plotCharts()
