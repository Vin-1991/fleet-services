import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function ClusteredChart(props) {
  let data = props?.popularStationsChartData;

  useLayoutEffect(() => {
    let root = am5.Root.new("clusteredChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "week_day",
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
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

    function makeSeries(name, fieldName) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "week_day",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: 0,
      });

      series.data.setAll(data);

      series.appear();
    }
    for (const idx in data) {
      Object.entries(data[idx]).forEach(([k, v]) => {
        if (k !== "week_day") {
          makeSeries(k, k);
        }
      });
    }

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div id="clusteredChartDiv" style={{ width: "100%", height: "450px" }}>
      Top 10 of most popular stations on weekdays
    </div>
  );
}
export default ClusteredChart;
