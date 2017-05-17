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
            return currentState().callback(this);
        }

        function getEvent(name) {
            return _.find(events, { name: name });
        }

        function currentState() {
            return getEvent(state);
        }

        return {
            run: function(){
                if(performCallback.call(this)) {
                    changeState();
                }
            }
        };
    }
};


module.exports = StateMachine;
// tt.run() // changeState(), performCallback