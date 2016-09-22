modules.define(
    'p-calendar',
    ['jquery', 'BEMHTML', 'i-bem__dom', 'm-calendar', 'm-calendar-node', 'm-calendar-entry'],
    function(provide, $, BEMHTML, BEMDOM, Calendar, CaNode, CaEntry){
        'use strict';

        window._BEMHTML = BEMHTML;
        window._BEMDOM = BEMDOM;

        provide(BEMDOM.decl(this.name,
            {
                onSetMod: {
                    'js': {
                        'inited': function() {
                            this._init();
                        }
                    }
                },

                /**
                 * Инициализация событий
                 * */
                _initEvents: function() {
                    window.addEventListener('resize', this._onResize.bind(this), false);
                    window.onbeforeunload = this._onBeforeClose.bind(this);
                },

                _initBind: function() {
                    var self = this,
                        body = this.findBlockInside('b-calendar-body'),
                        prev = body.elem('ca-chooser-prev'),
                        next = body.elem('ca-chooser-next'),
                        today = body.elem('ca-chooser-today'),
                        ca = self.getCalendarModel(),
                        d = ca.get('date');

                    body.bindTo(prev, 'click', function() {
                        d.setMonth(d.getMonth() - 1);
                        self._updateDateTitle();
                        self.renderTable();
                    });

                    body.bindTo(next, 'click', function() {
                        d.setMonth(d.getMonth() + 1);
                        self._updateDateTitle();
                        self.renderTable();
                    });

                    body.bindTo(today, 'click', function() {
                        ca.set('date', (d = new Date()));
                        self._updateDateTitle();
                        self.renderTable();
                    });

                    this.domElem.on('click', '.b-calendar-table__cell', function(e) {
                        self._onClickTableCell(e, this);
                    })
                },

                // Неправильно, но это целесообразней чем реализовывать делегирование,
                // писать декларацию для ячейки
                // или вешать события каждый раз после отрисовки
                _onClickTableCell: function(e, elem) {
                    var date;
                    var data = JSON.parse(elem.getAttribute('data-bem'));
                    data = data['b-calendar-table__cell'];

                    var ca = this.getCalendarModel();
                    var entry = ca.getEntries({ year: data.year, month: data.month, date: data.date })[data.id];
                    if (!entry) {
                        entry = new CaEntry();
                        date = new Date();
                        date.setYear(data.year);
                        date.setMonth(data.month);
                        date.setDate(data.date);
                        entry.set('date', date);
                    }

                    this.entryPopup.setEntryModel(entry);
                    this.entryPopup.applyEntryModel();
                    this.entryPopup._popup.setAnchor($(elem));
                    this.entryPopup._popup.setMod('visible', true);
                },

                _updateDateTitle: function() {
                    var body = this.findBlockInside('b-calendar-body');
                    var title = body.elem('ca-chooser-title');
                    var ca = this.getCalendarModel();
                    var d = ca.get('date');

                    var mKeys = [
                        "Январь", "Февраль", "Март", "Апрель", "Май",
                        "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",
                        "Ноябрь", "Декарь"
                    ];

                    title.text(mKeys[d.getMonth()] + ' ' + d.getFullYear());
                },

                _minWinWidth: 640, // px

                _isVertical: false,

                /**
                 * закрытие вкладки - сохранить календарь в localStorage
                 * */
                _onBeforeClose: function() {
                    var ca = this.getCalendarModel();
                    ca.saveLocalStorage();
                },

                /**
                 * Событие на изм. размера экрана
                 * При малом размере - вертикальный календарь
                 * */
                _onResize: function() {
                    var isVertical = window.innerWidth < this._minWinWidth;

                    if (this._isVertical != isVertical) {
                        this._isVertical = isVertical;
                        this.renderTable();
                    }
                },

                /**
                 * Перевод формата _extractEntries в формат шаблона b-calendar-table
                 * */
                _intoTableFormat: function(entries) {
                    var obj = Object.create(null);

                    Object.keys(entries).forEach(function(key) {
                        var entry = entries[key];
                        var d = entry.get('date');
                        obj[d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()] = {
                            description: entry.get('description') + '',
                            title: entry.get('title'),
                            persons: entry.get('persons') + '',
                            id: entry.get('id')
                        }
                    });

                    return obj;
                },

                _initCa: function() {
                    var ca = Calendar.prototype.getInstance();
                    ca.set('date', new Date());
                    ca.set('today', new Date()); // изм. не будет
                    this.setCalendarModel(ca);
                },

                _initEntryPopup: function() {
                    var self = this;
                    this.entryPopup = this.findBlockInside('b-popup-entry');
                    var ca = this.getCalendarModel();

                    this.entryPopup.setCalendarModel(ca);

                    this.entryPopup.okCallback = this.renderTable.bind(this);
                    this.entryPopup.discardCallback = this.renderTable.bind(this);
                },

                _test: function() {
                    this._initCa();

                    var ca1 = this.getCalendarModel();

                    var en1 = new CaEntry();
                    en1.set('description', 'hello');
                    var d1 = new Date();
                    d1.setMonth(8);
                    d1.setDate(15);
                    ca1.addEntries(en1,  d1);

                    var en2 = new CaEntry();
                    en2.set('description', 'world');
                    var d2 = new Date();
                    d2.setMonth(8);
                    d2.setDate(12);
                    ca1.addEntries(en2,  d2);

                    // console.log(ca1);
                    // console.log(ca1._extractEntries());

                    // ca1.removeEntries(en2);
                    console.log(ca1._extractEntries());
                },

                _calendarModel: void 0,

                /**
                 * @param {Calendar} ca
                 * */
                setCalendarModel: function(ca) {
                    this._calendarModel = ca;
                },

                /**
                 * @return {Calendar}
                 * */
                getCalendarModel: function() {
                    return this._calendarModel;
                },

                /**
                 * Инициализация блока
                 * */
                _init: function() {
                    this._initEvents();
                    this._initCa();
                    this._initBind();
                    this._updateDateTitle();
                    this._initEntryPopup();
                    // this._test();

                    var ca = this.getCalendarModel();
                    ca.initLocalStorage();

                    this.renderTable();

                    return this;
                },

                /**
                 * Отрисовка таблицы
                 * */
                renderTable: function() {
                    var ca = this.getCalendarModel(),
                        date = ca.get('date', void 0, void 0),
                        dates = [],
                        date_ = new Date(date),
                        today = ca.get('today');

                    for (var c=0; c<3; c++) {
                        date_.setMonth(date_.getMonth() + (!c ? -1 : 1));
                        dates.push({
                            year: date_.getFullYear(),
                            month: date_.getMonth()
                        });
                    }

                    var entries = this._intoTableFormat(ca.getEntries(dates));

                    // ----------------------------------------

                    var caTable = this.findBlockInside('b-calendar-table');

                    this.entryPopup._popup.delMod('visible');
                    this.entryPopup._popup.setAnchor($('div'));

                    BEMDOM.replace(
                        caTable.domElem,
                        BEMHTML.apply({
                            type: window.innerWidth < this._minWinWidth && 'vertical',
                            block: 'b-calendar-table',
                            month: date.getMonth(),
                            year: date.getFullYear(),
                            today: today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate(),
                            entries: entries
                        })
                    );


                }
            },
            {
                /* статические методы */
            }
        ));

    }
);