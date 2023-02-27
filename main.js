let eventBus = new Vue()

Vue.component('column', {
    // �������
    template: `
 <section id="main" class="main-alt">
 
        <div class="columns">
            <newCard></newCard>
        <p class="error" v-for="error in errors">{{ error }}</p>
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
            </div>
 </section>
    `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }
    },
    mounted() {
        // �������� �������
        eventBus.$on('addColumn_1', ColumnCard => {

            if (this.column_1.length < 3) {
                this.errors.length = 0
                this.column_1.push(ColumnCard)
            } else {
                this.errors.length = 0
                this.errors.push('���� ������ ������� � 1 �������')
            }
                })

        eventBus.$on('addColumn_2', ColumnCard => {
            if (this.column_2.length < 5) {
                this.errors.length = 0
                this.column_2.push(ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard), 1)
            } else {
                this.errors.length = 0
                this.errors.push('�� �� ������ ������������� ������ �������, ���� �� ������ ���� 5 ��������.')
            }
        })
        eventBus.$on('addColumn_3', ColumnCard => {
            if (this.column_2.length === 5) {
                this.errors.length = 0
                this.column_3.push(ColumnCard)
                this.column_2.splice(this.column_2.indexOf(ColumnCard), 1)
            } else {
                this.errors.length = 0
                this.errors.push('�����')
            }
        })
    }
})

Vue.component('newCard', {
    template: `
    <section id="main" class="main-alt">
    
        <form class="row" @submit.prevent="Submit">
        
            <p class="main__text">�������</p>
            
        <div class="form__control">
                
            <div class="form__name">
                <input required type="text" id="name" placeholder="������� �������� �������"/>
            </div>
            
            <input type="text" id="point point__1" v-model="point_1" placeholder="������ �����"/>
            <input type="text" id="point point__2" v-model="point_2" placeholder="������ �����"/>
            <input type="text" id="point point__3" v-model="point_3" placeholder="������ �����"/> 
            <br>
            <input type="text"  placeholder="��������� �����" v-show ="point_4">
            <br>
             <input type="text"  placeholder="����� �����" v-show="point_5">
        </div>
        <div class="plus_minus_p">
        <p>�������� ��� ������� ���� ��� �������</p>
        </div>
            <div class="minus_plus">
                 
                   <p class="plus">
                        <button type='button' @click="addnote"> + </button>
                   </p>
                   
                   <p class="minus">
<!--                        <button type='button' @click="removenote"> - </button>-->
                   </p>
            </div>
            
            <div>                    
                <p class="sub">
                        <input type="submit" value="���������"> 
                </p>
            </div>
        </div>
            <div class="form__control">
                <button class="btn">���������</button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            name: null,
            point_1: null,
            point_2: null,
            point_3: null,
            point_4: null,
            point_5: null,
            date: null,
            errors: [],
        }
    },
    methods: {
        addnote() {
            if (this.point_4 === null) {
                this.point_4 = true
            }
        },
        Submit() {
            let card = {
                name: this.name,
                points: [{name: this.point_1,},
                    {name: this.point_2,},
                    {name: this.point_3,},
                    {name: this.point_4,},
                    {name: this.point_5,}],
                date: this.date,
                // date: null,
                status: 0,
                // errors: [],
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null;
            this.point_1 = null
            this.point_2 = null
            this.point_3 = null
            this.point_4 = null
            this.point_5 = null
        },

            // if (this.point_4 === true) {
            //     return this.point_5 = null
            // }

        },
        // removenote() {
        //
        //     if (this.point_5 === true) {
        //         return  this.point_5 = false
        //     }
        //
        //     if (this.point_4 === true) {
        //         return  this.point_4 = false
        //     }
        }


)

Vue.component('column_1', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__one">
                <div class="card" v-for="card in column_1"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points"
                        v-if="task.name != null"
                        @click="changeCompleted(card, task)"
                        :class="{completed: task.completed}">
                        {{ task.name }}
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_1: {
            type: Array,
        },
        column_2: {
            type: Array,
        },
        card: {
            type: Object,
        },
        errors: {
            type: Array,
        }
    },
    methods: {
        changeCompleted(card) {
            eventBus.$emit('addColumn_2', card)

        }
    }
    //         if ((card.status / count) * 100 === 100) {
    //             // card.date = new Date().toLocaleString()
    //             eventBus.$emit('addColumn_3', card)
    //         }
    //     },
    // },

})

Vue.component('column_2', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__two">
                <div class="card" v-for="card in column_2"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points"
                        v-if="task.name != null"
                        @click="changeCompleted(card, task)"
                        :class="{completed: task.completed}">
                        {{ task.name }}
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_2: {
            type: Array,
        },
        column_3: {
            type: Array,
        },
        card: {
            type: Object,
        },
    },
    methods: {
        changeCompleted(card, task) {
                eventBus.$emit('addColumn_3', card)
            }
        }

})

Vue.component('column_3', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__three">
                <div class="card" v-for="card in column_3"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points"
                        v-if="task.name != null"
                        @click="changeCompleted(card, task)"
                        :class="{completed: task.completed}">
                        {{ task.name }}
                    </div>
<!--                        <p>{{ card.date }}</p>-->
                </div>
            </div>
        </section>
    `,
    props: {
        column_3: {
            type: Array,
        },
        card: {
            type: Object,
        },
    },
})



let app = new Vue({
    el: '#app',
})