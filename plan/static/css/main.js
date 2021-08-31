// Chart Default Variable
var myChart = [];
var selectedChart = [];
var all_titles = [];
var all_data = [];
var all_graphids = [];
var all_id = [];
var globalId;

//Multiple Graph update values
var uTitle;
var u_axisTitle;
var u_yaxisTitle;
var u_Fill;
var u_cardSize;
var u_backgroundColor = [];
var u_borderColor;
var u_hoverBorderColor = [];
var u_borderWidth = [];
var u_hoverBorderWidth = [];
var u_Tension;

var u_data_arr = [];
// Line Graph update values
var u_lineColor;

// Radar Graph update values
var u_labelTitle;
var u_pointColor = [];
var u_hoverPointColor = [];

//Donut Grpah update Values
var u_type = [];
var u_hoverOffset;

var endpoint = "/account/api/chart/data/barGraph";
var lineEndpoint = "/account/api/chart/data/lineGraph";
var radarendpoint = "/account/api/chart/data/radarGraph";
var doughnutendpoint = "/account/api/chart/data/doughnutGraph";
var saveEndpoint = "/account/api/chart/savegraph";
var deleteEndpoint = "/account/api/chart/Delete";
//******************************//
// Other Variables

var graphid = 0;
var dataClone = [];
var dict = {};
var key;
var updateNum = 0;
var grabLabels = [];

// Cookie Variables
var backColor = [];
var hoverborderColor = [];
var lineColor = [];
var borderColor = [];
var pointbackgroundColor = [];
var pointhoverbackColor = [];

window.addEventListener("load", (event) => {
  console.log;

  for (var i = 0; i < localStorage.length; i++) {
    var parsedData = parse(localStorage.getItem(localStorage.key(i)));
    addChart(parsedData);
  }
});

function updateChart(id) {
  selectedChart = myChart[id];

  var data = dict[id];

  console.log(data);

  for (let i = 0; i < data.default_data.length; i++) {
    u_data_arr[i] = data.default_data[i];
  }

  if (data.type == "bar") {
    uTitle = $("#Title-input_" + id).val();
    u_xaxisTitle = $("#xaxis-title_" + id).val();
    u_cardSize = $(
      "input[name=sizeButton_" + id + "]:checked",
      "#Graphsize_" + id
    ).val();
    u_yaxisTitle = $("#yaxis-title_" + id).val();
    u_borderwidth = parseInt($("#borderwidth_" + id).val());
    u_hoverborderwidth = parseInt($("#hoverborderWidth_" + id).val());
    u_backgroundColor = getNewbackgroundColors(dict[id]);
    u_borderColor = getNewborderColors(dict[id]);
    u_hoverBorderColor = getNewhoverborderColors(dict[id]);

    dict[id].title = uTitle;
    dict[id].xaxis_title = u_xaxisTitle;
    dict[id].yaxis_title = u_yaxisTitle;
    dict[id].hoverBorderColor = u_hoverBorderColor;
    dict[id].backgroundColor = u_backgroundColor;
    dict[id].borderColor = u_borderColor;
    dict[id].borderwidth = u_borderwidth;
    dict[id].hoverborderwidth = u_hoverborderwidth;

    selectedChart.options.title.text = uTitle;
    selectedChart.data.datasets[0].data = u_data_arr;
    selectedChart.data.datasets[0].backgroundColor = u_backgroundColor;
    selectedChart.data.datasets[0].hoverBorderColor = u_hoverBorderColor;
    selectedChart.data.datasets[0].borderColor = u_borderColor;
    selectedChart.data.datasets[0].hoverBorderWidth = u_hoverborderwidth;
    selectedChart.data.datasets[0].borderWidth = u_borderwidth;
    selectedChart.options.scales.xAxes[0].scaleLabel.labelString = u_xaxisTitle;
    selectedChart.options.scales.yAxes[0].scaleLabel.labelString = u_yaxisTitle;

    //col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3

    if (u_cardSize == "col-sm") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
    } else if (u_cardSize == "col-md") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
    } else if (u_cardSize == "col-lg") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
    }

    selectedChart.update();
  } else if (data.type == "line") {
    uTitle = $("#Title-input_" + id).val();
    u_xaxisTitle = $("#xaxis-title_" + id).val();
    u_cardSize = $(
      "input[name=sizeButton_" + id + "]:checked",
      "#Graphsize_" + id
    ).val();
    u_yaxisTitle = $("#yaxis-title_" + id).val();
    u_borderwidth = parseInt($("#borderwidth_" + id).val());
    u_hoverborderwidth = parseInt($("#hoverborderWidth_" + id).val());
    u_backgroundColor = getNewbackgroundColors(dict[id]);
    u_borderColor = getlineGraphColor(dict[id]);
    u_hoverBorderColor = getNewhoverborderColors(dict[id]);
    u_Tension = parseInt($("#tension_" + id).val());

    dict[id].title = uTitle;
    dict[id].xaxis_title = u_xaxisTitle;
    dict[id].yaxis_title = u_yaxisTitle;
    dict[id].hoverBorderColor = u_hoverBorderColor;
    dict[id].backgroundColor = u_backgroundColor;
    dict[id].borderColor = u_borderColor;
    dict[id].borderwidth = u_borderwidth;
    dict[id].hoverborderwidth = u_hoverborderwidth;
    dict[id].line_tension = u_Tension;
    dict[id].fill_color = u_borderColor;

    selectedChart.options.title.text = uTitle;
    selectedChart.data.datasets[0].data = u_data_arr;
    selectedChart.data.datasets[0].pointBackgroundColor = u_backgroundColor;
    selectedChart.data.datasets[0].hoverBorderColor = u_hoverBorderColor;
    selectedChart.data.datasets[0].borderColor = u_borderColor;
    selectedChart.data.datasets[0].hoverBorderWidth = u_hoverborderwidth;
    selectedChart.data.datasets[0].borderWidth = u_borderwidth;
    selectedChart.options.scales.xAxes[0].scaleLabel.labelString = u_xaxisTitle;
    selectedChart.options.scales.yAxes[0].scaleLabel.labelString = u_yaxisTitle;
    selectedChart.data.datasets[0].lineTension = u_Tension;
    selectedChart.data.datasets[0].backgroundColor = u_borderColor;

    if ($("#fill_" + id).is(":checked")) {
      selectedChart.data.datasets[0].fill = true;
      dict[id].line_fill = true;
    } else {
      selectedChart.data.datasets[0].fill = false;
      dict[id].line_fill = false;
    }

    if (u_cardSize == "col-sm") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
    } else if (u_cardSize == "col-md") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
    } else if (u_cardSize == "col-lg") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
    }

    selectedChart.update();
  } else if (data.type == "radar") {
    uTitle = $("#Title-input_" + id).val();
    u_labelTitle = $("#label-title_" + id).val();
    u_cardSize = $(
      "input[name=sizeButton_" + id + "]:checked",
      "#Graphsize_" + id
    ).val();
    u_backgroundColor = getNewbackgroundColors(dict[id]);
    u_borderColor = getNewborderColors(dict[id]);
    u_pointColor = getNewpointColor(dict[id]);
    u_hoverPointColor = getNewhoverpointColor(dict[id]);

    dict[id].title = uTitle;
    dict[id].label_title = u_labelTitle;
    dict[id].backgroundColor = u_backgroundColor;
    dict[id].borderColor = u_borderColor;
    dict[id].pointbackgroundColor = u_pointColor;
    dict[id].pointhoverborderColor = u_hoverPointColor;

    if ($("#fill_" + id).is(":checked")) {
      selectedChart.data.datasets[0].fill = true;
      dict[id].line_fill = true;
    } else {
      selectedChart.data.datasets[0].fill = false;
      dict[id].line_fill = false;
    }

    selectedChart.data.datasets[0].label = u_labelTitle;
    selectedChart.options.title.text = uTitle;
    selectedChart.data.datasets[0].data = u_data_arr;
    selectedChart.data.datasets[0].pointHoverBorderColor = u_hoverPointColor;
    selectedChart.data.datasets[0].pointBackgroundColor = u_pointColor;
    selectedChart.data.datasets[0].borderColor = u_borderColor;
    selectedChart.data.datasets[0].backgroundColor = u_backgroundColor;

    if (u_cardSize == "col-sm") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
    } else if (u_cardSize == "col-md") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
    } else if (u_cardSize == "col-lg") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
    }

    selectedChart.update();
  } else if (data.type == "doughnut" || data.type == "pie") {
    var typeTemp = dict[id].type;
    u_type = $(
      "input[name=typebutton_" + id + "]:checked",
      "#Graphtype_" + id
    ).val();
    uTitle = $("#Title-input_" + id).val();
    u_type = $(
      "input[name=typebutton_" + id + "]:checked",
      "#Graphtype_" + id
    ).val();
    u_cardSize = $(
      "input[name=sizeButton_" + id + "]:checked",
      "#Graphsize_" + id
    ).val();
    u_borderwidth = parseInt($("#borderwidth_" + id).val());
    u_hoverOffset = parseInt($("#hoverOffset_" + id).val());
    u_backgroundColor = getNewbackgroundColors(dict[id]);

    dict[id].title = uTitle;
    dict[id].borderWidth = u_borderWidth;
    dict[id].hoverOffset = u_hoverOffset;
    dict[id].backgroundColor = u_backgroundColor;
    dict[id].type = u_type;

    selectedChart.options.title.text = uTitle;
    selectedChart.data.datasets[0].hoverOffset = u_hoverOffset;
    selectedChart.data.datasets[0].data = u_data_arr;
    selectedChart.data.datasets[0].backgroundColor = u_backgroundColor;
    selectedChart.data.datasets[0].borderWidth = u_borderWidth;
    selectedChart.type = u_type;

    if (u_type != typeTemp) {
      updateChartType(selectedChart, id, u_type);
    }

    if (u_cardSize == "col-sm") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
    } else if (u_cardSize == "col-md") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
    } else if (u_cardSize == "col-lg") {
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
      );
      $("#graph_" + id).removeClass(
        "col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-3"
      );
      $("#graph_" + id).addClass(
        "col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 col-xxl-6"
      );
    }
    selectedChart.update();
  }

  $("#updateChart_" + id).modal("hide");
  $(".model-backdrop").hide();
  setLocalStorage(data);
}

function updateChartType(selectedChart, id, type) {
  const options = {
    elements: {
      line: {
        borderRadius: dict[id].borderRadius,
      },
    },
    title: {
      display: true,
      text: dict[id].title,
    },
  };
  // Since you can't update chart type directly in Charts JS you must destroy original chart and rebuild
  var ctx = document.getElementById("chart_" + id).getContext("2d");
  var tempdata = selectedChart.data;

  console.log(selectedChart);
  console.log(myChart[id]);
  myChart[id].destroy();

  myChart[id] = new Chart(ctx, {
    type: type,
    data: tempdata,
    options: options,
  });

  setLocalStorage(dict[id]);
}

function updateChartModal(id) {
  $("#updateChart_" + id).modal("show");
}

function removeChart(id) {
  $("#graph_" + id).remove();
  $("#updateChart_" + id).remove();

  localStorage.removeItem(dict[id].graphid);
  delete dict[id];
  delete myChart[id];
}

function deleteChart() {
  var jsonData = {};
  jsonData["id"] = globalId;

  /*var formData = new FormData();

  formData.append("graphid", dict[id].graphid);
  formData.append("data", JSON.stringify((dict[id])));
  console.log(dict[id]);
  for (var value of formData.values()) {
    console.log(value);
  }*/

  var ourTestData = JSON.stringify(jsonData);
  console.log(ourTestData);

  $.ajax({
    url: deleteEndpoint,
    method: "POST",
    data: ourTestData, //<-----this should be an object.
    headers: { "X-CSRFToken": getCookie("csrftoken") },
    contentType: "application/json",
    processData: false,
    cache: false,
    success: function (result) {
      getGraphs();
      $("#deleteModal").modal("hide");
    },

    error: function (result) {},
  });
}

function deleteChartMenu(id, title) {
  console.log(id);
  globalId = id;

  $("deleteModal").modal("show");
  document.getElementById("graphName").innerHTML = title;
}

function setYaxis(num, id) {
  console.log(num);
  selectedChart = myChart[id];
  var labelValue = $("#yvalue_" + id);
  console.log(labelValue);
  dict[id].default_data[num] = parseInt(labelValue.val());
  selectedChart.data.datasets[0].data[num] = parseInt(labelValue.val());
  setLocalStorage(dict[id]);
  selectedChart.update();
}

function addLabel(data, id) {
  selectedChart = myChart[id];
  var labelValue = $("#labelValue_" + id);

  selectedChart.data.labels.push(labelValue.val());
  dict[id].labels.push(labelValue.val());
  selectedChart.update();
  var html_to_append = updateLabel(dict[id]);
  $("#chartType_" + id).empty();
  $("#chartType_" + id).append(
    `

    ${html_to_append};
    `
  );
}

function addCharts(titles, data, graphid, ids) {
  console.log(ids.length);

  var html_to_append = "";

  if (titles.length === 0) {
    html_to_append = `<li class="list-group-item list-group-item-action"> You have no Charts Saved.</li>`;
  } else {
    for (let j = 0; j < titles.length; j++) {
      html_to_append += `
  <div class="container">
  <div class="row ">
    <div class="col-10 list-group-item chartItems    ">
      <li onclick='openChart(${JSON.stringify(data[j])},\"${
        graphid[j]
      }\")' class="">${titles[j]}</li>
    </div>
    <div class="col-2 times center   " >
      <i data-bs-toggle="modal" data-bs-target="#deleteModal" onclick='deleteChartMenu(\"${
        ids[j]
      }\",\"${titles[j]}\")' class="fas fa-times "></i>
    </div>
  </div>
  </div>`;
    }
  }

  $("#chartsList").empty();
  $("#chartsList").append(
    `

${html_to_append}

`
  );
}

function openChart(data, graphid) {
  if (graphid in dict) {
    var x = document.getElementById("bottommsg");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  } else {
    parsedData = JSON.parse(data);
    type = parsedData.type;

    dict[graphid] = parsedData;
    console.log(dict[graphid]);

    addChart(parsedData);
  }
  //updateChart(graphid);
}

function removeData(num, id) {
  selectedChart = myChart[id];

  dict[id].labels.splice(num, 1);
  dict[id].default_data.splice(num, 1);

  html_to_append = updateLabel(dict[id]);

  selectedChart.data.labels.splice(num, 1);
  selectedChart.data.datasets[0].data.splice(num, 1);

  selectedChart.update();
  $("#chartType_" + id).empty();
  $("#chartType_" + id).append(
    `
     ${html_to_append}
     `
  );

  // console.log(dict);
}

function updateLabel(data) {
  var html_to_append = "";
  for (let j = 0; j < data.labels.length; j++) {
    html_to_append += `<option value="${j}">${data.labels[j]}</option>`;
  }

  return html_to_append;
}

function getgraphColor(id) {
  var html_to_append = "";
  console.log(dict[id]);

  $("#graphColor_" + id).empty();

  if (dict[id].type == "bar") {
    for (let j = 0; j < dict[id].labels.length; j++) {
      html_to_append += `
<ul class="list-group backgroundTransparency" >
  <li class="list-group-item colorLabel" value="${j}">
  <div class="row">
      <div class="col-2">
        <div class="colorLabelconfig" row >${dict[id].labels[j]}</div>
      </div>
        <div class="col-3">
          <div class="colorSelector">
            <input class="hoverborder_${dict[id].graphid}_${j} specSize w-100 row" value=${dict[id].hoverBorderColor[j]}></input>
          </div>
        </div>
        <div class="col-3">
          <div class="colorSelector">
            <input class="background_${dict[id].graphid}_${j} specSize w-100 row" value=${dict[id].backgroundColor[j]}></input>
          </div>
        </div>
        <div class="col-3">
          <div class=" colorSelector"> 
            <input class="border_${dict[id].graphid}_${j} specSize w-100 row" value=${dict[id].borderColor[j]}></input>
          </div>
        </div>
    </div>
  </li>
</ul>
  `;

      $(".configLeft").removeClass("col-8 offset-2 col-sm-5 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
      $(".configRight").removeClass("col-9 offset-2 col-sm-7 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
      $(".configRight").addClass("col-9 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
      $(".configLeft").addClass("col-8 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    }
  } else if (dict[id].type == "line") {
    for (let j = 0; j < dict[id].labels.length; j++) {
      html_to_append += `
 <ul class="list-group backgroundTransparency" >
   <li class="list-group-item colorLabel" value="${j}">
   <div class="row">
       <div class="col-4">
         <div class=" colorLabelconfig" row >${dict[id].labels[j]}</div>
       </div>
         <div class="col-4">
           <div class="colorSelector">
             <input class="hoverborder_${dict[id].graphid}_${j} specSize row" value=${dict[id].hoverBorderColor[j]}></input>
           </div>
         </div>
         <div class="col-4">
           <div class="colorSelector">
             <input class="background_${dict[id].graphid}_${j} specSize  row" value=${dict[id].backgroundColor[j]}></input>
           </div>
         </div>
     </div>
   </li>
 </ul>

   `;
    }

    $(".configLeft").removeClass("col-8 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configRight").removeClass("col-9 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
    $(".configRight").addClass("col-9 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configLeft").addClass("col-8 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");

  } else if (dict[id].type == "radar") {
    for (let j = 0; j < dict[id].labels.length; j++) {
      html_to_append += `
 <ul class="list-group backgroundTransparency" >
   <li class="list-group-item colorLabel" value="${j}">
   <div class="row">
       <div class="col-4">
         <div class=" colorLabelconfig" row >${dict[id].labels[j]}</div>
       </div>
         <div class="col-4">
           <div class="colorSelector">
             <input class="pointbackgroundColor_${dict[id].graphid}_${j} specSize row" value=${dict[id].pointbackgroundColor[j]}></input>
           </div>
         </div>
         <div class="col-4">
           <div class="colorSelector">
             <input class="pointHoverbackground_${dict[id].graphid}_${j} specSize  row" value=${dict[id].pointhoverborderColor[j]}></input>
           </div>
         </div>
     </div>
   </li>
 </ul>

   `;
    }

    $(".configLeft").removeClass("col-8 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configRight").removeClass("col-9 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
    $(".configRight").addClass("col-9 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configLeft").addClass("col-8 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");


  } else if (dict[id].type == "doughnut" || dict[id].type == "pie") {
    for (let j = 0; j < dict[id].labels.length; j++) {
      html_to_append += `
   <ul class="list-group backgroundTransparency" >
     <li class="list-group-item colorLabel" value="${j}">
     <div class="row">
         <div class="col-4">
           <div class=" colorLabelconfig" row >${dict[id].labels[j]}</div>
         </div>
           <div class="col-4">
             <div class="colorSelector">
               <input class="background_${dict[id].graphid}_${j} specSize row" value=${dict[id].backgroundColor[j]}></input>
             </div>
           </div>
       </div>
     </li>
   </ul>
  
     `;
    }

    $(".configLeft").removeClass("col-8 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configRight").removeClass("col-9 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
    $(".configRight").addClass("col-9 offset-2 col-sm-5 offset-sm-0 col-md-5 col-lg-5 col-xl-5 col-xxl-5");
    $(".configLeft").addClass("col-8 offset-2 col-sm-7 offset-sm-0 col-md-7 col-lg-7 col-xl-7 col-xxl-7");
  }

  $("#graphColor_" + id).append(html_to_append);
  addColors(id);
}

function addColors(id) {
  for (let i = 0; i < $("input[class^=background_]").length; i++) {
    createCookie("backgroundCookie" + i, dict[id].backgroundColor[i], 1);
    backColor[i] = getCookie("backgroundCookie" + i);

    $(".background_" + id + "_" + i).spectrum({
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      clickoutFiresChange: true,
      type: "color",
      color: backColor[i],
    });
  }

  for (let i = 0; i < $("input[class^=hoverborder_]").length; i++) {
    createCookie("hoverborderCookie" + i, dict[id].hoverBorderColor[i], 1);
    hoverborderColor[i] = getCookie("hoverborderCookie" + i);

    $(".hoverborder_" + id + "_" + i).spectrum({
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      clickoutFiresChange: true,
      type: "color",
      color: hoverborderColor[i],
    });
  }

  $(".line_" + id).spectrum({
    showInput: true,
    allowEmpty: true,
    showAlpha: true,
    clickoutFiresChange: true,
    type: "color",
  });

  for (let i = 0; i < $("input[class^=border_]").length; i++) {
    createCookie("borderCookie" + i, dict[id].borderColor[i], 1);
    borderColor[i] = getCookie("borderCookie" + i);

    $(".border_" + id + "_" + i).spectrum({
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      clickoutFiresChange: true,
      type: "color",
      color: borderColor[i],
    });
  }

  for (let i = 0; i < $("input[class^=pointbackgroundColor_]").length; i++) {
    createCookie(
      "pointbackgroundCookie" + i,
      dict[id].pointbackgroundColor[i],
      1
    );
    pointbackgroundColor[i] = getCookie("pointbackgroundCookie" + i);

    $(".pointbackgroundColor_" + id + "_" + i).spectrum({
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      clickoutFiresChange: true,
      type: "color",
      color: pointbackgroundColor[i],
    });
  }

  for (let i = 0; i < $("input[class^=pointHoverbackground_]").length; i++) {
    createCookie(
      "pointhoverbackCookie" + i,
      dict[id].pointhoverborderColor[i],
      1
    );
    pointhoverbackColor[i] = getCookie("pointhoverbackCoolie" + i);

    $(".pointHoverbackground_" + id + "_" + i).spectrum({
      showInput: true,
      allowEmpty: true,
      showAlpha: true,
      clickoutFiresChange: true,
      type: "color",
      color: pointhoverbackColor[i],
    });
  }
}

function getNewbackgroundColors(data) {
  var html_to_append = [];

  if (
    data.type == "bar" ||
    data.type == "line" ||
    data.type == "doughnut" ||
    data.type == "pie"
  ) {
    for (let j = 0; j < data.labels.length; j++) {
      html_to_append.push($(".background_" + data.graphid + "_" + j).val());
    }
  } else if (data.type == "radar") {
    html_to_append.push($(".background_" + data.graphid + "_" + 0).val());
  }
  return html_to_append;
}

function getNewhoverborderColors(data) {
  var html_to_append = [];
  for (let j = 0; j < data.labels.length; j++) {
    html_to_append.push($(".hoverborder_" + data.graphid + "_" + j).val());
  }

  return html_to_append;
}

function getlineGraphColor(data) {
  var html_to_append = [];

  html_to_append.push($(".line_" + data.graphid).val());

  return html_to_append;
}

function getNewpointColor(data) {
  var html_to_append = [];
  for (let j = 0; j < data.labels.length; j++) {
    html_to_append.push(
      $(".pointbackgroundColor_" + data.graphid + "_" + j).val()
    );
  }

  return html_to_append;
}

function getNewhoverpointColor(data) {
  var html_to_append = [];
  for (let j = 0; j < data.labels.length; j++) {
    html_to_append.push(
      $(".pointHoverbackground_" + data.graphid + "_" + j).val()
    );
  }

  return html_to_append;
}

function getNewborderColors(data) {
  var html_to_append = [];

  if (data.type == "bar") {
    for (let j = 0; j < data.labels.length; j++) {
      html_to_append.push($(".border_" + data.graphid + "_" + j).val());
    }
  } else if (data.type == "line" || data.type == "radar") {
    html_to_append.push($(".border_" + data.graphid + "_" + 0).val());
  }

  return html_to_append;
}

/*
function changeDataColor(data) {
  var html_to_append = getLabelList(dict[data]);
  console.log(html_to_append);

  $("#colorPicker").empty();
  $("#colorPicker").append(
    `
    <ul class="list-group">
     ${html_to_append}
     
     </ul>
     `
  );

  addColors();
}
*/

function slide(id) {
  document.getElementById("optionBox_" + id).classList.toggle("hide");
}
function angleDirection(id) {
  $("#optionButton_" + id).toggleClass("fa fa-angle-up fa fa-angle-down");
}

function sortGraphs() {
  var sortedgraphs = document.getElementById("sortable");

  Sortable.create(sortedgraphs, {
    group: "graphs",

    animation: 150,
  });

  // List with handle
}

function addChart(data) {
  var data = data;
  setLocalStorage(data);
  key = data.graphid;
  dict[key] = data;
  var html_to_append = updateLabel(data);
  $("#defaultCard").append(
    `


<div id="graph_${key}" class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 cardLayout"> 
  <div class='card_contain '>
    <div class="card cardCss " id="graph">
      <div class="card-body ">
        <button id="updatebutton_${key}"class="fas fa-ellipsis-h updateButton" style="float: right; cursor: pointer;" onclick="updateChartModal(\'${key}\'), getgraphColor(\'${key}\')"></button>
        <button id="closeButton_${key}" class="fas fa-times closeButton"  style="float: left; cursor: pointer;"onclick="removeChart(\'${key}\')"></button>
        <button id="saveButton_${key}" class="fas fa-save saveButton"  style="float: left; margin-left: 10px; cursor: pointer;"onclick="saveGraph(\'${key}\')"></button>
        <canvas class="chart" id="chart_${key}" width="400" height="300"></canvas>
          <div class="container-fluid ">
           <div id="optionBox_${key}"> 
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col-10 center"> 
                    <i class='optionText'> Enter Value: </i>
                  </div>
                </div>
                <div class="row">
                  <div class="col center">
                    <input type="text" class="optionInput" placeholder="45" id="yvalue_${key}"></input>
                  </div>
                  <div class="col-2 align-self-start textleft ">
                    <button id="setYaxis_${key}"class="fas fa-arrow-right" style=" cursor: pointer;" onclick="setYaxis($('#chartType_${key}').val(), \'${key}\' )"></button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-10 center"> 
                    <i class="optionText"> Enter Label Name: </i>
                  </div>
                </div>
                <div class="row">
                  <div class="col center">
                    <input type="text"  class="optionInput" placeholder="December" id="labelValue_${key}"></input>
                  </div>
                <div class="col-2 align-self-start textleft"> 
                  <button id="addLabel_${key}"class="fas fa-arrow-right" style=" cursor: pointer;" onclick="addLabel($('#chartType_${key}').val(), \'${key}\' )"></button>
                </div>
              </div>
              </div>
                <div class="col">
                  <div class="row">
                    <div class="col center ">   
                      <i class='optionText'> Select Label: </i>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col center">  
                      <select class="form-select selectorLabel" style="" size="4"  id="chartType_${key}">
                        ${html_to_append};
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col center deleteButtonPad "> 
                      <button id="deleteData_${key}" class="deleteButton" style=" cursor: pointer;" onclick="removeData($('#chartType_${key}').val(), \'${key}\' )">Remove</button>
                    </div>
                  </div>  
                </div>    
             </div>    
            </div>
          </div>
        </div>
      </div>
      <div id="optionPlacement">
        <button id='optionButton_${key}' class="fa fa-angle-down" onclick="slide(\'${key}\'); angleDirection(\'${key}\');"> </button>
      </div>
    </div>
  </div>
</div>
  `
  );
  createChart(key, data);
  addConfigPage(data);
  configCheck(data);
  slide(key);
  //sortGraphs();
}

function addConfigPage(data) {
  key = data.graphid;
  $("#configMenu").append(
    ` 
    
    <div class="modal fade " id="updateChart_${key}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content modelTransparency">
            <div class="modal-header headerBarStyle" >
              <div class="container ">
                <div class="row">
                  <div class="col" id="configHeaderName_${key}" >
                  

                  </div>
                </div>
              </div>
          </div>

            <div class="modal-body bodyBarStyle">
          
              <div class="row">
                <div  class="configLeft ">
                <div id="labels_${key}">

                </div>
                  <div class="row">
                    <div class="col center ">
                      <div class="btn-group  btn-group-toggle" data-toggle="buttons" id="Graphsize_${key}">
                        <label class="btn btn-secondary graphsizeStyle">
                          <input class="" type="radio" name='sizeButton_${key}' value='col-sm' autocomplete="off">Small</input>
                        </label>
                        <label class="btn btn-secondary  graphsizeStyle">
                          <input type="radio" name='sizeButton_${key}' value='col-md' autocomplete="off"checked>Medium</input>
                        </label>
                        <label class="btn btn-secondary graphsizeStyle">
                          <input type="radio" name='sizeButton_${key}' value='col-lg' autocomplete="off">Large</input>
                        </label>
                      </div> 
                    </div>
                  </div>
                 <div id="options_${key}">

                 </div>
                </div>
                <div class=" configRight ">
                  <div class="row">
                    <div class="col w-100">
                    <div id="colorTitle_${key}">

                 </div>
                    
                    </div>
                  </div>
                  <div class="row ">
                    <div class="col colorList">
                      <div id="graphColor_${key}">
                      
                      </div>
                    </div>
                  </div>
                  <div class="row ">
                    <div class="col ">
                      <div id="lineBorderconfig_${key}">
                      
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
            <div class="modal-footer footerBarStyle">
            <div class="container">
              <div class="row">
                <div class="col" style="padding-right:0;">
                  <button type="button" style="float:right;  " class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                <div class="col ">
                  <button type="button" onclick="checkrequired( \'${key}\' )"   name="Updateconfig" class="btn btn-primary">Save changes</button>
                </div>
              </div>
              </div>
            </div>
        </div>
    </div>
    </div>
</div>
`
  );
}

function checkrequired(id) {
  // check if input is bigger than 3
  var value = $("#Title-input_" + id).val();
  if (value.length == 0) {
    var x = document.getElementById("titlemsg");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  } else {
    updateChart(id);
  }
  // else form is good let it submit, of course you will
  // probably want to alert the user WHAT went wrong.
}

function configCheck(data) {
  id = data.graphid;

  if (data.type == "bar") {
    $("#configHeaderName_" + id).append(
      `  <p class="headerTitleStyle">Bar Graph Configuration</p> `
    );

    $("#colorTitle_" + id).append(
      `
  <div class = "container">
    <div class = "row">
      <div class = "col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4"> 
        <label class='optionlabel'>Hover Border Color </label>
      </div>
      <div class = "col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <label class='optionlabel'>Background Color </label>
      </div>
      <div class = "col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <label class='optionlabel'> Border Color </label>
      </div>
    </div>
  </div>
   `
    );

    $("#options_" + id).append(
      `
   <div class="row">
   <div class="col center"> 
   <label  class='optionlabel'>Border Width</label></div>
   <div class="col center"> <label  class='optionlabel'>Hover Border Width</label></div>
 </div>
   <div class="row">
   <div class="col center "> <input type="text" class="optionInput" placeholder="5" name='borderwidth' id="borderwidth_${key}"></div>
   <div class="col center "> <input type="text" class="optionInput" placeholder="4" name="hoverborderWidth" id="hoverborderWidth_${key}"></div>
 </div>
 `
    );

    $("#labels_" + id).append(
      `
  <div class="row">
  <div class="col center"> <label name="Title"  class='optionlabel'>Graph Title</label></div>
</div>
<div class="row">
  <div class="col center"> <input type="text" class="optionInput" placeholder="Hobby Tracker for January"  name="Title-input" id="Title-input_${key}" required> </div>
</div>

<div class="row">
  <div class="col center "><label  class='optionlabel'>X-axis Title</label></div>
</div>
<div class="row">
  <div class="col center">   <input type="text" class="optionInput" placeholder="Hobbies" name="xaxis-title" id="xaxis-title_${key}"> </div>
</div>
<div class="row">
  <div class="col center"> <label  class='optionlabel'>Y-axis Title</label></div>
</div>
<div class="row">
  <div class="col center "> <input type="text" class="optionInput" placeholder="# of times" name="yaxis-title" id="yaxis-title_${key}"></div>
</div>
<div class="row">
  <div class="col center">
    <label  class='optionlabel'>Graph Size:</label>
  </div>
</div>
`
    );
  } else if (data.type == "line") {
    $("#configHeaderName_" + id).append(
      `  <p class="headerTitleStyle">Line Graph Configuration</p> `
    );

    $("#colorTitle_" + id).append(
      `
     <div class = "container">
       <div class = "row">
          <div class="col">
            <label class='optionlabel  '>Hover Background Color</label>
          </div>
          <div class="col ">
            <label class='optionlabel '>Background Color</label>
          </div>
        </div>
      </div>
   `
    );

    $("#options_" + id).append(
      `
    <div class="row">
    <div class="col textright "> <label  class='optionlabel'>Border Width</label></div>
    <div class="col "> <input type="text" class="optionInput" placeholder="5" name='borderwidth' id="borderwidth_${key}"></div>
    <div class="col textright"> <label  class=' optionlabel'>Tension</label></div>
    <div class="col "> <input type="text" class="optionInput" placeholder="0.5" name="tension" id="tension_${key}"></div>
    </div>
    <div class="row">
    <div class="col textright "> <label  class='optionlabel'>Hover Border Width</label></div>
    <div class="col  "> <input type="text" class="optionInput" placeholder="4" name="hoverborderWidth" id="hoverborderWidth_${key}"></div>
    <div class="col textright "> <label  class='optionlabel'>Fill</label></div>
    <div class="col  "> 
      <label class="switch" > 
        <input type="checkbox" id="fill_${key}"> 
          <span class="slider round" class="optionInput" placeholder="000" name="fill"></span>
        </input>
      </label>
    </div>

  
  `
    );

    $("#labels_" + id).append(
      `
        <div class="row">
        <div class="col center"> <label  class='optionlabel'>Graph Title</label></div>
      </div>
      <div class="row">
        <div class="col center"> <input type="text" class="optionInput" placeholder="Hobby Tracker for January"  name="Title-input" id="Title-input_${key}"> </div>
      </div>
      <div class="row">
        <div class="col center "><label  class='optionlabel'>X-axis Title</label></div>
      </div>
      <div class="row">
        <div class="col center">   <input type="text" class="optionInput" placeholder="Hobbies" name="xaxis-title" id="xaxis-title_${key}"> </div>
      </div>
      <div class="row">
        <div class="col center"> <label  class='optionlabel'>Y-axis Title</label></div>
      </div>
      <div class="row">
        <div class="col center "> <input type="text" class="optionInput" placeholder="# of times" name="yaxis-title" id="yaxis-title_${key}"></div>
      </div>
      <div class="row">
        <div class="col center">
          <label  class='optionlabel'>Graph Size:</label>
        </div>
      </div>
      `
    );

    $("#lineBorderconfig_" + id).append(
      `  <div class="row">
    <div class="col "> <label  class='optionlabel'>Line Color</label></div>
    <div class="col "> <input class="line_${data.graphid} specSize  " value=${data.lineColor}></input></div>
    </div>
    `
    );
  } else if (data.type == "radar") {
    $("#labels_" + id).append(
      `
      <div class="row">
      <div class="col center"> <label  class='optionlabel'>Graph Title</label></div>
    </div>
    <div class="row">
      <div class="col center"> <input type="text" class="optionInput" placeholder="Hobby Tracker for January"  name="Title-input" id="Title-input_${key}"> </div>
    </div>
    <div class="row">
      <div class="col center "><label  class='optionlabel'>Label Title</label></div>
    </div>
    <div class="row">
      <div class="col center">   <input type="text" class="optionInput" placeholder="My database" name="label-title" id="label-title_${key}"> </div>
    </div>
    <div class="row">
      <div class="col center">
        <label  class='optionlabel'>Graph Size:</label>
      </div>
    </div>
    `
    );

    $("#configHeaderName_" + id).append(
      `  <p class="headerTitleStyle">Radar Graph Configuration</p> `
    );

    $("#colorTitle_" + id).append(
      `
    <div class = "row">
<div class="col-3 offset-4 textbottom">
  <label class='optionlabel textbottom '>Point Color</label>
  </div>
  <div class="col-3">
  <label class='optionlabel'>Hover Point Color</label>
  </div>
  </div>
  `
    );

    $("#options_" + id).append(
      `
  <div class="row">
    <div class="col center "> <label  class='optionlabel'>Border Color</label></div>
    <div class="col center"> <label  class='optionlabel'>Background Color</label></div>
    <div class="col center"> <label  class='optionlabel'>Fill</label></div>
  </div>
  <div class="row">
    <div class="col center "> <input class="border_${data.graphid}_${0} specSize  " value=${data.borderColor}></input></div>
    <div class="col center "> <input class="background_${data.graphid}_${0} specSize  " value=${data.backgroundColor}></input></div>
    <div class="col center">
    <label class="switch" > 
      <input type="checkbox" id="fill_${key}"> 
        <span class="slider round" class="optionInput" placeholder="000" name="fill"></span>
      </input>
    </label>
    </div>
  </div>
  

`
    );
  } else if (data.type == "doughnut" || data.type == "pie") {
    $("#labels_" + id).append(
      `
   <div class="row">
    <div class="col center"> <input  class='optionlabel' type="text" >Graph Title</input></div>
  </div>
  <div class="row">
    <div class="col center"> <input type="text" class="optionInput" placeholder="Hobby Tracker for January"  name="Title-input" id="Title-input_${key}"> </div>
  </div>
  <div class="row">
  <div class="col center">
    <label  class='optionlabel'>Graph Type:</label>
  </div>
</div>
      <div class="row">
      <div class="col center ">
        <div class="btn-group  btn-group-toggle" data-toggle="buttons" id="Graphtype_${key}">
          <label class="btn btn-secondary graphsizeStyle">
            <input class="" type="radio" name='typebutton_${key}' value='doughnut' autocomplete="off"checked>Doughnut</input>
          </label>
          <label class="btn btn-secondary  graphsizeStyle">
            <input type="radio" name='typebutton_${key}' value='pie' autocomplete="off">Pie</input>
          </label> 
        </div> 
      </div>
    </div>
    <div class="row">
      <div class="col center">
        <label  class='optionlabel'>Graph Size:</label>
      </div>
    </div>
    `
    );

    $("#configHeaderName_" + id).append(
      `  <p class="headerTitleStyle">Doughnut Graph Configuration</p> `
    );

    $("#colorTitle_" + id).append(
      `
  <label class='optionlabel center'>Background Color</label>
  `
    );

    $("#options_" + id).append(
      `
    <div class="row">
    <div class="col center"> <label  class='optionlabel'>Border Width</label></div>
    <div class="col center"> <label  class='optionlabel'>Hover Offset</label></div>
  </div>
    <div class="row">
    <div class="col center "> <input type="text" class="optionInput" placeholder="5" name='borderwidth' id="borderwidth_${key}"></div>
    <div class="col center "> <input type="text" class="optionInput" placeholder="4" name="hoverborderWidth" id="hoverOffset_${key}"></div>
  </div>
  `
    );
  }
}

function createChart(key, data) {
  let draw = Chart.controllers.line.prototype.draw;
  Chart.controllers.line.prototype.draw = function () {
    draw.apply(this, arguments);
    let ctx = this.chart.chart.ctx;
    let _stroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = "#07C";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      _stroke.apply(this, arguments);
      ctx.restore();
    };
  };

  var ctx = document.getElementById("chart_" + key).getContext("2d");
  var info = chartConfig(data);

  // Chart.js modifies the object you pass in. Pass a copy of the object so we can use the original object later
  var temp = jQuery.extend(true, {}, info);
  temp.type = data.type;

  console.log(data);

  if (myChart[key]) {
    myChart[key].destroy();
  }
  myChart[key] = new Chart(ctx, temp);
  console.log(myChart[key]);
}

function setLocalStorage(data) {
  let myObj_serialized = stringify(data);

  localStorage.setItem(data.graphid, myObj_serialized);
}

function chartConfig(alldata) {
  var data;
  var options;

  if (alldata.type == "bar") {
    const bardata = {
      label: false,
      backgroundColor: alldata.backgroundColor,
      borderColor: alldata.borderColor,
      borderWidth: alldata.borderwidth,
      data: alldata.default_data,
      hoverBorderWidth: alldata.hoverborderwidth,
      hoverBorderColor: alldata.hoverBorderColor,
      order: 0,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowBlur: 10,
      shadowColor: "rgba(0, 0, 0, 0.5)",

      borderSkipped: "bottom",
    };
    data = bardata;

    const barOptions = {
      tooplips: {
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      legend: {
        display: false,
      },
      scales: {
        angleLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 100,
        },
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: alldata.yaxis_title,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: alldata.xaxis_title,
            },
          },
        ],
      },
      title: {
        display: true,
        text: alldata.title,
      },
    };
    options = barOptions;
  } else if (alldata.type == "line") {
    const linedata = {
      label: false,
      pointBackgroundColor: alldata.backgroundColor,
      borderColor: "rgb(0,0,0)",
      borderWidth: alldata.borderwidth,
      pointRadius: 6,
      data: alldata.default_data,
      hoverBorderWidth: alldata.hoverborderwidth,
      hoverBorderColor: alldata.hoverBorderColor,
      order: 0,
      backgroundColor: alldata.lineColor,
      fill: alldata.line_fill,
      lineTension: 0,
    };
    data = linedata;

    const lineOptions = {
      legend: {
        display: false,
      },
      scales: {
        angleLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 100,
        },
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: alldata.yaxis_title,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: alldata.xaxis_title,
            },
          },
        ],
      },
      title: {
        display: true,
        text: alldata.title,
      },
    };
    options = lineOptions;
  } else if (alldata.type == "radar") {
    const radardata = {
      label: alldata.label_title,
      pointBackgroundColor: alldata.pointBackgroundColor,
      borderColor: alldata.borderColor,
      data: alldata.default_data,
      pointHoverBorderColor: alldata.pointhoverborderColor,
      fill: false,
      pointBorderColor: "#fff",
      backgroundColor: alldata.backgroundColor,
    };
    data = radardata;

    const radarOptions = {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      title: {
        display: true,
        text: alldata.title,
      },
    };
    options = radarOptions;
  } else if (alldata.type == "doughnut" || alldata.type == "pie") {
    const doughnutdata = {
      label: alldata.label_title,
      borderColor: alldata.borderColor,
      data: alldata.default_data,
      backgroundColor: alldata.backgroundColor,
      hoverOffset: alldata.hoverOffset,
      borderWidth: alldata.borderWidth,
    };
    data = doughnutdata;

    const doughnutOptions = {
      elements: {
        line: {
          borderRadius: alldata.borderRadius,
        },
      },
      title: {
        display: true,
        text: alldata.title,
      },
    };
    options = doughnutOptions;
  }

  var defaultInfo = {
    type: alldata.type,
    data: {
      labels: alldata.labels,
      datasets: [data],
    },

    options: options,
  };

  return defaultInfo;
}

function chart() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: endpoint,
      success: function (data) {
        resolve(data);

        addChart(data);

        $("#MenuModal").modal("hide");
        $(".model-backdrop").hide();
      },
      error: function (error_data) {
        reject(error_data);
        console.log(error_data);
      },
    });
  });
}

function lineChart() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: lineEndpoint,
      success: function (data) {
        resolve(data);

        addChart(data);

        $("#MenuModal").modal("hide");
        $(".model-backdrop").hide();
      },
      error: function (error_data) {
        reject(error_data);
        console.log(error_data);
      },
    });
  });
}

function radarChart() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: radarendpoint,
      success: function (data) {
        resolve(data);

        addChart(data);

        $("#MenuModal").modal("hide");
        $(".model-backdrop").hide();
      },
      error: function (error_data) {
        reject(error_data);
        console.log(error_data);
      },
    });
  });
}

function doughnutChart() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: doughnutendpoint,
      success: function (data) {
        resolve(data);

        addChart(data);

        $("#MenuModal").modal("hide");
        $(".model-backdrop").hide();
      },
      error: function (error_data) {
        reject(error_data);
        console.log(error_data);
      },
    });
  });
}

function saveGraph(id) {
  var jsonData = {};
  jsonData["graphid"] = dict[id].graphid;
  jsonData["data"] = JSON.stringify(dict[id]);
  jsonData["title"] = dict[id].title;

  /*var formData = new FormData();

  formData.append("graphid", dict[id].graphid);
  formData.append("data", JSON.stringify((dict[id])));
  console.log(dict[id]);
  for (var value of formData.values()) {
    console.log(value);
  }*/

  var ourTestData = JSON.stringify(jsonData);
  console.log(ourTestData);
  $.ajax({
    type: "POST",
    url: saveEndpoint,
    headers: { "X-CSRFToken": getCookie("csrftoken") },
    contentType: "application/json",
    data: ourTestData,
    processData: false,
    cache: false,
    success: function (data) {
      console.log(data);
      getGraphs();
    },
    error: function (error) {
      console.error(error);
    },
  });
  removeChart(id);
}

function getGraphs() {
  all_id = [];
  all_graphids = [];
  all_titles = [];
  all_data = [];

  $.ajax({
    type: "GET",
    url: saveEndpoint,
    headers: { "X-CSRFToken": getCookie("csrftoken") },
    contentType: "application/json",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        all_id[i] = data[i].id;
        all_graphids[i] = data[i].graphid;
        all_titles[i] = data[i].title;
        all_data[i] = data[i].data;
      }

      console.log(data);
      addCharts(all_titles, all_data, all_graphids, all_id);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function getUser() {
  $.ajax({
    type: "GET",
    url: saveEndpoint,
    headers: { "X-CSRFToken": getCookie("csrftoken") },
    contentType: "application/json",

    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie("csrftoken");

function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
