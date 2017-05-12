var Worker = require('worker');

function WorkerCreator() {
  var result
  var template = [MOVE, CARRY, WORK]

  this.createWorker = function(spawn) {
    result = createCreepOnSpawn(spawn);

    if(isOK()) {
      this.createdWorker = formatWorker();
    } else {
      this.error = handleError();
    }
  };

  this.isSuccess = function() {
    return this.error == undefined;
  }

  function createCreepOnSpawn(spawn) {
    return spawn.createCreep(template, null, { role: 'worker', state: 'Idle'});
  }

  function isOK() {
    return _.isString(result);
  }

  function formatWorker() {
    var creep = Game.creeps[result];

    return new Worker(creep);
  }

  function handleError(){
    return result;
  }
}

module.exports = WorkerCreator;

// var WorkerCreator = require('workerCreator'); var wc = new WorkerCreator(); wc.createWorker(Game.spawns.Spawn1); wc.isSuccess();