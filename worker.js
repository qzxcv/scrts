/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('workerCreator');
 * mod.thing == 'a thing'; // true
 */

function Worker(creep) {
    var currentState = new Idle(this);

    this.__proto__   = creep;
    this.source      = pos.findClosestByRange(FIND_SOURCES_ACTIVE);

    this.load = function() {
        return _.sum(this.carry);
    };

    this.change = function(state) {
        currentState = state;
    };
}

function Idle(worker) {
    this.next = function(worker) {
        if(worker.harvest(worker.source) == ERR_NOT_IN_RANGE) {
            worker.change(new MoveToSource(worker));
        } else {
            
        }
    };
}

function MoveToSource(worker) {
    this.next = function(worker) {
        worker.change(new CollectEnergy(worker));
    };
}

function CollectEnergy(worker) {
    this.next = function(worker) {
        worker.change(new MoveToStore(worker));
    };
}

function MoveToStore(worker) {
    this.next = function(worker) {
        worker.change(new transferEnergy(worker));
    };
}

function transferEnergy(worker) {
    this.next = function(worker) {
        worker.change(new Idle(worker));
    };
}


module.exports = Worker;