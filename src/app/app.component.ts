import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import * as CanvasJS from './canvasjs.min';
//declare var $: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	
  ngOnInit() {
    window.onload = function() {
        var dataPoints = [];
            
        function getDataPointsFromCSV(csv) {
			var points = [];
            var dataPoints= []; 
			var csvLines =[]; 
            csvLines = csv.split(/[\r?\n|\r|\n]+/);         
	
            for (var i = 0; i < csvLines.length; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    dataPoints.push({ 
                        x: parseFloat(points[0]), 
                        y: parseFloat(points[1]) 		
                    });
                }
            
            return dataPoints;
        }
 
		
	$.get("../assets/variables.csv", function(data) {
	    var chart = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: true,
		    title: {
		         text: "The BlackBox Kenya",
		    },
            axisX:{
                title:"Time in Seconds",
            },
            axisY:{
                title:"AIR SPEED",
            },
            legend:{
                cursor: "pointer",
                fontSize: 16,
            },
            toolTip:{
	        	shared: true
	        },
		    data: [{
		         type: "line",
		         dataPoints: getDataPointsFromCSV(data)
		      },
              {
		         type: "line",
		         dataPoints: getDataPointsFromCSV(data)
		      },
            ]
	     });
		
	      chart.render();

	});
  }
  
}}
