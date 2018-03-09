var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;
    


console.log('Synaptics');
/*
function Perceptron(input, hidden, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

console.log(myTrainer.XOR()); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0,0])); // 0.0268581547421616
console.log(myPerceptron.activate([1,0])); // 0.9829673642853368
console.log(myPerceptron.activate([0,1])); // 0.9831714267395621
console.log(myPerceptron.activate([1,1])); // 0.02128894618097928
*/
/*
this.network = new synaptic.Architect.Perceptron(40, 25, 3);

creatures.forEach(function(creature)
{
    // move
    var input = [];
    for (var i in creatures)
    {
        input.push(creatures[i].location.x);
        input.push(creatures[i].location.y);
        input.push(creatures[i].velocity.x);
        input.push(creatures[i].velocity.y);
    }
    var output = creature.network.activate(input);
    creature.moveTo(output);

    // learn
    var learningRate = .3;
    var target = [
        targetX(creature), 
        targetY(creature), 
        targetAngle(creature)];
    creature.network.propagate(learningRate, target);
});*/

var PNG = require('pngjs').PNG;
var fs = require('fs');
var perceptron = new Architect.Perceptron(2, 96, 3);
fs.createReadStream('Images/Pug1/pug-100.png').pipe(new PNG({filterType: 4})).on('parsed', function() {
    var pixels = [];
    for (const i in this.data) {
        if (this.data.hasOwnProperty(i)) {
            pixels.push(this.data[i] / 255);
        }
    }

    for (let g = 0; g <= 512*16*2; g++) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
				var dynamicRate = .01/(1+.0005*g);
                var id = (this.width * y + x) * 4;
                perceptron.activate([x / this.width, y / this.height]);
                perceptron.propagate(dynamicRate, [pixels[id], pixels[id+1], pixels[id+2]]);
            }
        }
        if (g % 8 == 0) {
            var genPixels = [];
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    var id = (this.width * y + x) * 4;
                    var gen = perceptron.activate([x / this.width, y / this.height]);
                    for (let i = 0; i < gen.length; i++) {
                        genPixels[id + i] = gen[i] * 255;
                    }
                    genPixels[id + 3] = pixels[id + 3] * 255;
                }
            }
            var newPug = new PNG({ filterType:4, width: this.width, height: this.height });
            for (let i = 0; i < genPixels.length; i++) {
                newPug.data[i] = genPixels[i];
            }
            //newPug.pack().pipe(fs.createWriteStream('Out/out-' + g + '.png'));
            //newPug.pack().pipe(fs.createWriteStream('Out/out-' + g + '.png'));
            var buffer = PNG.sync.write(newPug, { colorType: 6 });
            fs.writeFileSync('Out/out-'+g+'.png', buffer);
            console.log(g);
        }
    }
});