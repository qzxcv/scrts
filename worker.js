// var Worker = require('worker'); var w = new Worker(Game.creeps.Hunter); console.log(w);

function Worker(creep) {
    console.log(creep.memory.state);
    var currentState = new eval(creep.memory.state)(this);

    this.__proto__   = creep;
    this.source      = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    this.store       = Game.spawns.Spawn1;

    this.load = function() {
        return _.sum(this.carry);
    };

    this.run = function() {
        console.log(currentState);
        currentState.go();
    };

    this.change = function(state) {
        changeState(state);
        currentState.go();
    };

    this.isEmpty = function() {
        return this.load() == 0;
    };

    this.isFull = function() {
        return this.load() == this.carryCapacity;
    };

    function changeState(state) {
        currentState = state;
        memory.state = state.name
    };
}

function Idle(worker) {
    this.name = 'Idle';
    this.go = function() {
        worker.say("idle");
        worker.change(new MoveToSource(worker));
    };
}

function MoveToSource(worker) {
    this.name = 'MoveToSource';
    this.go = function() {
        worker.say("Source");
        worker.moveTo(worker.source);
        if(worker.harvest(worker.source) == OK) {
            worker.change(new CollectEnergy(worker)); 
        }
    };
}

function CollectEnergy(worker) {
    this.name = 'CollectEnergy';
    this.go = function() {
        worker.say("CollectEnergy");
        worker.harvest(worker.source);
        if(worker.isFull()) {
           worker.change(new MoveToStore(worker)); 
        }
    };
}

function MoveToStore(worker) {
    this.name = 'MoveToStore';
    this.go = function() {
        worker.say("Store");
        worker.moveTo(worker.store);
        if(worker.transfer(worker.store) == OK) {
            worker.change(new transferEnergy(worker));
        }
    };
}

function transferEnergy(worker) {
    this.name = 'transferEnergy';
    this.go = function() {
        worker.say("transfer");
        worker.transfer(worker.store, RESOURCE_ENERGY);
        if(worker.isEmpty()) {
            worker.change(new Idle(worker));
        }
    };
}


module.exports = Worker;