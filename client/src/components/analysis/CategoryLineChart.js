import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const CategoryLineChart = (props) => {
  useLayoutEffect(() => {
    let data = [];
    let root = am5.Root.new("categoryLinechartdiv");

    let dt = [
      {
        average_distance: 8.0,
        end_st_name: "Here East North",
        start_st_name: "Ashley Crescent",
      },
      {
        average_distance: 7.0,
        end_st_name: "Natural History Museum",
        start_st_name: "Import Dock",
      },
      {
        average_distance: 7.0,
        end_st_name: "Westferry Circus",
        start_st_name: "Lancaster Gate ",
      },
      {
        average_distance: 7.0,
        end_st_name: "Saunders Ness Road",
        start_st_name: "Parkway",
      },
      {
        average_distance: 7.0,
        end_st_name: "Pembridge Villas",
        start_st_name: "Stepney Green Station",
      },
      {
        average_distance: 6.0,
        end_st_name: "Great Tower Street",
        start_st_name: "Wandsworth Town Station",
      },
      {
        average_distance: 6.0,
        end_st_name: "London Zoo Car Park",
        start_st_name: "Fisherman's Walk West",
      },
      {
        average_distance: 6.0,
        end_st_name: "Portman Square",
        start_st_name: "Stainsby Road ",
      },
      {
        average_distance: 6.0,
        end_st_name: "Ram Street",
        start_st_name: "Gloucester Avenue",
      },
      {
        average_distance: 6.0,
        end_st_name: "Smugglers Way",
        start_st_name: "Tooley Street",
      },
      {
        average_distance: 6.0,
        end_st_name: "Imperial Wharf Station",
        start_st_name: "Shoreditch High Street",
      },
      {
        average_distance: 6.0,
        end_st_name: "Clapham Common North Side",
        start_st_name: "New Road 1 ",
      },
      {
        average_distance: 6.0,
        end_st_name: "New Road 1 ",
        start_st_name: "Clapham Common North Side",
      },
      {
        average_distance: 6.0,
        end_st_name: "Moorfields",
        start_st_name: "Northfields",
      },
      {
        average_distance: 6.0,
        end_st_name: "New Inn Yard",
        start_st_name: "Woodstock Grove",
      },
      {
        average_distance: 6.0,
        end_st_name: "King Edward Street",
        start_st_name: "Finlay Street",
      },
      {
        average_distance: 6.0,
        end_st_name: "Stonecutter Street",
        start_st_name: "Putney Rail Station",
      },
      {
        average_distance: 6.0,
        end_st_name: "Exhibition Road Museums",
        start_st_name: "Bancroft Road",
      },
      {
        average_distance: 6.0,
        end_st_name: "St. Katharine's Way",
        start_st_name: "Westfield Southern Terrace ",
      },
      {
        average_distance: 6.0,
        end_st_name: "Fore Street",
        start_st_name: "Blythe Road West",
      },
    ];

    for (let idx = 0; idx < dt.length; idx++) {
      data.push({
        category: dt[idx].start_st_name,
        end_st_name: dt[idx].end_st_name,
        value: dt[idx].average_distance,
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
        tooltip: am5.Tooltip.new(root, { fill: am5.color("#6771dc") }),
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
          stroke: am5.color("#6771dc"),
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
            fill: am5.color("#6771dc"),
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
  }, []);

  return (
    <div id="categoryLinechartdiv" style={{ width: "100%", height: "600px" }}>
      Average distance between two stations(top 20)
    </div>
  );
};
export default CategoryLineChart;
