/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('workerCreator');
 * mod.thing == 'a thing'; // true
 */

function Worker(creep) {
  this.__proto__ = creep;

  this.gatherEnergy = function(source, target) {
    moveTo(source);
    gatherEnergy(source);
    moveTo(target);
    transferEnergy(target);
  };
}

 module.exports = Worker;