/* global tiAboutPageObject */
/* global console */

jQuery(document).ready(function () {

    /* If there are required actions, add an icon with the number of required actions in the About ti-about-page page -> Actions required tab */
    var ti_about_page_nr_actions_required = tiAboutPageObject.nr_actions_required;

    if ( (typeof ti_about_page_nr_actions_required !== 'undefined') && (ti_about_page_nr_actions_required !== '0') ) {
        jQuery('li.ti-about-page-w-red-tab a').append('<span class="ti-about-page-actions-count">' + ti_about_page_nr_actions_required + '</span>');
    }

    /* Dismiss required actions */
    jQuery('.ti-about-page-required-action-button').click(function() {

        var id = jQuery(this).attr('id'),
            action = jQuery(this).attr('data-action');

        jQuery.ajax({
            type      : 'GET',
            data      : { action: 'ti_about_page_dismiss_required_action', id: id, todo: action },
            dataType  : 'html',
            url       : tiAboutPageObject.ajaxurl,
            beforeSend: function () {
                jQuery('.ti-about-page-tab-pane#actions_required h1').append('<div id="temp_load" style="text-align:center"><img src=' + tiAboutPageObject.template_directory + '"/belise-about-page/images/ajax-loader.gif" /></div>');
            },
            success   : function () {
                location.reload();
                jQuery('#temp_load').remove();
                /* Remove loading gif */
            },
            error     : function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
            }
        });
    });
});