import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const DualAxisChart = (props) => {
  let data = props?.stationsTurnOverChartData;

  useLayoutEffect(() => {
    let root = am5.Root.new("dualAxisChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 50 });
    xRenderer.labels.template.setAll({
      rotation: -60,
      centerY: am5.p50,
      centerX: am5.p100,
      text: "{realName}",
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{realName}",
        }),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.children.moveValue(
      am5.Label.new(root, {
        rotation: -90,
        text: "Number of trips",
        y: am5.p50,
        centerX: am5.p50,
      }),
      0
    );

    let yAxis2 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        syncWithAxis: yAxis,
        renderer: am5xy.AxisRendererY.new(root, { opposite: true }),
      })
    );

    yAxis2.children.moveValue(
      am5.Label.new(root, {
        rotation: 90,
        text: "Duration of trips(ms)",
        y: am5.p50,
        centerX: am5.p50,
      }),
      yAxis2.children.length - 1
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{realName}, Duration: {valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      fillOpacity: 0.9,
      strokeOpacity: 0,
    });
    series.columns.template.adapters.add("fill", (fill, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    let lineSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "number_of_trips",
        sequencedInterpolation: true,
        stroke: chart.get("colors").getIndex(11),
        fill: chart.get("colors").getIndex(11),
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Number of trips : {valueY}",
        }),
      })
    );

    lineSeries.strokes.template.set("strokeWidth", 2);

    lineSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: undefined,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: lineSeries.get("fill"),
        }),
      });
    });

    lineSeries.events.on("datavalidated", function () {
      am5.array.each(lineSeries.dataItems, function (dataItem) {
        if (
          dataItem.dataContext.count / 2 ===
          Math.round(dataItem.dataContext.count / 2)
        ) {
          dataItem.set("locationX", 0);
        } else {
          dataItem.set("locationX", 0.5);
        }
      });
    });

    let chartData = [];

    for (let providerName in data) {
      let providerData = data[providerName];

      let tempArray = [];
      let count = 0;
      // add items
      for (let itemName in providerData) {
        if (itemName !== "number_of_trips") {
          count++;
          tempArray.push({
            category: providerName + "_" + itemName,
            realName: itemName,
            value: providerData[itemName],
            provider: providerName,
          });
        }
      }

      tempArray.sort(function (a, b) {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        } else {
          return 0;
        }
      });

      let lineSeriesDataIndex = Math.floor(count / 2);
      tempArray[lineSeriesDataIndex].number_of_trips =
        providerData.number_of_trips;
      tempArray[lineSeriesDataIndex].count = count;
      // push to the final data
      am5.array.each(tempArray, function (item) {
        chartData.push(item);
      });

      let range = xAxis.makeDataItem({});
      xAxis.createAxisRange(range);

      range.set("category", tempArray[0].category);
      range.set("endCategory", tempArray[tempArray.length - 1].category);

      let label = range.get("label");

      label.setAll({
        dy: 30,
        fontWeight: "bold",
        tooltipText: tempArray[0].provider,
      });

      var grid = range.get("grid");
      grid.setAll({ strokeOpacity: 1 });
    }

    grid.setAll({ strokeOpacity: 1, location: 1 });

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);
    lineSeries.data.setAll(chartData);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div id="dualAxisChartDiv" style={{ width: "100%", height: "450px" }}>
      Rental stations that have the most turnover rate
    </div>
  );
};
export default DualAxisChart;
