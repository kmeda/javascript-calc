
$(document).ready(function() {

    var mathOperands=["+","-","/","*"];
    var dotOperand=["."];
    var digits=[0,1,2,3,4,5,6,7,8,9];
    var decimal = true;
    var values=[''];
    var evalInputs;
    var total;

   var getEntry = function(input){

     if(dotOperand.includes(values[values.length-1]) && input==="."){
       return;
     }
     else if(values.length===1 && !mathOperands.includes(values)){
       console.log("TEST for initial operator");
       if (input === '.') {
         decimal = false;
       }
       values.push(input);

     }
     else if (!mathOperands.includes(values[values.length-1])){
       console.log("TEST for an operator");

       if (input === '.' && decimal === false) {
         return;
       }
       if (input === '.') {
         decimal = false;
       }
       values.push(input);
     }
     else if (digits.includes(Number(input))){
       console.log("TEST for a number");
       decimal = true;
       values.push(input);
     }

     update();
   }

    var update = function(){
      if (values.length === 0) {
        values = [''];
      }

      evalInputs=values.join("");

      if (evalInputs.length === 0) {
        $(".main-screen").html('0');
        return;
      }

       if(evalInputs.length > 20){

         evalInputs=["Digit Limit Reached"];

      }

    $(".main-screen").html(evalInputs);

    }


    var getResult = function(){
      evalInputs=values.join("");
      var result = (eval(evalInputs)).toFixed(2);
      total = result;
      // if result contains decimal , round off to 2 digits
      console.log(result.toString());

      $(".main-screen").html(result);

    }

    var getPercentile = function() {
      total /=100;
      $(".main-screen").html(total);
    }

    $("button").on("click",function(){
      var entry = $(this).attr("value");

     if(entry === "ac"){
      values=[""];
      decimal = true;
      update();
      }
      else if(entry==="ce"){
        values.pop();
        update();
      }
      else if (entry==="="){
        getResult();
      }
      else if (entry==="%"){
        getResult();
        getPercentile();
      }

      else{
        if(values[values.length-1].indexOf("+","-","/","*",".")===-1){
          console.log("TEST for operators");
          getEntry(entry);
        }
      else{
        getEntry(entry);
      }
    }

    });

});
