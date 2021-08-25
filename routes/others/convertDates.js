const gematriya = require("./gematriya");
	
var MonthH = new Array("תשרי","חשון","כסליו","טבת","שבט","אדר","אדר_ב","ניסן","אייר","סיון","תמוז","אב","אלול");
var MonthG = new Array ("ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר", "דצמבר");
var DateH = new Array ("א","ב","ג","ד","ה","ו","ז","ח","ט","י","יא","יב","יג","יד","טו","טז","יז","יח","יט","כ","כא","כב","כג","כד","כה","כו","כז","כח","כט","ל");
var DateG = new Array (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31);

//set hebrew Month as number in map
var monthHMap = new Map();
for (var i = 0 ; i < MonthH.length ;i++){
  monthHMap.set(MonthH[i],i+1);
}

var dayHMap = new Map();
for (var i = 0 ; i < DateH.length ;i++){
  dayHMap.set(DateH[i],i+1);
}


  
  function MonSinceFirstMolad(nYearH) {
    var nMonSinceFirstMolad;
      nYearH --;
      nMonSinceFirstMolad = Math.floor(nYearH / 19) * 235;
      nYearH = nYearH % 19;
    // Add 12 months for each of those years
    nMonSinceFirstMolad += 12 * nYearH;
    // Add the extra months to account for the leap years
    if (nYearH >= 17) {
      nMonSinceFirstMolad += 6;
    } else if  (nYearH >= 14) {
      nMonSinceFirstMolad += 5;
    } else if  (nYearH >= 11) {
      nMonSinceFirstMolad += 4;
    } else if  (nYearH >= 8) {
      nMonSinceFirstMolad += 3;
    } else if  (nYearH >= 6) {
      nMonSinceFirstMolad += 2;
    } else if  (nYearH >= 3) {
      nMonSinceFirstMolad += 1;
    }
    return nMonSinceFirstMolad
  }
 
  function IsLeapYear(nYearH) {
    var nYearInCycle;
    nYearInCycle = nYearH % 19;
    return ( nYearInCycle ==  3 ||
             nYearInCycle ==  6 ||
             nYearInCycle ==  8 ||
             nYearInCycle == 11 ||
             nYearInCycle == 14 ||
             nYearInCycle == 17 ||
             nYearInCycle == 0);
  }
 
  function Tishrei1(nYearH) {
    var nMonthsSinceFirstMolad;
    var nChalakim;
    var nHours;
    var nDays;
    var nDayOfWeek;
    var dTishrei1;
 
    nMonthsSinceFirstMolad = MonSinceFirstMolad(nYearH);
    nChalakim = 793 * nMonthsSinceFirstMolad;
    nChalakim += 204;
    // carry the excess Chalakim over to the hours
    nHours = Math.floor(nChalakim / 1080);
    nChalakim = nChalakim % 1080;
 
    nHours += nMonthsSinceFirstMolad * 12;
    nHours += 5;
 
    // carry the excess hours over to the days
    nDays = Math.floor(nHours / 24);
    nHours = nHours % 24;
 
    nDays += 29 * nMonthsSinceFirstMolad;
    nDays += 2;
    nDayOfWeek = nDays % 7;
 
    if (!IsLeapYear(nYearH) &&
        nDayOfWeek == 3 &&
        (nHours * 1080) + nChalakim >= (9 * 1080) + 204) {
      nDayOfWeek = 5;
      nDays += 2;
    }
    else if ( IsLeapYear(nYearH - 1) &&
              nDayOfWeek == 2 &&
              (nHours * 1080) + nChalakim >= (15 * 1080) + 589 ) {
      nDayOfWeek = 3;
      nDays += 1;
    }
    else {
      // see rule 2 above. Check the Hebrew year 5765 for an example
      if (nHours >= 18) {
        nDayOfWeek += 1;
        nDayOfWeek = nDayOfWeek % 7;
        nDays += 1;
      }
      // see rule 1 above. Check the Hebrew year 5765 for an example
      if (nDayOfWeek == 1 ||
          nDayOfWeek == 4 ||
          nDayOfWeek == 6) {
        nDayOfWeek += 1;
        nDayOfWeek = nDayOfWeek % 7;
        nDays += 1;
      }
    }
 
    nDays -= 2067025;
    dTishrei1 = new Date(1900, 0, 1); // 2067025 days after creation
    dTishrei1.setDate(dTishrei1.getDate() + nDays);
 
    return dTishrei1;
   }
 
 
  // This function gets the length of a Hebrew year.
  function LengthOfYear(nYearH) {
    var dThisTishrei1;
    var dNextTishrei1;
    var diff;
 
    // subtract the date of this year from the date of next year
    dThisTishrei1 = Tishrei1(nYearH);
    dNextTishrei1 = Tishrei1(nYearH + 1);
    diff = (dNextTishrei1 - dThisTishrei1) / ( 1000 * 60 * 60 * 24);
    return Math.round(diff);
  }
 
  function HebToGreg(nYearH, nMonthH, nDateH) {
    var nLengthOfYear;
    var bLeap;
    var dGreg;
    var nMonth;
    var nMonthLen;
    var bHaser;
    var bShalem;
 
    bLeap = IsLeapYear(nYearH);
    nLengthOfYear = LengthOfYear(nYearH);
 
    

    bHaser = (nLengthOfYear == 353 || nLengthOfYear == 383);
    bShalem = (nLengthOfYear == 355 || nLengthOfYear == 385);
 
    // get the date for Tishrei 1
    dGreg = Tishrei1(nYearH);
 
    // Now count up days within the year
    for (nMonth = 1; nMonth <= nMonthH - 1; nMonth ++) {
      if (nMonth == 1 ||
          nMonth == 5 ||
          nMonth == 8 ||
          nMonth == 10 ||
          nMonth == 12 ) {
        nMonthLen = 30;
      } else if (nMonth == 4 ||
                 nMonth == 7 ||
                 nMonth == 9 ||
                 nMonth == 11 ||
                 nMonth == 13 ) {
          nMonthLen = 29;
      } else if (nMonth == 6) {
          nMonthLen = (bLeap ? 30 : 0);
      } else if (nMonth == 2) {
          nMonthLen = (bShalem ? 30 : 29);
      } else if (nMonth == 3) {
          nMonthLen = (bHaser ? 29 : 30 );
      }
      dGreg.setDate(dGreg.getDate() + nMonthLen);
    }

    dGreg.setDate(dGreg.getDate() + nDateH - 1);
    // console.log(dGreg)
    return dGreg;
  }
 
  function GregToHeb(dGreg) {
    var nYearH;
    var nMonthH;
    var nDateH;
    var nOneMolad;
    var nAvrgYear;
    var nDays;
    var dTishrei1;
    var nLengthOfYear;
    var bLeap;
    var bHaser;
    var bShalem;
    var nMonthLen;
    var bWhile;
    var d1900 = new Date(1900, 0, 1);
 
    nOneMolad = 29 + (12 / 24) + (793 / (1080 * 24));
    nAvrgYear = nOneMolad * (235 / 19);
    nDays = Math.round((dGreg - d1900) / (24 * 60 * 60 * 1000));
    nDays += 2067025; // 2067025 days after creation

    nYearH = Math.floor(nDays / nAvrgYear) + 1;
    dTishrei1 = Tishrei1(nYearH);
 
    if (SameDate(dTishrei1, dGreg)) {

      nMonthH = 1;
      nDateH = 1;
    }
    else  {
      if (dTishrei1 < dGreg) {
        // If Tishrei 1, nYearH is less than dGreg, count nYearH up.
        while (Tishrei1(nYearH + 1) <= dGreg) {
          nYearH += 1;
        }
      }
      else {
        // If Tishrei 1, nYearH is greater than dGreg, count nYearH down.
        nYearH -= 1;
        while (Tishrei1(nYearH) > dGreg) {
          nYearH -= 1;
        }
      }
 
      nDays = (dGreg - Tishrei1(nYearH)) / (24 * 60 * 60 * 1000);
      nDays = Math.round(nDays);
      nLengthOfYear = LengthOfYear(nYearH);
      bHaser = nLengthOfYear == 353 || nLengthOfYear == 383;
      bShalem = nLengthOfYear == 355 || nLengthOfYear == 385;
      bLeap = IsLeapYear(nYearH);
 
      // Add nDays to Tishrei 1.
      nMonthH = 1;
      do {
 
        switch (nMonthH) {
          case 1:
          case 5:
          case 6:
          case 8:
          case 10:
          case 12:
            nMonthLen = 30;
            break
          case 4:
          case 7:
          case 9:
          case 11:
          case 13:
            nMonthLen = 29;
            break
          case 6: // Adar A (6) will be skipped on non-leap years
            nMonthLen = 30;
            break
          case 2: // Cheshvan, see note above
            nMonthLen = (bShalem ? 30 : 29);
            break
          case 3: // Kislev, see note above
            nMonthLen = (bHaser ? 29: 30);
            break
        }
 
        if (nDays >= nMonthLen) {
          bWhile = true
          if (bLeap || nMonthH != 5) {
            nMonthH ++;
          }
          else {
            // We can skip Adar A (6) if its not a leap year
            nMonthH += 2;
          }
          nDays -= nMonthLen;
        }
        else {
          bWhile = false;
        }
      } while (bWhile)
      //Add the remaining days to Date
      nDateH = nDays + 1;
    }
    return nMonthH + "/" + number2hebrew(nDateH) + "/" + number2hebrew(nYearH) +"/"+ nYearH;
  }


  function SameDate(d1, d2) {
    return (d1.getFullYear() == d2.getFullYear() && 
            d1.getMonth() == d2.getMonth() && 
            d1.getDate() == d2.getDate())
             
  } 
  
// Here are a few support functions for the sample web page
  function FormatDateH(cDate) {
    var aDate = new Array()
    var cFormatDate
 
    aDate = cDate.split("/")
    switch (Number(aDate[0])) {
      case 1:
        cFormatDate = "תשרי";
        break;
      case 2:
        cFormatDate = "חשון";
        break;
      case 3:
        cFormatDate = "כסליו";
        break;
      case 4:
        cFormatDate = "טבת";
        break;
      case 5:
        cFormatDate = "שבט";
        break;
      case 6:
        cFormatDate = "אדר_א";
        break;
      case 7:
        if (IsLeapYear(Number(aDate[3])) ){
          cFormatDate = "אדר_ב";
        }
        else{
          cFormatDate =  "אדר";
        }
        break;
      case 8:
        cFormatDate = "ניסן";
        break;
      case 9:
        cFormatDate = "אייר";
        break;
      case 10:
        cFormatDate = "סיון";
        break;
      case 11:
        cFormatDate = "תמוז";
        break;
      case 12:
        cFormatDate = "אב";
        break;
      case 13:
        cFormatDate = "אלול";
        break;
    }
    FixcFormatDate = "\u200F"+aDate[1] + "-" + cFormatDate + "-" +  aDate[2]+"\u200E";
    return FixcFormatDate;
  }
 
  function FormatDate(dDate) {
    var sDate
    
    sDate = dDate.getFullYear().toString() + "-";
    var month = (dDate.getMonth() + 1).toString();
    if (month.length == 1){
      month = "0"+ month;
    }
    sDate += month+"-";
    var day = dDate.getDate().toString();
    if (day.length == 1){
      day = "0"+ day;
    }
    sDate += day ;
    return sDate;
  }

var letters1 = 'אבגדהוזחטי';
var letters2 = 'יכלמנסעפצק';
var letters3 = 'קרשת';
var letters4 = 'אבגדה';

function number2hebrew(num) {
	heb = "";
    var originNum = num;
    var minlength = 1;
    while (num > 400000) {
    	heb += "ת";
		num -= 400000;
	}
    while (num >= 100000) {
    	heb += letters3.charAt((num / 100000) - 1);
			
		num %= 100000;
	}
    while (num >= 10000) {
		heb += letters2.charAt((num / 10000) - 1);
			
		num %= 10000;
	}
	while (num >= 1000) {
		heb += letters1.charAt((num / 1000) - 1);
			
		num %= 1000;
	}
    if(originNum >= 1000)
    heb += "'";
    minlength = heb.length + 1;
	while (num > 400) {
		heb += "ת";
		num -= 400;
	}
	if (num >= 100) {
		heb += letters3.charAt((num / 100) - 1);
		num %= 100;
	}
	if (num >= 10) {
		if (num == 15) {
			heb += 'טו';
			num = 0;
		}
		else if (num == 16) {
			heb += 'טז';
			num = 0;
		}
		else {
			heb += letters2.charAt( (num / 10) - 1 );
			num %= 10;
			
		}
	}
	if (num >= 1) {
		heb += letters1.charAt( num - 1 );
	}
	if ( heb.length > minlength  ) {
		
		heb = heb.slice( 0, heb.length - 1) + '"' + heb.charAt( heb.length-1 ) ;
 }
//show sofit letter in the end of year
if (heb.length-1 > 1){
  if (heb.substr(heb.length-1) == ('כ')){
    heb = heb.replace('כ', 'ך');
  }
  if (heb.substr(heb.length-1) == ('מ')){
    heb = heb.replace('מ','ם');
  }
  if (heb.substr(heb.length-1) == ('נ')){
    heb = heb.replace('נ','ן');
  }
  if (heb.substr(heb.length-1) == ('פ')){
    heb = heb.replace('פ','ף');
  }
  if (heb.substr(heb.length-1) == ('צ')){
    heb = heb.replace('צ','ץ');
  }
}

 
 return heb;
}
 
 
 
function nextLetter(letter) {
	var num = hebrew2number(letter);
	return number2hebrew(num+1);
}
 
 
function previousLetter(letter) {
	var num = hebrew2number(letter);
	return num>1? number2hebrew(num-1): "";
}
  
function H2G(nYearH, nMonthH, nDateH) {
  nYearH  = Number(nYearH)
  nMonthH = Number(nMonthH)
  nDateH  = Number(nDateH)
  nDateH1 = nDateH

  var month = monthHMap.get()
  var strRes = FormatDate(HebToGreg(nYearH, nMonthH, nDateH1));
}


function HStr2G(sYearH, sMonthH, sDateH) {
  var year = gematriya.gematriya(sYearH, {order: true});
  var month = monthHMap.get(sMonthH);
  var day = dayHMap.get(sDateH);
  var strRes = FormatDate(HebToGreg(year, month, day));
  return strRes;
}


  function G2H(nYearG, nMonthG, nDateG) {
    var dGreg;
    nYearG  = Number(nYearG);
    
    nMonthG = Number(nMonthG);
    nDateG  = Number(nDateG);
    
    dGreg   = new Date(nYearG, nMonthG - 1, nDateG);
    dGreg1   = new Date(nYearG, nMonthG - 1, nDateG);
    var hDate = FormatDateH(GregToHeb(dGreg1));
    hDate = hDate.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');

   

    return hDate;
  }


module.exports = { G2H, HStr2G};
