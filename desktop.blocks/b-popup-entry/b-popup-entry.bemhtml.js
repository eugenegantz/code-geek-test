block('b-popup-entry')(
    js()(true),
    def()(function() {
        return applyCtx({
            block: 'popup',
            mods: { target: 'anchor' },
            directions: [
                'right-top',
                'bottom-center',
                'left-top'
            ],
            mix: [{
                block: 'b-popup-entry',
                js: {
                    'b-popup-entry': {}
                }
            }],
            content: [
                {
                    elem: 'tail'
                },
                {
                    block: 'b-popup-entry',
                    elem: 'content',
                    content: [
                        {
                            block: 'b-close-btn',
                            mix: [{ block: 'b-popup-entry', elem: 'close-btn' }],
                        },
                        {
                            elem: 'content',
                            content: [
                                {
                                    elem: 'edit-form',
                                    content: [
                                        {
                                            elem: 'edit-form-row',
                                            content: {
                                                block: 'input',
                                                placeholder: 'Событие',
                                                mix: [{ block: 'b-popup-entry', elem: 'title-input' }, { block: 'b-popup-entry', elem: 'control' }]
                                            }
                                        },
                                        /*
                                         {
                                         block: 'input',
                                         placeholder: 'День месяц год',
                                         mix: [{ block: 'b-popup-entry', elem: 'date-input' }]
                                         },
                                         */
                                        {
                                            elem: 'edit-form-row',
                                            content: {
                                                block: 'input',
                                                placeholder: 'Участники',
                                                mix: [{ block: 'b-popup-entry', elem: 'persons-input' }, { block: 'b-popup-entry', elem: 'control' }]
                                            }
                                        }
                                    ]
                                },
                                {
                                    elem: 'read-form',
                                    content: [
                                        {
                                            elem: 'title-row',
                                            content: 'Заголовок',
                                            mix: [{ block: 'b-popup-entry', elem: 'read-form-row' }]
                                        },
                                        {
                                            elem: 'date-row',
                                            content: 'Дата',
                                            mix: [{ block: 'b-popup-entry', elem: 'read-form-row' }]
                                        },
                                        {
                                            elem: 'persons-title',
                                            content: 'Участники:',
                                            mix: [{ block: 'b-popup-entry', elem: 'read-form-row' }]
                                        },
                                        {
                                            elem: 'persons-row',
                                            content: '',
                                            mix: [{ block: 'b-popup-entry', elem: 'read-form-row' }]
                                        }
                                    ]
                                },
                                {
                                    block: 'textarea',
                                    placeholder: 'Описание',
                                    mix: [{ block: 'b-popup-entry', elem: 'description-input' }, { block: 'b-popup-entry', elem: 'control' }]
                                },
                                {
                                    elem: 'footer',
                                    content: [
                                        {
                                            block: 'button',
                                            text: 'Готово',
                                            mix:[{ block: 'b-popup-entry', elem: 'ok-btn' }]
                                        },
                                        {
                                            block: 'button',
                                            text: 'Удалить',
                                            mix: [{ block: 'b-popup-entry', elem: 'delete-cancel-btn' }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    })
);