import { Router } from 'express';
import User from '../../models/User';
const router = Router();

router.get('/', (req, res) => {
    console.log('Inside api/users/get');
    User.find({}, function(err, users) {

        if (err) {
            return res.status(500).send( {err} );
        }
        return res.send(users);
    })
});

router.post('/password', (req, res) => {
    const {username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({err: `Required Fields not found: ${!username ? 'username' : 'password'}`});
    }
    User.findOne({ username: username }, function (err, userModel) {
        if (err) return res.status(400).send(err);
        if (!userModel) return res.status(400).send({ err: 'Cannot find user'});
        return userModel.comparePassword(password, function (err, isMatch) {
            if (err) return res.status(400).send(err);

            return res.send({ correct: isMatch });
        });
    });
});

// either we post json data using
// curl -X POST -H "Content-Type: application/json" -d '{"name": "hjk"}' 127.0.0.1:3001/api/users; echo
// or application/x-www-form-urlencoded data using
// curl -v -X POST -d 'name=hjkl' 127.0.0.1:3001/api/users; echo
router.post('/', (req, res) => {
    const {username, password } = req.body;
    console.log(`UserName is ${username}`);
    if (!username || !password) {
        return res.status(400).send({err: `Required Fields not found: ${!username ? 'username' : 'password'}`});
    }
    const newUser = new User({
        username: username,
        password: password
    });
    newUser.save(function(err, model) {
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(201).send(model);
    })
})


export default router;