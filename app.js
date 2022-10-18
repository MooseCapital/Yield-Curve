//import Chart from "chart.js"
// alpha advantage api 9T9WUPP81KYCFSUV
//fred api key   4b093d38913491db1be5f28707a1ca16
//nasdaq api key  TzzPTuHFi1phbcCqeyv3






async function test() {
    try {

        let bond = await (await fetch("https://data.nasdaq.com/api/v3/datasets/USTREASURY/YIELD.json?api_key=TzzPTuHFi1phbcCqeyv3")).json()

        let yieldNames = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "5Y", "7Y", "10Y", "20Y", "30Y"];
        let yields =  bond.dataset.data[0];
        let yieldDate = yields.shift();

       // console.log(yields); // [3.3 , 3.61, ... 3.9] 12 items
        //console.log(yieldDate) // 2022-10-14

        chartAction.createchart(yieldNames, yields, yieldDate)
        dom.yieldStatement(yields);

    } catch (err) {
        console.log(err)
    }
}
test();

let dom = (function () {

    function yieldStatement(yields) {
        document.querySelector(".twoy").innerText = `${yields[6]}%`;
        document.querySelector(".teny").innerText = `${yields[9]}%`;

        //yields[6] < yields[9]
        if (yields[6] < yields[9]) {
            document.querySelector(".yield-status").innerText = "Normal";
            document.querySelector(".help-icon").setAttribute("title","In a normal healthy market, investors will not seek long term safety, thus putting demand for long term bonds lower than short term. They see less risk in the markets so they seek no safety in bonds. This sell pressure makes long term bonds go down making the yield higher, putting them above short term ")
        } else {
            document.querySelector(".yield-status").innerText = "Inverted";    //edit title attribute here and for normal above
            document.querySelector(".help-icon").setAttribute("title", "An inverted yield curve can be a sign for an upcoming recession.  Investors may see upcoming risk and downside in the markets, thus putting more money into safer long term bonds over short term. This buy pressure makes bonds prices go up, which makes the yield go down. As investors flee to longer term safety, the shorter term T-Bills & Notes earn more.");
        }

    }

   return {yieldStatement}
})()


let chartAction = (function () {
    let chart_container = document.querySelector(".chart-container");
    let yield_chart = document.querySelector("#yield-chart").getContext("2d");
    let makeChart;

    function createchart(yieldnames, yieldamounts, yielddate) {
        let chartID = Chart.getChart("yield_chart");
            if (chartID) {
                makeChart.destroy();
            }
        makeChart = new Chart(yield_chart, {
            type: 'line',
            data: {
                labels: yieldnames,
                // labels: years, //put years here
                datasets: [{
                    label: "Interest rates",  //set to be called crut principle amount after growth
                    data: yieldamounts,
                    backgroundColor: "rgba(129, 161, 193, 1)",
                    borderWidth: 3, //width of line
                    borderColor: "rgba(129, 161, 193, 1)", //line color
                    tension: 0.5,
                } ],
            },
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: "rgb(236, 239, 244, 0.7)",
                            boxWidth: 35,
                            boxHeight: 16,
                            padding: 0,
                            font: {
                                family: "Rubik",
                                size: 16,
                                weight: 600,
                            }
                        },
                        position: "top",
                        align: "center",
                    },
                },
                scales: {
                    y: {
                        position: 'left', // `axis` is determined by the position as `'y'`
                        title: {
                            display: true,
                            font: {
                                family: "Rubik",
                                size: 16,
                                weight: 500,
                            },
                            color: "rgb(236, 239, 244)",
                            // text: "Money"
                        },
                        grid: {
                            display: true,
                            drawBorder: true,
                            drawTicks: true,
                            borderColor: "#3B4252",
                            borderWidth: 1,
                            color: "#3B4252",


                        },
                        ticks: {
                            color: "rgb(236, 239, 244)",
                            font: {
                                family: "Rubik",
                                size: 16,
                                weight: 500,
                            }
                        }

                    },
                    x: {
                       // labels: yieldamounts,

                        title: {
                            display: true,
                            font: {
                                family: "Rubik",
                                size: 16,
                                weight: 500,
                            },
                            color: "rgb(236, 239, 244)",
                            //text: "y"
                        },
                        grid: {
                            display: true,
                            drawBorder: true,
                            drawTicks: true,
                            borderColor: "#3B4252",
                            borderWidth: 1,
                            color: "#3B4252",


                        },
                        ticks: {
                            color: "rgb(236, 239, 244)",
                            font: {
                                family: "Rubik",
                                size: 16,
                                weight: 500,
                            }
                        }

                    }
                },
                layout: {
                    /*padding: {
                        top: 30,
                        left: 30,
                        right: 0,
                    }*/
                }
            },
        });


    }

   return {createchart}
})()































