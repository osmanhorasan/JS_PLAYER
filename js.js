let player = document.getElementById("audioPlayer");
const div = document.getElementById("prog")
const source = document.getElementById("srcX")
const searchBox = document.getElementById("searchbox")
let mTitle = document.getElementById("title")
let list = document.getElementById("list")
let mImage = document.getElementById("image")
let count = 3
isPlaying = true
let value = ""

/* Play Button */
const playButton = document.getElementById("playButton")

const updateBackground = () => {
    const currentTime = player.currentTime;
    const duration = player.duration;

    const percentage = (currentTime / duration) * 360;
    const gradient = `conic-gradient(black 0deg, transparent 0deg, transparent ${percentage}deg, rgba(255, 255, 255, 0.175) ${percentage}deg, rgba(255, 255, 255, 0.175) 360deg)`;
    div.style.backgroundImage = gradient;

};

let mdata;
const playPause = () => {
    isPlaying = !isPlaying
    isPlaying ? player.pause() : player.play()
    player.addEventListener('timeupdate', updateBackground);
    playButton.innerHTML == "⏵" ? playButton.innerHTML= "⏸︎" : playButton.innerHTML = "⏵"
}

const input = document.getElementById("aramakutusu")
const aramayap = () => {
    list.innerHTML = ""
    value = input.value
    const url = `https://itunes.apple.com/search?term=${value}`;
    fetch(url)
        .then((Response) => Response.json())
        .then((data) => {
            const artists = data.results;
            mdata = artists;
            artists.map(result => {
                const title = document.createElement("p")
                if (result.collectionName) {
                    title.textContent = result.collectionName;
                    title.addEventListener("click", () => {
                        player.src = result.previewUrl;
                        searchBox.style.zIndex = "-1"
                        mTitle.textContent = result.collectionName;
                        mImage.src = result.artworkUrl100;
                        input.value = ""
                    })
                    list.appendChild(title)
                }
            })
        })
        .catch(error => console.log('Request failed:', error))
}

const arama = () => {
    searchBox.style.zIndex = "1";
    input.style.display = "block"
}
const aramaiki = () => {
    searchBox.style.zIndex = "1"
    input.style.display = "none"
}

const change = (value) => {
    if (count > 0 && count < mdata.length - 1) {
        count += value
        player.src = mdata[count].previewUrl;
        searchBox.style.zIndex = "-1"
        mTitle.textContent = mdata[count].collectionName;
        mImage.src = mdata[count].artworkUrl100;
        count = mdata.indexOf(mdata[count])
    }


}