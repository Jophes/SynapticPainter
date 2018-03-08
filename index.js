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

var network = new Architect.Perceptron(2, 512, 1);