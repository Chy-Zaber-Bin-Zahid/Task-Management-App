import * as bcrypt from 'bcrypt';
import dataSource from 'ormconfig';
import { Users } from 'src/users/entity/users.entity';

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Data source initialized');

    const userRepo = dataSource.getRepository(Users);

    const existingAdmin = await userRepo.findOneBy({
      email: 'admin@example.com',
    });

    if (existingAdmin) {
      console.log('Admin already exists. Skipping seed.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = userRepo.create({
      name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: 'admin',
    });

    await userRepo.save(user);
    console.log('Admin user seeded');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await dataSource.destroy();
    console.log('Data source closed');
  }
}

seed();
