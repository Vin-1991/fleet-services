import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const CategoryLineChart = (props) => {
  const chartData = props?.stationsDistanceChartData;
  useLayoutEffect(() => {
    let data = [];

    let root = am5.Root.new("categoryLinechartdiv");

    for (let idx = 0; idx < chartData.length; idx++) {
      data.push({
        category: chartData[idx].start_st_name,
        end_st_name: chartData[idx].end_st_name,
        value: chartData[idx].average_distance,
      });
    }

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        arrangeTooltips: false,
      })
    );

    // make y axes stack
    chart.leftAxesContainer.set("layout", root.verticalLayout);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 20 });
    xRenderer.labels.template.setAll({
      rotation: -60,
      centerY: am5.p50,
      centerX: am5.p100,
      tickLength: 5,
    });

    xRenderer.grid.template.set("location", 0.5);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        tooltip: am5.Tooltip.new(root, {}),
        renderer: xRenderer,
      })
    );

    xAxis.data.setAll(data);

    function createSeries(field) {
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
          tooltip: am5.Tooltip.new(root, {
            animationDuration: 1,
          }),
          x: am5.p100,
          centerX: am5.p100,
        })
      );

      yAxis.axisHeader.set(
        "background",
        am5.Rectangle.new(root, {
          fillOpacity: 1,
          fill: root.interfaceColors.get("background"),
        })
      );

      yAxis.children.moveValue(
        am5.Label.new(root, {
          rotation: -90,
          text: "Distance(in miles)",
          y: am5.p50,
          centerX: am5.p50,
        }),
        0
      );

      let series;

      series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "category",
          sequencedInterpolation: true,
          stroke: chart.get("colors").getIndex(3),
          fill: chart.get("colors").getIndex(3),
          tooltip: am5.Tooltip.new(root, {
            labelText:
              "End station : {end_st_name}\nDistance(miles) : {valueY}",
          }),
        })
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          locationX: 0.5,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: chart.get("colors").getIndex(3),
          }),
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    }

    createSeries("value");

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
      })
    );

    xAxis.set("layer", 10);

    cursor.events.on("cursormoved", function () {
      // get relative position of a cursor
      let position = cursor.getPrivate("positionY");
      // nearest y axis index
      let axisIndex = Math.floor(chart.yAxes.length * position);

      // nearest y axis
      let axis = chart.yAxes.getIndex(axisIndex);

      // y
      let y = axis.y() + axis.height();
      let dy = Math.round(-(chart.plotContainer.height() - y));
      let tooltip = xAxis.get("tooltip");

      if (Math.round(xAxis.get("dy")) !== dy) {
        xAxis.animate({
          key: "dy",
          to: dy,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
        xAxis.set("y", 0);
        if (tooltip) {
          tooltip.hide(0);
        }
      } else {
        tooltip.show(300);
      }
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartData]);

  return (
    <div id="categoryLinechartdiv" style={{ width: "100%", height: "600px" }}>
      Average distance between two stations(top 20)
    </div>
  );
};
export default CategoryLineChart;
