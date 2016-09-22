block('b-header')(
    content()(function() {
        return [{
            elem: 'control-row',
            content: [
                {
                    // elem: 'add-button',
                    elem: 'button',
                    mix: [{ elem: 'add-button' }],
                    content: 'Добавить'
                },
                {
                    // elem: 'add-button',
                    elem: 'button',
                    content: 'Обновить'
                },
                {

                    block: 'input',
                    mods: { type: 'search' },
                    mix: [{
                        block: 'b-header',
                        elem: 'search-control'
                    }],
                    placeholder: 'Событие, дата или участник'
                }
            ]
        }];
    })
);