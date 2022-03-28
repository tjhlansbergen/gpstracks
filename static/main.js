new Vue({
    el: '#main',
    components: {
      'l-map': window.Vue2Leaflet.LMap,
      'l-tile-layer': window.Vue2Leaflet.LTileLayer
    },
    delimiters: ['[[', ']]'],
    data: {
      tracks: ['loading...'],
      gpx: 'gpx...',
      track: null
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
      viewTrack: async function (item) {
        this.tracks.forEach(x => x.active = false);
        item.active = true;

        const response = await fetch('/api/get/' + item.id);
        const gpxdata = await response.json();

        this.gpx = gpxdata[0]; 

        var map = this.$refs.map.mapObject;

        if(this.track != null) { map.removeLayer(this.track); }

        this.track = new L.GPX(this.gpx, {
          async: true,
          marker_options: {
            startIconUrl: '',
            endIconUrl: '',
            shadowUrl: ''
            },
          polyline_options: {
              color: 'magenta',
              weight: 3,
              lineCap: 'round'
            }
        }).on('loaded', function(e) {
          map.fitBounds(e.target.getBounds());
        }).addTo(map);
      }
    }
})