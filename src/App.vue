/* eslint-disable vue/require-v-for-key */
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li> -->
          <!-- <li class="nav-item active" >
            <router-link class="nav-link" :to="'/cars'">Cars</router-link>
          </li> -->
          <router-link tag="li" class="nav-item" exact to="/" active-class="active">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link tag="li" class="nav-item" to="/cars" active-class="active">
            <a class="nav-link">Cars</a>
          </router-link>
          <router-link tag="li" class="nav-item" to="/car/3" active-class="active">
            <a class="nav-link">Car 3</a>
          </router-link>
          <router-link tag="li" class="nav-item" to="/car/4" active-class="active">
            <a class="nav-link">Car 4</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>

    <app-car>
      <h2 slot="title">{{ carName }}</h2>
      <p slot="text">Lorem ipsum dolor sit amet</p>
    </app-car>

    <div> <!-- Блок жизненного цикла директив -->
      <h2 v-red v-if="visible">{{ title }}</h2>
      <button @click="visible=!visible">Toogle</button>
      <button @click="title='New title'">Change Title</button>
    </div>

    <div> <!-- Блок с применением аргументов и модификаторов директив-->
      <h2 v-different:background.font="'green'">{{ title }}</h2>
      <h2 v-different:color.delay.font="'blue'">{{ title }}</h2>
      <h2 v-font>Local font directive</h2>
    </div>
    <div>
      <h2>{{ title2 }}</h2>
      <h2>{{ title2 | lowercase }}</h2>
      <h2>{{ title2 | uppercase }}</h2>
    </div>

    <div> <!-- Блок фильтрации списков -->
      <input type="text" v-model="searchName"> 
      <ul>
        <li v-for="name of filteredNames" :key=name.id>{{ name }}</li>
      </ul>
    </div>  
    <div>
      <app-list></app-list>
    </div>

    <div> <!-- Блок работа с формами -->
      <app-input></app-input>
    </div>

    <div>
      <h3>Form inputs</h3>
      <app-onoff v-model="switched"></app-onoff>
      <div>
        <h3 v-if="switched">Component is enabled</h3>
        <h3 v-else>Component is disabled</h3>
      </div>
    </div>

    <div class="container"> <!-- Блок валидация форм -->
      <app-validation></app-validation>
    </div>

    <div>
      <div class="form-group">
        <label for="name">Car name</label>
        <input type="text" id="name" class="form-control" v-model.trim="carNameForm">
      </div>
      <div class="form-group">
        <label for="year">Car year</label>
        <input type="text" id="year" class="form-control" v-model.number="carYear">
      </div>
      <button class="btn btn-success" @click="createCar">Create car</button>
      <button class="btn btn-primary" @click="loadCars">Load cars</button>
      <hr>
      <ul class="list-group">
        <li 
          class="list-group-item"
          v-for="car of cars"
          :key = "car.id"
        >
          <strong>{{ car.name }}</strong> -  {{ car.year }}
        </li>
      </ul>
    </div>

    <div>
      <h1>{{ hello }}</h1>
      <hr>
      <app-counter></app-counter>
      <app-second-counter></app-second-counter>
      <hr>
      <app-actions></app-actions>
    </div>
    
  </div>
</template>

<script>
import Car from './components/Car'
import Input from './components/Input'
import Onoff from './components/Onoff'
import Validation from './components/Validation'
import Counter from './components/Counter'
import Actions from './components/Actions'
import SecondCounter from './components/SecondCounter'


export default {
  components: {
    appCar: Car,
    appInput: Input,
    appOnoff: Onoff,
    appValidation: Validation,
    appCounter: Counter,
    appActions: Actions,
    appSecondCounter: SecondCounter 
  },
  data() {
    return {
      carName: 'Jaguar',
      title: 'Hello I am Vue!!!',
      title2: 'I Am VUE Filter!!!',
      visible: true,
      names: ['Vlad', 'Max', 'Elena', 'Slava'],
      searchName: '',
      switched: false,
      carNameForm: '',
      carYear: 2018,
      cars: [],
      resource: null,
      counter: 0
    }
  },
  methods: {
    createCar() {
      const car = {
        name: this.carNameForm,
        year: this.carYear
      }
      // this.$http.post('http://localhost:3000/cars', car )
      //   .then(response => {
      //     return response.json()
      //  })
      //  .then(newCar => {
      //    console.log(newCar)
      //  })
      this.resource.save({}, car)
    },
    loadCars() {
      // this.$http.get('http://localhost:3000/cars')
      //   .then(response => {
      //       return response.json()
      //   })
      //   .then(cars => {
      //     this.cars = cars
      //   })
      this.resource.get().then(response => response.json())
        .then(cars => this.cars = cars)
    }
  },
  created() {
    this.resource = this.$resource('cars')
  },
  directives: {
    font: {
      bind(el, bindings, vNode) {
        el.style.fontSize = '60px'
      }
    }
  },
  computed: {
    filteredNames() {
      return this.names.filter(name => {
        return name.toLowerCase().indexOf(this.searchName.toLowerCase()) !== -1
      })
    },
    hello() {
      return this.$store.getters.hello
    }
  },
  filters: {
    lowercase(value) {
      return value.toLowerCase()
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
