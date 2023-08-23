const { Router } = require('express')

const router = Router();


router.get('/', async (req,res) => {
    const response = await axios.get('https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf');

        console.log(response)
})


module.exports = router;