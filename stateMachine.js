
// function StateMachine(creep) {
//     this.__proto__ = creep;

//     this.idle = {
//         go: function(worker) {
//             worker.say("idle");

//             worker.change('moveToSource');
//         }
//     };

//     this.moveToSource = {
//         go: function(worker) {
//             worker.say("Source");

//             worker.moveTo(worker.source);
//             if(worker.harvest(worker.source) == OK) {
//                 worker.change('collectEnergy'); 
//             }
//         }
//     };

//     this.collectEnergy = {
//         go: function(worker) {
//             worker.say("collectEnergy");

//             worker.harvest(worker.source);
//             if(worker.isFull()) {
//                worker.change('moveToStore'); 
//             }
//         }
//     };

//     this.moveToStore = {
//         go: function(worker) {
//             worker.say("moveToStore");

//             worker.moveTo(worker.store);
//             if(worker.upgradeController(worker.store) == OK) {
//                 worker.change('transferEnergy');
//             }
//             // if(worker.transfer(worker.store, RESOURCE_ENERGY) == OK) {
//             //     worker.change('transferEnergy');
//             // }
//         }
//     };

//     this.transferEnergy = {
//         go: function(worker) {
//             worker.say("transferEnergy");
//             worker.upgradeController(worker.store);
//             // worker.transfer(worker.store, RESOURCE_ENERGY);
//             if(worker.isEmpty()) {
//                 worker.change('idle');
//             }
//         }
//     };    
// }

// module.exports = StateMachine;

// var tt = StateMachine.create() {
//     [
//         stateStore: Memory.state,
//         initial: 'idle',
//         events:  [
//             { name: 'idle', to: 'moveToSource', callback: function(){} },
//             { name: 'moveToSource', to: 'moveToSource', callback: function(){} },
//             { name: 'collectSorce', to: 'moveToSource', callback: function(){} },
//             { name: 'moveToStorage', to: 'moveToSource', callback: function(){} },
//             { name: 'transferSorce', to: 'moveToSource', callback: function(){} }
//         ]
//     ]
// };

var _ = require('lodash');

var StateMachine = {

    create: function(config){
        var stateStore  = config.stateStore;
        var initial     = config.initial;
        var state       = stateStore.state || initial;
        var events      = config.events || [];


        function changeState() {
            state            = getEvent(currentState().to);
            stateStore.state = state.name;
        }

        function performCallback() {
            console.log(this.pos);
            var callback =  currentState().callback;
            // console.log(JSON.stringify(target.isEmpty()));
            (function(){ callback() }).call();
        }

        function getEvent(name) {
            return _.find(events, { name: name });
        }

        function currentState() {
            return getEvent(state);
        }

        return {
            run: function(){
                (function(){
                    performCallback();
                }).call(this);

                changeState();
            }
        };
    }
};


module.exports = StateMachine;
// tt.run() // changeState(), performCallback