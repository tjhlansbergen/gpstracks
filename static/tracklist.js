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
    }
})