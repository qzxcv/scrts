var StateMachine = require('stateMachine');
var Worker = require('worker');
var w = new Worker(Game.creeps.Vivian);
// console.log(w.harvest(w.source));

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
        }, w);

w.__proto__ = tt;
w.run();