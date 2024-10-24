let DATA = JSON.parse(localStorage.getItem('resultados')) || [];

var controlTime = {
    convertStringToTime: function (timeString) {
        let t1 = timeString.split(':').map(Number);
        let arrayTime = [t1[0], t1[1], t1[2]];
        return arrayTime;
    },
    sumTime: function (time1, time2) {
        let seconds = time1[2] + time2[2];
        let minutes = time1[1] + time2[1];
        let hours = time1[0] + time2[0];
        if (seconds >= 60) {
            minutes += Math.floor(seconds / 60)
            seconds = seconds % 60;
        }
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes %60;
        }
        let arrayTime = [hours, minutes, seconds];
        return arrayTime;
    }, 
    formatTime: function (arr) {
        return arr.map(num => String(num).padStart(2, '0')).join(':');
    }
}


function renderGraphic(datos) {

    const chartData = [
        { category: "Correctos", value: datos.corrects, percentage: (datos.corrects * 100) / datos.total_exercises },
        { category: "Incorrectos", value: datos.incorrects, percentage: (datos.incorrects * 100) / datos.total_exercises },
        { category: "Sin Respuesta", value: datos.NA, percentage: (datos.NA * 100) / datos.total_exercises }
    ];

    const MARGINS = {
        top: 120, bottom: 80, left: 50, right: 10
    };

    const color = d3.scaleOrdinal()
            .range(['#3fff33', '#ff3352', 'CadetBlue']);

    let WIDTH = window.innerWidth * 0.8;
    let HEIGHT = 400;

    // Container Graphic
    const contGraphic = d3.select('.exercises-result')
    .append('div')
    .attr('class', 'container-graphic')
    .attr('width', WIDTH);
    
    
    // Principal Container SVG
    const svg = contGraphic
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    // Background
    svg.append('rect')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', 'aliceblue');

    function generateBarsGraphic() {
        const xScale = d3.scaleBand()
            .domain(chartData.map(d => d.category))
            .range([MARGINS.left, WIDTH/2]).padding(0.7);
        const yScale = d3.scaleLinear()
            .domain([0, datos.total_exercises])
            .nice()
            .range([HEIGHT, MARGINS.top]);
        


        // Control the style of the ticks
        const yAxisStyle = d3.axisLeft(yScale)
            .ticks(datos.total_exercises)
            .tickFormat(d3.format('d'));
        // Create the Y-axis
        svg.selectAll('g.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${MARGINS.left}, ${0 - MARGINS.bottom})`)
            .call(yAxisStyle);
        // Create the X-axis
        svg.selectAll('g.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${HEIGHT-MARGINS.bottom})`)
            .call(d3.axisBottom(xScale));
        
        // Draw the lines of the Y-Axis
        svg.selectAll('line.y-lines')
            .data(d3.range(datos.total_exercises + 1))
            .join('line')
                .attr('class', 'y-lines')
                .attr('x1', MARGINS.left)
                .attr('y1', (d) => yScale(d) - MARGINS.bottom)
                .attr('x2', WIDTH/2)
                .attr('y2', (d) => yScale(d) - MARGINS.bottom)
                .attr('stroke', (d) => d === 0 ? 'none' : '#cecece');

        // Draw bars
        svg.selectAll('.bar')
            .data(chartData)
            .join('rect')
                .attr('class', 'bar')
                .attr('x', d => xScale(d.category))
                .attr('y', d => yScale(d.value)-MARGINS.bottom)
                .attr('width', xScale.bandwidth())
                .attr('height', d => HEIGHT - yScale(d.value))
                .attr('fill', d => color(d.category))
                .raise();
        // Draw the text of each bar
        svg.selectAll('text.bar-text')
            .data(chartData)
            .join('text')
                .text((d) => d.value)
                .attr('x', (d) => xScale(d.category) + xScale.bandwidth() / 2)
                .attr('y', (d) => yScale(d.value) - MARGINS.bottom - 10)
                .attr('text-anchor', 'middle')
                .attr('font-size', '20px')
                .attr('fill', '#000');
        

        const chart = svg.append('g');
        // Title
        chart.append('text')
            .attr('class', 'svg-title')
            .attr('x', WIDTH / 2)
            .attr('y', 30)
            .text('Resultados')
            .style('text-anchor', "middle")
            .attr('font-weight', 'bold')
            .attr('fill', 'red');

        const chartInfo = svg.append('g')
            .attr('class', 'chart-info');
        chartInfo.append('text')
            .attr('x', WIDTH / 4)
            .attr('y', HEIGHT - 40)
            .text(`Ejecicios Totales: ${datos.total_exercises}`)
            .style('text-anchor', 'middle')
            .attr('fill', 'black');
        chartInfo.append('text')
            .attr('x', WIDTH / 4)
            .attr('y', HEIGHT - 10)
            .text(`Tiempo Total: ${datos.total_time}`)
            .style('text-anchor', 'middle')
            .attr('fill', 'black');
    }

    generateBarsGraphic();

    function generateCakeGraphic() {
        let WidthCake = WIDTH / 2;
        let HeightCake = 300;

        let radius = Math.min(WidthCake, HeightCake) / 2;
        

        let arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let pie = d3.pie()
            .value((d) => d.value);

        let gCake = svg.selectAll('.arc')
            .data(pie(chartData))
            .join('g')
                .attr('class', 'arc')
                .attr('transform', `translate(${WIDTH / 2 + WIDTH / 4}, ${HEIGHT / 2})`)
                .attr('overflow', 'auto');
            
        gCake.append('path')
            .attr('d', arc)
            .style('fill', (d) => color(d.data.category));
        

        // Background of the text
        gCake.append('rect')
            .attr('transform', (d) => {
                const centroid = arc.centroid(d);
                if(d.data.value < 1) {
                    const outsideRadius = 2.5;
                    const [x, y] = centroid.map(c => c * outsideRadius);
                    return `translate(${x}, ${y})`;
                    // return `translate(${arc.centroid(d)}), rotate(${angle(d)})`;
                } else {
                    return `translate(${centroid})`;
                }
            })
            .attr('fill', '#fff')
            .style('opacity', '0.5')
            .attr('class', 'background-text');  


        // Text of each pie part
        gCake.append('text')
            .filter((d) => d.value > 0)
            .text((d) => `${d.data.category}\n${d.data.percentage.toFixed(2)}%`)
            .attr('transform', (d) => {
                console.log("TRNASFORM: ", d);
                const centroid = arc.centroid(d);
                if(d.data.value < 1) {
                    const outsideRadius = 2.5;
                    const [x, y] = centroid.map(c => c * outsideRadius);
                    return `translate(${x}, ${y})`;
                    // return `translate(${arc.centroid(d)}), rotate(${angle(d)})`;
                } else {
                    return `translate(${centroid})`;
                }
            })
            .attr('text-anchor', 'middle')
            .style('white-space', 'pre')
            .attr('class', 'text-parts')
            .style('fill', '#000');
        // Save the coords of the text
        gCake.selectAll('text.text-parts')
            .each(function(d) { d.bbox = this.getBBox(); });

        // Update the background-text with the text info saved
        gCake.selectAll('rect.background-text')
            .filter((d) => d.value > 0)
            .attr('x', d => d.bbox.x - 5)
            .attr('y', d => d.bbox.y - 5)
            .attr('width', (d) => d.bbox.width + 10)
            .attr('height', (d) => d.bbox.height + 10);

        gCake.append('line')
            .filter((d) => d.value > 0)
            .attr('class', 'pointer-text')
            .attr('x1', d => d.bbox.x + d.bbox.width/2)
            .attr('y1', d => d.bbox.y - HeightCake/2.4)
            .attr('x2', d => {
                const centroidX = arc.centroid(d);
                return centroidX[0];
            })
            .attr('y2', d => {
                const centroidY = arc.centroid(d);

                return centroidY[1] * 0.1;
            })
            .attr('stroke', d => d.data.value === 0 ? '#000' : 'none')
            .attr('stroke-width', '4');



        // * Info-Extra Cake
        const MarginsCake = {
            left: WidthCake + 20, top: HeightCake + 50, right: 50, bottom: 20
        };
        const xScaleInfoCake = d3.scaleBand()
            .domain(chartData.map(d => d.category))
            .range([MarginsCake.left, WIDTH - MarginsCake.right]).padding(0.1);
        let gInfoCake = svg.append('g')
            .attr('class', 'info-cake')
            .attr('transform', `translate(0, 0)`);

        const gSingleCake = gInfoCake.selectAll('g.info-result-cake')
            .data(chartData)
            .join('g')
                .attr('class', 'info-result-cake')
                .attr('transform', d => `translate(${xScaleInfoCake(d.category)}, ${MarginsCake.top})`);
            
        gSingleCake.append('rect')
            .attr('width', 15)
            .attr('height', 15)
            .attr('fill', (d) => color(d.category));
        gSingleCake.append('text')
            .text(d => d.category)
            .attr('dx', 20)
            .attr('dy', 12)
            .attr('fill', '#000')
            .style('font-size', '12px');
                

        // Calculate the angle of each pie part
        function angle(d) {
            let a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }

    }
    generateCakeGraphic();
  


    // console.log(`contaGraphic: ${svg.attr('width')}`);

}

// Prepare the Data for the Graphic
function prepareData() {
    let resultData = {
        "total_exercises": DATA.length, 
        "corrects": 0, 
        "incorrects": 0, 
        "NA": 0,
        "total_time": 0, 
        "total_real_time": 0
    };
    
    let tiempo_total = [0, 0, 0];
    $.each(DATA, (index, item) => {
        if (item['result'] === 1) {
            resultData['corrects']++;
        } else {
            if (item['result'] === 0 && item['user_answer'] === "") {
                resultData['NA']++;
            } else {
                resultData['incorrects']++;
            }
        }
        let time = controlTime.convertStringToTime(item['time']);
        tiempo_total = controlTime.sumTime(tiempo_total, time);
    });
    resultData['total_time'] = controlTime.formatTime(tiempo_total);
    $('.exercises-info > p').text(`Ejercicios Resueltos: ${DATA.length}`);
    return resultData;
}





function showExercises() {
    let html = '';
    $.each(DATA, (index, item) => {
        html += `<div class="exercise ${item.result ? 'correcto' : item.user_answer === "" ? 'sin-respuesta': 'incorrecto'}">
                <div class="index-exercise">${index + 1}</div> `;
        item.numbers.forEach((value, i) => {
            html += `<p>${value}</p>`;
        });
        
        html +=  `<hr class="divisor"/>
                <p class="answer">${item.user_answer ? item.user_answer : 'N/A'}</p>
        `;
        html += '</div>';
    });
    $(".container-exercises").html(html);
}

$(function() {
    let data = prepareData();
    showExercises();
    renderGraphic(data);
});