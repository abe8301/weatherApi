window.addEventListener('load', function() {

    $('#pogoda .pogodaDzis').click(function() {
        var przycisk = $(this);
        var miasto = przycisk.parent().children('input[type="text"]').val();
        przycisk.parent().children('h2').children('span').text(miasto);
        console.log(miasto);
        $.ajax({
            method: 'GET',
            url: 'http://api.apixu.com/v1/current.json?key=5fdfe9283556479eb5a94607180304&q=' + miasto,
        }).done(function(responseMessage) {
            if ("string" === typeof responseMessage) {
                var msg = JSON.parse(responseMessage);
            } else {
                var msg = responseMessage;
            }
            console.log(msg);
        }).fail(function(msg) {
            alert("Proszę podać nazwę miasta!");
            console.log(msg)
        }).always(function(msg) {
            przycisk.parent().children('.wynik').text('Temperatura: ' + msg.current.temp_c + ' C, ' + 'Siła wiatru: ' + msg.current.wind_kph + ' km/h ');
            console.log("Temperatura: " + msg['current']['temp_c'] + " Stopni Celsjusza")
        });
    });

    $('#pogoda .pogoda10Dni').click(function() {
        var przycisk = $(this);
        var miasto = przycisk.parent().children('input[type="text"]').val();
        przycisk.parent().children('h2').children('span').text(miasto);
        console.log(miasto);
        $.ajax({
            method: 'GET',
            url: 'http://api.apixu.com/v1/forecast.json?key=5fdfe9283556479eb5a94607180304&q=' + miasto + '&days=7',
        }).done(function(responseMessage) {
            if ("string" === typeof responseMessage) {
                var msg = JSON.parse(responseMessage);
            } else {
                var msg = responseMessage;
            }
            console.log(msg);
        }).fail(function(msg) {
            alert("Proszę podać nazwę miasta!");
            console.log(msg)
        }).always(function(msg) {
            for (let i = 0; i <= msg.forecast.forecastday.length; i++) {
                przycisk.parent().children('.wynik').append('Temperatura: ' + msg['forecast']['forecastday'][i]['day']['avgtemp_c'] + ' C, ' + 'Siła wiatru: ' + msg.forecast.forecastday[i].day.maxwind_kph +
                    ' km/h ' + '</br>');
            }
        });
    });


});