block('p-calendar')(
    js()(function() {
      return true;
    }),
    content()(function() {
        return [
            {
                block: 'b-header'
            },
            {
                block: 'b-calendar-body'
            },
            {
                block: 'b-popup-entry',
                mix: [{ block: 'popup' }]
            }
        ]
    })
);