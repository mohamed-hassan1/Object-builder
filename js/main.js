/*global $, jQuery, alert, document, window, setTimeout*/
/*jslint plusplus: true */

$(document).ready(function () {
    "use strict";
    var content = $(".field .form-group .content1"),
        content3 = $(".field .form-group .content3");    
    // Create active line
    if (!(content).hasClass("lineCreated")) {
        content.addClass("lineCreated");
        content.append("<span class='active-line'></span>");
    }
    
    // add class String for value field container
    content3.addClass("string");
    // add active-icon class to (add/remove) icon
    $(".field .add-field .icon, .field .remove-field .icon").addClass("active-icon");
    
    $("body").on('click', '.container .field ul', function (e) {
        e.stopPropagation();
    });
    
    //Type select function
    $("body").on('click', '.field ul li', function () {
        var typeDropDown = $(this).closest(".content2").children("ul"),
            btnText = $(this).parent("ul").prev("button").find("span"),
            valueContent = $(this).closest(".content3");
        // Create active line
        if (!(valueContent.hasClass("lineCreated"))) {
            valueContent.addClass("lineCreated");
            valueContent.append("<span class='active-line'></span>");
        } else {
            var activeLine = $(this).closest(".content3").children(".active-line"),
                allActiveLines = $(".field .active-line");
            allActiveLines.fadeOut(200);
            activeLine.fadeIn(200);
        }
        // enter selected type text into button
        btnText.text($(this).text());
        // hide dropdown
        typeDropDown.slideUp(200);    
        
        // if String Selected
        if ($(this).text() == "String") {
            var fieldContainer = $(this).closest(".content-group").children(".content3"),
                typeContainer = $(this).closest(".content-group").children(".content2"),
                contentGroup = $(this).closest(".content-group"),
                formGroup = $(this).closest(".form-group"),
                activeIcon = typeContainer.closest(".field");
            //check if fieldContainer have number/boolean class.. check if typeContainer have array/object class
            if (fieldContainer.hasClass("number") || fieldContainer.hasClass("boolean") || typeContainer.hasClass("array") || typeContainer.hasClass("object")) {
                if (!(fieldContainer.hasClass("string"))) {
                    // check if has child
                    if (formGroup.hasClass("addArray") || formGroup.hasClass("addObject")) {
                        // remove class and childs
                        formGroup.removeClass("addArray addObject");
                        formGroup.nextAll(".array-field, .object-field").remove();
                    }
                    // delet field container
                    fieldContainer.remove();
                    // remove class array/object from type container
                    typeContainer.removeClass("array object");
                    // remove style attribute
                    contentGroup.removeAttr("style");
                    typeContainer.removeAttr("style");
                    // Create string field container
                    var stringValue = document.createElement("div");
                    // check if the type container was array or not
                    if (typeContainer.hasClass("array-content1")) {
                        //remove style
                        contentGroup.children(".array-num").removeAttr("style");
                        // add class (content3 array-content2 string)
                        stringValue.setAttribute("class", "content3 array-content2 string");
                    } else {
                        // add class (content3 string)
                        stringValue.setAttribute("class", "content3 string");
                    }
                    // create field content
                    stringValue.innerHTML =
                        "<label>Value</label>" +
                        "<input type='text'>";
                    var copyString = $(stringValue).clone();
                    //insert string field after type container
                    copyString.insertAfter(typeContainer);
                }
            }
        }
    
        // if Number Selected
        if ($(this).text() == "Number") {
            var fieldContainer = $(this).closest(".content-group").children(".content3"),
                typeContainer = $(this).closest(".content-group").children(".content2"),
                contentGroup = $(this).closest(".content-group"),
                formGroup = $(this).closest(".form-group");
            if (fieldContainer.hasClass("string") || fieldContainer.hasClass("boolean") || typeContainer.hasClass("array") || typeContainer.hasClass("object")) {
                if (!(fieldContainer.hasClass("number"))) {
                    // check if has child
                    if (formGroup.hasClass("addArray") || formGroup.hasClass("addObject")) {
                        // remove class and childs
                        formGroup.removeClass("addArray addObject");
                        formGroup.nextAll(".array-field, .object-field").remove();
                    }
                    fieldContainer.remove();
                    typeContainer.removeClass("array object");
                    contentGroup.removeAttr("style");
                    typeContainer.removeAttr("style");
                    // Create number field container
                    var numberValue = document.createElement("div");
                    if (typeContainer.hasClass("array-content1")) {
                        numberValue.setAttribute("class", "content3 array-content2 number");
                        contentGroup.children(".array-num").removeAttr("style");
                    } else {
                        numberValue.setAttribute("class", "content3 number");
                    }
                    // create field content
                    numberValue.innerHTML =
                        "<label>Value</label>" +
                        "<input type='number'>";
                    var copyNumber = $(numberValue).clone();
                    //insert number field after type container
                    copyNumber.insertAfter(typeContainer);
                }
            }
        }
        
        // if Boolean Selected
        if ($(this).text() == "Boolean") {
            var fieldContainer = $(this).closest(".content-group").children(".content3"),
                typeContainer = $(this).closest(".content-group").children(".content2"),
                contentGroup = $(this).closest(".content-group"),
                formGroup = $(this).closest(".form-group");
            if (fieldContainer.hasClass("string") || fieldContainer.hasClass("number") || typeContainer.hasClass("array") || typeContainer.hasClass("object")) {
                if (!(fieldContainer.hasClass("boolean"))) {
                    // check if has child
                    if (formGroup.hasClass("addArray") || formGroup.hasClass("addObject")) {
                        // remove class and childs
                        formGroup.removeClass("addArray addObject");
                        formGroup.nextAll(".array-field, .object-field").remove();
                    }
                    fieldContainer.remove();
                    typeContainer.removeClass("array object");
                    contentGroup.removeAttr("style");
                    typeContainer.removeAttr("style");
                    // Create Boolean field container
                    var booleanValue = document.createElement("div");
                    if (typeContainer.hasClass("array-content1")) {
                        booleanValue.setAttribute("class", "content3 array-content2 boolean");
                        contentGroup.children(".array-num").removeAttr("style");
                    } else {
                        booleanValue.setAttribute("class", "content3 boolean");
                    }
                    // Create field content
                    booleanValue.innerHTML =
                        "<label>Value</label>" +
                        "<button type='button'><span>True</span></button>" +
                        "<ul>" +
                            "<li>True</li>" +
                            "<li>False</li>" +
                        "</ul>";
                    var copyBoolean = $(booleanValue).clone();
                    //insert boolean field after type container
                    copyBoolean.insertAfter(typeContainer);
                }
            }
        }
        
        // if Array Selected
        if ($(this).text() == "Array") {
            var aNum = $(this).closest(".content-group").children(".array-num"),
                aContent1 = $(this).closest(".content-group").children(".array-content1"),
                aContent2 = $(this).closest(".content-group").children(".array-content2"),
                mainContent2 = $(this).closest(".content-group").children(".content2"),
                mainContent3 = $(this).closest(".content-group").children(".content3"),
                contentG = $(this).closest(".content-group"),
                formGroup = $(this).closest(".field").children(".form-group");
            // remove active-icon class form (add/remove) icon
            $(".icon").removeClass("active-icon");
            // Array css
            // check if has child
            if (formGroup.hasClass("addObject")) {
                // remove class and childs
                formGroup.removeClass("addObject");
                formGroup.nextAll(".object-field").remove();
            }
            aContent1.addClass("array");
            aContent2.remove();
            mainContent3.remove();
            mainContent2.css("width", "100%");
            mainContent2.children("button").css("border-right-color", "#eaeaea");
            mainContent2.addClass("array");
            contentG.css("width", "14%");
            aContent1.css("width", "80%");
            aNum.css("width", "20%");
            aContent1.children("button").css("border-right-color", "#eaeaea");
            // Create array
            // 0 = array number
            // true for insert arrayField after last arrayField
            createArray(this, 0, formGroup, true);
            // add string class
            $(".content-group .content3").addClass("string");
            // if array-field number bigger than 1
            // then delet (add-field) for all array-field except the last array-field
            if ($(this).closest(".field").children(".array-field").length > 1) {
                $(this).closest(".field").children(".array-field:last").prevAll(".array-field").children(".add-field").remove();
            }
        }
        
        // if Object Selected
        if ($(this).text() == "Object") {
            var mainContent2 = $(this).closest(".content-group").children(".content2"),
                mainContent3 = $(this).closest(".content-group").children(".content3"),
                formGroup = $(this).closest(".field").children(".form-group"),
                contentG = $(this).closest(".content-group"),
                aNum = $(this).closest(".content-group").children(".array-num"),
                aContent1 = $(this).closest(".content-group").children(".array-content1"),
                aContent2 = $(this).closest(".content-group").children(".array-content2"),
                aContentG = $(this).closest(".array-content");
            // remove active-icon class form (add/remove) icon
            $(".icon").removeClass("active-icon");
            // Object css
            // check if has child
            if (formGroup.hasClass("addArray")) {
                // remove class and childs
                formGroup.removeClass("addArray");
                formGroup.nextAll(".array-field").remove();
            }
            if (!(formGroup.parent().hasClass("array-field"))) {
                mainContent3.remove();
                mainContent2.css("width", "100%");
                mainContent2.children("button").css("border-right-color", "#eaeaea");
                mainContent2.addClass("object");
                contentG.css("width", "14%");
            } else {
                aContent2.remove();
                aContent1.css("width", "80%");
                aNum.css("width", "20%");
                aContentG.css("width", "14%");
                aContent1.children("button").css("border-right-color", "#eaeaea");
            }
            // Create Object
            // false for add dash border for muti container fields
            // true for insert objectField after last objectField
            createObject(this, formGroup, false, true);
            // add string class
            $(".content-group .content3").addClass("string");
            // if object-field number bigger than 1
            // then delet (add-field) for all object-field except the last object-field
            if ($(this).closest(".field").children(".object-field").length > 1) {
                $(this).closest(".field").children(".object-field:last").prevAll(".object-field").children(".add-field").remove();
            }
        }
    });
    
    //Boolean show/hide drop menu and show active line
    $("body").on('click', '.field .boolean ul li', function (e) {
        var dropDown = $(this).parent("ul"),
            activeLine = $(this).closest(".content2").find(".active-line");
        e.stopPropagation();
        // show/hide dropdown
        dropDown.slideToggle(200);
        // show active line
        activeLine.fadeIn(200);        
    });
    
    // Button add Active line and show/hide drop menu
    $("body").on('click', '.content-group button', function (e) {
        var typeDropDown = $(this).next("ul"),
            allActiveLines = $(".field .active-line"),
            allBtn = $(".field button"),
            content = $(this).parent();
        e.stopPropagation();
        // remove class arrow from all fields button
        allBtn.removeClass("arrow");
        // add class arrow for this button
        $(this).addClass("arrow")
        if (!(content.hasClass("lineCreated"))) {
            // add class line created to the container
            content.addClass("lineCreated");
            // hide all active lines
            allActiveLines.fadeOut(200);
            // create active line
            content.append("<span class='active-line'></span>");
        } else {
            var lineActive = $(this).parent(".content2").find(".active-line");
            // hide all active lines
            allActiveLines.fadeOut(200);
            // show line active
            lineActive.fadeIn(200);
        }
        // show/hide drop menu
        typeDropDown.slideToggle(200);
    });
    
    // show active line on focusIn
    $("body").on('focusin', '.field input', function () {
        var valueContainer = $(this).parent(),
            allActiveLines = $(".field .active-line");
        
        if (!(valueContainer.hasClass("lineCreated"))) {
            valueContainer.addClass("lineCreated");
            allActiveLines.fadeOut(200);
            valueContainer.append("<span class='active-line'></span>");
        } else {
            var lineActive = valueContainer.children(".active-line");
            allActiveLines.fadeOut(200);
            lineActive.fadeIn(200);
        }
    });
    
    // hide active line on focusOut
    $("body").on('focusout', '.field input', function () {
        var allActiveLines = $(".field .active-line");
        allActiveLines.fadeOut(200);
    });
    
    // array number
    var arrayClick = 0;
    
    // Add field icon
    $("body").on('click', '.add-field .icon', function() {
        var copy = $(this).parent().parent(),
            formGroup = copy.children(".form-group");
        // remove active-icon class from all fields (add/remove) icons
        $(".icon").removeClass("active-icon");
        // if field container is object
        if (copy.hasClass("object-field")) {
            // Create object
            // true for not add dash border for single container field but add dash border for multi container fields
            // false for add fields rormally
            createObject(this, formGroup, true, false);
            // add string class
            $(".content-group .content3").addClass("string");
            // if object-field number bigger than 1
            // then delet (add-field) for all object-field except the last object-field
            if ($(this).parent().parent().parent().children(".object-field").length > 1) {
                $(this).parent().parent().parent().children(".object-field:last").prevAll(".object-field").children(".add-field").remove();
            }
            // if field container is array
        } else if (copy.hasClass("array-field")) {
            var arrayNum = $(this).parent().parent().parent().children(".array-field:last").find(".array-num");
            // if array number = 0
            if (arrayNum.text() == 0) {
                arrayClick = 0;
                arrayClick += 1;
            } else {
                var saveNum = $(this).parent().parent().children(".form-group").children(".content-group").children(".array-num").children("span").text();
                arrayClick = Number(saveNum) + 1;
            }
            // Create array
            // arrayClick = array number
            // false for add fields rormally
            createArray(this, arrayClick, formGroup, false);
            $(".content-group .content3").addClass("string");
            if ($(this).parent().parent().parent().children(".array-field").length > 1) {
                $(this).parent().parent().parent().children(".array-field:last").prevAll(".array-field").children(".add-field").remove();
            }
            
        }
    })
    
    // Remove field
    $("body").on('click', '.remove-field .icon', function() {
        var field = $(this).parent().parent().parent(),
            fieldContainer = $(this).parent().parent().parent().parent(),
            formGroup = $(this).parent().parent().parent().children(".form-group"),
            containerFormGroup = fieldContainer.children(".form-group"),
            lastField = field.prev();
        // remove active-icon class from all fields (add/remove) icons
        $(".icon").removeClass("active-icon");
        // if fields bigger than 1 and has add-field
        if (field.children().hasClass("add-field") && fieldContainer.children(".field").length > 1) {
            // Create add field
            var addField = document.createElement("div");
            addField.setAttribute("class", "add-field");
            // add field content
            addField.innerHTML =
                "<div class='icon'>" +
                    "<span>+</span>" +
                "</div>";
            var copyField = $(addField).clone();
            // insert addField in last field
            lastField.append(addField);
            // remove field
            field.remove();
            // add class active-icon to last field
            lastField.find(".icon").addClass("active-icon");
        }
        if (field.hasClass("dash-border")) {
            field.remove();
            if (field.hasClass("array-field")) {
                containerFormGroup.removeClass("addArray");
            } else if (field.hasClass("object-field")) {
                containerFormGroup.removeClass("addObject");
            }
        }
        // remove field
        field.remove();
    })
    // body click
    $(document).on('click', 'body', function () {
        // hide drop menu
        $(".field ul").slideUp(200);
    });
});

// Create Array function
function createArray(array, arrayClick, insertAfter, state) {
    "use strice";
    var formGroup = insertAfter,
        field = $(array).parent().parent(),
        arrayField = document.createElement("div");
    arrayField.setAttribute("class", "field array-field dash-border");
    arrayField.innerHTML =
        "<div class='form-group'>" +
            "<div class='content-group array-content'>" +
                "<div class='array-num'>" +
                    "<span>" + arrayClick + "</span>" +
                "</div>" +
                "<div class='content2 array-content1'>" +
                    "<label>Type</label>" +
                    "<button type='button'>" +
                        "<span>String</span>" +
                    "</button>" +
                    "<ul>" +
                        "<li>String</li>" +
                        "<li>Number</li>" +
                        "<li>Boolean</li>" +
                        "<li>Array</li>" +
                        "<li>Object</li>" +
                    "</ul>" +
                "</div>" +
                "<div class='content3 array-content2'>" +
                    "<label>Value</label>" +
                    "<input type='text' class='value_field'>" +
                "</div>" +
            "</div>" +
            "<div class='remove-field'>" +
                "<div class='icon active-icon'>" +
                    "<span>_</span>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "<div class='add-field'>" +
            "<div class='icon active-icon'>" +
                "<span>+</span>" +
            "</div>" +
        "</div>";
        var copyArray = $(arrayField).clone(),
            pastLast = state;
    if (pastLast == true) {
        if (!(formGroup.hasClass("addArray"))) {
            formGroup.addClass("addArray");
            copyArray.insertAfter(formGroup);
        } else {
            // insert field after the last field
            copyArray.insertAfter($(array).closest(".field").children(".array-field:last"));
        }
    } else if (pastLast == false) {
        if (!(formGroup.hasClass("addArray"))) {
                formGroup.addClass("addArray");
            }
        copyArray.insertAfter(field);
    }
}

// Create Object function
function createObject(object, insertAfter,state1, state2) {
    "use strict";
    var dashBorder = state1,
        formGroup = insertAfter,
        field = $(object).parent().parent(),
        objectField = document.createElement("div");
    objectField.setAttribute("class", "field object-field dash-border");
    if (dashBorder == true) {
        if (!(field.hasClass("dash-border"))) {
            objectField.setAttribute("class", "field object-field");
        } else {
            // add dash border
            objectField.setAttribute("class", "field object-field dash-border");
        }
    }
    objectField.innerHTML =
        "<div class='form-group'>" +
            "<div class='content1'>" +
                "<label for='field'>Field</label>" +
                "<input type='text' id='field'>" +
            "</div>" +
            "<div class='sign'><span>=</span></div>" +
            "<div class='content-group'>" +
                "<div class='content2'>" +
                    "<label>Type</label>" +
                    "<button type='button'><span>String</span></button>" +
                    "<ul>" +
                        "<li>String</li>" +
                        "<li>Number</li>" +
                        "<li>Boolean</li>" +
                        "<li>Array</li>" +
                        "<li>Object</li>" +
                    "</ul>" +
                "</div>" +
                "<div class='content3'>" +
                    "<label for='value'>Value</label>" +
                    "<input type='text' class='value_field'>" +
                "</div>" +
            "</div>" +
            "<div class='remove-field'>" +
                "<div class='icon active-icon'>" +
                    "<span>_</span>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "<div class='add-field'>" +
            "<div class='icon active-icon'>" +
                "<span>+</span>" +
            "</div>" +
        "</div>";
    var copyObject = $(objectField).clone(),
        pastLast = state2;
    if (pastLast == true) {
        if (!(formGroup.hasClass("addObject"))) {
            formGroup.addClass("addObject");
            copyObject.insertAfter(formGroup);
        } else {
            // insert field after the last field
            copyObject.insertAfter($(object).closest(".field").children(".object-field:last"));
        }
    } else if (pastLast == false) {
        if (!(formGroup.hasClass("addObject"))) {
                formGroup.addClass("addObject")
            }
        copyObject.insertAfter(field);
    }
}