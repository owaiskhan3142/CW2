const store = {
  state: {
    items: [],
  },
  methods: {
    cart() {
      const cart = this.state.items.filter(item => item.availability < item.space)
      console.log(cart)
      return cart || []
    },
  },
}

const Home = {
  template: `
<div id="options">
    <h1 class ='boxheading'>
      Options
    </h1>
    <input placeholder="Search" @input="search($event.target.value)" />

    <ul id="sorting"><b>Sort By</b>
      <li @click="sort" :class="{ selected: sortBy == 'subject'}">Subject</li>
      <li @click="sort" :class="{ selected: sortBy == 'location'}">Location</li>
      <li @click="sort" :class="{ selected: sortBy == 'price'}">Price</li>
      <li @click="sort" :class="{ selected: sortBy == 'availability'}">Availability</li>
    </ul>
    <ul id="ordering">
      <li @click="orderBy = 'ascending'" :class="{ selected: orderBy == 'ascending'}">Ascending</li>
      <li @click="orderBy = 'descending'" :class="{ selected: orderBy == 'descending'}">Descending</li>
    </ul>
  </div>
  <main>
    <h1>
      Items
    </h1>
    <div class="items">
      <div class="item" v-for="item in computedItems">
        <div class="item-top">
          <span>
            Subject: {{ item.subject }}<br />
            Location: {{ item.location }}<br />
            Price: £{{ item.price }}<br />
            Space: {{ item.availability }}<br />
          </span>

          <img :src="\`/public/images/\${item.subject}.png\`">
        </div>
        <div class="item-bot">
          <button @click="item.availability--" :disabled="item.availability == 0">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </main>
`,
  data() {
    return {
      sortBy: 'subject',
      orderBy: 'ascending',
      searchTerm: '',
      state: store.state,
    }
  },
  methods: {
    // Sort based on sortBy
    sort(evt) {
      const by = evt.target.innerText.toLowerCase()
      this.state.items.sort((a, b) => {
        if (a[by] > b[by]) return 1
        return -1
      })
      this.sortBy = by
    },
    search(term) {
      fetch(`/api/lesson?search=${term || ''}`)
        .then(res => res.json())
        .then((items) => {
          items.forEach(item => {
            item.availability = item.space
          })

          this.state.items = items
        })
    },
  },
  computed: {
    computedItems() {
      // Ordering based on orderBy
      return this.orderBy === 'ascending' ? this.state.items : this.state.items.slice().reverse()
    },
    cart: store.methods.cart,
  },
  beforeMount() {
    this.search('')
  },
}

const Cart = {
  template: `
<main>
    <div v-if="cart.length">
      <h1 class ='boxheading2'>
        Shopping Cart
      </h1>
      <div class="cart" >

        <div class="item" v-for="item in cart">
          <div class="item-top">
            <span>
              Subject: {{ item.subject }}<br />
              Location: {{ item.location }}<br />
              Price: £{{ item.price }}<br />
              Spaces: {{ item.space - item.availability }}<br />
            </span>

            <img :src=\`/public/images/\${item.subject}.png\`>
          </div>
          <div class="item-bot">
            <button @click="item.availability++">
              Remove
            </button>
          </div>
        </div> </div>
    </div>

    <div v-if="cart.length" id="checkout">
      <div><b>Total: </b>£{{ amount }}</div>
      <h1 class ='boxheading2'>
        Checkout
      </h1>
      <span>Name: </span> <input :class="{ valid: isValidName }" v-model='name' type="text" />
      <span>Phone: </span> <input :class="{ valid: isValidPhone }" v-model='phone' type="text" />
      <button @click="checkout" :disabled="!isValidName || !isValidPhone">Checkout</button>
    </div>
    </main>
`,
  data() {
    return {
      name: '',
      phone: '',
      state: store.state,
    }
  },
  methods: {
    async checkout() {
      const orderResult = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          phone: this.phone,
          lessons: this.cart.map(item => ({
            subject: item.subject,
            space: item.space - item.availability,
          })),
        }),
      })
      if (orderResult.status !== 201) {
        alert('Checkout failed')
        window.location = window.location.origin
      }

      const lessonPutResult = await fetch('/api/lesson', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessons: this.cart.map(item => ({
            subject: item.subject,
            space: item.space - item.availability,
          })),
        }),
      })

      if (lessonPutResult.status !== 200) {
        alert('Checkout failed')
      } else {
        alert('Checkout successful')
      }
      window.location = window.location.origin
    },
  },
  computed: {
    amount() {
      return this.cart.map(item => item.price * (item.space - item.availability)).reduce((a, b) => a + b, 0)
    },
    isValidName() {
      // Name must be alhpabets 2-50 characters long
      return /^[a-zA-Z ]{1,50}$/.exec(this.name)
    },
    isValidPhone() {
      // Phone must be a number 10-12 digits long
      return /^[0-9]{10,12}$/.exec(this.phone)
    },
    cart: store.methods.cart,
  },
}

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cart',
    component: Cart,
  },
]

/* eslint-disable no-undef */
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = Vue.createApp({
  data() {
    return {
      state: store.state,
    }
  },
  computed: {
    // Needed to enable cart icon when items added
    cart: store.methods.cart,
  },
})

app.use(router)
app.mount('#app')
