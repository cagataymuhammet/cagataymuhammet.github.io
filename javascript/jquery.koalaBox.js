/**
 * jquery.koalaBox.js
 *
 * Caner Akdaş <canerakdas@gmail.com>
 *
 */
var koalaBox = function (title, accept, cancel, width, height, type, close, tab, devMode, koalaId) {
    var kTitle = title;
    var kAccept = accept;
    var kCancel = cancel;
    var kWidth = width;
    var kHeight = height;
    var kPathId = "#koalaBox";
    var kPath = kPathId.replace("#", "");
    var koalaHtml = "";
    var cWidth = window.innerWidth;
    var cHeight = window.innerHeight;
    var kType = type;
    var kTab = tab;
    var bClose = close;
    var devMode = devMode;
    var kProccess = false;
    var koalaId = koalaId;
    $(kPathId).remove();
    //Koala Function
    var koalaTab = function () {
        if (kTab == true) {
            switch (kType) {
                case "categorySave":
                    if (devMode == true) {
                        console.log("Koala categoryTAB ekleniyor");
                    }
                    location.hash = "";
                    var koalaTabHtml = "";
                    var koalaTabId = "";
                    koalaTabHtml += "<ul id='koalaTab'>";
                    koalaTabHtml += "<li class='active'><a href='#k0'>Genel</a></li>";
                    koalaTabHtml += "<li><a href='#k1'>Resimler</a></li>";
                    koalaTabHtml += "<li><a href='#k2'>Dosyalar</a></li>";
                    koalaTabHtml += "<li><a href='#k3'>Özel Tanımlı</a></li>";
                    //if (devMode == true) {
                    //    koalaTabHtml += "<li><span class='icon-embed2'></span></li>";
                    //}
                    koalaTabHtml += "</ul>";
                    $("#kButton").append(koalaTabHtml);
                    koalaTabHtml = "";
                    $("#koalaTab li").each(function (i) {
                        koalaTabId = $(this).children("a").attr("href");
                        koalaTabHtml += "<div class='koalaTab' id='k" + i + "'>" + i;
                        koalaTabHtml += "</div>";
                    });
                    $("#kContent").append(koalaTabHtml);
                    $(".koalaRow").css("height", (kHeight - 75) / 4);
                    $(".koalaRow").css("width", (kWidth - 1));
                    $("#kContent,.koalaTab").css("height", kHeight - 71);
                    //if (devMode == true) {
                    //    var notNull = false;
                    //    $(".koalaRow").addClass("devRow");
                    //    $(".koalaTab").sortable();
                    //    $(".icon-text-format").click(function () {
                    //        if (notNull == false) {
                    //            $(this).addClass("active");
                    //            notNull = true;
                    //        }
                    //        else {
                    //            $(this).removeClass("active");
                    //            notNull = false;
                    //        }
                    //    });
                    //}

                    $("#koalaTab li").click(function () {
                        var openTab = $(this).children("a").attr("href");
                        $("#koalaTab li").removeClass("active");
                        $(this).addClass("active");
                        $(".koalaTab").css("display", "none");
                        $(openTab).css("display", "block");
                        $("#kTitle h2").html(kTitle + " / " + $(this).text());
                    });
                    $("#koalaTab li:first-child a").click();
                    break;
                case "categoryCreate":
                    break;
                default:
            }
        }
    };

    var koalaSave = function () {

        if (devMode == true) {
            console.log("Koala düzenleniyor");
        }
        kProccess = true;
        $(kPathId + " #kButton .green b i").animate({ width: "100%" }, 2000, function () {
            kProccess = false;
            switch (kType) {
                case "categorySave":
                    var categoryName = "";
                    var validateCategoryName = "";
                    var categoryType = 0;
                    var categoryColor = 0;
                    var categoryImage = "";
                    var categoryPrivacy = false;
                    $(".koalaRow").each(function () {
                        if ($(this).attr("processing") == "categoryName") {
                            categoryName = $(this).find(".span5 input").val();
                            categoryName = categoryName.replace(/'/g, "");
                            categoryName = categoryName.replace(/"/g, "");
                            validateCategoryName = categoryName.replace(/ /g, "");
                        }
                        else if ($(this).attr("processing") == "categoryType") {
                            categoryType = $(this).find(".span5 .spanSelect").attr("path");
                        }
                        else if ($(this).attr("processing") == "categoryColor") {
                            categoryColor = $(this).find(".span5 .spanColor").attr("path");
                        }
                        else if ($(this).attr("processing") == "categoryPrivacy") {
                            categoryPrivacy = $(this).find(".span5 .spanBoolean").attr("path");
                        }
                        else if ($(this).attr("processing") == "categoryImage") {
                            categoryImage = $(this).find(".span5 .spanImage").val();
                          
                        }
                    });

                    if (validateCategoryName == "" || categoryType == 0 || categoryColor == 0) {
                        alert("HATA");
                    }
                    else {

                    }
                    $.post('view/category/post.aspx', { f: '5', categoryName: categoryName, categoryId: koalaId, categoryType: categoryType, categoryColor: categoryColor, categoryPrivacy: categoryPrivacy, categoryImage: categoryImage }, function (result) {
                        if (devMode == true) {
                            console.log(result);
                        }
                        var categoryNameText = "";
                        $(".categoryTab").each(function () {
                            if ($(this).attr("id") == koalaId) {
                                $(".koalaRow").each(function () {
                                    if ($(this).attr("processing") == "categoryName") {
                                        categoryNameText = $(this).find(".span5 input").val();
                                    }
                                });
                                $(this).find(".categoryTitle").html(categoryNameText);
                            }

                        });
                    });
                    break;
                case "categorySort":
                    $(".shortRow li").each(function (i) {
                        var shortPath = $(this).attr("shortPath");
                        $.post('view/category/post.aspx', { f: '3', shortPath: shortPath, id: i }, function () { });
                    });
                    koalaClose(600)
                    getCategory();
                    break;
                default:
            }
            $(kPathId + " #kButton .green span a").addClass("icon-done");
            $(kPathId + " #kButton .green span .icon-done").css("font-size", "12px");
            $(kPathId + " #kButton .green b i").css("width", "0px");
            setTimeout(function () {
                $(kPathId + " #kButton .green span .icon-done").css("font-size", "0px");
            }, 3000)
        });

    };

    var koalaDelete = function () {
        if (devMode == true) {
            console.log("Koala siliniyor");
        }
        kProccess = true;
        $(kPathId + " #kButton .red b i").animate({ width: "100%" }, 2000, function () {
            kProccess = false;

            switch (kType) {
                case "categorySave":
                    $.post('view/category/post.aspx', { f: '6', categoryId: koalaId, categoryDeleted: true }, function (result) {
                        if (devMode == true) {
                            console.log(result);
                        }
                        $(".categoryTab").each(function () {
                            var deletedId = $(this).attr("id");
                            if (deletedId == koalaId) {
                                $(this).addClass("categoryDeleted");
                                var deletedName = $(this).find(".categoryTitle").html();
                                $(this).find(".categoryTitle").html(deletedName + " <span class='deletedText'>isimli Kategori silindi.</span><span class='reBorn'>Geri Al</span>");
                            }
                        });

                    });
                    break;
                case "categorySort":
                    break;
                default: {

                }
            }
            koalaClose(600);
        });
    };

    var koalaContent = function () {
        switch (kType) {
            case "categorySave":
                if (devMode == true) {
                    console.log("Koala kategori içerikleri ekleniyor");
                }
                $.post("view/category/post.aspx", { f: "4", id: koalaId }, function (result) {
                    $("#kContent").html("");
                    $("#kContent").append(result);
                    $(".spanSelect").focus(function () {
                        $(this).addClass("spanSelectFocus");
                        $(this).parent().find(".selectList").fadeIn();
                        $(this).parent().find(".icon-menu").addClass("active");
                    });
                    $(".spanSelect").focusout(function () {
                        $(this).removeClass("spanSelectFocus");
                        $(this).parent().find(".selectList").fadeOut();
                        $(this).parent().find(".icon-menu").removeClass("active");
                    });
                    $(".icon-menu").click(function () {
                        $(this).parent().find(".spanSelect").focus();
                    });

                    $(".spanColor").focus(function () {
                        $(this).parent().find(".colorList").fadeIn();
                    });
                    $(".spanColor").focusout(function () {
                        $(this).parent().find(".colorList").fadeOut();
                    });
                    $(".icon-droplet").click(function () {
                        $(this).parent().find(".spanColor").focus();
                    });

                    $(".colorList li").click(function () {
                        $(this).parent().parent().find(".spanColor").attr("value", $(this).attr("colorValue"));
                        $(this).parent().parent().find(".icon-droplet").css("color", $(this).attr("colorValue"));
                        $(this).parent().parent().find(".spanColor").attr("path", $(this).attr("path"));
                    });
                    $(".spanBoolean").click(function () {
                        if ($(this).find("div").attr("class") == "bFalse") {
                            $(this).find("div").removeClass("bFalse");
                            $(this).find("div").addClass("bTrue");
                            $(this).attr("path", "True");
                        }
                        else {
                            $(this).find("div").removeClass("bTrue");
                            $(this).find("div").addClass("bFalse");
                            $(this).attr("path", "False");
                        }
                    });
                    $(".selectList li").click(function () {
                        $(this).parent().parent().find(".spanSelect").attr("value", $(this).text());
                        $(this).parent().parent().find(".spanSelect").html($(this).text());
                        $(this).parent().parent().find(".spanSelect").attr("path", $(this).attr("path"));
                    });

                    $('.spanImage[type=text]').click(function () {
                        $('.spanFile[type=file]').trigger('click');
                    });

                    $('.spanFile[type=file]').change(function () {
                        $('.spanImage[type=text]').val($(this).val());
                    });

                });
                break;
            case "categorySort":
                $.post('view/category/post.aspx', { f: '2' }, function (result) {
                    $("#kContent").append(result);
                    $(".shortRow").sortable();
                    $(".shortRow li").each(function (i) {
                        $(this).prepend("<span>" + i + "</span>")
                    });
                });
                break;
            default:
        }
    };

    var koalaCreate = function () {
        setTimeout(function () {
            $(kPathId).css("height", kHeight);
            $(kPathId).css("width", kWidth);
            $(kPathId).addClass("animated bounceInDown");
            $(kPathId).css("left", ((cWidth / 2) - (kWidth / 2)));
            $(kPathId).css("top", ((cHeight / 2) - (kHeight / 2)));
        }, 100);

        koalaHtml += "<div id='" + kPath + "'>";
        koalaHtml += "<div id='kTitle'><h2>" + kTitle + "</h2><span class='icon-close'></span></div>";
        koalaHtml += "<div id='kContent'></div>";
        if (kAccept != "" || kCancel != "") {
            koalaHtml += "<div id='kButton'>";
            if (kAccept != "") {
                koalaHtml += "<div class='green'><span><a></a>" + kAccept + "</span><b><i></i></b></div>";
            }
            if (kCancel != "") {
                koalaHtml += "<div class='red'><span><a></a>" + kCancel + "</span><b><i></i></b></div>";
            }
            koalaHtml += "</div>";
        }
        koalaHtml += "</div>";
        $("body").append(koalaHtml);
        if (devMode == true) {
            console.log("\nKoalaBox oluşturuluyor... \nKoala Başlık:" + kTitle + "\nKoala Buton 1:" + kAccept + "\nKoala Button 2:" + kCancel + "\nKoala Tipi:" + kType + "\n");
        }
    };

    var koalaCenter = function () {
        $(kPathId).css("left", ((cWidth / 2) - (kWidth / 2)));
        $(kPathId).css("top", ((cHeight / 2) - (kHeight / 2)));

        $(window).resize(function () {
            var cWidth = window.innerWidth;
            var cHeight = window.innerHeight;
            $(kPathId).css("left", ((cWidth / 2) - (kWidth / 2)));
            $(kPathId).css("top", ((cHeight / 2) - (kHeight / 2)));
        });
    };

    function koalaClose(delayTime) {
        if (kProccess != true) {
            $(kPathId).addClass("animated bounceOutUp");
            setTimeout(function () {
                $(kPathId).remove();
            }, delayTime);
            if (devMode == true) {
                console.log("Koala kapatıldı");
            }

        }
        else {
            $(kPathId).removeClass("animated bounceInDown");
            $(kPathId).addClass("animated shake");
        }
    }
    //Koala Main
    koalaCreate();
    koalaContent();
    koalaTab();
    koalaCenter();
    //Koala Event

    $(kPathId + " #kTitle span").click(function () { koalaClose(800); });
    $(kPathId + " #kButton .green").click(function () { if (kProccess != true) { koalaSave(); } });
    $(kPathId + " #kButton .red").click(function () { if (kProccess != true) { koalaDelete(); } });
    $(document).keyup(function (e) { if (e.keyCode == 27) { koalaClose(800); } });

};