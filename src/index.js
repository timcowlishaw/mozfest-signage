const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
const svg = Snap(1024, 768);


const data = {
    "gallery": {
        "08:00:00": "Testing gallery slot"
    },
    "shed1": {
        "08:00:00": "Testing shed slot"
    }
}

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

const makeSign = function(svg, width, height, headLength, shaftHeight, label, color, padding) {
    const arrow = makeArrow(svg, width, height, headLength, shaftHeight);
    arrow.attr({fill: color});
    const text = svg.text(padding, height/2, label);
    text.attr({fontFamily: "Helvetica Neue", fontWeight: "bold"});
    text.animate({x: width}, 1000);
    const group =  svg.group(arrow, text);
    const mask = makeArrow(svg, width, height, headLength, shaftHeight);
    mask.attr({fill: "#ffffff", display: "none"});
    group.attr({mask: mask});
    return svg.group(group, mask);
}




const transform = function(element, callback) {
    const mat = Snap.matrix();
    callback(mat);
    element.transform(mat.toTransformString());
}

const arrow = makeSign(svg, 200, 150, 0.4, 0.5, data["gallery"]["08:00:00"], "#bada55", 5);
transform(arrow, (t) => { t.translate(400, 100).rotate(50).scale(2.0); });

const arrow2 = makeSign(svg, 200, 150, 0.5, 0.7, data["shed1"]["08:00:00"], "#55daba", 5);
transform(arrow2, (t) => { t.translate(450, 100).rotate(120); });
