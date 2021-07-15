// 搜尋、瀏覽、show page頁面

// 載入 Express
const express = require('express')
const app = express()

// 設定主機 port
const port = 3000

// 載入 Express-handlebars
const exphbs = require('express-handlebars')

// 載入 restaurant data
const restaurants = require('./restaurant.json')

// 設定 把樣板引擎交給 Express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案位置
app.use(express.static('public'))

// Handle request and response here
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurants.results })
})

// 設定 show-page 路徑
app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  
  res.render('show', { restaurant })
})

// 設定 search 路徑
app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword.trim()
  const restaurant = restaurants.results.filter(restaurant => 
    restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  )
  /*
  const restaurant = restaurants.results.filter(restaurant => {
    const name = restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    const category = restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    return name || category
  })
  */
  res.render('index', { restaurant })
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})