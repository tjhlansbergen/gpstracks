new Vue({
    el: '#tracklist',
    delimiters: ['[[', ']]'],
    data: {
      tracks: ['loading...'],
      gpx: 'gpx...'
    },
    created: async function(){
        const gResponse = await fetch('/api/list');
        const gObject = await gResponse.json();
        this.tracks = gObject;
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
      viewTrack: async function (id) {
        const gResponse = await fetch('/api/get/' + id);
        const gObject = await gResponse.json();

        this.gpx = 'clicked ' + id + gObject 
      }
    }
})