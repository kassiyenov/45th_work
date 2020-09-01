var getMessages = function(){
  return $.get("http://146.185.154.90:8000/messages");
}; 

var showMessage = function(message){
  var textOfMessage = $('<div>').text(message.message);
  var date = $('<span class="text-muted">').text(message.datetime);
  var author = $('<h6 class="d-flex justify-content-between">').text(message.author);
  author.append(date);
  var cardBody = $('<div class="card-body">');
  cardBody.append(author, textOfMessage);
  var card = $('<div class="card mb-1">');
  card.append(cardBody);

  $("#chat-body").append(card);
}

var postMessage = function(message){
  return $.post("http://146.185.154.90:8000/messages", message);
  // return Promise.resolve(message);
};

var getMessageFromUI = function(){
  var text = $('#inlineFormInputGroup').val();
  var message = {
    author: "Beksultan",
    message: text
  }
  return message;
};

getMessages().then(function(messages){
  for(var message of messages){
    showMessage(message);
  }
});

$("#chat-form").on("submit", function(e){
  e.preventDefault();
  var message = getMessageFromUI();
  postMessage(message).then(showMessage(message));
  console.log(message);
  $('#inlineFormInputGroup').val("");
}); 

