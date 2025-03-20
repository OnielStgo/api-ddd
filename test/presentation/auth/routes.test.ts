import { bcryptAdapter } from '../../../src/config/bcrypt.adapter';
import { prisma } from '../../../src/data/postgres';
import app from '../../../src/presentation/app'
import request from 'supertest'

describe('Test in routes.ts file in src/presentation/auth', () => {

  beforeAll(async () => {
        await prisma.user.deleteMany()
        await prisma.todo.deleteMany()
  })
  afterAll(async () => {
        await prisma.user.deleteMany()
        await prisma.todo.deleteMany()
  })

  const user = {
    "name": "Nome01",
    "email": "user01@example.com",
    "password": "123456789"
  }
  const todo1 = {
    "title": "Tarefa 01",
    "description": "Description tarefa 01",
    "completed": false
  }
  const todo2 = {
    "title": "Tarefa 02",
    "description": "Description tarefa 02",
    "completed": false
  }
  const todoId = 999
  
  test('should register an user', async () => {    

    const { body }  = await request(app)
      .post('/api/v1/auth/register') 
      .send(user)
      .expect(201);

      expect(typeof body).toEqual('object')
      expect(body).toEqual({ id: expect.any(Number), name: 'Nome01', email: 'user01@example.com' })
  }); 

  test('should not register an user because password is not sended and should return an error', async () => {    

    const { body }  = await request(app)
      .post('/api/v1/auth/register') 
      .send({
        "name": "Nome01",
        "email": "user01@example.com",
      })
      .expect(400);

      expect(body.error).toEqual('Property password is required')
  });

  test('should login an user', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);

    expect(body).toHaveProperty('user')
    expect(body).toHaveProperty('token')
    expect(body.token).toEqual(expect.any(String))
  });

  test('should not login an user because email is not sent and should return and error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
      .post('/api/v1/auth/login')
      .send({ password: user.password })
      .expect(400); 

    expect(body.error).toEqual('Property email is required')
  });

  test('should get all todos', async () => {

    await prisma.todo.createMany({
      data: [todo1, todo2]
    })

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const response = await request(app)
      .get('/api/v1/todo')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(2)
    expect(response.body[0].title).toBe(todo1.title)
  });

  test('should get a todo', async () => {

    const newTodo = await prisma.todo.create({
      data: todo1
    })

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const response = await request(app)
      .get(`/api/v1/todo/${newTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      id: newTodo.id,
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed
    })
  });

  test('should not get a todo and should return an error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const response = await request(app)
      .get(`/api/v1/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404) 

    expect(response.body.error).toBe(`Todo with id ${todoId} not found`)
  });


  test('should create an return a new todo', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token
    
    const response = await request(app)
      .post('/api/v1/todo/')
      .set('Authorization', `Bearer ${token}`)
      .send(todo1)
      .expect(201)

    expect(response.body).toEqual({
      id: expect.any(Number),
      title: 'Tarefa 01',
      description: 'Description tarefa 01',
      completed: false
    })    
  });

  test('should not create a todo if title is not present and should return an error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const response = await request(app)
      .post('/api/v1/todo/')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)

    expect(response.body.error).toBe('Missing property title')    
  });

  test('should not create a todo if title content is not valid and should return an error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const response = await request(app)
      .post('/api/v1/todo/')
      .set('Authorization', `Bearer ${token}`)
      .send({title: ''})
      .expect(400)

    expect(response.body.error).toBe('Missing property title')    
  });

  test('should update and return a todo', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const responseWithNewTodo = await request(app)
      .post('/api/v1/todo/')
      .set('Authorization', `Bearer ${token}`)
      .send(todo1)
      .expect(201)
    
    const newTodo = responseWithNewTodo.body

    const responseWithTodoUpadated = await request(app)
      .put(`/api/v1/todo/${newTodo.id}`)
      .send({
        "title": "Tarefa updated",
        "description": "Description tarefa updated",
        "completed": true
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(responseWithTodoUpadated.body).toEqual({
      id: newTodo.id,
      title: 'Tarefa updated',
      description: 'Description tarefa updated',
      completed: true
    })
  });

  test('should not update a todo and should return an error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const responseWithTodoUpadated = await request(app)
      .put(`/api/v1/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        "title": "Tarefa updated",
        "description": "Description tarefa updated",
        "completed": true
      })
      .expect(404)

    expect(responseWithTodoUpadated.body.error).toBe(`Todo with id ${todoId} not found`) 
  });
  
  test('should delete a todo', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const responseWithNewTodo = await request(app)
      .post('/api/v1/todo/')
      .set('Authorization', `Bearer ${token}`)
      .send(todo1)
      .expect(201)
    
    const newTodo = responseWithNewTodo.body

    const responseWithDeletedTodo = await request(app)
      .delete(`/api/v1/todo/${newTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(responseWithDeletedTodo.body).toEqual({
      id: newTodo.id,
      title: 'Tarefa 01',
      description: 'Description tarefa 01',
      completed: false
    })
  });

  test('should not delete a todo and should return an error', async () => {

    const hashedPassword = bcryptAdapter.hash(user.password)
    const newUser = await prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    const { body } = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200); 

    const token = body.token

    const responseWithDeletedTodo = await request(app)
      .delete(`/api/v1/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

    expect(responseWithDeletedTodo.body.error).toBe(`Todo with id ${todoId} not found`)
  });
  
});