$(document).ready(function() {

  var entry = '';
  var ans = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';

  // round function if answer includes a decimal
  function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }

  $('button').click(function() {

    entry = $(this).attr("value");
    console.log('entry: ' + entry);

    //reset for log after answer to equation.
    if (reset) {
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+' || entry === '%') {
        log = ans;
      } else {
        ans = '';
      }
    }
    reset = false;

    // All clear or Clear Entry
    if (entry === 'ac' || entry === 'ce' && current === 'noChange') {
      ans = '';
      current = '';
      entry = '';
      log = '';
      $('.chaining').html('0');
      $('.main-screen').html('0');
      decimal = true;
    } else if (entry === 'ce') {
      $('.chaining').html(log.slice(0, -current.length));
      log = log.slice(0, -current.length);
      ans = ans.slice(0, -current.length);
      current = ans;
      if (log.length === 0 || log === ' ') {
        $('.chaining').html('0');
      }
      $('.main-screen').html('0');
      entry = '';
      decimal = true;
    }

    // prevents more than one deciminal in a number
    if (entry === '.' || entry === '0.') {
      if (!decimal) {
        entry = '';
      }
    }

    // prevents improper use of first digit
    if (ans.length === 0 && isNaN(entry) && entry !== '.' || ans.length === 0 && entry === '0') {
      entry = '';
      ans = '';
    }

    // prevents extra operators
    if (current !== 'noChange') {
      if (current === '' && isNaN(entry) && entry !== '.' || isNaN(current) && isNaN(entry) && entry !== '.') {
        entry = '';
      }
    }

    // digit combining
    while (Number(entry) || entry === '0' || current === '.') {

      if (isNaN(current) && entry === '0' && current !== '.') {
        entry = '';
      } else if (isNaN(current) && Number(entry) && current !== '.') {
        current = '';
      }
      if (entry === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(entry)) {
        entry = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(entry);
        } else {
          current += entry;
        }
        ans += entry;
        $('.main-screen').html(current);
        log += entry;
        $('.chaining').html(log);
        entry = '';
      }
    }

    // Operation list

    if (entry === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        ans += entry;
        $('.main-screen').html('0.');
        log += current;
        $('.chaining').html(log);

      } else {
        current = current.concat('.');
        ans = ans.concat('.');
        log = ans;
        $('.chaining').html(ans);
        $('.main-screen').html(current);
      }
      entry = '';
      decimal = false;

    } else if (entry === '/') {
      current = '/';
      ans = round(eval(ans)) + current;
      log += current;
      $('.chaining').html(log);
      $('.main-screen').html('/');
      entry = '';
      decimal = true;

    } else if (entry === '*') {
      current = '*';
      ans = round(eval(ans)) + current;
      log += 'x';
      $('.chaining').html(log);
      $('.main-screen').html('x');
      entry = '';
      decimal = true;

    } else if (entry === '-') {
      current = '-';
      ans = round(eval(ans)) + current;
      log += current;
      $('.chaining').html(log);
      $('.main-screen').html('-');
      entry = '';
      decimal = true;

    } else if (entry === '+') {
      current = '+';
      ans = round(eval(ans)) + current;
      log += current;
      $('.chaining').html(log);
      $('.main-screen').html('+');
      entry = '';
      decimal = true;

    } else if (entry === '%') { //Percentile mod
      current = '%';
      ans /=100;
      log = ans;
      $('.chaining').html(log);
      $('.main-screen').html('%');
      entry = '';
      decimal = true;

    }else if (entry === '=') {
      if (current[current.length - 1] === '.') {
        entry = '';
      } else {
        current = eval(ans).toString();
        $('.main-screen').html(round(eval(ans)));
        ans = round(eval(ans));
        log += entry + ans;
        $('.chaining').html(log);
        log = ans;
        entry = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    entry = '';

    if (reset) {
      log = '';
    }

    // max digits on screen
    if ($('.main-screen').text().length > 8 || $('.chaining').text().length > 33) {
      $('.main-screen').html('0');
      $('.chaining').html('Digit Limit Met');
      current = '';
      ans = '';
      log = '';
      decimal = true;
    }

    console.log('decimal: ' + decimal);
    console.log('current: ' + current);
    console.log('answer: ' + ans);
    console.log($('.chaining').text().length);
  });
});
