$(document).ready(function () {
    function getResults(query) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                "part": "snippet",
                "key": "AIzaSyCYZlEH12h5JNUUnKo9S017sIeAMvV4ayg",
                "q": query,
                "type": "video",
                "maxResults": "24"
            },
            function (data) {
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                // If there are no results it will just empty the list
                displaySearchResults(data.items);
                //console.log(data.items[0].snippet.description);
                //console.log(data.items[0].snippet.thumbnails.high.url);
                console.log(data.items);
            }

        );
    }

    function displaySearchResults(videoList) {
        var html = '';
        $.each(videoList, function (index, video) {
            html = html + '<li><a href="https://www.youtube.com/watch?v=' + video.id.videoId + '"><img src="' + video.snippet.thumbnails.high.url + '" alt=""></a><div class="caption"><h3>' + video.snippet.title + '</h3></div></li>';
        });
        $("#results ul").html(html);
    }
    //  $('.add-item').on('click', function () {
    $('#search-button').on('click', function () {
        getResults($("#search-box").val());
    });

    // getResults("chemistry");

});
