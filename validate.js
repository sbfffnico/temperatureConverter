"use strict";
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

$(document).ready( () => {
    // validate that no textboxes are empty
    $("#reservation-form").submit( event => {
        let isValid = true;

        // validate the arrival date
        const arrivalDate = $("#arrival-date").val().trim();
        if (arrivalDate == "") {
            $("#arrival-date").next().text("This field is required");
            $("#arrival-date").addClass("is-invalid");
            isValid = false;
        }
        else if (!datePattern.test(arrivalDate)) {
            $("#arrival-date").next().text("Arrival date must be in mm/dd/yyyy format");
            $("#arrival-date").addClass("is-invalid");
            isValid = false;
        }
        else if (Date.parse($('#arrival-date').val().trim()) <= Date.now()) {
            $("#arrival-date").next().text("Arrival date must be a future date");
            $("#arrival-date").addClass("is-invalid");
            isValid = false;
        }
        else {
            $("#arrival-date").next().text("");
            $("#arrival-date").removeClass("is-invalid");
        }
        $("#arrival-date").val(arrivalDate);

        // validate the nights
        const nights = $("#nights").val().trim();
        if (nights == "") {
            $("#nights").next().text("This field is required");
            $("#nights").addClass("is-invalid");
            isValid = false;
        }
        else if (isNaN(nights)){
            $("#nights").next().text("Must be a number");
            $("#nights").addClass("is-invalid");
            isValid = false;
        }
        else if (!Number.isInteger(parseFloat(nights))){
            $("#nights").next().text("Cannot have partial nights");
            $("#nights").addClass("is-invalid");
            isValid = false;
        }
        else if (nights <= 0 || nights > 30) {
            $("#nights").next().text("Number of nights must be between 1 - 30");
            $("#nights").addClass("is-invalid");
            isValid = false;
        }
        else {
            $("#nights").next().text("");
            $("#nights").removeClass("is-invalid");
        }
        $("#nights").val(nights);

        // validate the name
        const name = $("#name").val().trim();
        if (name == "") {
            $("#name").next().text("This field is required");
            $("#name").addClass("is-invalid");
            isValid = false;
        }
        else {
            $("#name").next().text("");
            $("#name").removeClass("is-invalid");
        }
        $("#name").val(name);

        // validate the email
        const email = $("#email").val().trim();
        if (email == "") {
            $("#email").next().text("This field is required");
            $("#email").addClass("is-invalid");
            isValid = false;
        }
        else if (!emailPattern.test(email)) {
            $("#email").next().text("Must submit a valid email address");
            $("#email").addClass("is-invalid");
            isValid = false;
        }
        else {
            $("#email").next().text("");
            $("#email").removeClass("is-invalid");
        }
        $("#email").val(email);

        // validate the phone number
        const phoneNumber = $("#phone-number").val().trim();
        if (phoneNumber == "") {
            $("#phone-number").next().text("This field is required");
            $("#phone-number").addClass("is-invalid");
            isValid = false;
        }
        else if (!phonePattern.test(phoneNumber)) {
            $("#phone-number").next().text("Phone number must match ###-###-#### format");
            $("#phone-number").addClass("is-invalid");
            isValid = false;
        }
        else {
            $("#phone-number").next().text("");
            $("#phone-number").removeClass("is-invalid");
        }
        $("#phone-number").val(phoneNumber);

        // validate that a radio button is checked
        if($('[name="contact-method"]').is(':checked')){
            $("#contact-message").text("");
        }
        else{
            $("#contact-message").text("A contact method must be selected");
            isValid = false;
        }

        // prevent submission of form if entries are invalid
        if (isValid == false) {
            event.preventDefault();
            $("#arrival-date").focus();
            $("#arrival-date").select();
        }
    });

    $("#reset-reservation-form").click( () => {
        $(":text").val("");
        $(":radio:checked").val(false);
        $("*").removeClass("is-invalid");
        $("small").text("");
        $("#arrival-date").focus();
    });

});
