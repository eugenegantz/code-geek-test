modules.define(
    'm-calendar-node',
    ['m-default-data-model', 'i-entries'],
    function (provide, Dm, IEntries) {

        var Cn = function() {
            Dm.call(this);
            IEntries.call(this);
        };

        Cn.prototype = Dm.prototype._objectsPrototyping(Dm.prototype, IEntries.prototype);

        provide(Cn);

    }
);
