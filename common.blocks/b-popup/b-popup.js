modules.define(
    'b-popup',
    ['i-bem__dom', 'jquery'],
    function (provide, BEMDOM, $) {

        provide(
            BEMDOM.decl(
                this.name,
                {
                    /**
                     * Рассчитывает положение popup'a
                     * */
                    _calcPos: function() {

                    },

                    /**
                     * Открывает popup
                     * */
                    open: function() {

                    },

                    /**
                     * Закрывает popup
                     * */
                    close: function() {

                    }
                } // close instance.params
            )
        );

    }
);
