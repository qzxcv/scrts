var StateMachine = require('stateMachine');
var Worker = require('worker');

//state machine for workers
var sm = StateMachine.create({
            stateStore: Memory,
            initial: 'moveToSource',
            events:  [
                { name: 'moveToSource',
                    to: 'collectSource',
                    callback: function(worker){
                        if(worker.harvest(worker.source) == ERR_NOT_IN_RANGE) {
                            worker.moveTo(worker.source);
                            worker.say('source');
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                { name: 'collectSource',
                    to: 'moveToStorage',
                    callback: function(worker){
                        if(!worker.isFull()) {
                            worker.harvest(worker.source);
                            worker.say('harvest');
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                { name: 'moveToStorage', 
                    to: 'transferSource',
                    callback: function(worker){
                        if(worker.transfer(worker.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            worker.moveTo(worker.storage);
                            worker.say('storage');
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                { name: 'transferSource',
                    to: 'moveToSource',
                    callback: function(worker){
                        if(!worker.isEmpty()) {
                            worker.transfer(worker.storage, RESOURCE_ENERGY);
                            worker.say('transfer');
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ]
        });

var w = new Worker(Game.creeps.Liliana, sm);
w.run();