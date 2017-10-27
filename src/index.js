const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
const svg = Snap(1024, 768);
const offset = 20 * 60 * 60 * 1000 - 5 * 60 * 1000;

const data = require("../data/sessions.json"); 
const makeArrow = function(svg, width, height, headLength, shaftHeight) {
    const shaftTop = 0+ (height-shaftHeight*height)/2;
    const shaftBottom = height - (height-shaftHeight*height)/2; 
    const headLeft = width - headLength*width;
    const arrow = svg.polygon([
        0, shaftTop,
        headLeft, shaftTop,
        headLeft, 0,
        width, height/2,
        headLeft, height,
        headLeft, shaftBottom,
        0, shaftBottom
    ]);
    return arrow;   
};



const makeSign = function(schedule, svg) {
    const arrow = makeArrow(svg, schedule.width, schedule.height, schedule.headLength, schedule.shaftHeight);
    arrow.attr({fill: schedule.color});
    console.log(schedule.color);
    const titleText = svg.text(10,10 + schedule.height/3, schedule["name"]);
    titleText.attr({fontFamily: "Helvetica Neue", fontWeight: "bold", fontSize: schedule.height/3});
    const sessionText = svg.text(10, 35 + schedule.height/3, "");
    sessionText.attr({fontFamily: "Helvetica Neue", fontWeight: "bold", fontSize: schedule.height/6.5});
    const updateText = () => {
        const now = (new Date(Date.now() + offset)).toISOString();
        const session = schedule["sessions"].find((item) => {
            return item.startTime <= now && item.endTime >= now;
        });
        if(session) {
            sessionText.attr({text: session.name});
        }
    };
    window.setInterval(updateText, 60*1000);
    updateText();
    const group = svg.group(arrow, titleText, sessionText);
    transform(group, (t) => { t.translate(schedule.x, schedule.y).rotate(schedule.rotation); });
    return group;
}




const transform = function(element, callback) {
    const mat = Snap.matrix();
    callback(mat);
    element.transform(mat.toTransformString());
}

const arrows = {};

for (var space in data) {
    makeSign(data[space], svg);
}

