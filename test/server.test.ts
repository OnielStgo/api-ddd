import 'dotenv/config'
import app from '../src/presentation/app'
jest.mock('../src/presentation/app')

describe('Test in app.ts', () => {

  test('should call sever with arguments and start', async () => {

    expect(process.env.PORT).toBeDefined()

    await import('../src/server')

    expect(app.listen).toHaveBeenCalledTimes(1)
    expect(app.listen).toHaveBeenCalledWith(process.env.PORT, expect.any(Function))
  });
  
});
