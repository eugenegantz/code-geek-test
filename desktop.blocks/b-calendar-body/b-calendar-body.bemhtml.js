block('b-calendar-body')(
    content()(function() {
        return [
            {
                elem: 'control-row',
                content: [
                    {
                        block: 'button',
                        text: '',
                        mix: [{
                            block: 'b-calendar-body',
                            elem: 'ca-chooser-prev'
                        }]
                    },
                    { elem: 'ca-chooser-title', content: '' },
                    {
                        block: 'button',
                        text: '',
                        mix: [{
                            block: 'b-calendar-body',
                            elem: 'ca-chooser-next'
                        }]
                    },
                    {
                        block: 'button',
                        text: 'Сегодня',
                        mix: [{
                            block: 'b-calendar-body',
                            elem: 'ca-chooser-today'
                        }]
                    }
                ]
            },
            {
                elem: 'content',
                content: [{
                    block: 'b-calendar-table'
                }]
            }
        ]
    })
);