"use strict";
$(document).ready( () => {
    // start with focus in entry textbox
    $("#entry_text").focus().select();
    // set clear button to revert all changes
    $("#clear_entry").click( () => {
        $(":text").val("");
        $("#validation_text").text("");
        $("#entry_text").removeClass("is-invalid").focus(); // check later if can be chained
    });
    // double click to use clear function
    $("#entry_text").dblclick( () => {
        $("#clear_entry").click();
    });
    // change site to reflect Fahrenheit to Celsius
    $("#F_to_C").click( () => {
        $("#entry").text("Enter temperature in Fahrenheit:");
        $("#result").text("Temperature converted to Celsius:");
        $("#clear_entry").click();
    });
    // change site to reflect Celsius to Fahrenheit
    $("#C_to_F").click( () => {
        $("#entry").text("Enter temperature in Celsius:");
        $("#result").text("Temperature converted to Fahrenheit:");
        $("#clear_entry").click();
    });
    // enables button to allow for conversion
    $("#calculate").click( () => {
        let temp = $("#entry_text").val();
        // checks if entry is a number and returns error if not
        if(isNaN(temp) || temp === "") {
            $("#validation_text").text("Please enter a number");
            $("#entry_text").addClass("is-invalid");
            $("#result_text").val("");
        }
        // if a number, removes any previous state changes and calculates temperature
        else{
            $("#validation_text").text("");
            $("#entry_text").removeClass("is-invalid");
            if($("#F_to_C").is(":checked")) {
                temp = (temp - 32) * (5/9);
                temp = temp.toFixed(2);
                temp += "° C";
            }
            else {
                temp = (temp * (9 / 5)) + 32;
                temp = temp.toFixed(2);
                temp += "° F";
            }

            $("#result_text").val(temp);
            $("#entry_text").focus().select();
        }
    })

});