/*
Step code:
1. Render sessionStorage
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / Prev
6. Random
7. Next / Repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/

const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const currentTime = $('.current-time');
const durationTime = $('.duration-time');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio') //

const playList = $('.playlist');
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')//
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat');
const volumeIcon = $('.volume-change');
const volumeBar = $('.volume');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    currentVolume: 0.0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {
        currentVolume: 0.5,
        isMute: false,
        isRepeat: false,
        isRandom: false,
        currentIndex: 0,
    },
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Naruto theme song',
            singer: 'Uzumaki Naruto',
            path: 'music/naruto.mp3',
            image: 'img/naruto.png'
        },
        {
            name: 'One Piece theme song',
            singer: 'Monkey.D Luyffy',
            path: 'music/one-piece.mp3',
            image: 'img/one-piece.png'
        },
        {
            name: 'Dragon Ball theme song',
            singer: 'Songoky x Vageta',
            path: 'music/dragon-ball.mp3',
            image: 'img/dragon-ball.png'
        },
        {
            name: 'Có tất cả nhưng thiếu anh',
            singer: 'Erik (st.316)',
            path: 'music/erik.mp3',
            image: 'img/erik.png'
        },
        {
            name: 'bài hát hay nhất của Dalab',
            singer: 'Dalab Band',
            path: 'music/dalab.mp3',
            image: 'img/dalab.png'
        },
        {
            name: 'Thằng điên',
            singer: 'Justatee',
            path: 'music/justa.mp3',
            image: 'img/justa.png'
        },
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng MTP',
            path: 'music/sontung.mp3',
            image: 'img/sontung.png'
        },
        {
            name: 'Waiting for you!',
            singer: 'Mono',
            path: 'music/mono.mp3',
            image: 'img/mono.png'
        },
        {
            name: 'Mặt mộc!',
            singer: 'Nguyên Ngọc x PAnh',
            path: 'music/matmoc.mp3',
            image: 'img/matmoc.png'
        },
        {
            name: 'New songs of DUc PHUC singer!',
            singer: 'Đức Phúc',
            path: 'music/ducphuc.mp3',
            image: 'img/ducphuc.png'
        },
        {
            name: 'Waing For You',
            singer: 'Mono',
            path: './music/Waiting For You.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/share/2022/08/17/e/a/a/5/1660733423986.jpg',
        },
        {
            name: 'Như Những Phút Ban Đầu',
            singer: 'Hoài Lâm',
            path: './music/nhuphutbandau.mp3',
            image:
                'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/7/c/7c6be286dd1c9831e37a14eca4016975_1467343706.jpg',
        },

        {
            name: '3107(Cover)',
            singer: '3107',
            path: './music/3107-Cover-Music-30-365.mp3',
            image: 'https://lyricvn.com/wp-content/uploads/2020/03/61b35411029c6156973232016738c1b7.jpg',
        },
        {
            name: 'Theres No One At All',
            singer: 'Sơn Tùng MTP',
            path: './music/Theres-No-One-At-All-Son-Tung-M-TP.mp3',
            image: 'https://cdnmedia.thethaovanhoa.vn/Upload/XmJnTp3BYsa9r8REW2g/files/2022/04/son-tung-m-tp.JPG',
        },
        {
            name: 'Buông Đôi Tay Nhau Ra',
            singer: 'Sơn Tùng MTP',
            path: './music/Buong-Doi-Tay-Nhau-Ra-Son-Tung-M-TP.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/vi/c/c0/Buongdoitaynhauramtp.jpg',
        },
        {
            name: 'We Dont Talk Anymore',
            singer: 'Charlie Puth',
            path: './music/We Don_t Talk Anymore - Charlie Puth_ Se.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/vi/8/89/Wedonttalkanymore.jpg',
        },
        {
            name: 'Anh Đã Quen Với Cô Đơn',
            singer: 'Soobin Hoàng Sơn',
            path: './music/Anh-Da-Quen-Voi-Co-Don-Soobin-Hoang-Son.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2732922307c16bb852a0849bea0',
        },
        {
            name: 'Lần Cuối',
            singer: 'Karik',
            path: './music/Lan-Cuoi-Karik.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2021/03/09/c/3/5/4/1615261605117.jpg',
        },
        {
            name: 'Say Do You',
            singer: 'Tiên Tiên',
            path: './music/Say-You-Do-Tien-Tien.mp3',
            image: 'https://imgt.taimienphi.vn/cf/Images/hi/2018/3/22/loi-bai-hat-say-you-do.jpg',
        },
        {
            name: 'Cơn Mưa Rào',
            singer: 'JSOL',
            path: './music/Con-Mua-Rao-JSOL.mp3',
            image: 'https://imgt.taimienphi.vn/cf/Images/hi/2018/6/22/loi-bai-hat-con-mua-rao.jpg',
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <i class="option__icon fa-heart far"></i>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
    `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        // xử lý cd quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, // quay 10 giây
            iterations: Infinity // lặp lại kiểu vô hạn
        })
        cdThumbAnimate.pause()
        // xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            player.classList.add('playing')
        }

        //khi song dc play
        audio.onplay = function () {
            _this.isPlaying = true;
            playBtn.classList.add('playing');
            cdThumbAnimate.play();
            _this.activeSong(); // intoScrollView đến song đã lưu
            if (_this.isMute) {
                audio.volume = 0;
                volumeBar.Value = 0;
            } else {
                audio.volume = _this.currentVolume;
                volumeBar.value = _this.currentVolume * 100;
            }
        }

        // khi song đc pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent

                currentTime.textContent = _this.timeFormat(this.currentTime);
                durationTime.textContent = _this.timeFormat(this.duration);
            }
            // console.log(audio.currentTime / audio.duration * 100)
        }

        // xử lý khi tua song
        progress.oninput = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
            // console.log(audio.duration / 100 * e.target.value)
        }

        // khi next bài hát 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play();
        }

        // khi prev bài hát 
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
                _this.activeSong();
                audio.play()
            }
            _this.activeSong();
            audio.play()
        }

        // khi random bài hát 
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom)
            // audio.play()
        }

        // Khi repeat Song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            this.classList.toggle('active', _this.isRepeat);
        };

        // auto nextSong when ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else nextBtn.click();
        };


        // Lằng nghe hành vi click vào playList
        // Closest trả về một element là chính nó hoặc thẻ cha của nó
        // Nếu không tìm thấy thì return null
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)'); // Song không có active
            if (songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song
                if (songNode) {
                    player.classList.add('playing')
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                }
                // Xử lý khi click vào song option
                if (e.target.closest(".option")) {
                }
            }
        };

        // Volume
        volumeIcon.onclick = function () {
            _this.isMute = !_this.isMute;
            // console.log({ volumeBar });
            _this.setConfig('isMute', _this.isMute);
            volumeIcon.classList.toggle('active', _this.isMute);
            if (_this.isMute) {
                audio.volume = 0;
                volumeBar.value = 0;
            } else {
                volumeBar.value = _this.currentVolume * 100;
                audio.volume = _this.currentVolume;
            }
        };

        volumeBar.oninput = function (e) {
            _this.currentVolume = e.target.value / 100;
            audio.volume = _this.currentVolume;
            _this.setConfig('currentVolume', _this.currentVolume);
            audio.play();
            if (audio.volume === 0) {
                volumeIcon.classList.add('active');
            } else {
                _this.isMute = false;
                _this.setConfig('isMute', _this.isMute);
                volumeIcon.classList.remove('active');
            }
        };
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex == this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },


    activeSong: function () {
        const songs = $$('.song');
        songs.forEach((song, index) => {
            if (index === this.currentIndex) {
                song.classList.add('active');
                this.setConfig('currentIndex', this.currentIndex);
                setTimeout(() => {
                    song.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    });
                }, 300);
            } else song.classList.remove('active');
        });
    },

    timeFormat(seconds) {
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().slice(14, 19);
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.currentVolume = this.config.currentVolume;
        this.isMute = this.config.isMute;
        this.currentIndex = this.config.currentIndex;

        // Hiển thị trạng thái bang đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
        volumeIcon.classList.toggle('active', this.isMute);
    },

    start: function () {
        // đọc config từ local storage
        this.loadConfig();

        // Định nghĩa các thuộc tính cho obj
        this.defineProperties()

        // lắng nghe/ sử lý sử lý các sự kiện 
        this.handleEvents()

        //tải htoong itn bài hát đầu tiên vào giao diện khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist
        this.render()
    }
}

app.start()