modules.define('b-popup-entry', ['BEMHTML', 'i-bem__dom', 'popup'], function(provide, BEMHTML, BEMDOM, popup) {

    provide(
        BEMDOM.decl(
            { block : this.name },
            {
                _entryModel: void 0,

                _caModel: void 0,

                onSetMod: {
                    'js': {
                        'inited': function() {
                            this._popup = this.findBlockInside('popup');
                            // this._popup.setMod('visible', true);
                            this._popup.on('visible', '', this._clearFields.bind(this));

                            this._bindEvents();
                        }
                    }
                },

                okCallback: function() {},

                discardCallback: function() {},

                _onOkBtn: function() {
                    var en = this.getEntryModel();

                    this._popup.delMod('visible');

                    if (!en) return;

                    var ca = this.getCalendarModel();

                    if ( this.hasMod('form', 'edit') ) {
                        en.set('title', this.elem('title-input').bem('input').getVal());
                        en.set('persons', this.elem('persons-input').bem('input').getVal());
                    }
                    en.set('description', this.elem('description-input').bem('textarea').getVal());

                    if (!en.get('parent', void 0, void 0))
                        ca.addEntries(en, en.get('date'));

                    this.okCallback(this);
                },

                _bindEvents: function() {
                    var self = this;

                    // Кнопка "закрыть"
                    this.bindTo(this.elem('close-btn'), 'click', function() {
                        self._popup.delMod('visible');
                    });

                    // Кнопка "готово"
                    this.bindTo(this.elem('ok-btn'), 'click', this._onOkBtn.bind(this));

                    // Кнопка "удалить-отмена"
                    this.bindTo(this.elem('delete-cancel-btn'), 'click', function() {
                        self._popup.delMod('visible');
                        var ca = this.getCalendarModel();
                        var en = this.getEntryModel();

                        if (!en || !ca) return;

                        ca.removeEntries(en);

                        self.discardCallback();
                    });
                },

                setCalendarModel: function(ca) {
                    this._caModel = ca;
                },

                getCalendarModel: function() {
                    return this._caModel;
                },

                selectById: function(id) {
                    // TODO
                },

                setEntryModel: function(entry) {
                    this._entryModel = entry;
                },

                getEntryModel: function() {
                    return this._entryModel;
                },

                _clearFields: function() {
                    this.elem('title-input').val('');
                    this.elem('persons-input').val('');
                    // this.elem('date-input').val('');
                    this.elem('description-input').val('');
                },

                applyEntryModel: function() {
                    var date, en = this.getEntryModel();

                    if (!en.get('parent')) {
                        this.setMod('form', 'edit');

                        this.elem('title-input').bem('input').setVal(en.get('title'));
                        this.elem('persons-input').bem('input').setVal(en.get('persons') + '');
                        // this.elem('date-input').val('');
                        this.elem('description-input').bem('textarea').setVal(en.get('description'));

                        return;
                    }

                    // ---------------------------------------------

                    this.setMod('form', 'read');

                    this.elem('title-row').text(en.get('title'));
                    this.elem('persons-row').text(en.get('persons') + '');
                    this.elem('description-input').bem('textarea').setVal(en.get('description'));
                    this.elem('date-row').text(
                        (date = en.get('date'))
                            && date.getFullYear()
                            + '-' + (date.getMonth() + 1)
                            + '-' + date.getDate()
                    );
                }
            },
            {
                /* static */
            }
        )
    );

});