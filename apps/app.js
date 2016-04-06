$('#search-button').on('click', getUserQuery);
$(document).on('keypress', function(key) {
  if (key.keyCode == 13) {
    getUserQuery();
  }
});

function getUserQuery() {
  $("#results ul").empty();
  getResults($("#search-box").val());
}

function getResults(query) {
  $.getJSON("https://www.googleapis.com/youtube/v3/search", {
      "part": "snippet",
      "key": "AIzaSyCYZlEH12h5JNUUnKo9S017sIeAMvV4ayg",
      "q": query,
      "type": "video",
      "maxResults": "24"
    },
    alertOrReduce
  );
}

function alertOrReduce(data) {
  var output = '';
  if (data.pageInfo.totalResults == 0) {
    alert("No videos found!");
  } else {
    data.items.forEach(parseVideoDetails)
  }
}

function parseVideoDetails(video) {
  var urlFragment = video.id.videoId;
  var fullVideoURL = 'https://www.youtube.com/watch?v=' + urlFragment;
  var videoTitle = video.snippet.title;
  var videoThumbURL = video.snippet.thumbnails.high.url;
  new SingleVideo(fullVideoURL, videoThumbURL, videoTitle);
}

var SingleVideo = function(url, imageurl, title) {
  this.url = url;
  this.imageurl = imageurl;
  this.title = title;
  this.encaseInListItem();
  this.displayListResult();
}

SingleVideo.prototype.encaseInListItem = function() {
  this.fullHTML = '<li><a href="' + this.url + '" target="_blank"><img src="' + this.imageurl + '" alt=""></a><div class="caption"><h3>' + this.title + '</h3></div></li>';
}

SingleVideo.prototype.displayListResult = function() {
  $("#results ul").append(this.fullHTML);
}
