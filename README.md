# Module 14 Challenge

This project had use JavaScrpit, Plotly and Json to display the resuls of experement document you belly button bacteria.  The bar and bubble charts, displayes the OTU ID's (Operational taxonomic unit) of earch participant by ID. 


# The Data
The metadate consited of
	- id
	- ethnicity
	- gender
	- age
	- location
	- bbtype
	- wfreq

Names held ID's used in meta
Samples held
	- id
	- otu_ids
	- sample_values
	- oto_lables

# Presenting The Data
The challenge required two graphs - bar and bubble graphs. I attempted the gauge graph but couldn't get it off the ground. 

The bar chart presents data for each participant by ID and the top 10 OTU on the participant.  Some OTUs were more prevalent than others which I assume to be the case since sample_values on the JSON file were not defined. 

The bubble charts show all OTUs regardless of the bacteria's prevalence on the participant. 