const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Array to hold subject data
let subject_array = [];

//The promoise 
d3.json(url).then((data) => {
    samples = data.samples;
    metadata = data.metadata;
       
//Iterate data
    for (i = 0; i < samples.length; i++){
        subject_array.push(samples[i]["id"]);
    };

// Creates bar chart and displays the results for the chart
    function graphs (subjects) {
        subjects = d3.event.target.value; 
        points = subject_array.indexOf(subjects);
        subject_data = samples[points]; 

        let bar_array_data = subject_data.otu_ids.map((otu_id, idx) => [idx, otu_id, subject_data.otu_labels[idx], subject_data.sample_values[idx]]);
        bar_array_data.sort((a,b) => b[3] - a[3]); 
        bar_top_ten = bar_array_data.slice(0,10); 

        x_values_bar = bar_top_ten.map((x) => `OTU: ${(x[1])}`);
        y_values_bar = bar_top_ten.map((x) => x[3]);
        text_bubble_bar = bar_top_ten.map((x) => x[2]);
    
        let bar_graph = {
            x: y_values_bar, 
            y: x_values_bar,
            orientation: 'h',
            type: "bar",
            text_bubble_bar: text_bubble_bar
        };

        let bar_layout = {
            title: `Subject ID ${subjects} - Top OTU's`,};
        Plotly.newPlot("bar", [bar_graph], bar_layout);

        let bubble_array_data = subject_data.otu_ids.map((otu_id, idx) => [idx, otu_id, subject_data.otu_labels[idx], subject_data.sample_values[idx]]);
        bubble_data = bubble_array_data.sort((a,b) => b[3] - a[3]); 
        
        bubble_x_values = bubble_data.map((x) => x[1]); 
        bubble_y_values = bubble_data.map((x) => x[3]);
        text_bubble = bubble_data.map((x) => x[2]);
        
        let bubble_graph = {
            x: bubble_x_values, 
            y: bubble_y_values,
            mode: "markers",
            marker: {
                size: bubble_y_values,
                color: bubble_x_values
            }, 
            text: text_bubble
        };
        let bubble_layout = {
            title: `Sample Sizes from ID ${subjects}`,
            
        };
        Plotly.newPlot("bubble", [bubble_graph], bubble_layout);
  

  // the gauge does not work      
        wfreq = metadata[points];
 
        let gauge_graph = {
            type: "pie",
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
            colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
                },
            labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
            hoverinfo: "label"
                };
        let gauge_layout = {
            title: `MEH! NO WORKIE ${subjects}`,
            
        };
        Plotly.newPlot("gauge", [gauge_graph], gauge_layout); 
      };
    


//Adds info the Demographics table
    function demographics_table (subjects) {
        subjects = d3.event.target.value; 
        points = subject_array.indexOf(subjects); 
        demographics = metadata[points]; 
        d3.select("#sample-metadata")
            .html(`<ul> 
                    <li>id: ${demographics.id}</li>
                    <li>ethnicity: ${demographics.ethnicity}</li>
                    <li>gender: ${demographics.gender}</li>
                    <li>age: ${demographics.age}</li>
                    <li>location: ${demographics.location}</li>
                    <li>bbtype: ${demographics.bbtype}</li>
                        <li>wfreq: ${demographics.wfreq}</li>           
                   </ul>`);
    };

//Subject ID's added to the dropdown. 
    let dropdown_menu = d3.select("#selDataset");
    for (i = 0; i < subject_array.length; i++){
        d3.select("#selDataset").append("option").text(subject_array[i]);
    };

// Changes charts when a new ID is selected.  
    function allCharts(){
        graphs();
        demographics_table();
    };

    dropdown_menu.on("change", allCharts);
});