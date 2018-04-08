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
            przycisk.parent().children('.wynik').html('Temperatura: ' + msg.current.temp_c + ' C, ' + 'Siła wiatru: ' + msg.current.wind_kph + ' km/h ' + '</br>');
        }).fail(function(msg) {
            alert("Proszę podać nazwę miasta!");
            console.log(msg)
        }).always(function(msg) {

        });
    });

    $('#pogoda .pogoda7Dni').click(function() {
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
            for (let i = 0; i <= msg.forecast.forecastday.length; i++) {
                przycisk.parent().children('.wynik').append('Data: ' + '<strong>' + msg.forecast.forecastday[i].date + '</strong>' + ' Temperatura: ' + msg.forecast.forecastday[i].day.maxtemp_c + ' C, ' + 'Siła wiatru: ' + msg.forecast.forecastday[i].day.maxwind_kph +
                    ' km/h ' + '</br>');
            }
        }).fail(function(msg) {
            alert("Proszę podać nazwę miasta!");
            console.log(msg)
        }).always(function(msg) {

        });
    });

    $('#pogoda .pogodaHistoria').click(function() {
        var przycisk = $(this);
        var miasto = przycisk.parent().children('input[type="text"]').val();
        przycisk.parent().children('h2').children('span').text(miasto);
        console.log(miasto);
        $.ajax({
            method: 'GET',
            url: 'http://api.apixu.com/v1/history.json?key=5fdfe9283556479eb5a94607180304&q=' + miasto + '&dt=2018-04-01',
        }).done(function(responseMessage) {
            if ("string" === typeof responseMessage) {
                var msg = JSON.parse(responseMessage);
            } else {
                var msg = responseMessage;
            }
            console.log(msg);
            for (let i = 0; i <= msg.forecast.forecastday.length; i++) {
                przycisk.parent().children('.wynik').append('Data: ' + '<strong>' + msg.forecast.forecastday[i].date + '</strong>' + ' Temperatura: ' + msg.forecast.forecastday[i].day.maxtemp_c + ' C, ' + 'Siła wiatru: ' + msg.forecast.forecastday[i].day.maxwind_kph +
                    ' km/h ' + '</br>');
            }
        }).fail(function(msg) {
            alert("Proszę podać nazwę miasta!");
            console.log(msg)
        }).always(function(msg) {

        });

    });


});