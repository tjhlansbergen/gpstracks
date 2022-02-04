new Vue({
    el: '#tracklist',
    delimiters: ['[[', ']]'],
    data: {
      greeting: ['loading...']
    },
    created: async function(){
        const gResponse = await fetch('/api/list');
        const gObject = await gResponse.json();
        this.greeting = gObject;
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
      }
    }
})