var letters = {}, numbers = {
    '': 0,
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 10,
    כ: 20,
    ך: 20,
    ל: 30,
    מ: 40,
    ם: 40,
    נ: 50,
    ן: 50,
    ס: 60,
    ע: 70,
    פ: 80,
    ף: 80,
    צ: 90,
    ץ: 90,
    ק: 100,
    ר: 200,
    ש: 300,
    ת: 400,
    תק: 500,
    תר: 600,
    תש: 700,
    תת: 800,
    תתק: 900,
    תתר: 1000
}, i;

for (i in numbers) {
    letters[numbers[i]] = i;
}

function gematriya(num, options) {
    if (options === undefined) {
        var options = {limit: false, punctuate: true, order: false, geresh: true};
    }

    if (typeof num !== 'number' && typeof num !== 'string') {
        throw new TypeError('non-number or string given to gematriya()');
    }

    if (typeof options !== 'object' || options === null){
        throw new TypeError('An object was not given as second argument')
    }

    var limit = options.limit;
    var order = options.order;
    var punctuate = typeof options.punctuate === 'undefined' ? true : options.punctuate;
    var geresh = typeof options.geresh === 'undefined' && punctuate ? true : options.geresh;

    var str = typeof num === 'string';

    if (str) {
        num = num.replace(/('|")/g,'');
    }
    num = num.toString().split('').reverse();
    if (!str && limit) {
        num = num.slice(0, limit);
    }

    num = num.map(function g(n,i){
        if (str) {
            return order && numbers[n] < numbers[num[i - 1]] && numbers[n] < 100 ? numbers[n] * 1000 : numbers[n];
        } else {
            if (parseInt(n, 10) * Math.pow(10, i) > 1000) {
                return g(n, i-3);
            }
            return letters[parseInt(n, 10) * Math.pow(10, i)];
        }
    });

    if (str) {
        return num.reduce(function(o,t){
            return o + t;
        }, 0);
    } else {
        num = num.reverse().join('').replace(/יה/g,'טו').replace(/יו/g,'טז').split('');

        if (punctuate || geresh)	{
            if (num.length === 1) {
                num.push(geresh ? '׳' : "'");
            } else if (num.length > 1) {
                num.splice(-1, 0, geresh ? '״' : '"');
            }
        }

        return num.join('');
    }
}

module.exports = { gematriya };