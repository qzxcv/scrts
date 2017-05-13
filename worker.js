// var Worker = require('worker'); var w = new Worker(Game.creeps.Hunter); console.log(w);

function Worker(creep) {
    this.idle = {
        go: function(worker) {
            worker.say("idle");

            worker.change('moveToSource');
        }
    };

    this.moveToSource = {
        go: function(worker) {
            worker.say("Source");

            worker.moveTo(worker.source);
            if(worker.harvest(worker.source) == OK) {
                worker.change('collectEnergy'); 
            }
        }
    };

    this.collectEnergy = {
        go: function(worker) {
            worker.say("collectEnergy");

            worker.harvest(worker.source);
            if(worker.isFull()) {
               worker.change('moveToStore'); 
            }
        }
    };

    this.moveToStore = {
        go: function(worker) {
            worker.say("moveToStore");

            worker.moveTo(worker.store);
            if(worker.upgradeController(worker.store) == OK) {
                worker.change('transferEnergy');
            }
            // if(worker.transfer(worker.store, RESOURCE_ENERGY) == OK) {
            //     worker.change('transferEnergy');
            // }
        }
    };

    this.transferEnergy = {
        go: function(worker) {
            worker.say("transferEnergy");
            worker.upgradeController(worker.store);
            // worker.transfer(worker.store, RESOURCE_ENERGY);
            if(worker.isEmpty()) {
                worker.change('idle');
            }
        }
    };

    var currentState = this[creep.memory.state];

    this.__proto__   = creep;
    this.source      = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    this.store       = creep.room.controller

    this.run = function() {
        console.log(currentState);
        currentState.go(this);
    };

    this.change = function(state) {
        currentState = this[state];
        creep.memory.state = state;
        currentState.go(this);
    };

    this.load = function() {
        return _.sum(this.carry);
    };

    this.isEmpty = function() {
        return this.load() == 0;
    };

    this.isFull = function() {
        return this.load() == this.carryCapacity;
    };
}

module.exports = Worker;