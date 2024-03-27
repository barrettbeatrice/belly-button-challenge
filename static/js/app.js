// File: app.js
// Author: Barrett Fudge
// Description: This script contains functions for handling user interactions on the webpage.
// Date: March 2024

//JavaScript code starts here
//Use d3 library to get json samples from dataset on url

// store source URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// fetch the JSON data and log it
d3.json(url).then(function(data){
    console.log(data);
}); 

//Use init function (this adds functionality with multiple visualizations)
//Populates the dropdown menu with sample names
//Initializes the default sample for the bar chart and bubble chart.
//Calls functions to create the bar chart and bubble chart with the default sample.

function init(){
    //create the dropdown list variable for all sample id's in the dataset by appending each ID as a new value
    let dropdown = d3.select("#selDataset");
    //access sample data using d3
    d3.json(url).then((data) => {
    //gather the sample ids from the names list in data and populate the dropdown
    let sample_ids = data.names;
    console.log(sample_ids);
        for (id of sample_ids){
            dropdown.append("option").attr("value", id).text(id);
        };
    //store the first sample for display initialization
    let first_entry = sample_ids[0];
    console.log(first_entry);
    
    //have the init() function call the graph generating functions with the first entry 
    //this starts with id #940
    makeBar(first_entry);
    makeBubble(first_entry);
    makeDemographics(first_entry);
    });
};

//create a function to populate the horizontal bar chart graph
function makeBar(sample){

    //access the sample data for populating the bar chart
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //apply a filter that matches based on sample id
        let results = sample_data.filter(id => id.id == sample);
        //access and store the first entry in results filter
        let first_result = results[0];
        console.log(first_result);
        //store the first 10 results to display in the bar chart
        let sample_values = first_result.sample_values.slice(0,10);
        let otu_ids = first_result.otu_ids.slice(0,10);
        let otu_labels = first_result.otu_labels.slice(0,10);
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create the trace for bar chart
        let bar_trace = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_labels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let layout = {title: "Top Ten OTUs"};
        Plotly.newPlot("bar", [bar_trace], layout);
    });
};

function makeBubble(sample){
    //access the sample data for populating the bubble chart
    //follow same general rubric for bar chart function above
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        //apply a filter that matches based on sample id
        let results = sample_data.filter(id => id.id == sample);
        //access and store the first entry in results filter
        let first_result = results[0];
        console.log(first_result);
        //store the results to display in the bubble chart

        let sample_values = first_result.sample_values;
        let otu_ids = first_result.otu_ids;
        let otu_labels = first_result.otu_labels;
        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //create the bubble chart chase
        let bubble_trace = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_labels.reverse(),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        };

        let layout = {
            title: "Bacteria Count for each Sample ID",
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Bacteria'}
        };
        Plotly.newPlot("bubble", [bubble_trace], layout); //bubble is endpoint
    });
};

//create the demographic info function
//this is the "metadata"
function makeDemographics(sample){
    //access the sample data for populating the demographics section
    d3.json(url).then((data) => {
      let demographic_info = data.metadata;
      //apply a filter that matches based on sample id
      let results = demographic_info.filter(id => id.id == sample);
      //store the first result to display in demographic info
      let first_result = results[0];
      console.log(first_result);
    
    
      //resets text to a blank string
      d3.select('#sample-metadata').text('');
      //iterate over each key,value pair
      Object.entries(first_result).forEach(([key,value]) => {
        console.log(key,value);

        // Select the demographic info HTML section with D3 and append new key-value pair
        let demographicElement = d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
            
        // Adjust the font size of the appended text
        demographicElement.style('font-size', '12px'); // Adjust the font size as needed
      });
    });
}

// //define the function when the dropdown detects a change
function optionChanged(value){
    //log the value for debug
    console.log(value);
    makeBar(value);
    makeBubble(value);
    makeDemographics(value);
};

init();