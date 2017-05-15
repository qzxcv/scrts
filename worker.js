// var Worker = require('worker'); var w = new Worker(Game.creeps.Hunter); console.log(w);
// var StateMachine = require('stateMachine');
var StateMachine = require('stateMachine');

var tt = StateMachine.create({
            stateStore: Memory,
            initial: 'idle',
            events:  [
                { name: 'idle',
                    to: 'moveToSource',
                    callback: function(){
                        // worker.harvest(worker.source) == ERR_NOT_IN_RANGE;
                        console.log('changing to moveToSource');
                        console.log(this.pos);
                        // console.log(this.harvest(this.source));
                    } 
                },
                { name: 'moveToSource',     to: 'collectSorce',     callback: function(){  } },
                { name: 'collectSorce',     to: 'moveToStorage',    callback: function(){  } },
                { name: 'moveToStorage',    to: 'transferSorce',    callback: function(){  } },
                { name: 'transferSorce',    to: 'idle',             callback: function(){  } }
            ]
        });

function Worker(creep) {
    // this.__proto__   = new StateMachine(creep);
    this.__proto__   = creep;

    var currentState = this[creep.memory.state];

    this.source      = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    this.storage     = creep.room.controller

    // this.run = function() {
    //     currentState.go(this);
    // };

    // this.change = function(state) {
    //     currentState = this[state];
    //     creep.memory.state = state;
    //     currentState.go(this);
    // };

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