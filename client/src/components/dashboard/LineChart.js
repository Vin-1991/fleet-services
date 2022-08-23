import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function LineChart(props) {
  let data = props?.distributionBikeRentalDurationChartData;

  useLayoutEffect(() => {
    let root = am5.Root.new("lineChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.labels.template.setAll({ multiLocation: 0, location: 0 });

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        maxDeviation: 1,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.children.moveValue(
      am5.Label.new(root, {
        text: "Duration",
        x: am5.p50,
        centerX: am5.p100,
      }),
      0
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {});

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
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

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "number_of_trips",
        valueXField: "duartion",
        locationX: 0,
        seriesTooltipTarget: "bullet",
        stroke: chart.get("colors").getIndex(3),
        fill: chart.get("colors").getIndex(3),
        tooltip: am5.Tooltip.new(root, {
          maxTooltipDistance: 20,
          pointerOrientation: "horizontal",
          labelText: "Number of trips : {valueY}",
        }),
      })
    );

    series.bullets.push(function () {
      let circleTemplate = am5.Template.new({
        radius: 6,
        templateField: "bulletSettings",
        fill: series.get("fill"),
        strokeWidth: 2,
        stroke: root.interfaceColors.get("background"),
      });

      let circle = am5.Circle.new(root, {}, circleTemplate);

      return am5.Bullet.new(root, {
        sprite: circle,
        locationX: 0,
      });
    });

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div id="lineChartDiv" style={{ width: "100%", height: "400px" }}>
      Distribution of bike rental duration during weekdays.
    </div>
  );
}
export default LineChart;
