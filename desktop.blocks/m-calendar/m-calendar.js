modules.define(
    'm-calendar',
    ['m-default-data-model', 'i-entries', 'm-calendar-entry'],
    function (provide, Dm, IEntries, CaEntry) {

        var Ca = function() {
            Dm.call(this);
            IEntries.call(this);

            this.instances.push(this);
        };

        Ca.prototype = Dm.prototype._objectsPrototyping(
            Dm.prototype,
            IEntries.prototype,
            {
                instances: [],

                /**
                 * Получить экземпляр календаря
                 * @return this
                 * */
                getInstance: function() {
                    return this.instances.length ? this.instances[0] : new Ca();
                },

                /**
                 * Инициализация календаря из локального хранилища
                 * */
                initLocalStorage: function() {
                    var entries = localStorage.getItem('codegeek-calendar-1');
                    var entry;

                    try {
                        entries = JSON.parse(entries);
                    } catch (e) {
                        localStorage.setItem('codegeek-calendar-1', '{}');
                        return;
                    }

                    for (var prop in entries) {
                        if (!Object.prototype.hasOwnProperty.call(entries, prop)) continue;

                        entries[prop].date = new Date(entries[prop].date);

                        entry = new CaEntry();
                        entry.set(entries[prop]);

                        this.addEntries(entry, entries[prop].date);
                    }

                    return this;
                },

                /**
                 * Сохранение каленадря в локальное хранилище
                 * */
                saveLocalStorage: function() {
                    localStorage.setItem('codegeek-calendar-1', this.toJSON());

                    return this;
                },

                toJSON: function() {
                    var entries = this._extractEntries();
                    for (var prop in entries) {
                        if (!Object.prototype.hasOwnProperty.call(entries, prop)) continue;
                        entries[prop] = entries[prop].props;
                        entries[prop].date = new Date(entries[prop].date);
                        delete entries[prop].parent;
                    }

                    return JSON.stringify(entries);
                }
            }
        );

        provide(Ca);

    }
);
