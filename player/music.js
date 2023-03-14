//  Thanks to Max Zeng
//  https://stackoverflow.com/questions/8690255/how-to-play-only-the-audio-of-a-youtube-video-using-html-5/45375023#45375023
//  https://codepen.io/AliKlein/pen/MBNBEW


var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'l9aJf6MSfxY',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function changeVideo() {
    // Get the YouTube link from the form
    var youtubeLink = document.getElementById("youtubeLink").value;
    
    // Check if the input value contains a valid YouTube link
    if (youtubeLink.indexOf("youtube.com/watch?v=") === -1 && youtubeLink.indexOf("youtu.be/") === -1) {
        alert("Please enter a valid YouTube link.");
        return;
    }
    
    // Extract the video ID from the link
    var videoId;
    if (youtubeLink.indexOf("youtube.com/watch?v=") !== -1) {
        videoId = youtubeLink.split("v=")[1].split("&")[0];
    } else {
        videoId = youtubeLink.split("youtu.be/")[1];
    }
    
    // Update the videoId property of the YT.Player object
    player.loadVideoById(videoId);
    
    // Fetch video details using the YouTube Data API
    var apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=AIzaSyBJ-PXRhMKxYw3_dPX4j2tyqEyOyFF02SM&part=snippet,contentDetails,liveStreamingDetails";
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Display the video title
        document.getElementById("videoTitle").innerHTML = data.items[0].snippet.title;
        
        // Display the uploader name
        document.getElementById("uploaderName").innerHTML = data.items[0].snippet.channelTitle;

        // Display the video type (live or recorded)
        if (data.items[0].snippet.liveBroadcastContent == "live") {
            document.getElementById("videoType").innerHTML = "Live";
        } else {
            document.getElementById("videoType").innerHTML = "Recorded";
        }
        
        // Display the video duration
        var duration = data.items[0].contentDetails.duration;
        var durationString = formatDuration(duration);
        document.getElementById("videoDuration").innerHTML = durationString;
    });
}



// Helper function to format duration from ISO 8601 format (e.g. PT5M30S) to mm:ss format (e.g. 5:30)
function formatDuration(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    var hours = (parseInt(match[1]) || 0);
    var minutes = (parseInt(match[2]) || 0);
    var seconds = (parseInt(match[3]) || 0);
    
    if (hours > 0) {
        minutes += hours * 60;
    }
    
    return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}


function onPlayerReady(event) {
    document.getElementById(ui.play).addEventListener('click', togglePlay);
    timeupdater = setInterval(initProgressBar, 100);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        document.getElementById(ui.play).classList.remove('pause');
        document.getElementById(ui.percentage).style.width = 0;
        document.getElementById(ui.currentTime).innerHTML = '00:00';
        player.seekTo(0, true);
    }
}

let ui = {
    play: 'playAudio',
    audio: 'audio',
    percentage: 'percentage',
    seekObj: 'seekObj',
    currentTime: 'currentTime'
};

function togglePlay() {
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
        document.getElementById(ui.play).classList.remove('pause');
    } else {
        player.playVideo();
        document.getElementById(ui.play).classList.add('pause');
    }
}
        
function calculatePercentPlayed() {
    let percentage = (player.getCurrentTime() / player.getDuration()).toFixed(2) * 100;
    document.getElementById(ui.percentage).style.width = `${percentage}%`;
}

function calculateCurrentValue(currentTime) {
    const currentMinute = parseInt(currentTime / 60) % 60;
    const currentSecondsLong = currentTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;
    
    return currentTimeFormatted;
}

function initProgressBar() {
    const currentTime = calculateCurrentValue(player.getCurrentTime());
    document.getElementById(ui.currentTime).innerHTML = currentTime;
    document.getElementById(ui.seekObj).addEventListener('click', seek);

    function seek(e) {
        const percent = e.offsetX / this.offsetWidth;
        player.seekTo(percent * player.getDuration());
    }
    
    calculatePercentPlayed();
}