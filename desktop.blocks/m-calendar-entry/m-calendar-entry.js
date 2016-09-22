modules.define(
    'm-calendar-entry',
    ['m-default-data-model'],
    function (provide, Dm) {

        var CaEntry = function() {
            Dm.call(this);

            this.set('id', 'entry-' + (Math.round(Math.random() * Math.pow(10, 17))));
            this.set('description', '');
            this.set('persons', []);
            this.set('date', void 0);
            this.set('title', 'Без названия');
        };

        CaEntry.prototype = Dm.prototype._objectsPrototyping(Dm.prototype, {});

        provide(CaEntry);

    }
);
