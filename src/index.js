import './styles/style.scss'
import './styles/preload.css'

import fetchEntry from "./_xkcd_api";

document.addEventListener("DOMContentLoaded", function () {
    contentPage.init()
});


let contentPage = {
    currentEntry: {
        title: '', safe_title: '', img: '', alt: '', transcript: '', day: '', month: '', year: '',
    },
    lastEntry: {},
    $: {
        mainBlockContent: document.querySelector('.main-content'),
        blockLoader: document.querySelector('.preloader'),
        comicsBlockView: document.querySelector('.comics-block-view'),
        titleEntry: document.getElementById('entry-title'),
        imageEntry: document.getElementById('entry-image'),
        dateInfo: document.getElementById('entry-date'),
        transcriptEntry: document.getElementById('entry-transcript'),
        btnStart: document.getElementById('btn-start'),
        btnEnd: document.getElementById('btn-end'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        btnRandom: document.getElementById('btn-random'),
        btnShare: document.getElementById('btn-share')
    },
    onAfterImageEntryLoaded() {
        this.hidePreload()
        this.btnsAutoState()
    },
    bindEvents: function () {
        this.$.btnNext.addEventListener('click', () => {
            this.showNextEntry()
        })
        this.$.btnPrev.addEventListener('click', () => {
            this.showPrevEntry()
        })

        this.$.btnStart.addEventListener('click', () => {
            this.showFirstEntry()
        })
        this.$.btnEnd.addEventListener('click', () => {
            this.showLastEntry()
        })

        this.$.btnRandom.addEventListener('click', () => {
            this.showRandomEntry()
        })

        this.$.imageEntry.addEventListener('load', () => {
            this.onAfterImageEntryLoaded()
        })

        this.$.btnShare.addEventListener('click', () => {
            this.shareLinkEntry()
        })

        window.addEventListener('popstate', (e) => {
            this.toggleEntry(e.state.numEntry, false)
        }, false);
    },
    init() {
        this.bindEvents();

        this.showPreload();

        this.loadLastEntryInfo()
            .then((responseObject) => {
                let linkInputNum = this.detectEntryNumByPathname();
                if (linkInputNum !== false) {
                    this.toggleEntry(linkInputNum)
                } else {
                    this.currentEntry = responseObject
                    this.drawCurrentEntry();
                }
            })
    },
    detectEntryNumByPathname() {
        let linkInputNum = window.location.pathname.replaceAll('/', '');
        if (linkInputNum.length > 0) {
            return linkInputNum;
        }
        return false;
    },
    loadLastEntryInfo() {
        return new Promise(((resolve, reject) => {
            fetchEntry()
                .then((responseObject) => {
                    this.lastEntry = responseObject;

                    resolve(responseObject)
                })
                .catch(reject)
        }))

    },
    showNextEntry() {
        this.toggleEntry(this.currentEntry.num + 1)
    },
    showPrevEntry() {
        this.toggleEntry(this.currentEntry.num - 1)
    },
    showFirstEntry() {
        this.toggleEntry(1)
    },
    showLastEntry() {
        this.toggleEntry()
    },
    showRandomEntry() {
        const minNumber = 1;
        const maxNumber = this.lastEntry.num;
        const rand = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        this.toggleEntry(rand)
    },
    shareLinkEntry() {
        try {
            navigator.share({
                title: document.title,
                text: "I like this comic",
                url: window.location.href
            })
        } catch (err) {
            alert('Your browser not supports Web Share API')
        }
    },

    toggleEntry(numEntry = null, pushState = true) {

        this.showPreload()

        fetchEntry(numEntry)
            .then((responseObject) => {

                this.currentEntry = responseObject

                if (!numEntry) {
                    history.replaceState(
                        {numEntry: numEntry},
                        this.currentEntry.safe_title,
                        `/${this.currentEntry.num}/`
                    );
                } else if (pushState) {
                    history.pushState(
                        {numEntry: numEntry},
                        this.currentEntry.safe_title,
                        `/${this.currentEntry.num}/`
                    );
                }

                this.drawCurrentEntry()

            })
            .catch((e) =>
                console.error(e)
            )
    },

    drawCurrentEntry() {
        let {title, safe_title, img, alt, transcript, day, month, year} = this.currentEntry;

        this.$.titleEntry.innerHTML = title;
        document.title = safe_title;
        this.$.imageEntry.src = img;
        this.$.imageEntry.alt = alt;
        this.$.dateInfo.innerHTML = (new Date(year, month, day)).toLocaleDateString()
        this.$.transcriptEntry.innerHTML = transcript.replaceAll("\n", "<br>");

    },
    showPreload() {
        this.$.mainBlockContent.classList.add('loading');
    },
    hidePreload() {
        this.$.mainBlockContent.classList.remove('loading');
    },
    btnsAutoState() {
        if (this.currentEntry.num === this.lastEntry.num) {
            this.$.btnNext.setAttribute('disabled', 'disabled')
            this.$.btnEnd.setAttribute('disabled', 'disabled')
        } else {
            this.$.btnNext.removeAttribute('disabled')
            this.$.btnEnd.removeAttribute('disabled')
        }

        if (this.currentEntry.num === 1) {
            this.$.btnPrev.setAttribute('disabled', 'disabled')
            this.$.btnStart.setAttribute('disabled', 'disabled')
        } else {
            this.$.btnPrev.removeAttribute('disabled')
            this.$.btnStart.removeAttribute('disabled')
        }


    }

}








