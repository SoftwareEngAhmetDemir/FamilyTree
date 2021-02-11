const treeData = {
    "name": "Eve",
    "value": 15,
    "type": "black",
    "level": "yellow",
    "children": [
       {
          "name": "Cain",
          "value": 10,
          "type": "grey",
          "level": "red"
       },
       {
          "name": "Seth",
          "value": 10,
          "type": "grey",
          "level": "red",
          "children": [
             {
                "name": "Enos",
                "value": 7.5,
                "type": "grey",
                "level": "purple"
             },
             {
                "name": "Noam",
                "value": 7.5,
                "type": "grey",
                "level": "purple"
             }
          ]
       },
       {
          "name": "Abel",
          "value": 10,
          "type": "grey",
          "level": "blue"
       },
       {
          "name": "Awan",
          "value": 10,
          "type": "grey",
          "level": "green",
          "children": [
             {
                "name": "Enoch",
                "value": 7.5,
                "type": "grey",
                "level": "orange"
             }
          ]
       },
       {
          "name": "Azura",
          "value": 10,
          "type": "grey",
          "level": "green"
       }
    ]
 };

// /////////////////////////////////////////////////////

 // Declares a tree layout and assigns the size
const treemap = d3.tree().size([500, 500]);
let nodes = d3.hierarchy(treeData, d => d.children);
nodes = treemap(nodes);

const g = d3.select('svg').append('g');
//Add Nodes

const node = g.selectAll(".node")
      .data(nodes.descendants())
   .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal"
         : " node--leaf"))
      .attr("transform", d => "translate(" + d.y + "," +
         d.x + ")");




// Linking The nodes

         const link = g.selectAll(".link")
         .data(nodes.descendants().slice(1))
         .enter().append("path")
         .attr("class", "link")
         .style("stroke", d => d.data.level)
         .attr("d", d => {
             return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
         });


// Adding the Circle to Each Node

         node.append("circle")
   .attr("r", d => d.data.value)
   .style("stroke", d => d.data.type)
   .style("fill", d => d.data.level);


//    Adding Node Labels
   
   node.append("text")
   .attr("dy", ".35em")
   .attr("x", d => d.children ? (d.data.value + 5) * -1 :
      d.data.value + 5)
    
   .attr("y", d => d.children && d.depth !== 0 ?
      -(d.data.value + 5) : d)
   .style("text-anchor", d => d.children ? "end" : "start")
   .text(d => d.data.name);

