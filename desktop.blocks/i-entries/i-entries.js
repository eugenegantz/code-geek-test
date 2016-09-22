modules.define(
    'i-entries',
    ['jquery'],
    function (provide, $) {
        'use strict';

        var CaNode, CaEntry;

        modules.require(['m-calendar-node', 'm-calendar-entry'], function(CaNode_, CaEntry_) {
            CaNode = CaNode_;
            CaEntry = CaEntry_;
        });

        /**
         * Интерфейс работы с узлами календаря
         * @interface
         * */
        var IEntries = function() {
            this._entries = Object.create(null);
        };

        IEntries.prototype = {
            _dateIntoObj: function(date) {
                if (date instanceof Date) {
                    return {
                        year: date.getFullYear(),
                        month: date.getMonth(),
                        date: date.getDate()
                    };
                }

                return date;
            },


            /**
             * Создает уровни календаря, которых нет
             * @param {Object} date
             * @return {this}
             * */
            _insertNode: function(date) {
                var parent = this,
                    entries = this._entries,
                    keys = ['year', 'month', 'date'],
                    index = keys.indexOf(this.get('node-type', void 0, void 0));

                date = this._dateIntoObj(date);

                keys.forEach(function(key, c) {
                    if (c <= index) return;
                    if (!(key in date)) return;

                    var nodeVal = date[key];

                    if (!entries[nodeVal]) {
                        entries[nodeVal] = new CaNode();
                        entries[nodeVal].set('node-type', key);
                        entries[nodeVal].set('parent', parent);
                    }

                    parent = entries[nodeVal];
                    entries = entries[nodeVal]._entries;
                });

                return this;
            },


            /**
             * Получить узлы (календарные уровни)
             * @param {Date} date
             * */
            getNode: function(date) {
                var node,
                    nodeType = this.get('node-type', void 0, void 0);

                if (!date)
                    return this._entries;

                if (date instanceof Date)
                    date = this._dateIntoObj(date);

                if (!nodeType) {
                    if (!date.year) return this;
                    return (node = this._entries[date.year]) && node.getNode(date);

                } else if (nodeType == 'year') {
                    if (!date.month) return this;
                    return (node = this._entries[date.month]) && node.getNode(date);

                } else if (nodeType == 'month') {
                    if (!date.date) return this;
                    return this._entries[date.date];
                }
            },


            /**
             * Получить записи в узлах
             * @param {Date | String | moment} date
             * */
            getEntries: function(date) {
                if (!Array.isArray(date)) date = [date];

                var entries = {};

                date.forEach(function(d) {
                    $.extend(
                        entries,
                        this._extractEntries(this.getNode(d))
                    );
                }, this);

                return entries;
            },


            /**
             * Формирует плоский список записей календаря
             * @param {CaEntry | CaNode} node
             * @return {Array}
             * */
            _extractEntries: function(node) {
                var self = this, tmp;

                !arguments.length && (node = this);
                if (arguments.length && !arguments[0]) return {};

                if (node instanceof CaEntry) {
                    return (tmp = {})
                        && (tmp[node.get('id', void 0, void 0)] = node)
                        && tmp;
                }

                return Object.keys(node._entries).reduce(function (prev, key) {
                    return $.extend(prev, self._extractEntries(node._entries[key]));
                }, {});
            },


            /**
             * Добавить записи
             * @param {CaEntry | Array} entry
             * @param {Date} date
             * */
            addEntries: function(entry, date) {
                if (!date)
                    throw new Error('2nd argument "date" is not defined');

                if (!Array.isArray(entry)) entry = [entry];

                var node = this.getNode(date);

                if (!node) {
                    this._insertNode(date);
                    node = this.getNode(date);
                }

                entry.forEach(function(en) {
                    en.set('date', date);
                    en.set('parent', node);
                    node._entries[en.get('id', void 0, void 0)] = en;
                });

                return this;
            },


            /**
             * Удалить записи
             * @param {Object} arg
             * @return this
             * */
            removeEntries: function(arg) {
                var entries = {}, parent;

                if (arg instanceof CaEntry) {
                    entries[arg.get('id', void 0, void 0)] = arg;

                } else {
                    var node = this;

                    arg = this._dateIntoObj(arg);

                    arg.year && (node = this.getNode(arg));

                    entries = this._extractEntries(node);
                }

                Object.keys(entries).forEach(function(id) {
                    (parent = entries[id].get('parent')) && (parent._entries[id] = void 0);
                    entries[id].set('parent', void 0);
                });

                return this;
            }
        };

        provide(IEntries);

    }
);
