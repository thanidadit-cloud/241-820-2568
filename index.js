const express = require('express');
const app = express();
const port = 8000; 

app.use(express.json());

let users = [];
let counter = 1;

// path = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// path = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter++
    users.push(user);
    res.json({
        message: 'User added successfully',
    });
})

//path = PUT /user/:id
app.put('/user/:id', (req, res) => { 
    let id = req.params.id
    let updateUser = req.body;
    //หา users จาก id
    let selectedIndex = users.findIndex(user => user.id == id)
    
    //update users นั้น
    if (selectedIndex !== -1) { 
        if (updateUser.name) {
            users[selectedIndex].name = updateUser.name 
        }
        if (updateUser.age) {
            users[selectedIndex].age = updateUser.age
        }
    }

    //ส่ง response กลับไปว่า update users ที่เลือกสำเร็จแล้ว
    res.json({
        message: 'User update successfully',
        data : {
            user: users[selectedIndex],
            indexUpdated: selectedIndex
        }
    })
})

//path = DELETE /user/:id
app.delete('/user/:id', (req, res) => { 
    let id = req.params.id
    let selectedIndex = users.findIndex(user => user.id == id)
    
    if (selectedIndex !== -1) {
        users.splice(selectedIndex, 1)
        res.json({
            message: 'User deleted successfully',
            data: {
                indexDeleted: selectedIndex
            }
        })
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}) 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});