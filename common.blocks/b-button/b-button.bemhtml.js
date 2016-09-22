block('b-button')(
    content()(function() {
        return {
            tag: 'button',
            content: this.ctx.content,
            attrs: {
                name: this.ctx.name || false
            }
        }
    })
);