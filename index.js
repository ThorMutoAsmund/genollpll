var fs = require('fs');

var olls = {
  0 : [ [], [] ],
  28 : [ [1,1,1,1,1,0,1,0,1], [0,0,0,0,1,0,0,0,1,0] ],
}
var plls = {
  'A' : [0,0,0,0,1,0,0,0,1,0]
}

createDir();
generate();


function createDir() {
  if (!fs.existsSync('./output')){
    fs.mkdirSync('./output');
}  
}

function generate() {
  var ollkeys = Object.keys(olls);
  for (var i in ollkeys) {
    var data = wrapHeader(generateOll(olls[ollkeys[i]][0], olls[ollkeys[i]][1]));
    writeFile(`./output/oll_${ollkeys[i]}.svg`, data)
  }
  var pllkeys = Object.keys(plls);
  for (var i in pllkeys) {
    var data = wrapHeader(generatePll(plls[pllkeys[i]]));
    writeFile(`./output/pll_${pllkeys[i]}.svg`, data)
  }
}

function writeFile(fileName, data) {
  fs.writeFile(fileName, data, function(err) {
      if (err) {
          return console.log(err);
      }
  });
}

function wrapHeader(body) {
  var result = '<?xml version="1.0"?>\n';
  result += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
  result += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="210" height="210" viewBox="0 0 210 210 ">\n';
  result += body;
  result += '</svg>';
  return result;
} 

function generateOll(faces, sides) {
  var result = '';
  result += '<g stroke="black" stroke-width="10">\n';
  result += '  <rect x="5" y="5" width="190" height="190" fill="#bbb" />\n';
  result += '</g>\n';

  result += '<g stroke="black" stroke-width="2">\n';
  for (var i=0; i<9; ++i) {
    var x = 10 + (i % 3)*60;
    var y = 10 + Math.floor(i / 3)*60;
    var fill = faces[i] == 0 ? 'none' : '#ff0';
    result += `<rect x="${x}" y="${y}" width="60" height="60" fill="${fill}" />\n`;
  }
  result += '</g>\n';

  result += '<g stroke="black" stroke-width="2">\n';
  for (var i=0; i<3; ++i) {
    var x = 10 + (i % 3)*60;
    var fill = sides[i] == 0 ? 'none' : '#ff0';
    result += `<rect x="${x}" y="1" width="60" height="9" fill="${fill}" />\n`;
  }
  for (var i=0; i<6; ++i) {
    var x = 1 + (i % 2)*189;
    var y = 10 + Math.floor(i / 2)*60;
    var fill = sides[i+3] == 0 ? 'none' : '#ff0';
    result += `<rect x="${x}" y="${y}" width="9" height="60" fill="${fill}" />\n`;
  }
  for (var i=0; i<3; ++i) {
    var x = 10 + (i % 3)*60;
    var fill = sides[i+9] == 0 ? 'none' : '#ff0';
    result += `<rect x="${x}" y="190" width="60" height="9" fill="${fill}" />\n`;
  }
  result += '</g>\n';

  return result;
}

function generatePll(sides) {
  var result = '';
  result += '<g stroke="black" stroke-width="10">\n';
  result += '  <rect x="5" y="5" width="190" height="190" fill="#bbb" />\n';
  result += '</g>\n';

  result += '<g stroke="black" stroke-width="2">\n';
  for (var i=0; i<9; ++i) {
    var x = 10 + (i % 3)*60;
    var y = 10 + Math.floor(i / 3)*60;
    var fill = '#ff0';
    result += `<rect x="${x}" y="${y}" width="60" height="60" fill="${fill}" />\n`;
  }
  result += '</g>\n';

  result += '<g stroke="black" stroke-width="2">\n';
  for (var i=0; i<3; ++i) {
    var x = 10 + (i % 3)*60;
    var fill = sides[i] == 0 ? 'none' : '#bbb';
    result += `<rect x="${x}" y="1" width="60" height="9" fill="${fill}" />\n`;
  }
  for (var i=0; i<6; ++i) {
    var x = 1 + (i % 2)*189;
    var y = 10 + Math.floor(i / 2)*60;
    var fill = sides[i+3] == 0 ? 'none' : '#bbb';
    result += `<rect x="${x}" y="${y}" width="9" height="60" fill="${fill}" />\n`;
  }
  for (var i=0; i<3; ++i) {
    var x = 10 + (i % 3)*60;
    var fill = sides[i+9] == 0 ? 'none' : '#bbb';
    result += `<rect x="${x}" y="190" width="60" height="9" fill="${fill}" />\n`;
  }
  result += '</g>\n';

  return result;
}

// var xml2js = require('xml2js');

// readPng('./oll.svg');

// function readPng(filePath) {
//   try {
//     var fileData = fs.readFileSync(filePath, 'ascii');
  
//     var parser = new xml2js.Parser();
//     parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
//         var json = JSON.stringify(result);
//         console.log(typeof result);
//     });
  
//     console.log("File '" + filePath + "/ was successfully read.\n");
//   } catch (ex) {
//     console.log("Unable to read file '" + filePath + "'.");
//     console.log(ex);
//   }
//}
