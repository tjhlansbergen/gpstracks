new Vue({
    el: '#form',
    delimiters: ['[[', ']]'],
    data: {
      gpx: '',
      place: '',
      distance: 1,
      distances: Array.from({length: 100}, (_, i) => i + 1) 
    },
    methods: {
      createTrack: async function () {
        console.log(this.place)
        console.log(this.distance)

        const request = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ place: this.place, distance: this.distance, gpx: this.gpx })
        };

        await fetch('/api/create', request);
      }
    }
})