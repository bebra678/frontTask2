Vue.component('main', 
{
    template: `
    <div id="main">
        <addColumn></addColumn>
        <p id="error"></p>
        <columns></columns>
    </div>
    `,

})

Vue.component('addColumn', 
{
    template: `
    <input type="text" id="point point__1" v-model="point_1" placeholder="Пункт 1"/>
    <input type="text" id="point point__2" v-model="point_2" placeholder="Пункт 2"/>
    <input type="text" id="point point__3" v-model="point_3" placeholder="Пункт 3"/>
    <input type="text" id="point point__4" v-model="point_4" placeholder="Пункт 4"/>
    <input type="text" id="point point__5" v-model="point_5" placeholder="Пункт 5"/>
    `,

})

Vue.component('columns', 
{
    template: `
    
    `,

})

let app = new Vue({
    el: '#app',
    data()
    {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }
    },
})