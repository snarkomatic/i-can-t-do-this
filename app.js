function getAverageWordsPerSentence(text) {
  var numSentences = text.match(/[.!?]+/g) ? text.match(/[.!?]+/g).length : 1;
  var wordCount = tokenizeText(text).length;
  return (wordCount / numSentences).toFixed(2);
}

function getAverageWordLength(tokens) {
  // except apparently tokens.join is not a function and the solution given
  // returns the same error for me so gr8
  var totalLength = tokens.length;
  return (totalLength / tokens.length).toFixed(2);
}

function countDistinctWords(tokens) {
  var distinctWords = [];
  for (var i=0; i<tokens.length; i++) {
    if (distinctWords.indexOf(tokens[i]) === -1) {
      distinctWords.push(tokens[i]);
    }
  }
  return distinctWords.length;
}

function tokenizeText(text) {
  return text.replace(/\r?\n|\r/g, "");
}

function removeReturns(text) {
  return text.replace(/\r?\n|\r/g, "");
}

function reportOnText(text) {
  var tokens = tokenizeText(text);
  var numDistinctWords = countDistinctWords(tokens);
  var numTotalWords = tokens.length;
  var averageWordLength = getAverageWordLength(tokens);
  var averageWordsPerSentence = getAverageWordsPerSentence(text);

  var textReport = $('.js-text-report');
  textReport.find('.js-word-count').text(numTotalWords);
  textReport.find('.js-unique-word-count').text(numDistinctWords);
  textReport.find('.js-average-word-length').text(averageWordLength + " characters");
  textReport.find('.js-average-sentence-length').text(averageWordsPerSentence + " words");
  textReport.removeClass('hidden');
}

function watchFormSubmission() {
  $('.js-text-form').submit(function(event) {
    event.preventDefault();
    var userText = $(this).find('#user-text').val();
    reportOnText(removeReturns(userText));
  });
}

$(function() {
  watchFormSubmission();
});
