# belly-button-challenge
Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Tools Used:
D3.js for data manipulation and binding to DOM elements.
Plotly.js for creating interactive visualizations (bar chart, bubble chart, demographics).
Bootstrap for responsive design.

Visualizations:
Horizontal Bar Chart: Displays the top 10 OTUs found in the individual selected from the dropdown menu.
Values: sample_values
Labels: otu_ids
Hovertext: otu_labels

Bubble Chart: Displays the type of OTUs in each sample.
X values: otu_ids
Y values: sample_values
Marker size: sample_values
Text values: otu_labels

Demographic Information Panel: Shows the selected individual's demographic information as key-value pairs.
Gauge Chart: Plots the weekly washing frequency of the individual.

References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.
