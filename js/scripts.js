$(document).ready(function(){
    $('.carousel').carousel({
        interval: false
    });

    $('.js-place').each(function () {
        $(this).typeahead({hint: true, highlight: true, minLength: 2, limit: 8}, {
            source: function (q, cb) {
                setTimeout(function () {
                    $.get(
                        'https://ewe.ua/ajax/locality/autocomplete',
                        {q: q, t: 'bus'},
                        function(data) {
                            if (data && !data.ajax_cancel) {
                                var result = [];

                                $.each(data, function (i, val) {
                                    result.push({
                                        id: val.geo_locality_id,
                                        value: val.full_name,
                                        country_id: val.geo_country_id
                                    });
                                });
                                cb(result);
                            }
                        }, 'json'
                    );
                }, 200);
            }
        }).on('typeahead:selected', function (event, data) {
            $(this).parent().siblings('.place-id').val(data.id);
            $(this).parent().siblings('.country-id').val(data.country_id);
            $(this).closest('.form-group').addClass('has-success');
            $(this).closest('.form-group').removeClass('has-error');
        }).on('input', function (event, data) {
            $(this).parent().siblings('.place-id').val('');
            $(this).parent().siblings('.country-id').val('');
            $(this).closest('.form-group').removeClass('has-success');
            $(this).closest('.form-group').removeClass('has-error');
        }).on('focusout', function () {
            var val = !$(this).parent().siblings('.place-id').val();

            if (!$(this).parent().siblings('.place-id').val()) {
                $(this).typeahead('val', '');
            }
        });
    });
});