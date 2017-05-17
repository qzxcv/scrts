// var Worker = require('worker'); var w = new Worker(Game.creeps.Hunter); console.log(w);
// var StateMachine = require('stateMachine');

function Worker(creep, stateMachine) {
    this.creep                      = creep;
    this.stateMachine               = stateMachine;
    this.source                     = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    this.storage                    = creep.room.controller

    this.__proto__                  = stateMachine;
    stateMachine.__proto__          = creep;

    var currentState = this[this.memory.state];


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