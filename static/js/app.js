

// Use D3 to read the JSON file
d3.json("static/js/samples.json").then((importedData) => {
    console.log(importedData);

    // Find top 10 values from dataset
    let sample_values = importedData.samples[0].sample_values.slice(0,10).reverse();
    console.log(sample_values);

    let otu_ids = importedData.samples[0].otu_ids.slice(0,10).reverse();
    console.log(otu_ids);

    let otu_labels = importedData.samples[0].otu_labels.slice(0,10).reverse();
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
            color: ['rgb(255, 0, 102)', 'rgb(153, 255, 102)', 'rgb(0, 153, 255)', 'rgb(255, 80, 80)', 'rgb(102, 153, 0)','rgb(0, 204, 255)', 'rgb(0 ,0, 255)', 'rgb(153, 0, 255)', 'rgb(255, 80, 80)', 'rgb(0, 153, 0)'],
        }
    }

    let data_bubble = [trace2];

    let layout2 = {
        title: 'OTU ID',
        height: 600,
        width: 1200
    }

    Plotly.newPlot("bubble", data_bubble, layout2);

});