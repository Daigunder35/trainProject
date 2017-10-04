var config = {
  apiKey: 'AIzaSyBtr66VRhzdJXQP5wdl8jo0F5zr0gDo288',
  authDomain: 'trainproject-109d0.firebaseapp.com',
  databaseURL: 'https://trainproject-109d0.firebaseio.com',
  projectId: 'trainproject-109d0',
  storageBucket: 'trainproject-109d0.appspot.com',
  messagingSenderId: '182658414977',
};
firebase.initializeApp(config);

var database = firebase.database();

$('#send-button').on('click', function() {
  event.preventDefault();
  var trainName = $('#trainName-input').val().trim();
  var destination = $('#destination-input').val().trim();
  var frequency = $('#frequency-input').val().trim();
  var firstTrain = $('#firstTrain-input').val().trim();
  var firstTime = moment(firstTrain, 'HH:mm');
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTime), 'minutes');
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, 'minutes');
  var nextTrainFormatted = moment(nextTrain).format('hh:mm');

  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain,
    nextTrainFormatted: nextTrainFormatted,
    minutesTillTrain: minutesTillTrain,
    dataAdded: firebase.database.ServerValue.TIMESTAMP,
  });
});

database.ref().on('child_added', function(childSnapshot) {
  $('.table').append(
    '<tr><td>' +
      childSnapshot.val().trainName +
      '</td><td>' +
      childSnapshot.val().destination +
      '</td><td>' +
      childSnapshot.val().frequency +
      '</td><td>' +
      childSnapshot.val().nextTrainFormatted +
      '</td><td>' +
      childSnapshot.val().minutesTillTrain +
      '</td></tr>'
  );
});

