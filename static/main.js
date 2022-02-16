new Vue({
    el: '#main',
    delimiters: ['[[', ']]'],
    data: {
      tracks: ['loading...'],
      gpx: 'gpx...'
    },
    created: async function(){
        const response = await fetch('/api/list');
        const tracklist = await response.json();
        
        tracklist.forEach(x => x.active = false);
        tracklist[0].active = true;

        this.tracks = tracklist;

        this.viewTrack(tracklist[0]);
    },
    methods: {
      createTrack: async function () {
        console.log('new!')

        const request = {
          method: "POST" //,
          //headers: { "Content-Type": "application/json" },
          //body: JSON.stringify({ title: "Vue POST Request Example" })
        };

        await fetch('/api/create', request);
        location.reload();
      },
      viewTrack: async function (item) {
        this.tracks.forEach(x => x.active = false);
        item.active = true;

        const response = await fetch('/api/get/' + item.id);
        const gpxdata = await response.json();

        this.gpx = 'clicked ' + item.id + gpxdata 
      }
    }
})