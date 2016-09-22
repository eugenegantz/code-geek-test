block('b-calendar-table')(
    js()(true),
    tag()(function() {
        if (this.ctx.type == 'vertical') return void 0;
        return 'table';
    }),
    content()(function() {
        // TODO представить записи как массив

        var weekDays = {
                0: 'Воскресенье',
                1: 'Понедельник',
                2: 'Вторник',
                3: 'Среда',
                4: 'Четверг',
                5: 'Пятница',
                6: 'Суббота'
            },
            bemJsonWeek = [],
            bemJsonMonth = [],
            d = new Date(),
            month = +(this.ctx.month || d.getMonth()),
            monthOrigin = month,
            yearOrigin = this.ctx.year || d.getFullYear(),
            entriesRaw = this.ctx.entries,
            type = this.ctx.type,
            today = this.ctx.today,
            cell,
            entries,
            entry,
            date,
            dateStr,
            day,
            year;

        var addWeek = function() {
            bemJsonMonth.push({
                block: 'b-calendar-table',
                elem: 'row',
                tag: 'tr',
                content: bemJsonWeek
            });
            bemJsonWeek = [];
        };

        if (Array.isArray(entriesRaw)) {
            entries = {};
            entriesRaw.forEach(function(entry) {
                var date = entry.date;
                entries[date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()] = entry;
            });

        } else {
            entries = entriesRaw || {};
        }

        d = new Date();

        d.setMonth(month);
        d.setDate(1);
        d.setYear(yearOrigin);
        d.setDate(d.getDate() - (!d.getDay() ? 6 : d.getDay() - 1));

        for (var c=0;;c++) {
            if (c > 100) {
                console.error('oh snap');
                break;
            }
            // TODO даты календаря сьезж.ают

            date = d.getDate();
            day = d.getDay();
            month = d.getMonth();
            year = d.getFullYear();
            dateStr = year + '-' + month + '-' + date;
            entry = entries[dateStr] || {};

            cell = {
                block: 'b-calendar-table',
                elem: 'cell',
                tag: type == 'vertical' ? 'div' : 'td',
                elemMods: { entry: !!entry.id, today: today == dateStr},
                js: {
                    year: year,
                    month: month,
                    date: date,
                    id: entry.id
                },
                content: [
                    {
                        elem: 'cell-content',
                        content: entry.id && [
                            { elem: 'cell-title', content: entry.title },
                            { content: entry.persons },
                            { content: entry.description }
                        ]
                    },
                    {
                        elem: 'cell-date',
                        content: (!bemJsonMonth.length || type == 'vertical' ? weekDays[day] + ', ' : '') + date
                    }
                ]
            };

            if (type == 'vertical') {
                bemJsonMonth.push(cell);

            } else {
                bemJsonWeek.push(cell);
                if (!day) addWeek();
            }

            d.setDate(date + 1);

            if ((d.getMonth() > monthOrigin || d.getFullYear() > yearOrigin) && !day) {
                break;
            }
        }

        return bemJsonMonth;
    })
);