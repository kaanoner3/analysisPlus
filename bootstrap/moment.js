import moment from 'moment'
import 'moment/locale/tr'

moment.locale('tr', {
    relativeTime: {
        past: "%s önce",
        s: 'şimdi',
        ss: '%d sn',
        m: "1d",
        mm: "%dd",
        h: "1sa",
        hh: "%dsa",
        d: "1g",
        dd: "%dg",
        M: "aay",
        MM: "%day",
        y: "1y",
        yy: "%dy"
    }
})

moment.locale('tr')
